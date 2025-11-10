// cypress/e2e/pages/loginPage.js
class LoginPage {
  elements = {
    usernameInput: () => cy.get('[data-test="username"]'),
    passwordInput: () => cy.get('[data-test="password"]'),
    loginButton: () => cy.get('[data-test="login-button"]'),
    errorMessage: () => cy.get('[data-test="error"]'),
  };

  visit() {
    cy.visit('/'); // usa baseUrl definido no cypress.config.js
  }

  login(username, password) {
    this.elements.usernameInput().clear().type(username);
    this.elements.passwordInput().clear().type(password);
    this.elements.loginButton().click();
  }

  verifyLoginSuccess() {
    cy.url().should('include', '/inventory.html');
  }

  verifyLoginFailure(message) {
    this.elements.errorMessage().should('contain.text', message);
  }
}

export default new LoginPage();
