describe("Check navbar functionalities", () => {
  beforeEach(() => {
    cy.visit(Cypress.env("SITE"));
    cy.login();
  });

  it("Verifies navbar content", () => {
    cy.get(".app_logo").should("exist");
    cy.get(".shopping_cart_link").should("exist");
    cy.get(".bm-burger-button").should("exist");
  });

  it("Verifies offcanvas menu", () => {
    cy.get(".bm-burger-button").click();
    cy.get(".bm-menu").should("be.visible");
  });

  it("Verifies menu links", () => {
    cy.get(".bm-burger-button").click();
    cy.get(".bm-item").contains("ALL ITEMS").should("be.visible");
    cy.get(".bm-item").contains("ABOUT").should("be.visible");
    cy.get(".bm-item").contains("LOGOUT").should("be.visible");
    cy.get(".bm-item").contains("RESET APP STATE").should("be.visible");
  });

  it("Closes offcanvas menu", () => {
    cy.get(".bm-burger-button").click();
    cy.get(".bm-cross-button").click();
    cy.get(".bm-menu").should("not.be.visible");
  });

  it("Checks ALL ITEMS menu", () => {
    cy.get(".bm-burger-button").click();
    cy.get(".bm-item").contains("ALL ITEMS").click();
    cy.url().should("include", "/inventory.html");
  });

  it("Checks ABOUT menu", () => {
    cy.get(".bm-burger-button").click();
    cy.get(".bm-item").contains("ABOUT").click();
    cy.url().should("equal", "https://saucelabs.com/");
  });

  it("Checks LOGOUT menu", () => {
    cy.get(".bm-burger-button").click();
    cy.get(".bm-item").contains("LOGOUT").click();
    cy.url().should("equal", "https://www.saucedemo.com/");
  });

  it("Checks RESET APP STATE menu", () => {
    cy.get(".bm-burger-button").click();
    cy.get(".bm-item").contains("RESET APP STATE").click();
    cy.get(".shopping_cart_badge").should("not.be.visible");
  });

  it("Views cart", () => {
    cy.get(".shopping_cart_link").click();
    cy.url().should("include", "/cart.html");
  });
});
