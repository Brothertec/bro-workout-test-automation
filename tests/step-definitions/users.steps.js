const { Given, When, Then } = require('@cucumber/cucumber');
const { faker } = require('@faker-js/faker');

Given('The user is on the users page', async function() {
    await this.usersPage.goto();
})

Given('The user is created', async function() {
    const user = await this.usersPage.createUser();
    process.env.USER_NAME = user.nome;
    process.env.USER_EMAIL = user.email;
    process.env.USER_ID = user._id;
    process.env.WORKOUT_NAME = await faker.lorem.word();
})

When('The user creates a new workout', async function (){
    const workoutName = process.env.WORKOUT_NAME;
    await this.usersPage.createWorkoutClick(process.env.USER_EMAIL);
    await this.usersPage.fillFormWorkout(workoutName ,'Voador', '12', '3', '8');
    await this.usersPage.submitFormWorkout();
})

Then('The user is visible on the grid', async function () {
    await this.usersPage.userVerify(process.env.USER_NAME, process.env.USER_EMAIL, process.env.USER_ID);
});

Then('The created workout should be visible', async function(){
    await this.page.pause();
    await this.usersPage.workoutVerify(process.env.USER_EMAIL);
    await this.usersPage.deleteWorkout(process.env.USER_ID);
})
