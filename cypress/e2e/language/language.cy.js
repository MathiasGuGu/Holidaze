describe("Language Selection", () => {
  beforeEach(() => {
    cy.visit("http://localhost:5173/");
    cy.viewport("macbook-15");

    cy.get("#language-selector").as("language");
    cy.get("#nav-Home").as("home");
  });
  it("should display the language selection options", () => {
    cy.get("@language").should("be.visible");

    cy.get("@language").click();

    cy.get("#language-en").should("be.visible");
    cy.get("#language-es").should("be.visible");
    cy.get("#language-no").should("be.visible");
  });

  it("Should change language on selection", () => {
    cy.get("@language").click();

    cy.get("#language-es").click();

    cy.get("@home").should("contain", "Inicio");

    cy.get("@language").click();

    cy.get("#language-en").click();

    cy.get("@home").should("contain", "Home");

    cy.get("@language").click();

    cy.get("#language-no").click();

    cy.get("@home").should("contain", "Hjem");
  });
});
