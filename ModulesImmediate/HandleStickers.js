import {HL} from "../ModulesDatabase/HandleLanguage.js";
import {createCanvas} from 'canvas';

export class HSt {
    static async createImageSticker(client, message, bodyText, chatID, messageID, groupsDict) {
        bodyText = bodyText.replace(HL.getGroupLang(groupsDict, chatID, "make_sticker"), "").trim();
        const messageType = message.quotedMsgObj ? message.quotedMsgObj.type : message.type;
        message = message.quotedMsgObj ? message.quotedMsgObj : message;
        const noCrop = !!bodyText.match(HL.getGroupLang(groupsDict, chatID, "crop_sticker"));
        try {
            if (messageType === "image") {
                const mediaData = await client.decryptMedia(message);
                await client.sendImageAsSticker(chatID, mediaData, {
                    author: "ג'ון האגדי",
                    pack: "חצול",
                    keepScale: noCrop
                });
            } else if (messageType === "video") {
                const mediaData = await client.decryptMedia(message);
                await client.sendMp4AsSticker(chatID, mediaData, {crop: !noCrop}, {
                    author: "ג'ון האגדי",
                    pack: "חצול",
                    keepScale: noCrop
                });
            } else await client.reply(chatID, HL.getGroupLang(groupsDict, chatID, "not_sticker_material_error"), messageID);
        } catch (err) {
            console.log("error occurred while making media sticker");
        }
    }

    static async createTextSticker(client, bodyText, chatID, messageID, groupsDict) {
        bodyText = bodyText.replace(HL.getGroupLang(groupsDict, chatID, "create_text_sticker"), "").trim();
        const canvas = createCanvas(150, 150);
        let color, word, drawingBoard = canvas.getContext("2d");
        if (bodyText.includes("-") && bodyText.split("-").length >= 2) {
            bodyText = bodyText.split("-");
            color = bodyText[0].trim();
            word = bodyText[1].trim();
        } else {
            color = "black";
            word = bodyText.trim();
        }
        try {
            drawingBoard.font = `${50 - (word.length * 2)}px sans serif`
            drawingBoard.fillStyle = color;
            drawingBoard.textAlign = "center";
            drawingBoard.fillText(word.trim(), 75, 75);
            await client.sendImageAsSticker(chatID, canvas.toDataURL(), {author: "ג'ון האגדי", pack: "חצול"});
        } catch (err) {
            await client.reply(chatID, HL.getGroupLang(groupsDict, chatID, "text_sticker_error"), messageID)
        }
    }

    static async createCombinedSticker(client, message, bodyText, chatID, messageID, groupsDict) {
        bodyText = bodyText.replace(HL.getGroupLang(groupsDict, chatID, "create_combined_sticker"), "").trim();
        const messageType = message.quotedMsgObj ? message.quotedMsgObj.type : message.type;
        message = message.quotedMsgObj ? message.quotedMsgObj : message;
        const canvas = createCanvas(150, 150);
        let color, word, drawingBoard = canvas.getContext("2d");
        if (bodyText.includes("-") && bodyText.split("-").length >= 2) {
            bodyText = bodyText.split("-");
            color = bodyText[0].trim();
            word = bodyText[1].trim();
        } else {
            color = "black";
            word = bodyText.trim();
        }
        try {
            const mediaData = await client.decryptMedia(message);
            drawingBoard.drawImage(mediaData);
            drawingBoard.font = `${50 - (word.length * 2)}px sans serif`
            drawingBoard.fillStyle = color;
            drawingBoard.textAlign = "center";
            drawingBoard.textBaseline = "top";
            drawingBoard.fillText(word.trim(), 75, 75);
            if (messageType === "image")
                await client.sendImageAsSticker(chatID, mediaData, {author: "ג'ון האגדי", pack: "חצול",});
            else if (messageType === "video")
                await client.sendMp4AsSticker(chatID, mediaData, {author: "ג'ון האגדי", pack: "חצול",});
            else await client.reply(chatID, HL.getGroupLang(groupsDict, chatID, "not_sticker_material_error"), messageID);
        } catch (err) {
            console.log("error occurred while making combined sticker");
        }
    }
}