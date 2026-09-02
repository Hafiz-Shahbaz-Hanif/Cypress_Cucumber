/**
 * Thin helpers for the restful-booker API. Step definitions call these instead
 * of hand-rolling `cy.request` options each time.
 */
const base = () => Cypress.env('apiBaseUrl');

export const aBooking = (overrides = {}) => ({
  firstname: 'Hafiz',
  lastname: 'QA',
  totalprice: 275,
  depositpaid: true,
  bookingdates: { checkin: '2026-09-01', checkout: '2026-09-07' },
  additionalneeds: 'Breakfast',
  ...overrides,
});

export const authenticate = (username = 'admin', password = 'password123') =>
  cy
    .request('POST', `${base()}/auth`, { username, password })
    .then((res) => res.body.token);

export const createBooking = (booking) =>
  cy.request('POST', `${base()}/booking`, booking).then((res) => {
    expect(res.status).to.eq(200);
    return res.body;
  });

export const getBooking = (id) =>
  cy.request({ url: `${base()}/booking/${id}`, failOnStatusCode: false });

export const updateBooking = (id, booking, token) =>
  cy.request({
    method: 'PUT',
    url: `${base()}/booking/${id}`,
    body: booking,
    headers: { Cookie: `token=${token}` },
    failOnStatusCode: false,
  });

export const patchBooking = (id, partial, token) =>
  cy.request({
    method: 'PATCH',
    url: `${base()}/booking/${id}`,
    body: partial,
    headers: { Cookie: `token=${token}` },
    failOnStatusCode: false,
  });

export const deleteBooking = (id, token) =>
  cy.request({
    method: 'DELETE',
    url: `${base()}/booking/${id}`,
    headers: { Cookie: `token=${token}` },
    failOnStatusCode: false,
  });

export const listBookingIds = (query = {}) =>
  cy
    .request({ url: `${base()}/booking`, qs: query })
    .then((res) => res.body.map((b) => b.bookingid));

export const ping = () => cy.request({ url: `${base()}/ping`, failOnStatusCode: false });
