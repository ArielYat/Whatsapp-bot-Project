class group {
    private _groupID;
    private _filters;
    private _tags;
    private _groupLanguage;
    private _personsIn;
    private _filterCounter;

    constructor(groupID) {
        this._groupID = groupID;
        this._filters = {};
        this._tags = {};
        this._groupLanguage = "he";
        this._personsIn = [];
        this._filterCounter = 0;
    }

    public get groupID() {
        return this._groupID;
    }

    get filters() {
        return this._filters;
    }

    set filters(filterArray) {
        if (filterArray[0] === "add")
            this._filters[filterArray[1]] = filterArray[2];
        else if (filterArray[0] === "delete")
            delete this._filters[filterArray[1]];
        else if (filterArray[0] === "edit")
            this._filters[filterArray[1]] = filterArray[2];
    }

    get tags() {
        return this._tags;
    }

    set tags(tagArray) {
        if (tagArray[0] === "add")
            this._tags[tagArray[1]] = tagArray[2];
        else if (tagArray[0] === "delete")
            delete this._tags[tagArray[1]];
    }

    get personsIn() {
        return this._personsIn;
    }

    set personsIn(authorArray) {
        if (authorArray[0] === "push")
            this._personsIn.push(authorArray[1]);
        else if (authorArray[0] === "delete")
            delete this._personsIn[authorArray[1]];
    }

    get groupLanguage() {
        return this._groupLanguage;
    }

    set groupLanguage(langCode) {
        this._groupLanguage = langCode;
    }

    get filterCounter() {
        return this._filterCounter;
    }

    set filterCounter(number) {
        this._filterCounter = number;
    }

    doesFilterExist(filter) {
        return this._filters.hasOwnProperty(filter);
    }

    doesTagExist(tag) {
        return this._tags.hasOwnProperty(tag);
    }

    addToFilterCounter() {
        this._filterCounter++;
    }
}

module.exports = group;
