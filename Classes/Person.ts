// noinspection TypeScriptFieldCanBeMadeReadonly

import Group from "./Group";

export default class Person {
    readonly #personID: string;                         //The person's ID
    #birthday: string[];                                //The person's birthday - [day, month, year]
    #permissionLevel: {};                               //The person's permission level by group (0 - muted, 1 - regular, 2 - group admin, 3 - bot dev)
    #birthdayGroups: Group[];                           //The groups in which to announce happy birthday
    #commandCounter: number;                            //The number of commands the person has used (reset every five minutes) - for autobanning
    #messagesTaggedIn: { [key: string]: string[] };     //The messages the person has been tagged in by chatID
    #autoBanned: Date;                                  //The date in which the person was autobanned (if it was)
    #reminders: { [key: string]: string };              //The reminders the person has set
    #afk: Date;                                         //The date in which the person went AFK (if they are AFK)

    constructor(personID) {
        this.#personID = personID;
        this.#permissionLevel = {};
        this.#birthday = [];
        this.#birthdayGroups = [];
        this.#commandCounter = 0;
        this.#messagesTaggedIn = {};
        this.#autoBanned = null;
        this.#reminders = {};
        this.#afk = null;
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
            this.#birthday = [];
    }

    get birthDayGroups() {
        return this.#birthdayGroups;
    }

    set birthDayGroups(birthdayGroupArray) {
        // @ts-ignore
        if (birthdayGroupArray[0] === "add")
            this.#birthdayGroups.push(birthdayGroupArray[1]); // @ts-ignore
        else if (birthdayGroupArray[0] === "delete")
            this.#birthdayGroups.splice(this.#birthdayGroups.indexOf(birthdayGroupArray[1]), 1);
    }

    get commandCounter() {
        return this.#commandCounter;
    }

    set commandCounter(number) {
        this.#commandCounter = number;
    }

    get messagesTaggedIn() {
        return this.#messagesTaggedIn;
    }

    set messagesTaggedIn(number) {
        this.#messagesTaggedIn = number;
    }

    get autoBanned() {
        return this.#autoBanned;
    }

    set autoBanned(date) {
        this.#autoBanned = date;
    }

    get reminders() {
        return this.#reminders;
    }

    set reminders(reminderArray) {
        if (reminderArray[0] === "add")
            this.#reminders[reminderArray[1]] = reminderArray[2];
        else if (reminderArray[0] === "delete")
            delete this.#reminders[reminderArray[1]];
    }

    get afk() {
        return this.#afk;
    }

    set afk(date) {
        this.#afk = date;
    }

    doesReminderExist(date) {
        return this.#reminders.hasOwnProperty(date);
    }
}