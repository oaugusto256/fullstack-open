describe("Blog app", function () {
  beforeEach(function () {
    cy.request("POST", "http://localhost:3003/api/testing/reset");
    cy.createUser();
    cy.visit("http://localhost:3000");
  });

  it("front page can be opened", function () {
    cy.contains("Blog");
  });

  describe("Login", function () {
    it("login form shown", function () {
      cy.contains("login");
    });

    it("succeds with correct credentials", function () {
      cy.contains("login").click();

      cy.get("#username").type("oaugusto");
      cy.get("#password").type("otavio123");

      cy.get("#login-button").click();

      cy.contains("User: Otavio Augusto is logged.");
    });

    it("fails with wrong password", function () {
      cy.contains("login").click();
      cy.get("#username").type("mluukkai");
      cy.get("#password").type("wrong");
      cy.get("#login-button").click();

      cy.contains("wrong credentials");
    });
  });

  describe("when logged in", function () {
    beforeEach(function () {
      cy.login({ username: "oaugusto", password: "otavio123" });

      cy.contains("new post").click();

      cy.get("#post-title").type("Test test");
      cy.get("#post-author").type("Otavio Augusto");
      cy.get("#post-url").type("http://wwww.google.com");
      cy.get("#post-likes").type(10);

      cy.contains("save").click();
    });

    it("a new post can be created", function () {
      cy.contains("post successfully created");
    });

    it("a post can show details  ", () => {
      cy.contains("Show details").click();

      cy.contains("Likes: 10");
      cy.contains("Like");
    });

    it("a post can be liked", () => {
      cy.contains("Show details").click();

      cy.get("#post-like-button").click();

      cy.contains("Likes: 11");
    });

    it("a post can be deleted", () => {
      cy.contains("Delete").click();

      cy.contains("post successfully deleted");
    });

    it.only("the posts should be ordered acoording likes", () => {
      cy.get("#post-title").type("Test test");
      cy.get("#post-author").type("Otavio Augusto");
      cy.get("#post-url").type("http://wwww.google.com");
      cy.get("#post-likes").type(15);

      cy.contains("save").click().then(() => {
        cy.get("#post-list");
      });
    });
  });
});