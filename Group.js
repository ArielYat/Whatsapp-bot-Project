class group {
    #groupID;
    #filters;
    #tags;
    #groupLanguage;
    #personsIn;
    #filterCounter;
    #permissionFunctions;
    #adminsOfTheGroups;

    constructor(groupID) {
        this.#groupID = groupID;
        this.#filters = {};
        this.#tags = {};
        this.#adminsOfTheGroups = [];
        this.#groupLanguage = "he";
        this.#personsIn = [];
        this.#filterCounter = 0;
        this.#permissionFunctions =
            {
                "filters" : 1,
                "handleFilters" : 1,
                "handleBirthdays" : 1,
                "tags" : 1,
                "handleTags" : 1,
                "handleOthers" : 1,
            };
    }
    get permissionFunctions(){
        return this.#permissionFunctions;
    }
    SetPermissionFunction(funcToChange, newPerm){
        this.#permissionFunctions[funcToChange] = newPerm;
    }
    get adminsOfTheGroups(){
        return this.#adminsOfTheGroups;
    }
    set adminsOfTheGroups(adminsOfTheGroups){
        this.#adminsOfTheGroups = adminsOfTheGroups;
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
        if (authorArray[0] === "push")
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

    doesFilterExist(filter) {
        return this.#filters.hasOwnProperty(filter);
    }

    doesTagExist(tag) {
        return this.#tags.hasOwnProperty(tag);
    }

    addToFilterCounter() {
        this.#filterCounter++;
    }
}

module.exports = group;
