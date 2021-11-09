const urlRegex = /((h|H)ttps?:\/\/[^\s]+)/g;
const wa = require('@open-wa/wa-automate');
const nvt = require('node-virustotal');
const defaultTimedInstance = nvt.makeAPI();
const theSameKey = defaultTimedInstance.setKey("b7e76491b457b5c044e2db87f6644a471c40dd0c3229e018968951d9ddc2408f");
const sleep = require('sleep');
const DAL = require("./DataBase");
const time = require("sleep");
const bannedUsers = [];

/*
const phoneDict = {"יצקן": "972543293155",
    "אריאל": "972543293155",
    "ארבל": "972509022456",
    "סבן": "972556620311",
    "אור": "972556620311",
    "נגה": "972584283844",
    "בועז": "972552288257",
    "תומר": "972586715880",
    "ניצן" : "972543174791",
    "אורי" : "972586724111",
    "איתן" : "972586809911",
    "שירז" : "972546917374",
    "כפיר" : "972544457410",
    "אסף" : "972506666641",
    "שבתאי" : "972586715880"
}
*/

wa.create({headless: false}).then(client => start(client));

//check if message contain multi names
async function CheckIfMessageContainMultiTags(client, chatID, text_Array, textMessage, messageSenderId, number) {
    let stringWithMultiTagNames = "";
    if (text_Array[2].startsWith("ו")){
        await DAL.ReturnGroupsExistOnDataBase(chatID, function (result){
            for (let i = 1; i < text_Array.length; i++) {
                let person = text_Array[i].replace("ו", "");
                for (let i = 0; i < result.length; i++) {
                    if (result[i].groupID === chatID) {
                        const res = result[i];
                        if (person === res.Name) {
                            stringWithMultiTagNames += "@" + res.Number;
                        }
                    }
                }
            }
            client.sendReplyWithMentions(chatID, stringWithMultiTagNames, messageSenderId)
        });
    }
    else{
        //remove tag and name of the member from the message
        let messageForSend = textMessage.replace(text_Array[1], "");
        messageForSend = messageForSend.replace("תייג", "");
        messageForSend = messageForSend.replace(" ", "");
        await client.sendReplyWithMentions(chatID, "@" + number + "" + messageForSend, messageSenderId);
    }
}

async function checkGroupTagListMembers(client, chatID, textMessage, messageSenderId) {
    const text_Array = textMessage.split(" ");
    await DAL.ReturnGroupsExistOnDataBase(chatID, function (result){
        for (let i = 0; i < result.length; i++) {
            if (result[i].groupID === chatID ){
                const res = result[i];
                if(text_Array[1] === res.Name){
                    CheckIfMessageContainTag(client, chatID, textMessage, messageSenderId, text_Array, res);
                    return;
                }
            }
        }
        client.reply(chatID, "האדם לא מופיע במאגר של קבוצה זו", messageSenderId)
    });
}

async function CheckIfMessageContainTag(client, chatID, textMessage, messageSenderId, text_Array, res){
    //if message is longer then one word, message has sent to check multi names func
    if (text_Array.length > 2){
        await CheckIfMessageContainMultiTags(client, chatID, text_Array, textMessage, messageSenderId, res.Number);
    }
    else {
        await client.sendReplyWithMentions(chatID, "@" + res.Number, messageSenderId);
    }
}

async function addMemberForTag(client, chatID, textMessage, messageId, trimmedMessage, groupMembersArray){
    if(!(trimmedMessage.includes("-"))){
        await client.sendText(chatID, "אני חייב שיהיה - בהודעה בשביל להוסיף מישהו לתיוג");
    }

    else {
        const array_Message = trimmedMessage.split("-");
        const tag = array_Message[0].trim();
        const tagNumber = array_Message[1].trim();
        if(groupMembersArray!=null && groupMembersArray.includes(tagNumber+"@c.us")) {
            await DAL.addTagToDataBase(tag, tagNumber, chatID, function (tag) {
                client.reply(chatID, "האדם " + tag + " נוסף בהצלחה", messageId);
            });
        }
        else{
            client.reply(chatID, "המספר לא קיים בקבוצה זו", messageId);
        }
    }
}
async function remMemberFromTag(client, chatID, tag, messageId) {
    await DAL.checkIfTagExist(tag, chatID, function (error, tag, chatID) {
        if(error){
            client.reply(chatID,  "אני לא חושב שאני יכול למחוק תיוג של אדם שלא מוגדר במערכת", messageId);
        }
        else{
            DAL.remTagFromDB(tag, chatID, function (tag) {
                client.reply(chatID, "התיוג של האדם " + tag + " נמחק בהצלחה", messageId);
            });
        }
    });

}

