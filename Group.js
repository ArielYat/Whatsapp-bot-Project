class group {
    #groupID;
    #filters;
    #tags;
    #birthdays;
    #filterCounter;
    #language;

    constructor(groupID) {
        this.#groupID = groupID;
        this.#filters = {};
        this.#tags = {};
        this.#birthdays = {};
        this.#filterCounter = 0;
        this.#language = "he";
    }

    addFilter(filter, filterReply) {
        if (!this.#filters.hasOwnProperty(filter)) {
            this.#filters[filter] = filterReply;
            return true;
        } else {
            return false;
        }
    }

    delFilter(filter) {
        if (this.#filters.hasOwnProperty(filter)) {
            delete this.#filters[filter];
            return true;
        } else {
            return false;
        }
    }

    addTag(name, phoneNumber) {
        if (!this.#tags.hasOwnProperty(name)) {
            this.#tags[name] = phoneNumber;
            return true;
        } else {
            return false;
        }
    }

    delTag(name) {
        if (this.#tags.hasOwnProperty(name)) {
            delete this.#tags[name];
            return true;
        } else {
            return false;
        }
    }

    addBirthday(name, birthDay, birthMonth, birthYear) {
        if (!this.#birthdays.hasOwnProperty(name)) {
            this.#birthdays[name] = [birthDay, birthMonth, birthYear];
            return true;
        } else {
            return false;
        }
    }

    delBirthday(name) {
        if (this.#birthdays.hasOwnProperty(name)) {
            delete this.#birthdays[name];
            return true;
        } else {
            return false;
        }
    }

    addToFilterCounter() {
        this.#filterCounter++;
    }

    filterCounterReset() {
        this.#filterCounter = 0;
    }

    set language(langCode) {
        this.#language = langCode;
    }

    get groupID() {
        return this.#groupID;
    }

    get filters() {
        return this.#filters;
    }

    get tags() {
        return this.#tags;
    }

    get birthdays() {
        return this.#birthdays;
    }

    get filterCounter() {
        return this.#filterCounter;
    }

    get language() {
        return this.#language;
    }
}

module.exports = group;