const wa = require('@open-wa/wa-automate');

class group {
    #groupID;
    #filterCounter = 0;
    #filters;
    #tags;
    constructor(groupID) {
        this.#groupID = groupID;
        this.#filters = {};
        this.#tags = {};
    }
    addFilters(filter, filter_reply) {
        if (!this.#filters.hasOwnProperty(filter)) {
            this.#filters[filter] = filter_reply;
            return true;
        }
        else {
            return false;
        }
    }
    addToFilterCounter() {
        this.#filterCounter++;
    }
    delFilters(filter) {
        if (this.#filters.hasOwnProperty(filter)) {
            delete this.#filters[filter];
            return true;
        }
        else {
            return false;
        }
    }
    delTags(tag) {
        if (this.#tags.hasOwnProperty(tag)) {
            delete this.#tags[tag];
            return true;
        }
        else {
            return false;
        }
    }
    addTags(tag, phoneNumber) {
        if (!this.#tags.hasOwnProperty(tag)) {
            this.#tags[tag] = phoneNumber;
            return true;
        }
        else {
            return false;
        }
    }
    filterCounterRest() {
        this.#filterCounter = 0;
    }
    get filters() {
        return this.#filters;
    }
    get tags() {
        return this.#tags;
    }
    get filterCounter() {
        return this.#filterCounter;
    }
}

module.exports = group;
