export class Group {
    #groupID;
    #filters;
    #tags;
    #groupLanguage;
    #personsIn;
    #filterCounter;
    #groupAdmins;
    #functionPermissions;
    #cryptoCheckedToday;
    #translationCounter;
    #autoBanned
    #tagStack;
    #downloadMusicCounter;
    #stockCounter;

    constructor(groupID) {
        this.#groupID = groupID;
        this.#filters = {};
        this.#tags = {};
        this.#groupLanguage = "he";
        this.#personsIn = [];
        this.#filterCounter = 0;
        this.#functionPermissions = {
            "filters": "1",
            "tags": "1",
            "handleOther": "1",
            "handleShows": "1",
            "handleFilters": "1",
            "handleTags": "1",
            "handleBirthdays": "1",
        };
        this.#groupAdmins = [];
        this.#cryptoCheckedToday = false;
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
        if (tagArray[0] === "add")
            this.#tags[tagArray[1]] = tagArray[2];
        else if (tagArray[0] === "delete")
            delete this.#tags[tagArray[1]];
    }

    get personsIn() {
        return this.#personsIn;
    }

    set personsIn(authorArray) {
        if (authorArray[0] === "add")
            this.#personsIn.push(authorArray[1]);
        else if (authorArray[0] === "delete")
            this.#personsIn.splice(this.#personsIn.indexOf(authorArray[1]), 1);
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

    set groupAdmins(groupAdmins) {
        this.#groupAdmins = groupAdmins;
    }

    get functionPermissions() {
        return this.#functionPermissions;
    }

    set functionPermissions(permissionsArray) {
        this.#functionPermissions[permissionsArray[0]] = permissionsArray[1];
    }

    get cryptoCheckedToday() {
        return this.#cryptoCheckedToday;
    }

    set cryptoCheckedToday(bool) {
        this.#cryptoCheckedToday = bool;
    }

    get translationCounter() {
        return this.#translationCounter;
    }

    set translationCounter(number) {
        this.#translationCounter = number;
    }

    doesFilterExist(filter) {
        return this.#filters.hasOwnProperty(filter);
    }

    doesTagExist(tag) {
        return this.#tags.hasOwnProperty(tag);
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

    addNumberToTagStack(tagNumber) {
        this.#tagStack.push(tagNumber);
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

    //a function which resets the group's counters; called everyday at midnight
    resetCounters() {
        this.#cryptoCheckedToday = false;
        this.#translationCounter = 0;
        this.#downloadMusicCounter = 0;
        this.#stockCounter = 0;
    }
}