import Person from "./Person";
import {ChatId} from "@open-wa/wa-automate";
import {ContactId} from "@open-wa/wa-automate/dist/api/model/aliases";
import {TillZero} from "../Main";

export default class Group {
    readonly #groupID: ChatId;                              //The group's ID
    #filters: { [key: string]: string };                    //The filters in the group
    #tags: { [key: string]: string | ContactId[] };         //The tags in the group
    #groupLanguage: string;                                 //The group's language
    #personsIn: Person[];                                   //The persons in the group
    #filterCounter: TillZero<15>;                           //The number of filters used in the group (reset every five minutes) - for autobanning
    #groupAdmins: ContactId[];                              //The group's admins
    #functionPermissions: { [key: string]: 0 | 1 | 2 | 3 }; //The group's function's permission levels
    #cryptoChecked: boolean;                                //Whether the group has checked the crypto today (reset every day)
    #translationCounter: TillZero<10>;                      //The number of translations used in the group (reset every day)
    #autoBanned: Date;                                      //The date in which the group was autobanned (if it was)
    #tagStack: string[];                                    //Used for HT.createTagList() & HT.nextPersonInList
    #reminders: { [key: string]: string };              //The reminders the person has set
    #downloadMusicCounter: TillZero<5>;                     //The number of music downloads used in the group (reset every day)
    #stockCounter: TillZero<3>;                             //The number of stock checks used in the group (reset every day)

    constructor(groupID: ChatId) {
        this.#groupID = groupID;
        this.#filters = {};
        this.#tags = {};
        this.#groupLanguage = "he";
        this.#personsIn = [];
        this.#filterCounter = 0;
        this.#functionPermissions = {
            "filters": 1,
            "tags": 1,
            "handleOther": 1,
            "handleShows": 1,
            "handleFilters": 1,
            "handleTags": 1,
            "handleBirthdays": 1,
        };
        this.#groupAdmins = [];
        this.#cryptoChecked = false;
        this.#translationCounter = 0;
        this.#autoBanned = null;
        this.#tagStack = [];
        this.#reminders = {};
        this.#downloadMusicCounter = 0;
        this.#stockCounter = 0;
    }

    get groupID(): ChatId {
        return this.#groupID;
    }

    get filters(): { [key: string]: string } {
        return this.#filters;
    }

    set filters(filterArray) {
        if (filterArray[0] === "add")
            this.#filters[filterArray[1]] = filterArray[2];
        else if (filterArray[0] === "delete")
            delete this.#filters[filterArray[1]];
        else if (filterArray[0] === "edit")
            this.#filters[filterArray[1]] = filterArray[2];
    }

    get tags(): { [key: string]: string | ContactId[] } {
        return this.#tags;
    }

    set tags(tagArray) {
        if (tagArray[0] === "add") { // @ts-ignore
            this.#tags[tagArray[1]] = tagArray[2];
        } else if (tagArray[0] === "delete") { // @ts-ignore
            delete this.#tags[tagArray[1]];
        }
    }

    get personsIn(): Person[] {
        return this.#personsIn;
    }

    set personsIn(authorArray) {
        // @ts-ignore
        if (authorArray[0] === "add")
            this.#personsIn.push(authorArray[1]);
        else { // @ts-ignore
            if (authorArray[0] === "delete")
                this.#personsIn.splice(this.#personsIn.indexOf(authorArray[1]), 1);
        }
    }

    get groupLanguage(): string {
        return this.#groupLanguage;
    }

    set groupLanguage(langCode: string) {
        this.#groupLanguage = langCode;
    }

    get filterCounter(): TillZero<15> {
        return this.#filterCounter;
    }

    set filterCounter(number: TillZero<15>) {
        this.#filterCounter = number;
    }

    get groupAdmins(): ContactId[] {
        return this.#groupAdmins;
    }

    set groupAdmins(groupAdminsIDs: ContactId[]) {
        this.#groupAdmins = groupAdminsIDs;
    }

    get functionPermissions(): { [key: string]: 0 | 1 | 2 | 3 } {
        return this.#functionPermissions;
    }

    set functionPermissions(functionTypeAndPermission: { [key: string]: 0 | 1 | 2 | 3 }) {
        this.#functionPermissions[functionTypeAndPermission[0]] = functionTypeAndPermission[1];
    }

    get cryptoChecked(): boolean {
        return this.#cryptoChecked;
    }

    set cryptoChecked(yeaORnah: boolean) {
        this.#cryptoChecked = yeaORnah;
    }

    get translationCounter(): TillZero<10> {
        return this.#translationCounter;
    }

    set translationCounter(number: TillZero<10>) {
        this.#translationCounter = number;
    }

    get autoBanned(): Date {
        return this.#autoBanned;
    }

    set autoBanned(date: Date) {
        this.#autoBanned = date;
    }

    get tagStack(): string[] {
        return this.#tagStack;
    }

    set tagStack(tagStack: string[]) {
        this.#tagStack = tagStack;
    }

    get reminders(): { [key: string]: string } {
        return this.#reminders;
    }

    set reminders(reminderArray: { [key: string]: string }) {
        if (reminderArray[0] === "add")
            this.#reminders[reminderArray[1]] = reminderArray[2];
        else if (reminderArray[0] === "delete")
            delete this.#reminders[reminderArray[1]];
    }

    get downloadMusicCounter(): TillZero<5> {
        return this.#downloadMusicCounter;
    }

    set downloadMusicCounter(number: TillZero<5>) {
        this.#downloadMusicCounter = number;
    }

    get stockCounter(): TillZero<3> {
        return this.#stockCounter;
    }

    set stockCounter(number: TillZero<3>) {
        this.#stockCounter = number;
    }

    doesFilterExist(filter): boolean {
        return this.#filters.hasOwnProperty(filter);
    }

    doesTagExist(tag): boolean {
        return this.#tags.hasOwnProperty(tag);
    }

    doesReminderExist(date): boolean {
        return this.#reminders.hasOwnProperty(date);
    }

    addNumberToTagStack(tagNumber) {
        this.#tagStack.push(tagNumber);
    }

    resetCounters() {
        this.#cryptoChecked = false;
        this.#translationCounter = 0;
        this.#downloadMusicCounter = 0;
        this.#stockCounter = 0;
    }
}