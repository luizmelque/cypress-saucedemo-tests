// cypress/e2e/tests/inventory.cy.js
import loginPage from '../pages/loginPage.js';
import inventoryPage from '../pages/inventoryPage.js';
import productPage from '../pages/productPage.js';

describe('Inventário - SauceDemo', () => {
  const productName = 'Sauce Labs Backpack';

  beforeEach(() => {
    cy.visit('/');
    loginPage.login('standard_user', 'secret_sauce');
    inventoryPage.verifyOnInventoryPage();
  });

  it('Deve acessar o produto, validar e adicionar ao carrinho', () => {
    inventoryPage.selectProductByName(productName);
    productPage.addToCart();
    productPage.verifyAdded();
    productPage.openCart();
    cy.url().should('include', '/cart.html');
  });

  it('Deve adicionar produto direto da listagem e abrir o carrinho', () => {
    inventoryPage.addToCartFromList(productName);
    inventoryPage.verifyCartBadgeCount(1);
    inventoryPage.openCart();
    cy.url().should('include', '/cart.html');
  });
});
