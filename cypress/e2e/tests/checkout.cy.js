// cypress/e2e/tests/checkout.cy.js
import loginPage from '../pages/loginPage.js';
import inventoryPage from '../pages/inventoryPage.js';
import cartPage from '../pages/cartPage.js';
import checkoutPage from '../pages/checkoutPage.js';

describe('Fluxo completo de compra - Checkout', () => {
  const productName = 'Sauce Labs Backpack';

  beforeEach(() => {
    // login
    loginPage.visit();
    loginPage.login('standard_user', 'secret_sauce');

    // garante inventário carregado
    inventoryPage.verifyOnInventoryPage();

    // adiciona o produto direto da listagem (método agora disponível)
    inventoryPage.addProductToCart(productName);
    inventoryPage.verifyAdded(productName);

    // abre carrinho e vai para checkout
    inventoryPage.openCart();
    cartPage.verifyOnCartPage();
    cartPage.verifyProductInCart(productName);
    cartPage.goToCheckout();
  });

  it('Deve completar checkout e validar sucesso', () => {
    // preenche e prossegue
    checkoutPage.fillCheckoutInfo('Luiz', 'Melque', '12345');
    checkoutPage.continueCheckout();

    // valida overview
    checkoutPage.verifyOnOverviewPage(productName);

    // finaliza e verifica sucesso
    checkoutPage.finishCheckout();
    checkoutPage.verifySuccessMessage();
  });
});
