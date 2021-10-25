const urlRegex = /((h|H)ttps?:\/\/[^\s]+)/g;
const wa = require('@open-wa/wa-automate');
const nvt = require('node-virustotal');
const defaultTimedInstance = nvt.makeAPI();
const theSameKey = defaultTimedInstance.setKey("b7e76491b457b5c044e2db87f6644a471c40dd0c3229e018968951d9ddc2408f");
const sleep = require('sleep');
const MongoClient = require('mongodb').MongoClient;
const url = "mongodb://localhost:27017/";

wa.create({headless: false}).then(client => start(client));
// Constant storing phone numbers of trusted members.
const test = {"יצקן": "972543293155",
"אריאל": "972543293155",
"ארבל": "972509022456",
"סבן": "972556620311",
"אור": "972556620311",
"נגה": "972584283844",
"בועז": "972552288257",
"תומר": "972586715880",
"ניצן" : "972543174791",
"אורי" : "972586724111",
"איתן" : "972586809911"
}

/*
A function to begin the client and wait for a message to be sent.
*/
function start(client) {
    client.onMessage(async message => {
        if (message.quotedMsgObj == null){
            await check(client, 0, message.chat.id, message.body, message.sender.id, message.id);
        }
        else{
            await check(client, message.quotedMsgObj.id, message.chat.id, message.body, message.sender.id, message.id);
        }
        
    });
}

/*
A function to check whther or not the given text contains a filter keyword.
Input: Given text, client that has recieved the text (Bot), Id of the chat in which the text was sent, Id of the message that is being checked.
Output: 
*/
async function addOrDelFilterToDB(text, client, chatId, messageId) {
    let flag = 0;
    if (text.includes("הסר")){
        flag = 1;
        text  = text.replace("הסר פילטר", "");
    }
    else if (text.includes("הוסף")){
        flag = 2;
        text  = text.replace("הוסף פילטר", "");
    } else {
	flag = 3;
	text = text.replace ("ערוך פילטר", "");
    }

    if(text.includes("-") || flag === 1){
        const myArr = text.split("-");
        if(myArr.length !== 2 && flag === 2){
            await client.sendText(chatId, "בדוק שכתבת את הפעולה נכון");
            return 0;
        }
        MongoClient.connect(url, function(err, db) {
            if (err) throw err;
            const dbo = db.db("WhatsappBotDB");
            if (flag === 2) {
                const myobj = {filter: myArr[0].trim(), filter_reply: myArr[1].trim()};
                dbo.collection(chatId).insertOne(myobj, function (err, res) {
                    if (err) throw err;
                });
                client.reply(chatId, "הפילטר " + myArr[0] + " נוסף בהצלחה", messageId)
            } else if (flag == 1){
                const myquery = {filter: myArr[0].trim()};
                dbo.collection(chatId).deleteOne(myquery, function (err, obj) {
                    if (err) throw err;
                });
                if (err) throw err;
                client.reply(chatId, "הפילטר " + myArr[0] + " הוסר בהצלחה", messageId);
            } else {
		//TODO: Make this part of the code not suck by adding an editFilter(filterName, newResponse) method to the filter object thingy which exists somewhere (I hope), but I can't seem to find it.
		const myquery = {filter: myArr[0].trim()};
                dbo.collection(chatId).deleteOne(myquery, function (err, obj) {
                    if (err) throw err;
                });
                if (err) throw err;
		const myobj = {filter: myArr[0].trim(), filter_reply: myArr[1].trim()};
                dbo.collection(chatId).insertOne(myobj, function (err, res) {
                    if (err) throw err;
                });
                client.reply(chatId, "הפילטר " + myArr[0] + " נערך בהצלחה", messageId)
	    }	
            });
    }
    else{
        await client.sendText(chatId, "בדוק שכתבת את הפעולה נכון");
    }
}

async function ReplyIfFilterExist(client, chatId, messageId, text) {
    MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        const dbo = db.db("WhatsappBotDB");
        dbo.collection(chatId).find({}).toArray(function(err, result) {
            if (err) throw err;
            for (let i = 0; i < result.length; i++) {
                if(text.includes(result[i].filter)){
                    client.sendReplyWithMentions(chatId, ''+result[i].filter_reply, messageId);
                }
            }
            db.close();
        });
    });
}

async function ShowFilters(client, chatId) {
    let MessageToSend = "";
    MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        const dbo = db.db("WhatsappBotDB");
        dbo.collection(chatId).find({}).toArray(function(err, result) {
            if (err) throw err;
            for (let i = 0; i < result.length; i++) {
                MessageToSend += ("" + result[i].filter) + " - " + ("" + result[i].filter_reply) + "\n";
            }
            client.sendText(chatId, MessageToSend);
            db.close();
        });
    });
}

