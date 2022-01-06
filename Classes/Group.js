class group {
    #groupID;
    #filters;
    #tags;
    #groupLanguage;
    #personsIn;
    #filterCounter;
    #groupAdmins;
    #functionPermissions;
    #cryptoCheckedToday

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
            "handleImmediate": "1",
            "handleShows": "1",
            "handleFilters": "1",
            "handleTags": "1",
            "handleBirthdays": "1",
        };
        this.#groupAdmins = [];
        this.#cryptoCheckedToday = false;
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
            delete this.#personsIn[authorArray[1]];
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

    doesFilterExist(filter) {
        return this.#filters.hasOwnProperty(filter);
    }

    doesTagExist(tag) {
        return this.#tags.hasOwnProperty(tag);
    }
    get cryptoCheckedToday(){
        return this.#cryptoCheckedToday;
    }
    set cryptoCheckedToday(newValue){
        this.#cryptoCheckedToday = newValue;
    }
}

module.exports = group;