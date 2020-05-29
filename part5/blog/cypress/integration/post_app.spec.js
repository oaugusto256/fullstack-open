describe("Blog app", function () {
  it("front page can be opened", function () {
    cy.visit("http://localhost:3000");
    cy.contains("Blog");
  });

  it("login form can be opened", function () {
    cy.visit("http://localhost:3000");
    cy.contains("login").click();
  });
});