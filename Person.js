class Person {
    #personID;
    #birthday;
    #permissionLevel; //0 - everyone, 1 - group admin, 2 - group creator, 3 - bot dev
    #birthdayGroups;
    #commandCounter;

    constructor(personID) {
        this.#personID = personID;
        this.#permissionLevel = {};
        this.#birthday = [];
        this.#birthdayGroups = [];
        this.#commandCounter = 0;
    }

    get personID() {
        return this.#personID;
    }

    get permissionLevel() {
        return this.#permissionLevel;
    }

    set permissionLevel(perm) {
        this.#permissionLevel = perm;
    }

    get birthday() {
        return this.#birthday;
    }

    set birthday(birthdayArray) {
        if (birthdayArray[0] === "add")
            this.#birthday = [birthdayArray[1], birthdayArray[2], birthdayArray[3]];
        else if (birthdayArray[0] === "delete")
            this.#birthday = null;
    }

    get birthDayGroups() {
        return this.#birthdayGroups;
    }

    set birthDayGroups(birthdayGroupArray) {
        if (birthdayGroupArray[0] === "add")
            this.#birthdayGroups.push(birthdayGroupArray[1])
        else if (birthdayGroupArray[0] === "delete")
            this.#birthdayGroups.splice(this.#birthdayGroups.indexOf(birthdayGroupArray[1]), 1);
    }

    get commandCounter() {
        return this.#commandCounter;
    }

    set commandCounter(number) {
        this.#commandCounter = number;
    }

    doesBirthdayExist() {
        return !!this.#birthday;
    }

    addToCommandCounter() {
        this.#commandCounter++;
    }
}

module.exports = Person;