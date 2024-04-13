describe("Login Form", () => {
  beforeEach(() => {
    cy.visit("http://localhost:5173/sign-in");

    cy.get("#name-input").as("name");
    cy.get("#password-input").as("password");
    cy.get("button[type=submit]").as("submit");
  });

  it("should display the login form", () => {
    cy.get("form").should("be.visible");
  });

  it("should display the relevant fields", () => {
    cy.get("@name").should("be.visible");
    cy.get("@password").should("be.visible");
  });

  // EMAIL

  it("should get error whith invalid name", () => {
    cy.get("@name").type("t");
    cy.get("@submit").click();
    cy.get("#name-error").should("be.visible");
  });

  it("should get error whith no name", () => {
    cy.get("@submit").click();
    cy.get("#name-error").should("be.visible");
  });

  it("should not get error whith valid name", () => {
    cy.get("@name").type("Test");
    cy.get("@submit").click();
    cy.get("#name-error").should("not.exist");
  });

  // PASSWORD

  it("should get error whith invalid password", () => {
    cy.get("@password").type("t");
    cy.get("@submit").click();
    cy.get("#password-error").should("be.visible");
  });

  it("should get error whith no password", () => {
    cy.get("@submit").click();
    cy.get("#password-error").should("be.visible");
  });

  it("should not get error whith valid password", () => {
    cy.get("@password").type("Testtest");
    cy.get("@submit").click();
    cy.get("#password-error").should("not.exist");
  });

  it("should submit when all fields are correct", () => {
    cy.get("@name").type("Test");
    cy.get("@password").type("Asdasdasd");

    cy.get("@submit").click();
    cy.get("form").should(() => {
      expect(localStorage.getItem("login")).to.not.be.null;
      expect(localStorage.getItem("login")).to.eq("true");
    });

    cy.clearLocalStorage();
  });

  it("should not submit when something is missing", () => {
    cy.get("@name").type("Test");
    cy.get("@submit").click();
    cy.get("form").should(() => {
      expect(localStorage.getItem("success")).to.not.exist;
    });
  });
});
