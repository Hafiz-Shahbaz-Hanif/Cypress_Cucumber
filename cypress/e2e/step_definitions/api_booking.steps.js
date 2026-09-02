import { Given, When, Then } from '@badeball/cypress-cucumber-preprocessor';
import {
  aBooking,
  authenticate,
  createBooking,
  deleteBooking,
  getBooking,
  listBookingIds,
  patchBooking,
  ping,
  updateBooking,
} from '../../support/bookingApi';

/* ---------- auth ---------- */

Given('I am authenticated against the booking API', () => {
  authenticate().then((token) => cy.wrap(token).as('token'));
});

When('I request a token with username {string} and password {string}', (username, password) => {
  cy.request({
    method: 'POST',
    url: `${Cypress.env('apiBaseUrl')}/auth`,
    body: { username, password },
    failOnStatusCode: false,
  }).as('authResponse');
});

Then('a token is returned', () => {
  cy.get('@authResponse').its('body.token').should('be.a', 'string').and('have.length.greaterThan', 0);
});

Then('the auth response has status {int} and no token', (status) => {
  cy.get('@authResponse').its('status').should('eq', status);
  cy.get('@authResponse').its('body.token').should('be.undefined');
});

/* ---------- create + read ---------- */

function create(overrides) {
  const booking = aBooking(overrides);
  createBooking(booking).then((body) => {
    cy.wrap(body.bookingid).as('bookingId');
    cy.wrap(booking).as('booking');
  });
}

When('I create a booking for {string} {string} with total price {int}', (first, last, price) => {
  create({ firstname: first, lastname: last, totalprice: price });
});

Given('a booking exists for {string} {string}', (first, last) => {
  create({ firstname: first, lastname: last });
});

Given('a booking exists for {string} {string} with total price {int}', (first, last, price) => {
  create({ firstname: first, lastname: last, totalprice: price });
});

When(
  'I create a booking {string} {string} priced {int} deposit {word} staying {string} to {string} needing {string}',
  (first, last, price, deposit, checkin, checkout, needs) => {
    create({
      firstname: first,
      lastname: last,
      totalprice: price,
      depositpaid: deposit === 'true',
      bookingdates: { checkin, checkout },
      additionalneeds: needs,
    });
  },
);

Then('the booking id is a positive number', () => {
  cy.get('@bookingId').should('be.a', 'number').and('be.greaterThan', 0);
});

Then('the stored booking matches what I sent', () => {
  cy.get('@bookingId').then((id) => {
    cy.get('@booking').then((sent) => {
      getBooking(id).then((res) => {
        expect(res.status).to.eq(200);
        expect(res.body).to.include({
          firstname: sent.firstname,
          lastname: sent.lastname,
          totalprice: sent.totalprice,
          depositpaid: sent.depositpaid,
        });
      });
    });
  });
});

Then('fetching that booking returns the same first and last name', () => {
  cy.get('@bookingId').then((id) => {
    cy.get('@booking').then((sent) => {
      getBooking(id).then((res) => {
        expect(res.status).to.eq(200);
        expect(res.body.firstname).to.eq(sent.firstname);
        expect(res.body.lastname).to.eq(sent.lastname);
      });
    });
  });
});

/* ---------- contract + non-functional ---------- */

Then('the health endpoint reports the service is up', () => {
  ping().its('status').should('eq', 201);
});

Then('fetching that booking responds within {int} ms', (budget) => {
  cy.get('@bookingId').then((id) => {
    getBooking(id).then((res) => {
      expect(res.status).to.eq(200);
      expect(res.duration).to.be.lessThan(budget);
    });
  });
});

Then('the booking response has the expected shape', () => {
  cy.get('@bookingId').then((id) => {
    getBooking(id).then((res) => {
      expect(res.body).to.have.all.keys(
        'firstname',
        'lastname',
        'totalprice',
        'depositpaid',
        'bookingdates',
        'additionalneeds',
      );
      expect(res.body.bookingdates).to.have.all.keys('checkin', 'checkout');
    });
  });
});

/* ---------- update ---------- */

When('I fully update that booking to {string} {string} priced {int}', (first, last, price) => {
  cy.get('@token').then((token) => {
    cy.get('@bookingId').then((id) => {
      cy.get('@booking').then((current) => {
        const updated = { ...current, firstname: first, lastname: last, totalprice: price };
        updateBooking(id, updated, token).then((res) => {
          expect(res.status).to.eq(200);
          cy.wrap(updated).as('booking');
        });
      });
    });
  });
});

Then('the booking reads back as {string} {string} priced {int}', (first, last, price) => {
  cy.get('@bookingId').then((id) => {
    getBooking(id).then((res) => {
      expect(res.body.firstname).to.eq(first);
      expect(res.body.lastname).to.eq(last);
      expect(res.body.totalprice).to.eq(price);
    });
  });
});

When("I patch that booking's total price to {int}", (price) => {
  cy.get('@token').then((token) => {
    cy.get('@bookingId').then((id) => {
      patchBooking(id, { totalprice: price }, token).its('status').should('eq', 200);
    });
  });
});

When("I patch that booking's first name to {string}", (first) => {
  cy.get('@token').then((token) => {
    cy.get('@bookingId').then((id) => {
      patchBooking(id, { firstname: first }, token).its('status').should('eq', 200);
    });
  });
});

Then("the booking's total price is {int}", (price) => {
  cy.get('@bookingId').then((id) => {
    getBooking(id).its('body.totalprice').should('eq', price);
  });
});

Then("the booking's first name is still {string}", (first) => {
  cy.get('@bookingId').then((id) => {
    getBooking(id).its('body.firstname').should('eq', first);
  });
});

/* ---------- filter ---------- */

When('I filter bookings by firstname {string} and lastname {string}', (first, last) => {
  listBookingIds({ firstname: first, lastname: last }).as('filteredIds');
});

Then('the filtered results contain that booking', () => {
  cy.get('@bookingId').then((id) => {
    cy.get('@filteredIds').should('include', id);
  });
});

/* ---------- delete ---------- */

When('I delete that booking', () => {
  cy.get('@token').then((token) => {
    cy.get('@bookingId').then((id) => {
      deleteBooking(id, token).its('status').should('be.oneOf', [200, 201, 204]);
    });
  });
});

When('I fetch a booking with id {int}', (id) => {
  getBooking(id).as('response');
});

Then('the API response status is {int}', (status) => {
  cy.get('@response').its('status').should('eq', status);
});

Then('fetching that booking returns status {int}', (status) => {
  cy.get('@bookingId').then((id) => {
    getBooking(id).its('status').should('eq', status);
  });
});

/* ---------- negative ---------- */

When('I attempt to update that booking without a token', () => {
  cy.get('@bookingId').then((id) => {
    cy.get('@booking').then((booking) => {
      cy.request({
        method: 'PUT',
        url: `${Cypress.env('apiBaseUrl')}/booking/${id}`,
        body: booking,
        failOnStatusCode: false,
      }).as('response');
    });
  });
});

When('I create a booking missing the {word} field', (field) => {
  const payload = aBooking();
  delete payload[field];
  cy.request({
    method: 'POST',
    url: `${Cypress.env('apiBaseUrl')}/booking`,
    body: payload,
    failOnStatusCode: false,
  }).as('response');
});

Then('the API response status is an error', () => {
  cy.get('@response').its('status').should('be.gte', 400);
});
