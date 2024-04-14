describe("Register Form Errors", () => {
  beforeEach(() => {
    cy.visit("http://localhost:5173/sign-up");
    cy.get("#name-input").as("name");
    cy.get("#email-input").as("email");
    cy.get("#password-input").as("password");
    cy.get("#bio-input").as("bio");
    cy.get("#bannerUrl-input").as("bannerUrl");
    cy.get("#bannerAlt-input").as("bannerAlt");
    cy.get("#avatarUrl-input").as("avatarUrl");
    cy.get("#avatarAlt-input").as("avatarAlt");
    cy.get("button[type=submit]").as("submit");
  });

  it("should display the login form", () => {
    cy.get("form").should("be.visible");
  });

  it("should display the relevant fields", () => {
    cy.get("@name").should("be.visible");
    cy.get("@email").should("be.visible");
    cy.get("@password").should("be.visible");
    cy.get("@bio").should("be.visible");
    cy.get("@bannerUrl").should("be.visible");
    cy.get("@bannerAlt").should("be.visible");
    cy.get("@avatarUrl").should("be.visible");
    cy.get("@avatarAlt").should("be.visible");
  });

  // NAME

  it("should get error whith invalid name", () => {
    cy.get("@name").type("Test User");
    cy.get("@submit").click();
    cy.get("#name-error").should("be.visible");
  });

  it("should not get error whith valid name", () => {
    cy.get("@name").type("Test");
    cy.get("@submit").click();
    cy.get("#name-error").should("not.exist");
  });

  // EMAIL

  it("should get error whith invalid email", () => {
    cy.get("@email").type("test");
    cy.get("@submit").click();
    cy.get("#email-error").should("be.visible");
  });

  it("should get error whith no email", () => {
    cy.get("@submit").click();
    cy.get("#email-error").should("be.visible");
  });

  it("should get error whith wrong email provider", () => {
    cy.get("@email").type("test@gmail.com");
    cy.get("@submit").click();
    cy.get("#email-error").should("be.visible");
  });

  it("should not have error with correct email", () => {
    cy.get("@email").type("test@stud.noroff.no");
    cy.get("@submit").click();
    cy.get("#email-error").should("not.exist");
  });

  // PASSWORD

  it("should get error whith invalid password", () => {
    cy.get("@password").type("test");
    cy.get("@submit").click();
    cy.get("#password-error").should("be.visible");
  });

  it("should get error whith no password", () => {
    cy.get("@submit").click();
    cy.get("#password-error").should("be.visible");
  });

  it("should not have error with correct password", () => {
    cy.get("@password").type("Asdasdasd");
    cy.get("@submit").click();
    cy.get("#password-error").should("not.exist");
  });

  // BIO
  it("should get error whith invalid bio", () => {
    cy.get("@bio").type(
      "Why are you looking at my tests >:((((( aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
      { delay: 0.1 }
    );
    cy.get("@submit").click();
    cy.get("#bio-error").should("be.visible");
  });

  it("should not have error with correct bio", () => {
    cy.get("@bio").type("Test bio");
    cy.get("@submit").click();
    cy.get("#bio-error").should("not.exist");
  });

  // BANNER

  it("should get error whith invalid banner url", () => {
    cy.get("@bannerUrl").type("test");
    cy.get("@submit").click();
    cy.get("#bannerUrl-error").should("be.visible");
  });

  it("should not get error whith no banner url", () => {
    cy.get("@submit").click();
    cy.get("#bannerUrl-error").should("not.exist");
  });

  it("should not get error with correct banner url", () => {
    cy.get("@bannerUrl").type("https://www.google.com");
    cy.get("@submit").click();
    cy.get("#bannerUrl-error").should("not.exist");
  });

  it("Should get error when alt text and no url", () => {
    cy.get("@bannerAlt").type("Test");
    cy.get("@submit").click();
    cy.get("#bannerAlt-error").should("be.visible");
  });

  // AVATAR

  it("should get error whith invalid avatar url", () => {
    cy.get("@avatarUrl").type("test");
    cy.get("@submit").click();
    cy.get("#avatarUrl-error").should("be.visible");
  });

  it("should not get error whith no avatar url", () => {
    cy.get("@submit").click();
    cy.get("#avatarUrl-error").should("not.exist");
  });

  it("should not have error with correct avatar url", () => {
    cy.get("@avatarUrl").type("https://www.google.com");
    cy.get("@submit").click();
    cy.get("#avatarUrl-error").should("not.exist");
  });

  it("Should get error when alt text and no url", () => {
    cy.get("@avatarAlt").type("Test");
    cy.get("@submit").click();
    cy.get("#avatarAlt-error").should("be.visible");
  });

  // SUBMIT

  it("should not submit form with errors", () => {
    cy.get("@submit").click();
    cy.get("form").should("be.visible");
  });

  // TODO: Change to check for page change and not local storage
  // TODO: These tests are gonna fail

  it("should submit when all fields are correct", () => {
    cy.get("@name").type("Test");
    cy.get("@email").type("mathias@stud.noroff.no");
    cy.get("@password").type("Asdasdasd");
    cy.get("@bio").type("Test bio");
    cy.get("@bannerUrl").type("https://www.google.com");
    cy.get("@bannerAlt").type("Test");
    cy.get("@avatarUrl").type("https://www.google.com");
    cy.get("@avatarAlt").type("Test");

    cy.get("@submit").click();
    cy.get("form").should(() => {
      expect(localStorage.getItem("success")).to.not.be.null;
      expect(localStorage.getItem("success")).to.eq("true");
    });

    cy.clearLocalStorage();
  });

  it("should submit when all fields except optionals are correct", () => {
    cy.get("@name").type("Test");
    cy.get("@email").type("mathias@stud.noroff.no");
    cy.get("@password").type("Asdasdasd");

    cy.get("@submit").click();
    cy.get("form").should(() => {
      expect(localStorage.getItem("success")).to.not.be.null;
      expect(localStorage.getItem("success")).to.eq("true");
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
