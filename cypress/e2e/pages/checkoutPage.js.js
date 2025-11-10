// cypress/e2e/pages/checkoutPage.js
class CheckoutPage {
  elements = {
    firstNameInput: () => cy.get('[data-test="firstName"]'),
    lastNameInput: () => cy.get('[data-test="lastName"]'),
    postalCodeInput: () => cy.get('[data-test="postalCode"]'),
    continueButton: () => cy.get('[data-test="continue"]'),
    finishButton: () => cy.get('[data-test="finish"]'),
    successHeader: () => cy.get('.complete-header'),
    overviewTitle: () => cy.get('.title'),
    summaryContainer: () => cy.get('.cart_item'),
  };

  // Preenche os campos do checkout
  fillCheckoutInfo(firstName, lastName, postalCode) {
    this.elements.firstNameInput().clear().type(firstName);
    this.elements.lastNameInput().clear().type(lastName);
    this.elements.postalCodeInput().clear().type(postalCode);
  }

  // Avança para a tela de overview
  continueCheckout() {
    this.elements.continueButton().click();
  }

  // Finaliza o pedido
  finishCheckout() {
    this.elements.finishButton().click();
  }

  // Verifica se está na tela de overview e se o produto aparece lá
  verifyOnOverviewPage(productName) {
    this.elements.overviewTitle().should('contain.text', 'Checkout: Overview');
    this.elements.summaryContainer().should('contain.text', productName);
  }

  // Confirma se o pedido foi concluído com sucesso
  verifySuccessMessage(expectedText = 'Thank you for your order!') {
    this.elements.successHeader()
      .should('be.visible')
      .and('contain.text', expectedText);
  }
}

export default new CheckoutPage();
