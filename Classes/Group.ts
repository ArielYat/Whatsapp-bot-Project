// noinspection TypeScriptFieldCanBeMadeReadonly

import Person from "./Person";

export default class Group {
    readonly #groupID: string;                          //The group's ID
    #filters: { [key: string]: string };                //The filters in the group
    #tags: { [key: string]: object | string };          //The tags in the group
    #groupLanguage: string;                             //The group's language
    #personsIn: Person[];                               //The persons in the group
    #filterCounter: number;                             //The number of filters used in the group (reset every five minutes) - for autobanning
    #groupAdmins: string[];                             //The group's admins
    #functionPermissions: { [key: string]: number };    //The group's function's permission levels
    #cryptoChecked: boolean;                            //Whether the group has checked the crypto today (reset every day)
    #translationCounter: number;                        //The number of translations used in the group (reset every day)
    #autoBanned: Date;                                  //The date in which the group was autobanned (if it was)
    #tagStack: string[];                                //Used for HT.createTagList() & HT.nextPersonInList
    #downloadMusicCounter: number;                      //The number of music downloads used in the group (reset every day)
    #stockCounter: number;                              //The number of stock checks used in the group (reset every day)

    constructor(groupID) {
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
        this.#downloadMusicCounter = 0;
        this.#stockCounter = 0;
    }

    get groupID() {
        return this.#groupID;
    }

    get filters() {
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

    get tags() {
        return this.#tags;
    }

    set tags(tagArray) {
        if (tagArray[0] === "add") { // @ts-ignore
            this.#tags[tagArray[1]] = tagArray[2];
        } else if (tagArray[0] === "delete") { // @ts-ignore
            delete this.#tags[tagArray[1]];
        }
    }

    get personsIn() {
        return this.#personsIn;
    }

    set personsIn(authorArray) {
        // @ts-ignore
        if (authorArray[0] === "add")
            this.#personsIn.push(authorArray[1]); else { // @ts-ignore
            if (authorArray[0] === "delete")
                this.#personsIn.splice(this.#personsIn.indexOf(authorArray[1]), 1);
        }
    }

    get groupLanguage() {
        return this.#groupLanguage;
    }

    set groupLanguage(langCode) {
        this.#groupLanguage = langCode;
    }

    get filterCounter() {
        return this.#filterCounter;
    }

    set filterCounter(number) {
        this.#filterCounter = number;
    }

    get groupAdmins() {
        return this.#groupAdmins;
    }

    set groupAdmins(groupAdminsIDs) {
        this.#groupAdmins = groupAdminsIDs;
    }

    get functionPermissions() {
        return this.#functionPermissions;
    }

    set functionPermissions(functionTypeAndPermission) {
        this.#functionPermissions[functionTypeAndPermission[0]] = functionTypeAndPermission[1];
    }

    get cryptoChecked() {
        return this.#cryptoChecked;
    }

    set cryptoChecked(bool) {
        this.#cryptoChecked = bool;
    }

    get translationCounter() {
        return this.#translationCounter;
    }

    set translationCounter(number) {
        this.#translationCounter = number;
    }

    get autoBanned() {
        return this.#autoBanned;
    }

    set autoBanned(date) {
        this.#autoBanned = date;
    }

    get tagStack() {
        return this.#tagStack;
    }

    set tagStack(tagStack) {
        this.#tagStack = tagStack;
    }

    get downloadMusicCounter() {
        return this.#downloadMusicCounter;
    }

    set downloadMusicCounter(number) {
        this.#downloadMusicCounter = number;
    }

    get stockCounter() {
        return this.#stockCounter;
    }

    set stockCounter(number) {
        this.#stockCounter = number;
    }

    doesFilterExist(filter) {
        return this.#filters.hasOwnProperty(filter);
    }

    doesTagExist(tag) {
        return this.#tags.hasOwnProperty(tag);
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