it("only shows a modal on first visit", () => {
  cy.visit("http://localhost:3000/");
  cy.get('i[aria-hidden="true"].user.outline.icon').click();

  cy.get('input[name="identifier"]').type("usuario");
  cy.get('input[name="password"]').type("123456");
  cy.get('button[type="submit"]').click();

  cy.get('i[aria-hidden="true"].user.outline.icon').click();

  cy.get("a.item").contains("Lista de deseos").click();
  cy.wait(1000);
  cy.get("a.item").contains("Direcciones").click();
});
