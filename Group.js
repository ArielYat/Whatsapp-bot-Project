class group {
    #groupID;
    #filters;
    #tags;
    #groupLanguage;
    #personsIn;
    #filterCounter;

    constructor(groupID) {
        this.#groupID = groupID;
        this.#filters = {};
        this.#tags = {};
        this.#groupLanguage = "he";
        this.#personsIn = [];
        this.#filterCounter = 0;
    }

    get groupID() {
        return this.#groupID;
    }

    get filters() {
        return this.#filters;
    }

    set filters(filterArray) {
        if (filterArray[0] === "add") {
            if (!this.#filters.hasOwnProperty(filterArray)) {
                this.#filters[filterArray[1]] = filterArray[2];
                return true;
            } else return false;
        } else if (filterArray[0] === "delete") {
            if (this.#filters.hasOwnProperty(filterArray)) {
                delete this.#filters[filterArray[1]];
                return true;
            } else return false;
        } else if (filterArray[0] === "edit") {
            if (this.#filters.hasOwnProperty(filterArray) && this.filters[1] !== filterArray[2]) {
                this.#filters[filterArray[1]] = filterArray[2];
                return true;
            } else return false;
        }
    }

    get tags() {
        return this.#tags;
    }

    set tags(tagArray) {
        if (tagArray[0] === "add") {
            if (!this.#tags.hasOwnProperty(tagArray[1])) {
                this.#tags[tagArray[1]] = tagArray[2];
                return true;
            } else return false;
        } else if (tagArray[0] === "delete") {
            if (this.#tags.hasOwnProperty(tagArray[1])) {
                delete this.#tags[tagArray[1]];
                return true;
            } else return false;
        }
    }

    get personsIn() {
        return this.#personsIn;
    }

    set personsIn(authorArray) {
        if (authorArray[0] === "push")
            this.#personsIn.push(authorArray[1]);
        else if (authorArray[0] === "delete")
            delete this.#personsIn;
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

    addToFilterCounter() {
        this.#filterCounter++;
    }
}

module.exports = group;