async function responseWithTagList(client, message) {
    const textMessage = message.body;
    const chatID = message.chat.id;
    const messageId = message.id;
    let messageSenderId = message.id;
    if (message.quotedMsg != null) {
        messageSenderId = message.quotedMsg.id;
    }

    let tagMessage = "";
    let tagEveryOne = "";
    if(textMessage.startsWith("הראה רשימת חברים לתיוג")){
        await DAL.returnAllTagsWIthResponse(chatID, function (result){
            for (let i = 0; i < result.length; i++) {
                if (result[i].groupID === chatID) {
                    const res = result[i];
                    tagMessage += ("" + res.Name + " - " + res.Number+ "\n");
                }
            }
            client.reply(chatID, tagMessage, messageId);
        });
    }
    else if(textMessage.startsWith("תיוג כולם")){
        await DAL.returnAllTagsWIthResponse(chatID, function (result){
            for (let i = 0; i < result.length; i++) {
                if (result[i].groupID === chatID) {
                    const res = result[i];
                    tagEveryOne += ("@" + res.Number + " \n");
                }
            }
            client.sendReplyWithMentions(chatID, tagEveryOne, messageSenderId);
        });
    }
}

async function handleTag(client, message) {
    let groupMembersArray = null;
    if(message.chat.isGroup) {
        groupMembersArray = await client.getGroupMembersId(message.chat.id);
    }

    let textMessage = message.body;
    const chatID = message.chat.id;
    let messageId = message.id;
    let messageSenderId = message.id;
    if (message.quotedMsg != null){
        messageSenderId = message.quotedMsg.id;
    }
    if (textMessage.startsWith("תייג")){
        await checkGroupTagListMembers(client, chatID, textMessage, messageSenderId);
    }
    else if(textMessage.startsWith("הוסף חבר לתיוג")){
        const trimmedMessage = textMessage.replace("הוסף חבר לתיוג", "").trim();
        await addMemberForTag(client, chatID, textMessage, messageId, trimmedMessage, groupMembersArray);
    }
    else if(textMessage.startsWith("הסר חבר מתיוג")){
        const trimmedMessage = textMessage.replace("הסר חבר מתיוג", "").trim();
        await remMemberFromTag(client, chatID, trimmedMessage, messageId);
    }


}

async function stripLinks(client, message) {
    const textMessage = message.body;
    const chatID = message.chat.id;
    const messageId = message.id;

    const found = textMessage.match(urlRegex);
    if (found == null){
        return;
    }
    found.forEach(function (url, index) {
        url.slice(-1) != "/" ? url = url+"/" : console.log("moshe");
        url = url.charAt(0).toLowerCase() + url.slice(1);
        checkUrls(client, chatID, url, messageId);
    });
}

function parseAndAnswerResults(client, chatID, res, url, messageId) {
    let prettyStringForAnswer = "";
    try{
        const parsedRes = JSON.parse(res.toString('utf8').replace(/^\uFFFD/, ''));
        let counter = 0;
        const dataParsed = parsedRes.data.attributes.last_analysis_results;
        for(let attribute in dataParsed){
            if (dataParsed[attribute].result != "clean" && dataParsed[attribute].result != "unrated"){
                prettyStringForAnswer += (attribute+": "+dataParsed[attribute].result) + "\n";
                counter++;
            }
        }
        prettyStringForAnswer+= "\n" + counter + " Anti virus engines detected this link as malicious";
        client.reply(chatID, url + "\n" + prettyStringForAnswer, messageId);
    } catch(error){
        client.reply(chatID, "" + error, messageId);
    }
}

