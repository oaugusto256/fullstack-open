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

  describe("when logged in", function () {
    beforeEach(function () {
      cy.contains("login").click();

      cy.get("#username").type("oaugusto");
      cy.get("#password").type("otavio123");

      cy.get("#login-button").click();
    });

    it("a new note can be created", function () {
      cy.contains("new post").click();

      cy.get("#post-title").type("Test test");
      cy.get("#post-author").type("Otavio Augusto");
      cy.get("#post-url").type("http://wwww.google.com");
      cy.get("#post-likes").type(10);

      cy.contains("save").click();
      cy.contains("post successfully created");
    });
  });
});