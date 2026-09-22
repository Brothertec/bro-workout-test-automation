const { faker } = require('@faker-js/faker');

exports.FakerUtils = class FakerUtils {
  /**
   * Generate a random string
   * @param length - the length of the string to generate
   * @returns the random string
   */
  generateRandomString(length) {
    return faker.internet.password({ length: length, memorable: false, pattern: /[0-9A-Z]/ });
  }
  /**
   * Generate a random number with exactly `length` digits (first digit 1-9).
   * @param length - the length of the number to generate
   * @returns the random number
   */
  generateRandomNumber(length) {
    return faker.number.int({
      min: 10 ** (length - 1),
      max: 10 ** length - 1,
    });
  }

   /**
   * Generate a random phone number
   * @returns the random phone number
   */
   generateRandomPhoneNumber() {
    return faker.phone.number();
  }

  /**
   * Generate a random words
   * @param length - the length of the words to generate
   * @returns the random words
   */
  generateRandomWords(length) {
    return faker.lorem.words(length);
  }

   /**
   * Generate a random first name
   * @returns the random first name
   */
   generateRandomFirstName() {
    return faker.person.firstName();
  }

  /**
   * Generate a random full name
   * @returns the random full name
   */
  generateRandomFullName() {
    return faker.person.fullName();
  }

    /**
   * Generate a random last name
   * @returns the random last name
   */
    generateRandomLastName() {
        return faker.person.lastName();
      }

    /**
   * Generate a random email
   * @param firstName - the first name to generate the email for
   * @param lastName - the last name to generate the email for
   * @returns the random email
   */
  generateRandomEmail(firstName, lastName) {
    return faker.internet.email({
      firstName,
      lastName,
      provider: 'testbro.com',
      allowSpecialCharacters: false,
    });
  }
};