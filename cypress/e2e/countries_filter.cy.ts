describe('countries filter', () => {
  it('filters by country name', () => {
    cy.visit('http://localhost:5173');
    cy.get('input[type="text"]').type('Brazil');

    cy.get('.country-card')
    .should('exist')
    .should('be.visible')
    .should('have.length.greaterThan', 0)
    .should('include.text', 'Brazil');
  });

  it('filters by capital name', () => {
    cy.visit('http://localhost:5173');
    cy.get('input[type="text"]').type('Buenos Aires');

    cy.get('.country-card')
    .should('exist')
    .should('be.visible')
    .should('have.length.greaterThan', 0)
    .should('include.text', 'Argentina');
  });

  it('filters by language', () => {
    cy.visit('http://localhost:5173');

    cy.get('select').select('Portuguese');

    cy.get('.country-card')
      .should('exist')
      .should('be.visible')
      .should('have.length.greaterThan', 0)
      .should('include.text', 'Portuguese');
  });
})