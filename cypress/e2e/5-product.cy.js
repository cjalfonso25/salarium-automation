describe("Check products page", () => {
  beforeEach(() => {
    cy.visit(Cypress.env("SITE"));
    cy.login();

    // Add product to cart
    cy.get(".inventory_item_name").eq(0).click();
  });

  it("Verifies page", () => {
    cy.get("[data-test='back-to-products']").should("exist");
    cy.get(".inventory_item_img").should("exist");
    cy.get(".inventory_item_name").should("exist");
    cy.get(".inventory_item_desc").should("exist");
    cy.get(".inventory_item_price").should("exist");
    cy.get(".btn_inventory").should("exist");
  });

  it("Go back to products page", () => {
    cy.get("[data-test='back-to-products']").click();
    cy.url().should("include", "/inventory.html");
  });

  it("Add product to cart", () => {
    cy.get(".btn_inventory").click();
    cy.get(".btn_inventory").should("have.text", "Remove");
    cy.get(".shopping_cart_badge").should("be.visible").and("have.text", "1");
  });

  it("Removes product to cart", () => {
    cy.get(".btn_inventory").click();
    cy.get(".btn_inventory").click();
    cy.get(".shopping_cart_badge").should("not.be.visible");
  });
});
