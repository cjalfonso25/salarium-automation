describe("Checkout: Complete", () => {
  beforeEach(() => {
    cy.visit(Cypress.env("SITE"));
    cy.login();

    // Add product to cart
    cy.get(".inventory_item_name").eq(0).click();

    // Go to cart page
    cy.get(".shopping_cart_link").click();

    // Proceed to checkout
    cy.get("[data-test='checkout']").click();

    // Accomplish checkout: your information page
    cy.get("[data-test='firstName']").type("Fname");
    cy.get("[data-test='lastName']").type("Lname");
    cy.get("[data-test='postalCode']").type("0000");
    cy.get("[data-test='continue']").click();

    // Finish checkout
    cy.get("[data-test='finish']").click();
  });

  it("Verifies page", () => {
    cy.get(".title").contains("CHECKOUT: COMPLETE!").should("exist");
    cy.get(".complete-header")
      .contains("THANK YOU FOR YOUR ORDER")
      .should("exist");
    cy.get(".complete-text")
      .contains(
        "Your order has been dispatched, and will arrive just as fast as the pony can get there!"
      )
      .should("exist");
    cy.get(".pony_express").should("exist");
    cy.get("[data-test='back-to-products']").should("exist");
  });

  it("Goes back to home page", () => {
    cy.get("[data-test='back-to-products']").click();
    cy.url().should("include", "/inventory.html");
  });
});
