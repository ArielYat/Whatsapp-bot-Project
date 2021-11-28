const wa = require('@open-wa/wa-automate');

class group {
    #groupID;
    #filters;
    #tags;
    #birthdays;
    #filterCounter = 0;

    constructor(groupID) {
        this.#groupID = groupID;
        this.#filters = {};
        this.#tags = {};
        this.#birthdays = {};
        this.#birthmonths = {};
    }
    addFilter(filter, filter_reply) {
        if (!this.#filters.hasOwnProperty(filter)) {
            this.#filters[filter] = filter_reply;
            return true;
        }
        else {
            return false;
        }
    }
    delFilter(filter) {
        if (this.#filters.hasOwnProperty(filter)) {
            delete this.#filters[filter];
            return true;
        }
        else {
            return false;
        }
    }
    addTag(tag, phoneNumber) {
        if (!this.#tags.hasOwnProperty(tag)) {
            this.#tags[tag] = phoneNumber;
            return true;
        }
        else {
            return false;
        }
    }
    delTag(tag) {
        if (this.#tags.hasOwnProperty(tag)) {
            delete this.#tags[tag];
            return true;
        }
        else {
            return false;
        }
    }
    addBirthday(tag, birthday, birthmonth) {
        if (!this.#birthdays.hasOwnProperty(tag)) {
            this.#birthdays[tag] = birthday;
            this.#birthmonths[tag] = birthmonth;
            return true;
        }
        else {
            return false;
        }
    }
    delBirthday(tag) {
        if (this.#birthdays.hasOwnProperty(tag)) {
            delete this.#birthdays[tag];
            delete this.#birthmonths[tag];
            return true;
        }
        else {
            return false;
        }
    }
    addToFilterCounter() {
        this.#filterCounter++;
    }
    filterCounterRest() {
        this.#filterCounter = 0;
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
}

module.exports = group;