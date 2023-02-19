// ***********************************************
// This example commands.js shows you how to
Cypress.Commands.add(
  "login",
  (username = "standard_user", password = "secret_sauce") => {
    cy.get("[data-test='username']").type(username);
    cy.get("[data-test='password']").type(password);
    cy.get("[data-test='login-button']").click();
  }
);
