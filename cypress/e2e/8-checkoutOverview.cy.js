describe("Checkout: Overview", () => {
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
  });

  it("Verifies page", () => {
    cy.get(".title").contains("CHECKOUT: OVERVIEW").should("exist");
    cy.get(".cart_list").should("exist");
    cy.get(".cart_quantity_label").should("exist");
    cy.get(".cart_desc_label").should("exist");
    cy.get(".summary_info_label")
      .contains("Payment Information:")
      .should("exist");
    cy.get(".summary_value_label").should("exist");
    cy.get(".summary_info_label")
      .contains("Shipping Information:")
      .should("exist");
    cy.get(".summary_subtotal_label").should("exist");
    cy.get(".summary_tax_label").should("exist");
    cy.get(".summary_total_label").should("exist");
    cy.get("[data-test='cancel']").should("exist");
    cy.get("[data-test='finish']").should("exist");
  });

  it("Verifies product listed", () => {
    cy.get(".cart_quantity").should("exist");
    cy.get(".inventory_item_name").should("exist");
    cy.get(".inventory_item_desc").should("exist");
    cy.get(".inventory_item_price").should("exist");
  });

  it("Goes to product's page", () => {
    cy.get(".inventory_item_name").eq(0).click();
    cy.url().should("include", "/inventory.html?id=");
  });

  it("Verifies item total value", () => {
    // Calculate subtotal
    let prices = [];

    cy.get(".summary_subtotal_label").text();
  });

  it("Verifies tax value", () => {
    // Calculate tax

    cy.get(".summary_tax_label").should("exist");
  });

  it("Verifies total value", () => {
    // Calculate total

    cy.get(".summary_total_label").should("exist");
  });

  it("Cancels checkout", () => {
    cy.get("[data-test='cancel']").click();
    cy.url().should("include", "/inventory.html");
  });

  it("Finishes checkout", () => {
    cy.get("[data-test='finish']").click();
    cy.url().should("include", "/checkout-complete.html");
  });
});

const calculateSubtotal = (values) => {};

const calculateTax = (values) => {
  const tax = 0.08; // 8%
};

const calculateTotal = () => {};
