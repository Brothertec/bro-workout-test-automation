const { Given, When, Then } = require('@cucumber/cucumber');
const { faker } = require('@faker-js/faker');

Given('The user is on the users page', async function () {
    await this.usersPage.goto();
});

When('The user submits the form without filling in the {string} field', async function (field) {
    await this.usersPage.openUserCreationForm();
    await this.usersPage.fillUserFormWithout(field);
    await this.usersPage.submitUserCreationForm();
},
);

Given('The user is created', async function () {
    const user = await this.usersPage.createUser();
    process.env.USER_NAME = user.nome;
    process.env.USER_EMAIL = user.email;
    process.env.USER_ID = user._id;
    process.env.WORKOUT_NAME = await faker.lorem.word();
});

When('The user creates a new workout', async function () {
    const workoutName = process.env.WORKOUT_NAME;
    await this.usersPage.createWorkoutClick(process.env.USER_EMAIL);
    await this.usersPage.fillFormWorkout(workoutName, 'Voador', '12', '3', '8');
    await this.usersPage.submitFormWorkout();
});

Then('The user is visible on the grid', async function () {
    await this.usersPage.userVerify(process.env.USER_NAME, process.env.USER_EMAIL, process.env.USER_ID);
});

Then('The Warning message is displayed correctly on {string}', async function (field) {
    const fieldNames = {
        name: 'Nome',
        email: 'Email',
        password: 'Senha',
    };

    if (!Object.prototype.hasOwnProperty.call(fieldNames, field)) {
        throw new Error(`Unsupported field: ${field}`);
    }

    const message =
        `O campo ${fieldNames[field]} é de preenchimento obrigatório`;

    await this.usersPage.requiredMessageShouldBeVisibleBelowField(
        field,
        message,
    );
},
);

Then('The created workout should be visible', async function () {
    await this.usersPage.workoutVerify(process.env.USER_EMAIL);
});

Then('The created workout is deleted', async function(){
    await this.usersPage.deleteWorkout(process.env.USER_ID);
});

When('The user click on {string} button on column {string}', async function (buttonName, columnName) {
    process.env.BUTTON_NAME = buttonName;
    process.env.COLUMN_NAME = columnName;
    await this.usersPage.getColumnGrid(columnName);
    await this.usersPage.clickThreeDotsButton(columnName);
    if (buttonName === 'Unsort') {
        await this.usersPage.buttonClickByText('Sort By ASC');
        await this.usersPage.clickThreeDotsButton(columnName);
        await this.usersPage.buttonClickByText('Unsort');
        return;
    }
    await this.usersPage.buttonClickByText(buttonName);
    
});

Then('The users in the grid are displayed in the new order', async function () {
    await this.usersPage.verifySortGridCell(this.buttonName, this.columnName, this.buttonSort);
});

When('The user click on {string} button sort on column {string}', async function (buttonSort, columnName) {
    this.buttonSort = buttonSort;
    this.columnName = columnName;
    await this.usersPage.getColumnGrid(columnName);
    await this.usersPage.clickOnButtonSort(columnName, buttonSort);
    
});
