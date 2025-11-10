// cypress/e2e/tests/checkoutComplete.cy.js

import loginPage from '../pages/loginPage.js';
import inventoryPage from '../pages/inventoryPage.js';
import cartPage from '../pages/cartPage.js';
import checkoutPage from '../pages/checkoutPage.js';

describe('Fluxo completo de checkout - SauceDemo', () => {
  const productName = 'Sauce Labs Backpack';
  const user = {
    username: 'standard_user',
    password: 'secret_sauce'
  };

  beforeEach(() => {
    cy.visit('/');
    loginPage.login(user.username, user.password);
    cy.url().should('include', '/inventory.html');
  });

  it('Deve realizar o checkout completo com sucesso', () => {
    // Adiciona o produto no carrinho
    inventoryPage.addProductToCart(productName);

    // Verifica se o produto foi adicionado corretamente
    inventoryPage.verifyAdded(productName); // ✅ Passando o productName

    // Abre o carrinho
    inventoryPage.openCart();

    // Verifica o produto no carrinho
    cartPage.verifyProductInCart(productName);

    // Vai para a página de checkout
    cartPage.goToCheckout();

    // Preenche informações do checkout
    checkoutPage.fillCheckoutInfo('Luiz', 'Melque', '12345');
    checkoutPage.continueCheckout();

    // Verifica se está na página de overview e se o produto está listado
    checkoutPage.verifyOnOverviewPage(productName);

    // Finaliza o checkout
    checkoutPage.finishCheckout();

    // Verifica a mensagem de sucesso
    checkoutPage.verifySuccessMessage('Thank you for your order!');
  });
});
