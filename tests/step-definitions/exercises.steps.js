const { When, Then } = require('@cucumber/cucumber');

When('The user clicks on the button {string}', async function(buttonText) {
    await this.exercisesPage.buttonClickByText(buttonText);
})

Then('The user should see a failure warning', async function () {
   await this.exercisesPage.warningFailVerify();
});