async function checkUrls(client, chatID, url, messageId){
    await client.reply(chatID, url + "\n" + "בודק", messageId);
    const hashed = nvt.sha256(url)
    //TODO: make this code pretty
    const theSameObject = defaultTimedInstance.urlLookup(hashed, function(err, res) {
        if (err) {
            const theSameObject = defaultTimedInstance.initialScanURL(url, function (err, res) {
                if (err) {
                    client.reply(chatID, "שגיאה בהעלאת הקישור", messageId);
                }
                else if(res){
                    time.sleep(10);
                    const id = JSON.parse(res.toString('utf8').replace(/^\uFFFD/, '')).data.id;
                    const hashed = id.match("-(.)+-")[0];
                    const hashedAfterRegex = hashed.replace(/-/g, "");
                    const theSameObject = defaultTimedInstance.urlLookup(hashedAfterRegex, function (err, res) {
                        if(err){
                            client.reply(chatID, "שגיאה בבדיקת הקישור", messageId);
                        }
                        else if(res){
                            parseAndAnswerResults(client, chatID, res, url, messageId);
                        }
                    });

                }

            });
        }
        else
            parseAndAnswerResults(client, chatID, res, url, messageId);
    });

}

//TODO: make this code more pretty and add global func for check on tags;
async function replaceBracketsWithTag(filter, filter_replay, chatID, callback) {
    const regex = new RegExp('\\[(.*?)\\]', "g");
    await DAL.returnAllTagsWIthResponse(chatID, function (result) {
        for (let i = 0; i < result.length; i++) {
            if (result[i].groupID === chatID) {
                const res = result[i];
                let regexTemp = filter_replay.match(regex);
                if (regexTemp != null){
                    for (let j = 0; j < regexTemp.length; j++) {
                        let regexTempTest = regexTemp[j].replace("[", "");
                        regexTempTest = regexTempTest.replace("]", "");
                        if(regexTempTest === res.Name){
                            filter_replay = filter_replay.replace(regexTemp[j], "@" + res.Number);
                        }

                    }
                }
            }
        }
        callback(filter, filter_replay, chatID);
    });
}

async function checkFilterAndAdd(client, chatID, trimmedMessage, messageId) {
    if(!(trimmedMessage.includes("-"))){
        await client.sendText(chatID, "מממ השתמשת במקף כמו שאתה אמור לעשות?");
    }
    else{
        const array_Message = trimmedMessage.split("-");
        const filter = array_Message[0].trim();
        const filter_replay = array_Message[1].trim();
        await DAL.checkIfFilterDoesNotExist(filter, filter_replay, chatID, function (error , filter, filter_replay, chatID){

                if (error){
                    client.reply(chatID, "הפילטר " + filter + " כבר קיים הערך שלו הוא " + filter_replay + " רוצה לשנות? ", messageId);
                }
                else{
                    replaceBracketsWithTag(filter, filter_replay, chatID, function (filter, filter_replay, chatID) {
                        DAL.addToDataBase(filter, filter_replay, chatID, function (filter){
                            client.reply(chatID, "הפילטר " + filter + " נוסף בהצלחה", messageId);
                        });
                    });
                }

        });
    }

}

async function checkFilterAndRem(client, chatID, filter, messageId) {
    await DAL.checkIfFilterExist(filter, chatID, function (error, filter, chatID) {
        if(error){
            client.reply(chatID,  "רק אלוהים יכול למחוק ערך לא קיים ידידי", messageId);
        }
        else{
            DAL.removeFromDataBase(filter, chatID, function (filter) {
                client.reply(chatID, "הפילטר " + filter + " נמחק בהצלחה", messageId);
            });
        }
    });

}

async function checkFilterAndEdit(client, chatID, trimmedMessage, messageId) {
    if(!(trimmedMessage.includes("-"))){
        await client.sendText(chatID, "נוק נוק, מי זה? המקף של העריכה");
    }
    else{
        const array_Message = trimmedMessage.split("-");
        const filter = array_Message[0].trim();
        const filter_replay = array_Message[1].trim();
        await DAL.checkIfFilterExist(filter,chatID, function (error , filter, chatID){

            if (error){
                client.reply(chatID, "אי אפשר לערוך פילטר שלא קיים",messageId);
            }
            else{
                replaceBracketsWithTag(filter, filter_replay, chatID, function (filter, filter_replay, chatID) {
                    DAL.editONDataBase(filter, filter_replay, chatID, function (filter){
                        client.reply(chatID, "הפילטר " + filter + " נערך בהצלחה", messageId);
                    });
                });
            }

        });
    }
}

