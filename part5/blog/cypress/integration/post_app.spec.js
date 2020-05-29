describe("Blog app", function () {
  beforeEach(function () {
    cy.visit("http://localhost:3000");
  });

  it("front page can be opened", function () {
    cy.contains("Blog");
  });

  it("login form can be opened", function () {
    cy.contains("login").click();
  });

  it("user can log in", function () {
    cy.contains("login").click();

    cy.get("#username").type("oaugusto");
    cy.get("#password").type("otavio123");

    cy.get("#login-button").click();

    cy.contains("User: Otavio Augusto is logged.");
  });
});