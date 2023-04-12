import Group from "./Group";
import {ChatId} from "@open-wa/wa-automate";
import {ContactId, MessageId} from "@open-wa/wa-automate/dist/api/model/aliases";
import {TillZero} from "../Main";

export default class Person {
    readonly #personID: ContactId;                      //The person's ID
    #birthday: string[];                                //The person's birthday - [day, month, year]
    #permissionLevel: { [key: ChatId]: 0 | 1 | 2 | 3 }; //The person's permission level by group (0 - muted, 1 - regular, 2 - group admin, 3 - bot dev)
    #birthdayGroups: Group[];                           //The groups in which to announce happy birthday
    #commandCounter: TillZero<15>;                      //The number of commands the person has used (reset every five minutes) - for autobanning
    #messagesTaggedIn: { [key: ChatId]: MessageId[] };  //The messages the person has been tagged in by chatID
    #autoBanned: Date;                                  //The date in which the person was autobanned (if it was)
    #afk: Date;                                         //The date in which the person went AFK (if they are AFK)
    #voiceTranscriptCounter: TillZero<2>;               //The number of voice transcripts the person requested (reset every day)

    constructor(personID: ContactId) {
        this.#personID = personID;
        this.#permissionLevel = {};
        this.#birthday = [];
        this.#birthdayGroups = [];
        this.#commandCounter = 0;
        this.#voiceTranscriptCounter = 0;
        this.#messagesTaggedIn = {};
        this.#autoBanned = null;
        this.#afk = null;
    }

    get personID(): ContactId {
        return this.#personID;
    }

    get permissionLevel(): { [key: ChatId]: 0 | 1 | 2 | 3 } {
        return this.#permissionLevel;
    }

    set permissionLevel(perm: { [key: ChatId]: 0 | 1 | 2 | 3 }) {
        this.#permissionLevel = perm;
    }

    get birthday(): string[] {
        return this.#birthday;
    }

    set birthday(birthdayArray: string[]) {
        if (birthdayArray[0] === "add")
            this.#birthday = [birthdayArray[1], birthdayArray[2], birthdayArray[3]];
        else if (birthdayArray[0] === "delete")
            this.#birthday = [];
    }

    get birthDayGroups(): Group[] {
        return this.#birthdayGroups;
    }

    set birthDayGroups(birthdayGroupArray: Group[]) {
        // @ts-ignore
        if (birthdayGroupArray[0] === "add")
            this.#birthdayGroups.push(birthdayGroupArray[1]); // @ts-ignore
        else if (birthdayGroupArray[0] === "delete")
            this.#birthdayGroups.splice(this.#birthdayGroups.indexOf(birthdayGroupArray[1]), 1);
    }

    get commandCounter(): TillZero<15> {
        return this.#commandCounter;
    }

    set commandCounter(number: TillZero<15>) {
        this.#commandCounter = number;
    }

    get messagesTaggedIn(): { [key: ChatId]: MessageId[] } {
        return this.#messagesTaggedIn;
    }

    set messagesTaggedIn(number: { [key: ChatId]: MessageId[] }) {
        this.#messagesTaggedIn = number;
    }

    get autoBanned(): Date {
        return this.#autoBanned;
    }

    set autoBanned(date: Date) {
        this.#autoBanned = date;
    }

    get afk(): Date {
        return this.#afk;
    }

    set afk(date: Date) {
        this.#afk = date;
    }

    get voiceTranscriptCounter(): TillZero<2> {
        return this.#voiceTranscriptCounter;
    }

    set voiceTranscriptCounter(number: TillZero<2>) {
        this.#voiceTranscriptCounter = number;
    }

    resetCounters() {
        this.#voiceTranscriptCounter = 0;
    }
}