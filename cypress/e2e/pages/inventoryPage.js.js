// cypress/e2e/pages/inventoryPage.js
class InventoryPage {
  elements = {
    inventoryItems: () => cy.get('.inventory_item'),
    productTitle: () => cy.get('.inventory_item_name'),
    cartIcon: () => cy.get('.shopping_cart_link'),
    cartBadge: () => cy.get('.shopping_cart_badge'),
  };

  // Verifica se está na página de inventário
  verifyOnInventoryPage() {
    cy.url().should('include', '/inventory.html');
    this.elements.inventoryItems().should('have.length.greaterThan', 0);
  }

  // Abre a página de detalhe do produto pelo nome
  selectProductByName(productName) {
    if (!productName) throw new Error('O nome do produto não pode ser vazio');
    cy.contains('.inventory_item_name', productName, { timeout: 10000 })
      .should('be.visible')
      .click();
  }

  // Adiciona o produto ao carrinho a partir da listagem
  addProductToCart(productName) {
    if (!productName) throw new Error('O nome do produto não pode ser vazio');
    cy.contains('.inventory_item', productName, { timeout: 10000 })
      .find('button')
      .should('contain.text', 'Add to cart')
      .click();
  }

  // Alias para compatibilidade
  addToCartFromList(productName) {
    return this.addProductToCart(productName);
  }

  // Verifica se o produto foi adicionado (botão vira "Remove")
  verifyAdded(productName) {
    if (!productName) throw new Error('O nome do produto não pode ser vazio');
    cy.contains('.inventory_item', productName, { timeout: 10000 })
      .find('button')
      .should('contain.text', 'Remove');
  }

  // Verifica contador do carrinho
  verifyCartBadgeCount(expectedCount) {
    if (expectedCount === 0) {
      this.elements.cartBadge().should('not.exist');
    } else {
      this.elements.cartBadge({ timeout: 10000 }).should('have.text', String(expectedCount));
    }
  }

  // Abre o carrinho
  openCart() {
    this.elements.cartIcon().click();
    cy.url().should('include', '/cart.html');
  }
}

export default new InventoryPage();
