const { Given, When, Then } = require('@cucumber/cucumber');
const { faker } = require('@faker-js/faker');

Given('The user is on the users page', async function() {
    await this.usersPage.goto();
})

When('The user clicks to create workout', async function (){
    const user = await this.usersPage.createUser();
    process.env.USER_EMAIL = user.email;
    process.env.USER_ID = user._id;
    process.env.WORKOUT_NAME = await faker.lorem.word();
    await this.usersPage.createWorkoutClick(user.email);
})

When('The user fills the form', async function (){
    const workoutName = process.env.WORKOUT_NAME;
    await this.usersPage.fillFormWorkout(workoutName ,'Voador', '12', '3', '8');
})

When('The user submits the form', async function(){
    await this.usersPage.submitFormWorkout();
})

When('The user goes to users page by navBar', async function (){
    await this.homePage.goToUsersNavBar();
})

When('The user goes to users page by card', async function (){
    await this.homePage.goToUsers();
})

Then('The user should see a user and his features', async function () {
    await this.usersPage.userVerify();
});

Then('Workout should be visible', async function(){
    await this.usersPage.workoutVerify(process.env.USER_EMAIL);
    await this.usersPage.deleteWorkout(process.env.USER_ID);
})
