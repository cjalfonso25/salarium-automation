describe("Checkout: Your Information", () => {
  beforeEach(() => {
    cy.visit(Cypress.env("SITE"));
    cy.login();

    // Add product to cart
    cy.get(".inventory_item_name").eq(0).click();

    // Go to cart page
    cy.get(".shopping_cart_link").click();

    // Proceed to checkout
    cy.get("[data-test='checkout']").click();
  });

  it("Verifies page", () => {
    cy.get(".title").contains("CHECKOUT: YOUR INFORMATION").should("exist");
    cy.get("[data-test='firstName']").should("exist");
    cy.get("[data-test='lastName']").should("exist");
    cy.get("[data-test='postalCode']").should("exist");
    cy.get("[data-test='cancel']").should("exist");
    cy.get("[data-test='continue']").should("exist");
  });

  it("Proceeds without filling-out fields", () => {
    cy.get("[data-test='continue']").click();

    // Error msg
    cy.get("[data-test='error']")
      .contains("Error: First Name is required")
      .should("be.visible");
  });

  it("Proceeds with first name only", () => {
    cy.get("[data-test='firstName']").type("Fname");
    cy.get("[data-test='continue']").click();

    // Error msg
    cy.get("[data-test='error']")
      .contains("Error: Last Name is required")
      .should("be.visible");
  });

  it("Proceeds with last name only", () => {
    cy.get("[data-test='lastName']").type("Lname");
    cy.get("[data-test='continue']").click();

    // Error msg
    cy.get("[data-test='error']")
      .contains("Error: First Name is required")
      .should("be.visible");
  });

  it("Proceeds with zip/postal code only", () => {
    cy.get("[data-test='postalCode']").type("0000");
    cy.get("[data-test='continue']").click();

    // Error msg
    cy.get("[data-test='error']")
      .contains("Error: First Name is required")
      .should("be.visible");
  });

  it("Proceeds with first name and last name only", () => {
    cy.get("[data-test='firstName']").type("Fname");
    cy.get("[data-test='lastName']").type("Lname");
    cy.get("[data-test='continue']").click();

    // Error msg
    cy.get("[data-test='error']")
      .contains("Error: Postal Code is required")
      .should("be.visible");
  });

  it("Proceeds with first name and  zip/postal code only", () => {
    cy.get("[data-test='firstName']").type("Fname");
    cy.get("[data-test='postalCode']").type("0000");
    cy.get("[data-test='continue']").click();

    // Error msg
    cy.get("[data-test='error']")
      .contains("Error: Last Name is required")
      .should("be.visible");
  });

  it("Proceeds with last name and  zip/postal code only", () => {
    cy.get("[data-test='lastName']").type("Lname");
    cy.get("[data-test='postalCode']").type("0000");
    cy.get("[data-test='continue']").click();

    // Error msg
    cy.get("[data-test='error']")
      .contains("Error: First Name is required")
      .should("be.visible");
  });

  it("Proceed after filling-out all fields", () => {
    cy.get("[data-test='firstName']").type("Fname");
    cy.get("[data-test='lastName']").type("Lname");
    cy.get("[data-test='postalCode']").type("0000");
    cy.get("[data-test='continue']").click();
    cy.url().should("include", "/checkout-step-two.html");
  });

  it("Cancels checkout", () => {
    cy.get("[data-test='cancel']").click();
    cy.url().should("include", "/inventory.html");
  });
});
