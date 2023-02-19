describe("Check products page", () => {
  beforeEach(() => {
    cy.visit(Cypress.env("SITE"));
    cy.login();
  });

  it("Verifies page", () => {
    cy.get(".title").contains("PRODUCTS").should("exist");
    cy.get("[data-test='product_sort_container']").should("exist");
    cy.get(".inventory_list").should("exist");
  });

  it("Sorts products alphabetically A-Z", () => {
    cy.get("[data-test='product_sort_container']")
      .select("Name (A to Z)")
      .should("have.value", "az");
  });

  it("Sorts products alphabetically Z-A", () => {
    cy.get("[data-test='product_sort_container']")
      .select("Name (Z to A)")
      .should("have.value", "za");
  });

  it("Sorts products by price low to high", () => {
    cy.get("[data-test='product_sort_container']")
      .select("Price (low to high)")
      .should("have.value", "lohi");
  });

  it("Sorts products by price high to low", () => {
    cy.get("[data-test='product_sort_container']")
      .select("Price (high to low)")
      .should("have.value", "hilo");
  });

  it("Verifies product listed", () => {
    cy.get(".inventory_item_img").should("exist");
    cy.get(".inventory_item_name").should("exist");
    cy.get(".inventory_item_desc").should("exist");
    cy.get(".inventory_item_price").should("exist");
    cy.get(".btn_inventory").should("exist");
  });

  it("Add product to cart", () => {
    cy.get(".btn_inventory").eq(0).click();
    cy.get(".btn_inventory").eq(0).should("have.text", "Remove");
    cy.get(".shopping_cart_badge").should("be.visible").and("have.text", "1");
  });

  it("Removes product to cart", () => {
    cy.get(".btn_inventory").eq(0).click();
    cy.get(".btn_inventory").eq(0).click();
    cy.get(".shopping_cart_badge").should("not.be.visible");
  });

  it("Go to product's page", () => {
    cy.get(".inventory_item_name").eq(0).click();
    cy.url().should("include", "/inventory.html?id=");
  });
});