async function check(client, isquoted, chatId, text, userId, messageId){
	if (text==null){
		return -1;
	}
    await  stripLinkFromtext(client, chatId, text, messageId);

    if (text.includes("הוסף פילטר") || text.includes("הסר פילטר") ) {
            await addOrDelFilterToDB(text, client, chatId, messageId);
            return 0;
    }
    
    if(text.includes("הראה פילטרים")){
        await ShowFilters(client, chatId);
    }
    else{
        await ReplyIfFilterExist(client, chatId, messageId, text);
    }

    if (text.startsWith("תייג")){
    	if (text.includes(" ו")){
    		await specialCheck(client, isquoted, chatId, text.split(" ו"), userId)
    		return 0;
    	}
        const string_Test = text.split(' ')[1];
        const string_Test1 = text.split(' ')[2];
        const string_Test2 = text.split(' ')[3];
        if (string_Test in test){
            if (isquoted){
                await client.sendReplyWithMentions(chatId, "@"+test[string_Test] + " תוייגת", isquoted);
            }
            else{
                await client.sendTextWithMentions(chatId, "@"+ test[string_Test] + " תוייגת");
            }
            
        }
        else if (string_Test == "אותי"){
        	await client.sendReplyWithMentions(chatId, "@"+userId + " תוייגת", isquoted);
        }

        else if (string_Test == "משה" && string_Test1 == "רובוט"){
        	await client.sendReplyWithMentions(chatId, "טיפש! אני לא הולך לתייג את עצמי", isquoted);
        }

        else if (string_Test == "גבר" && string_Test2 == "גודול"){
        	await client.sendReplyWithMentions(chatId, "נגה תוייגת - @"+test["נגה"], isquoted);
        }

        else if (string_Test == "גבר" && string_Test2 == "גדול"){
        	await client.sendReplyWithMentions(chatId, "נגה תוייגת - @"+test["נגה"], isquoted);
        }

        else if (string_Test == "כולם"){
        	if (userId == "972543293155@c.us"){
        		await menetionAll(client, isquoted, chatId);
        	}
        	else{
        		await client.sendText(chatId, "רק המאסטר שלי כבודו יכול לתייג את כולם");
        	}
        }

        else{
            await client.sendText(chatId, "אתה מנסה לתייג חייזר? \n בן האדם לא נמצא במאגר שלי");
        }
    }
}

async function specialCheck(client, isquoted, chatId, array, userId){
	array[0] = array[0].replace("תייג", "");
	let sendString = ""
	array = eliminateDuplicates(array);
	for (let i = array.length - 1; i >= 0; i--) {
		if(array[i].trim() in test ){
			sendString += "@"+test[array[i].trim()]+" ";
		}
		

	}
	if (isquoted){
		await client.sendReplyWithMentions(chatId, sendString, isquoted);
    }

    else{
        await client.sendTextWithMentions(chatId, sendString);
	}
}

async function menetionAll(client, isquoted, chatId) {
	let sendString = ""
	let values = Object.keys(test).map(function(key){
    return test[key];
	});
	values = eliminateDuplicates(values);
	for (let i = values.length - 1; i >= 0; i--) {
		sendString += "@"+values[i]+" \n";
	}
	if (isquoted){
		await client.sendReplyWithMentions(chatId, sendString, isquoted);
    }

    else{
        await client.sendTextWithMentions(chatId, sendString);
	}
}

function eliminateDuplicates(arr) {
  let i,
      len = arr.length,
      out = [],
      obj = {};

  for (i = 0; i < len; i++) {
    obj[arr[i]] = 0;
  }
  for (i in obj) {
    out.push(i);
  }
  return out;
}

async function stripLinkFromtext(client, chatId, text, messageId){
    const found = text.match(urlRegex);
    if (found == null){
        return;
    }
    found.forEach(function (item, index) {
        item.slice(-1) != "/" ? item = item+"/" : console.log("moshe");
        item = item.toLowerCase();

        checkUrl(client ,chatId, item, messageId);
    });
}

function checkUrl(client, chatId, url, messageId){
	client.reply(chatId, url + "\n" + "בודק", messageId);
    const hashed = nvt.sha256(url);
    const theSameObject = defaultTimedInstance.urlLookup(hashed, function(err, res){
        if (err) {
        	const theSameObject1 = defaultTimedInstance.initialScanURL(url, function(err, res){
        		if (err){
        			client.reply(chatId, "שגיאה בהעלאת הקישור", messageId);
        			return;
        		}
                sleep.sleep(5);
                const theSameObject2 = defaultTimedInstance.urlLookup(hashed, function(err, res){
                    if (err) {
                        client.reply(chatId, "שגיאה בבדיקת הקישור", messageId);
                        return;
                    }
                    parseAndAnswerResults(client, res, url, chatId, messageId);
                });
            });
        }
        else{
            parseAndAnswerResults(client, res, url, chatId, messageId);
            return;
        }

    });
}

function parseAndAnswerResults(client, res, url, chatId, messageId){
    let mosheString = " ";
    const test = JSON.parse(res);
    let counter = 0;
    const moshe = test.data.attributes.last_analysis_results;
    for(let attributename in moshe){
        if (moshe[attributename].result != "clean" && moshe[attributename].result != "unrated"){
            mosheString += (attributename+": "+moshe[attributename].result) + "\n";
            counter++;
        }
    }
    mosheString+= "\n" + counter + " Anti virus engines detected this link as malicious";
    client.reply(chatId, url + "\n" + mosheString, messageId);
}
