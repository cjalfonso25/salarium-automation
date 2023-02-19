describe("Check footer", () => {
  beforeEach(() => {
    cy.visit(Cypress.env("SITE"));
    cy.login();
  });

  it("Verifies footer content", () => {
    cy.get(".social_twitter").should("exist");
    cy.get(".social_facebook").should("exist");
    cy.get(".social_linkedin").should("exist");
  });

  it("Checks twitter icon", () => {
    cy.get(".social_twitter").click();
    cy.url().should("equal", "https://twitter.com/saucelabs");
  });

  it("Checks facebook icon", () => {
    cy.get(".social_facebook").click();
    cy.url().should("equal", "https://www.facebook.com/saucelabs");
  });

  it("Checks linkedin icon", () => {
    cy.get(".social_linkedin").click();
    cy.url().should("equal", "https://www.linkedin.com/company/sauce-labs/");
  });
});
