const wa = require('@open-wa/wa-automate');
class group{
    #groupID;
    #filters;
    #tags;
    constructor(groupID) {
        this.#groupID = groupID;
        this.#filters = {};
        this.#tags = {};
    }

    addFilters(filter, filter_reply){
        if(!this.#filters.hasOwnProperty(filter)){
            this.#filters[filter]  = filter_reply;
            return true;
        }
        else{
            return false;
        }
    }

    delFilters(filter){
        if(this.#filters.hasOwnProperty(filter)){
            delete this.#filters[filter];
            return true;
        }
        else{
            return false;
        }
    }

    delTags(tag){
        if(this.#tags.hasOwnProperty(tag)){
            delete this.#tags[tag];
            return true;
        }
        else{
            return false;
        }
    }

    addTags(tag, phoneNumber){
        if(!this.#tags.hasOwnProperty(tag)){
            this.#tags[tag]  = phoneNumber;
            return true;
        }
        else{
            return false;
        }
    }

    get filters(){
        return this.#filters;
    }
    get tags(){
        return this.#tags;
    }
}

module.exports = group;