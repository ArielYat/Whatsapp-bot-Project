class Person {
    private _personID;
    private _personName;
    private _birthday;
    private _permissionLevel; //0 - everyone, 1 - group admin, 2 - group creator, 3 - bot dev
    private _birthdayGroups;
    private _commandCounter;

    constructor(personID) {
        this._personID = personID;
        this._personName = "משה";
        this._permissionLevel = {};
        this._birthday = [];
        this._birthdayGroups = [];
        this._commandCounter = 0;
    }

    get personID() {
        return this._personID;
    }

    get personName() {
        return this._personName;
    }

    set personName(nameArray) {
        if (nameArray[0] === "push")
            this._personName = nameArray[1];
        else if (nameArray[0] === "delete")
            delete this._personName;
    }

    get permissionLevel() {
        return this._permissionLevel;
    }

    set permissionLevel(perm) {
        this._permissionLevel = perm;
    }

    get birthday() {
        return this._birthday;
    }

    set birthday(birthdayArray) {
        if (birthdayArray[0] === "push")
            this._birthday = [birthdayArray[1], birthdayArray[2], birthdayArray[3]];
        else if (birthdayArray[0] === "delete")
            delete this._birthday;
    }

    get birthDayGroups() {
        return this._birthdayGroups;
    }

    set birthDayGroups(birthdayGroupArray) {
        if (birthdayGroupArray[0] === "add")
            this._birthdayGroups.push(birthdayGroupArray[1])
        else if (birthdayGroupArray[0] === "delete")
            this._birthdayGroups.splice(this._birthdayGroups.indexOf(birthdayGroupArray[1]), 1);
    }

    get commandCounter() {
        return this._commandCounter;
    }

    set commandCounter(number) {
        this._commandCounter = number;
    }

    doesBirthdayExist() {
        return !!this._birthday;
    }

    addToCommandCounter() {
        this._commandCounter++;
    }
}

module.exports = Person;