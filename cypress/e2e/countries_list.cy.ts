describe('countries list', () => {
  it('visits, sees title and countries div', () => {
    cy.visit('http://localhost:5173');

    cy.contains('h2', '🌎 Countries List by Angelo Maia 🌎');
    cy.get('input[type="text"]')
    .should('exist')
    .and('be.visible')
    .and('have.attr', 'placeholder', 'Search by country name or capital...');
    cy.get('.country-card')
    .should('exist')
    .should('be.visible')
    .should('have.length.greaterThan', 0);
  })
})