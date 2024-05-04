describe("Login Form", () => {
  beforeEach(() => {
    cy.visit("http://localhost:5173/sign-in");

    cy.get("#email-input").as("email");
    cy.get("#password-input").as("password");
    cy.get("#submit-login-button").as("submit");
  });

  it("should display the login form", () => {
    cy.get("form").should("be.visible");
  });

  it("should display the relevant fields", () => {
    cy.get("@email").should("be.visible");
    cy.get("@password").should("be.visible");
  });

  // EMAIL

  it("should get error whith invalid name", () => {
    cy.get("@email").type("t");
    cy.get("@submit").click();
    cy.get("#email-error").should("be.visible");
  });

  it("should get error whith no name", () => {
    cy.get("@submit").click();
    cy.get("#email-error").should("be.visible");
  });

  it("should not get error whith valid name", () => {
    cy.get("@email").type("magugu_test_user@stud.noroff.no");
    cy.get("@submit").click();
    cy.get("#email-error").should("not.exist");
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
    cy.get("@email").type("magugu_test_user@stud.noroff.no");
    cy.get("@password").type("magugu_test_user");

    cy.get("@submit").click();
    cy.get("form").should(() => {
      expect(localStorage.getItem("auth-storage")).to.not.be.null;
      let authStorage = JSON.parse(localStorage.getItem("auth-storage"));
      expect(authStorage.state.isLoggedIn).to.be.true;
      expect(authStorage.state.user.name).to.eq("magugu_test_user");
    });

    cy.clearLocalStorage();
  });

  it("should not submit when something is missing", () => {
    cy.get("@email").type("magugu_test_user@stud.noroff.no");
    cy.get("@submit").click();
    cy.get("form").should(() => {
      expect(localStorage.getItem("success")).to.not.exist;
    });
  });

  it("should display new navbar info when logged in", () => {
    cy.viewport("macbook-15");
    cy.get("@email").type("magugu_test_user@stud.noroff.no");
    cy.get("@password").type("magugu_test_user");
    cy.get("@submit").click();

    cy.wait(200);
    cy.get("#user-info-button").should("be.visible");

    cy.visit("http://localhost:5173/");
    cy.get("#user-info-button").should("be.visible");
  });
});
