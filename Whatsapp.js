const urlRegex = /((h|H)ttps?:\/\/[^\s]+)/g;
const wa = require('@open-wa/wa-automate');
const nvt = require('node-virustotal');
const defaultTimedInstance = nvt.makeAPI();
const theSameKey = defaultTimedInstance.setKey("b7e76491b457b5c044e2db87f6644a471c40dd0c3229e018968951d9ddc2408f");
const sleep = require('sleep');
const DAL = require("./DataBase");
const bannedUsers = [];

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
    "כפיר" : "⁦972544457410⁩",
    "אסף" : "⁦972506666641"
}

wa.create({headless: false}).then(client => start(client));

//check if message contain multi names
async function CheckIfMessageContainMultiTags(client, chatID, text_Array, textMessage, messageSenderId) {
    let stringWithMultiTagNames = "";
    if (text_Array[2].startsWith("ו")){
        for (let i = 1; i < text_Array.length; i++) {
            if(phoneDict[text_Array[i].replace("ו", "")] != null){
                stringWithMultiTagNames += "@"+ phoneDict[text_Array[i].replace("ו", "")];
            }
        }
        await client.sendReplyWithMentions(chatID, stringWithMultiTagNames, messageSenderId)
    }
    else{
        //remove tag and name of the member from the message
        let messageForSend = textMessage.replace(text_Array[1], "");
        messageForSend = messageForSend.replace("תייג", "");
        if(phoneDict[text_Array[1]] != null){
            await client.sendReplyWithMentions(chatID, "@" + phoneDict[text_Array[1]] + "" + messageForSend, messageSenderId);
        }
        else{
            await client.reply(chatID, "המשתמש שניסית לתייג לא קיים במאגר שלי", messageSenderId);
        }
    }
}
//input client, message
//check if message body contain name of on the trusted persons of the group
async function CheckIfMessageContainTag(client, message) {
    let textMessage = message.body;
    const chatID = message.chat.id;
    let messageSenderId = message.id;
    if (message.quotedMsg != null){
        messageSenderId = message.quotedMsg.id;
    }
    if (textMessage.startsWith("תייג")){
        const text_Array = textMessage.split(" ");
        //if message is longer then one word, message has sent to check multi names func
        if (text_Array.length > 2){
            await CheckIfMessageContainMultiTags(client, chatID, text_Array, textMessage, messageSenderId);
        }
        else if(text_Array[1] in phoneDict){
            await client.sendReplyWithMentions(chatID, "@" + phoneDict[text_Array[1]], messageSenderId);
        }
        else{
            await client.sendReplyWithMentions(chatID, "אני לא בטוח את מי אתה מנסה לתייג, אבל הוא לא קיים במאגר שלי", messageSenderId);
        }
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
    const parsedRes = JSON.parse(res);
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
}

async function checkUrls(client, chatID, url, messageId){
    await client.reply(chatID, url + "\n" + "בודק", messageId);
    const hashed = nvt.sha256(url)
    //TODO: make this code pretty
    const theSameObject = defaultTimedInstance.urlLookup(hashed, function(err, res){
        if (err) {
            const theSameObject1 = defaultTimedInstance.initialScanURL(url, function(err, res){
                if (err){
                    client.reply(chatID, "שגיאה בהעלאת הקישור", messageId);
                    return;
                }
                sleep.sleep(5);
                const theSameObject2 = defaultTimedInstance.urlLookup(hashed, function(err, res){
                    if (err) {
                        client.reply(chatID, "שגיאה בבדיקת הקישור", messageId);
                        return;
                    }
                    parseAndAnswerResults(client, res, url, chatID, messageId);
                });
            });
        }
        else{
            parseAndAnswerResults(client, chatID, res, url, messageId);
        }

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
                    DAL.addToDataBase(filter, filter_replay, chatID, function (filter){
                        client.reply(chatID, "הפילטר " + filter + " נוסף בהצלחה", messageId);
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
                DAL.editONDataBase(filter, filter_replay, chatID, function (filter){
                    client.reply(chatID, "הפילטר " + filter + " נערך בהצלחה", messageId);
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
            if(textMessage.includes(result[i].filter)){
                client.reply(chatID, result[i].filter_reply, messageId);
            }
        }
    });
}

function start(client) {
    client.onMessage(async message => {
        if(message.body != null){
            await CheckIfMessageContainTag(client, message);
            await stripLinks(client, message);
            await banUsers(client, message);
            await HandleFilters(client, message);
            await responseWithFilters(client, message);
        }
    });
}