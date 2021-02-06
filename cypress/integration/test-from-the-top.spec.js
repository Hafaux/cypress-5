context('cypress task 5', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('should have an about area element with an "About" title', () => {
    cy.get('.about-area').then($el => {
      $el[0].scrollIntoView();
      cy.get('.about-area').contains('About');
    });
  });

  it('should have a thumbnail image with a width of 495px and height of 780px', () => {
    cy.get('.thumbnail > .w-100').then($thumbnail => {
      const width = $thumbnail[0].naturalWidth;
      const height = $thumbnail[0].naturalHeight;

      expect(width).to.equal(495);
      expect(height).to.equal(780);
    });
  });

  it('should have a contact button and clicking the name input should focus it', () => {
    cy.get('[data-cy=contact-btn]').click();
    cy.get('.rn-contact-area').then($el => {
      $el[0].scrollIntoView();
      cy.get('[name="name"]').then($input => {
        cy.get('[name="name"]').click().then($name => {
          expect($name).to.be.focused;
        });
      });
    });
  });
  
  it('should have a contact button and clicking another input field should blur the previous selected', () => {
    cy.get('[data-cy=contact-btn]').click();
    cy.get('.rn-contact-area').then($el => {
      $el[0].scrollIntoView();
      cy.get('[name="name"]').then($input => {
        cy.get('[name="name"]').click().then(() => {
          expect($input).to.be.focused;
          cy.get('[name="email"]').click().then(() => {
            expect($input).to.not.be.focused;
          });
        });
      });
    });
  });

  it('should have an error message after submitting the form', () => {
    cy.get('[data-cy=contact-btn]').click();
    cy.get('.rn-contact-area').then($el => {
      $el[0].scrollIntoView();
      cy.get('[name="name"]').type('Evlagbi');
      cy.get('[name="email"]').type('evlagbi@example.com');
      cy.get('[name="subject"]').type('how do i get a girlfriend');
      cy.get('textarea').type('please help me');
      cy.get('#contact-form-active > .rn-button-style--2').click();
      cy.get('.form-messege-active').contains('Oops! An error occurred and your message could not be sent.');
    });
  });
  
});