async function HandleFilters(client, message) {
    const textMessage = message.body;
    const chatID = message.chat.id;
    const messageId = message.id;
    const author = message.sender.id
    if (!(bannedUsers.includes(author))) {
        if (textMessage.startsWith("הוסף פילטר")) {
            const trimmedMessage = textMessage.replace("הוסף פילטר", "").trim();
            await checkFilterAndAdd(client, chatID, trimmedMessage, messageId);
        }
        else if (textMessage.startsWith("הסר פילטר")) {
            const trimmedMessage = textMessage.replace("הסר פילטר", "").trim();
            await checkFilterAndRem(client, chatID, trimmedMessage, messageId);
        }
        else if (textMessage.startsWith("ערוך פילטר")) {
            const trimmedMessage = textMessage.replace("ערוך פילטר", "").trim();
            await checkFilterAndEdit(client, chatID, trimmedMessage, messageId);
        }
        else{
            await responseWithFilterIfExist(client, message)
        }
    }
}

async function responseWithFilters(client, message) {
    const textMessage = message.body;
    const chatID = message.chat.id;
    const messageId = message.id;
    let filterMessage = ""
    if(textMessage.startsWith("הראה פילטרים")){
         await DAL.returnAllFiltersWIthResponse(chatID, function (result){
             for (let i = 0; i < result.length; i++) {
                 filterMessage += ("" + result[i].filter + " - " + result[i].filter_reply + "\n");
             }
             client.reply(chatID, filterMessage, messageId);
        });
    }
}

//TODO: temporary code
async function banUsers(client, message) {
    const textMessage = message.body;
    const chatID = message.chat.id;
    const messageId = message.id;

    if (message.quotedMsg != null) {
        const responseAuthor = message.quotedMsg.author;
        const userID = message.sender.id;
        if (textMessage.startsWith("חסום גישה")) {
            if (userID == "972543293155@c.us") {
                bannedUsers.push(responseAuthor);
                await client.sendReplyWithMentions(chatID,  "המשתמש @" + responseAuthor + "\n נחסם בהצלחה \n, May God have mercy on your soul", messageId);
            }
            else {
                client.reply(chatID, "רק כבודו יכול לחסום אנשים", messageId);
            }
        }

        if(textMessage.startsWith("אפשר גישה")) {
            if (userID == "972543293155@c.us") {
                const userIdIndex = bannedUsers.indexOf(responseAuthor);
                bannedUsers.splice(userIdIndex, 1);
                await client.sendReplyWithMentions(chatID,  "המשתמש @" + responseAuthor + "\n שוחרר בהצלחה", messageId);
            }
            else{
                await client.reply(chatID, "רק כבודו יכול לשחרר אנשים", messageId);
            }
        }

    }
}

async function responseWithFilterIfExist(client, message) {
    const textMessage = message.body;
    const chatID = message.chat.id;
    const messageId = message.id;
    await DAL.returnFilterReply(chatID, textMessage, function (result) {
        //will make function of reply_message
        for (let i = 0; i < result.length; i++) {
            const word = result[i].filter;
            const location = textMessage.indexOf(word);
            if(textMessage.includes(result[i].filter)) {
                if ((location <= 0 || !((/[A-Z\a-z\u0590-\u05fe]/).test(textMessage[location - 1]))) &&
                    (location + word.length >= textMessage.length ||
                        !((/[A-Z\a-z\u0590-\u05fe]/).test(textMessage[location + word.length])))) {

                    client.sendReplyWithMentions(chatID, result[i].filter_reply, messageId);
                }
            }
        }
    });
}

async function handleStickers(client, message) {
    const textMessage = message.body;

    if(textMessage.startsWith("הפוך לסטיקר")){
        if (message.quotedMsg != null) {
            const quotedMsg = message.quotedMsg;
            if (message.quotedMsg.type === "image") {
                const mediaData = await client.decryptMedia(quotedMsg);
                await client.sendImageAsSticker(
                    message.from,
                    mediaData
                )
            }
            else{
                client.reply(message.from, "אני חושש שאי אפשר להפוך הודעה זו לסטיקר", message.id);
            }
        }
        else{
            client.reply(message.from, "אתה אומר לי להפוך משהו לסטיקר אבל אתה לא אומר לי את מה", message.id);
        }
    }
}

function start(client) {
    client.onMessage(async message => {
        if(message.body != null){
            await handleTag(client, message);
            await stripLinks(client, message);
            await banUsers(client, message);
            await HandleFilters(client, message);
            await responseWithFilters(client, message);
            await responseWithTagList(client, message);
            await handleStickers(client, message);
        }
    });
}