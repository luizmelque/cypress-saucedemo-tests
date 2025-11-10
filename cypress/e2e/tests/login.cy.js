// cypress/e2e/tests/login.cy.js
import loginPage from '../pages/loginPage.js';

describe('Login - SauceDemo', () => {
  it('Deve logar com credenciais válidas', () => {
    loginPage.visit();
    loginPage.login('standard_user', 'secret_sauce');
    loginPage.verifyLoginSuccess();
  });

  it('Deve falhar com credenciais inválidas', () => {
    loginPage.visit();
    loginPage.login('wrong_user', 'wrong_pass');
    loginPage.verifyLoginFailure('Username and password do not match');
  });
});
