const MongoClient = require('mongodb').MongoClient;
const url = "mongodb://localhost:27017/";

class DAL {
    static async addToDataBase(filter, filter_Replay, ID, callback) {
        MongoClient.connect(url, function (err, db) {
            if (err) {
                console.log(err + "addToDataBase");
                return;
            }
            const dbo = db.db("WhatsappBotDB");
            const objectToAddToDataBase = {filter: filter, filter_reply: filter_Replay};
            dbo.collection(ID).insertOne(objectToAddToDataBase, function (err, res) {
                if (err) {
                    console.log(err + "addToDataBase-insertOne");
                    return;
                }
                db.close();
                callback(filter);
            });
        });
    }

    static async removeFromDataBase(filter, ID, callback) {
        MongoClient.connect(url, function (err, db) {
            if (err) {
                console.log(err + "removeFromDataBase");
                return;
            }
            const dbo = db.db("WhatsappBotDB");
            const objectToRemoveFromDataBase = {filter: filter};
            dbo.collection(ID).deleteOne(objectToRemoveFromDataBase, function (err, res) {
                if (err) {
                    console.log(err + "removeFromDataBase-insertOne");
                    return;
                }
                db.close();
                callback(filter);
            });
        });
    }

    static async checkIfFilterDoesNotExist(filter, filter_replay, ID, callback) {
        let check = true;
        MongoClient.connect(url, function (err, db) {
            if (err) {
                console.log(err + "checkIfFilterDoesNotExist");
                return;
            }

            const dbo = db.db("WhatsappBotDB");
            dbo.collection(ID).find({}).toArray(function (err, result) {
                if (err) {
                    console.log(err + "checkIfFilterDoesNotExist-find");
                    return;
                }
                for (let i = 0; i < result.length; i++) {
                    if ((result[i].filter) == filter) {
                        check = false;
                    }
                }
                db.close();
                if (check) {
                    callback(false, filter, filter_replay, ID);
                } else {
                    callback(true, filter, filter_replay, ID);
                }
            });
        });
    }

    static async checkIfFilterExist(filter, ID, callback) {
        let check = false;
        MongoClient.connect(url, function (err, db) {
            if (err) {
                console.log(err + "checkIfFilterExist");
                return;
            }

            const dbo = db.db("WhatsappBotDB");
            dbo.collection(ID).find({}).toArray(function (err, result) {
                if (err) {
                    console.log(err + "checkIfFilterExist-find");
                    return;
                }
                for (let i = 0; i < result.length; i++) {
                    if ((result[i].filter) == filter) {
                        check = true;
                    }
                }
                db.close();
                if (check) {
                    callback(false, filter, ID);
                } else {
                    callback(true, filter, ID);
                }
            });
        });
    }

    static async editONDataBase(filter, newFilter, ID, callback) {
        MongoClient.connect(url, function (err, db) {
            if (err) {
                console.log(err + "editONDataBase");
                return;
            }
            const dbo = db.db("WhatsappBotDB");
            const objectToRemoveFromDataBase = {filter: filter};
            dbo.collection(ID).deleteOne(objectToRemoveFromDataBase, function (err, res) {
                if (err) {
                    console.log(err + "editONDataBase-deleteOne");
                    return;
                }
            });
            const objectToAddToDataBase = {filter: filter, filter_reply: newFilter};
            dbo.collection(ID).insertOne(objectToAddToDataBase, function (err, res) {
                if (err) {
                    console.log(err + "editONDataBase-insertOne");
                    return;
                }
                db.close();
                callback(filter);
            });
        });
    }

    static async returnAllFiltersWIthResponse(ID, callback) {
        MongoClient.connect(url, function (err, db) {
            if (err) {
                console.log(err + "returnAllFiltersWIthResponse");
                return;
            }
            const dbo = db.db("WhatsappBotDB");
            dbo.collection(ID).find({}).toArray(function (err, result) {
                if (err) {
                    console.log(err + "returnAllFiltersWIthResponse-find");
                    return;
                }
                callback(result);
            });
        });
    }

    static async returnFilterReply(ID, textMessage, callback) {
        MongoClient.connect(url, function (err, db) {
            if (err) {
                callback(true);
            }
            const dbo = db.db("WhatsappBotDB");
            dbo.collection(ID).find({}).toArray(function (err, result) {
                if (err) {
                    callback(true);
                }
                callback(false, result);
            });
        });
    }

    static async ReturnGroupsExistOnDataBase(ID, callback) {
        MongoClient.connect(url, function (err, db) {
            if (err) {
                console.log(err + "ReturnGroupsExistOnDataBase");
                return;
            }
            const dbo = db.db("WhatsappBotDB");
            dbo.collection("Groups").find({}).toArray(function (err, result) {
                if (err) {
                    console.log(err + "ReturnGroupsExistOnDataBase-find");
                    return;
                }
                callback(result);
            });
        });
    }

    static async addTagToDataBase(tag, tagNumber, chatID, callback) {
        MongoClient.connect(url, function (err, db) {
            if (err) {
                console.log(err + "addTagToDataBase");
                return;
            }
            const dbo = db.db("WhatsappBotDB");
            const objectToAddToDataBase = {groupID: chatID, Name: tag, Number: tagNumber};
            dbo.collection("Groups").insertOne(objectToAddToDataBase, function (err, res) {
                if (err) {
                    console.log(err + "addTagToDataBase-insertOne");
                    return;
                }
                db.close();
                callback(tag);
            });
        });
    }

    static async checkIfTagExist(tag, chatID, callback) {
        MongoClient.connect(url, function (err, db) {
            if (err) {
                console.log(err + "checkIfTagExist");
                return;
            }
            const dbo = db.db("WhatsappBotDB");
            dbo.collection("Groups").find({}).toArray(function (err, result) {
                if (err) {
                    console.log(err + "checkIfTagExist-find");
                    return;
                }
                db.close();
                for (let i = 0; i < result.length; i++) {
                    if (result[i].groupID === chatID) {
                        const res = result[i];
                        if (tag === res.Name) {
                            callback(false, tag, chatID)
                            return;
                        }
                    }
                }
                callback(true, tag, chatID);
            });
        });
    }

    static async remTagFromDB(tag, chatID, callback) {
        MongoClient.connect(url, function (err, db) {
            if (err) {
                console.log(err + "remTagFromDB");
                return;
            }
            const dbo = db.db("WhatsappBotDB");
            const objectToRemFromDataBase = {groupID: chatID, Name: tag};
            dbo.collection("Groups").deleteOne(objectToRemFromDataBase, function (err, res) {
                if (err) {
                    console.log(err + "remTagFromDB-deleteOne");
                    return;
                }
                db.close();
                callback(tag);
            });
        });
    }

    static async returnAllTagsWIthResponse(ID, callback) {
        MongoClient.connect(url, function (err, db) {
            if (err) {
                console.log(err + "returnAllTagsWIthResponse");
                return;
            }
            const dbo = db.db("WhatsappBotDB");
            dbo.collection("Groups").find({}).toArray(function (err, result) {
                if (err) {
                    console.log(err + "returnAllTagsWIthResponse-find");
                    return;
                }
                callback(result);
            });
        });
    }

}


module.exports = DAL;