// cypress/e2e/pages/productPage.js
class ProductPage {
  elements = {
    addToCartButton: () => cy.get('[data-test^="add-to-cart"], [data-test^="remove-"]'),
    cartIcon: () => cy.get('.shopping_cart_link'),
    backButton: () => cy.get('[data-test="back-to-products"]'),
  };

  addToCart() {
    cy.get('button')
      .contains('Add to cart')
      .should('be.visible')
      .click();
  }

  verifyAdded() {
    cy.get('button')
      .contains('Remove')
      .should('be.visible');
  }

  openCart() {
    this.elements.cartIcon().click();
  }

  goBackToProducts() {
    this.elements.backButton().click();
  }
}

export default new ProductPage();
