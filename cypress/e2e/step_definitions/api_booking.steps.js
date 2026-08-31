import { When, Then } from '@badeball/cypress-cucumber-preprocessor';

const api = (path) => `${Cypress.env('apiBaseUrl')}${path}`;

When('I create a booking for {string} {string} with total price {int}', (first, last, price) => {
  const payload = {
    firstname: first,
    lastname: last,
    totalprice: price,
    depositpaid: true,
    bookingdates: { checkin: '2026-09-01', checkout: '2026-09-07' },
    additionalneeds: 'Breakfast',
  };
  cy.request('POST', api('/booking'), payload).then((res) => {
    expect(res.status).to.eq(200);
    cy.wrap(res.body).as('created');
    cy.wrap(payload).as('payload');
  });
});

Then('the booking id is a positive number', () => {
  cy.get('@created').its('bookingid').should('be.a', 'number').and('be.greaterThan', 0);
});

Then('fetching that booking returns the same first and last name', () => {
  cy.get('@created').then((created) => {
    cy.get('@payload').then((payload) => {
      cy.request(api(`/booking/${created.bookingid}`)).then((res) => {
        expect(res.status).to.eq(200);
        expect(res.body.firstname).to.eq(payload.firstname);
        expect(res.body.lastname).to.eq(payload.lastname);
      });
    });
  });
});

When('I fetch a booking with id {int}', (id) => {
  cy.request({ url: api(`/booking/${id}`), failOnStatusCode: false }).as('response');
});

Then('the API response status is {int}', (status) => {
  cy.get('@response').its('status').should('eq', status);
});
