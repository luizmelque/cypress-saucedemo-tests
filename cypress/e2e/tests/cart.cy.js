// cypress/e2e/tests/cart.cy.js
import loginPage from '../pages/loginPage.js';
import inventoryPage from '../pages/inventoryPage.js';
import cartPage from '../pages/cartPage.js';

describe('Cart spec - validação e início do checkout', () => {
  const productName = 'Sauce Labs Backpack';

  beforeEach(() => {
    loginPage.visit();
    loginPage.login('standard_user', 'secret_sauce');
    inventoryPage.verifyOnInventoryPage();
  });

  it('Deve adicionar produto e acessar checkout', () => {
    inventoryPage.addToCartFromList(productName);
    inventoryPage.verifyCartBadgeCount(1);
    inventoryPage.openCart();

    cartPage.verifyOnCartPage();
    cartPage.verifyProductInCart(productName);

    cartPage.goToCheckout();
    cy.url().should('include', '/checkout-step-one.html');
  });
});
