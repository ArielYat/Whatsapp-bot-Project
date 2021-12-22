class Person {
    #personID;
    #personName;
    #birthday;
    #permissionLevel; //0 - everyone, 1 - group admin, 2 - group creator, 3 - bot dev
    #groupsIn;
    #commandCounter;

    constructor(personID) {
        this.#personID = personID;
        this.#personName = "משה";
        this.#permissionLevel = {};
        this.#birthday = [];
        this.#groupsIn = [];
        this.#commandCounter = 0;
    }

    get personID() {
        return this.#personID;
    }

    get personName() {
        return this.#personName;
    }

    set personName(nameArray) {
        if (nameArray[0] === "push") {
            if (!this.#personName) {
                this.#personName = nameArray[1];
                return true;
            } else return false;
        } else if (nameArray[0] === "delete") {
            if (this.#personName) {
                delete this.#personName;
                return true;
            } else return false;
        }
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
        if (birthdayArray[0] === "push") {
            if (!this.#birthday) {
                this.#birthday = [birthdayArray[1], birthdayArray[2], birthdayArray[3]];
                return true;
            } else return false;
        } else if (birthdayArray[0] === "delete") {
            if (this.#birthday) {
                delete this.#birthday;
                return true;
            } else return false;
        }
    }

    get groupsIn() {
        return this.#groupsIn;
    }

    set groupsIn(chatIDArray) {
        if (chatIDArray[0] === "push")
            this.#groupsIn.push(chatIDArray[1]);
        else if (chatIDArray[0] === "delete")
            delete this.#groupsIn;
    }

    get commandCounter() {
        return this.#commandCounter;
    }

    set commandCounter(number) {
        this.#commandCounter = number;
    }

    addToCommandCounter() {
        this.#commandCounter++;
    }
}

module.exports = Person;