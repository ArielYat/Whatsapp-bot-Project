class group {
    #groupID;
    #filters;
    #tags;
    #birthdays;
    #filterCounter = 0;
    #language;

    constructor(groupID) {
        this.#groupID = groupID;
        this.#filters = {};
        this.#tags = {};
        this.#birthdays = {}
        this.#language = "he";
    }

    addFilter(filter, filter_reply) {
        if (!this.#filters.hasOwnProperty(filter)) {
            this.#filters[filter] = filter_reply;
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

    addTag(tag, phoneNumber) {
        if (!this.#tags.hasOwnProperty(tag)) {
            this.#tags[tag] = phoneNumber;
            return true;
        } else {
            return false;
        }
    }

    delTag(tag) {
        if (this.#tags.hasOwnProperty(tag)) {
            delete this.#tags[tag];
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

    delBirthday(tag) {
        if (this.#birthdays.hasOwnProperty(tag)) {
            delete this.#birthdays[tag];
            return true;
        } else {
            return false;
        }
    }

    addToFilterCounter() {
        this.#filterCounter++;
    }

    filterCounterRest() {
        this.#filterCounter = 0;
    }

    changeLang(langCode) {
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