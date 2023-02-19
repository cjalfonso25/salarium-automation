const username = "standard_user";
const password = "secret_sauce";

describe("Check login functionalities", () => {
  beforeEach(() => {
    cy.visit(Cypress.env("SITE"));
  });

  it("Verifies page", () => {
    cy.get(".login_logo").should("exist");
    cy.get("[data-test='username']").should("exist");
    cy.get("[data-test='password']").should("exist");
    cy.get("[data-test='login-button']").should("exist");
    cy.get(".bot_column").should("exist");
    cy.get(".login_credentials").should("exist");
    cy.get(".login_passwords").should("exist");
  });

  it("Login with null credentials", () => {
    cy.get("[data-test='login-button']").click();
    cy.get("[data-test='error']").should("be.visible");
  });

  it("Login with username only", () => {
    cy.get("[data-test='username']").type(username);
    cy.get("[data-test='login-button']").click();

    // Error state
    cy.get("[data-test='username']").should(
      "have.css",
      "border-bottom-color",
      "#e2231a"
    );
    cy.get("[data-test='username']")
      .siblings("[data-icon='times-circle']")
      .should("be.visible");

    cy.get("[data-test='password']").should(
      "have.css",
      "border-bottom-color",
      "#e2231a"
    );
    cy.get("[data-test='password']")
      .siblings("[data-icon='times-circle']")
      .should("be.visible");

    // Error msg
    cy.get("[data-test='error']")
      .contains("Epic sadface: Username is required")
      .should("be.visible");
  });

  it("Login with password only", () => {
    cy.get("[data-test='password']").type(password);
    cy.get("[data-test='login-button']").click();

    // Error state
    cy.get("[data-test='username']").should(
      "have.css",
      "border-bottom-color",
      "#e2231a"
    );
    cy.get("[data-test='username']")
      .siblings("[data-icon='times-circle']")
      .should("be.visible");

    cy.get("[data-test='password']").should(
      "have.css",
      "border-bottom-color",
      "#e2231a"
    );
    cy.get("[data-test='password']")
      .siblings("[data-icon='times-circle']")
      .should("be.visible");

    // Error msg
    cy.get("[data-test='error']")
      .contains("Epic sadface: Username is required")
      .should("be.visible");
  });

  it("Login with invalid username and valid password", () => {
    cy.get("[data-test='username']").type("invalid_user");
    cy.get("[data-test='password']").type(password);

    // Error state
    cy.get("[data-test='username']").should(
      "have.css",
      "border-bottom-color",
      "#e2231a"
    );
    cy.get("[data-test='username']")
      .siblings("[data-icon='times-circle']")
      .should("be.visible");

    cy.get("[data-test='password']").should(
      "have.css",
      "border-bottom-color",
      "#e2231a"
    );
    cy.get("[data-test='password']")
      .siblings("[data-icon='times-circle']")
      .should("be.visible");

    // Error msg
    cy.get("[data-test='login-button']").click();
    cy.get("[data-test='error']")
      .contains(
        "Epic sadface: Username and password do not match any user in this service"
      )
      .should("be.visible");
  });

  it("Login with valid username and invalid password", () => {
    cy.get("[data-test='username']").type(username);
    cy.get("[data-test='password']").type("invalid_password");
    cy.get("[data-test='login-button']").click();

    // Error state
    cy.get("[data-test='username']").should(
      "have.css",
      "border-bottom-color",
      "#e2231a"
    );
    cy.get("[data-test='username']")
      .siblings("[data-icon='times-circle']")
      .should("be.visible");

    cy.get("[data-test='password']").should(
      "have.css",
      "border-bottom-color",
      "#e2231a"
    );
    cy.get("[data-test='password']")
      .siblings("[data-icon='times-circle']")
      .should("be.visible");

    // Error msg
    cy.get("[data-test='error']")
      .contains(
        "Epic sadface: Username and password do not match any user in this service"
      )
      .should("be.visible");
  });

  it("Login with valid username and password", () => {
    cy.login();
    cy.url().should("include", "/inventory.html");
  });

  it("Closes error message", () => {
    cy.get("[data-test='username']").type("invalid");
    cy.get("[data-test='login-button']").click();
    cy.get(".error-button").click();
    cy.get("[data-test='error']").should("not.be.visible");
  });
});
