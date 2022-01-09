describe('Blog app', function() {
    beforeEach(function() {
      cy.request('POST', 'http://localhost:3003/api/testing/reset')

      const user = {
        username: "Testuser2",
        name: "testi mies",
        password: "salainen"
      }
      cy.request('POST', 'http://localhost:3003/api/users', user)

      cy.visit('http://localhost:3000')
    })
  
    it('Login form is shown', function() {
        cy.contains('login')
      })


    it('Try logging in with incorrect credentials', function() {
      cy.get('#username').type('moi')
      cy.get('#password').type('moi')
      cy.get('#login-button').click()

      cy.contains('wrong username or password')

    })


    it('Try logging in with CORRECT credentials', function() {
      cy.get('#username').type('Testuser2')
      cy.get('#password').type('salainen')
      cy.get('#login-button').click()

      cy.contains("logged in")

    })

    describe('When logged in', function() {

      beforeEach(function() {
        cy.get('#username').type('Testuser2')
        cy.get('#password').type('salainen')
        cy.get('#login-button').click()
      })
  
      it('A blog can be created', function() {
        cy.contains('Create New Blog').click()
        cy.get('#title').type('test blog')
        cy.get('#author').type('test author')
        cy.get('#url').type('test url')

        cy.get('#create-new-button').click()

        cy.contains('test blog')
        cy.contains('added')

      })

    })

  describe('When logged in and blog created', function() {

    beforeEach(function() {
      cy.get('#username').type('Testuser2')
      cy.get('#password').type('salainen')
      cy.get('#login-button').click()

      cy.contains('Create New Blog').click()
      cy.get('#title').type('test')
      cy.get('#author').type('test')
      cy.get('#url').type('test')

      cy.get('#create-new-button').click()
    })

    it('A blog can liked', function() {
      cy.contains('view').click()
      cy.contains('like').click()
      cy.contains('Likes: 1')

      })

    })
  
})

