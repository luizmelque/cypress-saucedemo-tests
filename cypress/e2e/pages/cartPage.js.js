// cypress/e2e/pages/cartPage.js
class CartPage {
  elements = {
    cartItems: () => cy.get('.cart_item'),
    cartItemName: () => cy.get('.inventory_item_name'),
    checkoutButton: () => cy.get('[data-test="checkout"]'),
    continueShoppingButton: () => cy.get('[data-test="continue-shopping"]'),
  };

  verifyOnCartPage() {
    cy.url().should('include', '/cart.html');
    this.elements.cartItems().should('exist');
  }

  verifyProductInCart(productName) {
    this.elements.cartItems().should('contain.text', productName);
  }

  goToCheckout() {
    this.elements.checkoutButton().click();
  }

  continueShopping() {
    this.elements.continueShoppingButton().click();
  }

  removeProduct(productName) {
    cy.get('.cart_item')
      .contains(productName)
      .parents('.cart_item')
      .find('button')
      .should('contain.text', 'Remove')
      .click();
  }
}

export default new CartPage();
