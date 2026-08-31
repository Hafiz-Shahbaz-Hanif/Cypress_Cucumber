class LoginPage {
  elements = {
    username: () => cy.get('[data-test="username"]'),
    password: () => cy.get('[data-test="password"]'),
    loginButton: () => cy.get('[data-test="login-button"]'),
    error: () => cy.get('[data-test="error"]'),
  };

  visit() {
    cy.visit('/');
    this.elements.loginButton().should('be.visible');
    return this;
  }

  login(username, password) {
    if (username) this.elements.username().clear().type(username);
    if (password) this.elements.password().clear().type(password, { log: false });
    this.elements.loginButton().click();
    return this;
  }

  expectError(message) {
    this.elements.error().should('contain.text', message);
    return this;
  }
}

export default new LoginPage();
