describe("Your Cart", () => {
  beforeEach(() => {
    cy.visit(Cypress.env("SITE"));
    cy.login();

    // Add product to cart
    cy.get(".inventory_item_name").eq(0).click();

    // Go to cart page
    cy.get(".shopping_cart_link").click();
  });

  it("Verifies page", () => {
    cy.get(".title").contains("YOUR CART").should("exist");
    cy.get(".cart_list").should("exist");
    cy.get(".cart_quantity_label").should("exist");
    cy.get(".cart_desc_label").should("exist");
    cy.get("[data-test='continue-shopping']").should("exist");
    cy.get("[data-test='checkout']").should("exist");
  });

  it("Verify cart's product details", () => {
    cy.get(".cart_quantity").should("exist");
    cy.get(".inventory_item_name").should("exist");
    cy.get(".inventory_item_desc").should("exist");
    cy.get(".inventory_item_price").should("exist");
    cy.get(".cart_button").should("exist");
  });

  it("Go to product's page", () => {
    cy.get(".inventory_item_name").eq(0).click();
    cy.url().should("include", "/inventory.html?id=");
  });

  it("Remove product to cart", () => {
    cy.get(".cart_button").eq(0).click();
    cy.get(".shopping_cart_badge").should("not.be.visible");
  });

  it("Go back to Products page", () => {
    cy.get("[data-test='continue-shopping']").click();
    cy.url().should("include", "/inventory.html");
  });

  it("Proceed to checkout", () => {
    cy.get("[data-test='checkout']").click();
    cy.url().should("include", "/checkout-step-one.html");
  });
});
