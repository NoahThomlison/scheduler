describe("Appointments", () => {

  beforeEach (() => {
    // Resets the database
    cy.request("GET", "/api/debug/reset")
    
    // Visits the root of our web server
    cy.visit("/");

    // Waits for data to load
    cy.contains("[data-testid=day]", "Monday")
  })

  it("should book of an interview", () => {
    // Clicks on the "Add" button in the second appointment
    // Enters their name
    // Chooses an interviewer
    // Clicks the save button
    // Sees the booked appointment
    cy.get("[alt=Add]").first().click()
    cy.get("[data-testid=student-name-input]").type("Lydia Miller-Jones")
    cy.get("[alt='Sylvia Palmer']").click()
    cy.contains("Save").click()
    cy.contains(".appointment__card--show", "Lydia Miller-Jones");
    cy.contains(".appointment__card--show", "Sylvia Palmer");  
  })
    
  it("should edit of an interview", () => {
    // Changes the name and interviewer
    // Clicks the save button
    // Sees the edit to the appointment
    cy.get("[alt='Edit']").click({ force: true })
    cy.get("[data-testid=student-name-input]").clear().type("Lydia Miller-Jones")
    cy.get("[alt='Tori Malcolm']").click()
    cy.contains("Save").click()
    cy.contains(".appointment__card--show", "Lydia Miller-Jones");
    cy.contains(".appointment__card--show", "Tori Malcolm");  
  })
    
  it("should book of an interview", () => {
    // Clicks the delete button for the existing appointment
    // Clicks the confirm button
    // Sees that the appointment slot is empty
    cy.get("[alt='Delete']").click({ force: true })
    cy.contains("Confirm").click()
    cy.contains("Deleting").should("exist");
    cy.contains("Deleting").should("not.exist");
    cy.contains(".appointment__card--show", "Archie Cohen")
      .should("not.exist");  })
});