import {HL} from "../ModulesDatabase/HandleLanguage.js";
import pkg from 'canvas';

const {createCanvas, loadImage, Image} = pkg;
import puppeteer from "puppeteer";
import {fileURLToPath} from 'url';
import {dirname} from 'path';
import {encode} from "html-entities";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export class HSt {
    static async handleStickers(client, message, bodyText, chatID, messageID, groupsDict) {
        function draw(img, ctx) {
            let buffer = createCanvas(512, 512)
            let bufferctx = buffer.getContext('2d');
            bufferctx.drawImage(img, 0, 0);
            let imageData = bufferctx.getImageData(0, 0, buffer.width, buffer.height);
            let data = imageData.data;
            let removeBlack = function () {
                for (let i = 0; i < data.length; i += 4) {
                    if (data[i] + data[i + 1] + data[i + 2] < 80) {
                        data[i + 3] = 0; // alpha
                    }
                }
                ctx.putImageData(imageData, 0, 0);
            };
            removeBlack();
        }

        function trimCanvas(c) {
            let ctx = c.getContext('2d'),
                copy = createCanvas(512, 512).getContext('2d'),
                pixels = ctx.getImageData(0, 0, c.width, c.height),
                l = pixels.data.length,
                i,
                bound = {
                    top: null,
                    left: null,
                    right: null,
                    bottom: null
                },
                x, y;

            // Iterate over every pixel to find the highest
            // and where it ends on every axis ()
            for (i = 0; i < l; i += 4) {
                if (pixels.data[i + 3] !== 0) {
                    x = (i / 4) % c.width;
                    y = ~~((i / 4) / c.width);

                    if (bound.top === null) {
                        bound.top = y;
                    }

                    if (bound.left === null) {
                        bound.left = x + 5;
                    } else if (x < bound.left && x > 5) {
                        bound.left = x;
                    }

                    if (bound.right === null) {
                        bound.right = x;
                    } else if (bound.right < x) {
                        bound.right = x;
                    }

                    if (bound.bottom === null) {
                        bound.bottom = y;
                    } else if (bound.bottom < y && x > 5) {
                        bound.bottom = y;
                    }
                }
            }
            // Calculate the height and width of the content
            let trimHeight = bound.bottom - bound.top,
                trimWidth = bound.right - bound.left,
                trimmed = ctx.getImageData(bound.left, bound.top, trimWidth, trimHeight);

            copy.canvas.width = trimWidth;
            copy.canvas.height = trimHeight;
            copy.putImageData(trimmed, 0, 0);

            // Return trimmed canvas
            return copy.canvas;
        }

        bodyText = bodyText.replace(HL.getGroupLang(groupsDict, chatID, "make_sticker"), "").trim();
        const messageType = message.quotedMsgObj ? message.quotedMsgObj.type : message.type;
        let date = new Date(message.timestamp * 1000);
        let hour = date.getHours() < 10 ? "0" + date.getHours() : date.getHours();
        let minutes = date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();
        let time = hour + ":" + minutes;
        message = message.quotedMsgObj ? message.quotedMsgObj : message;
        const noCrop = !!bodyText.match(HL.getGroupLang(groupsDict, chatID, "crop_sticker"));
        const highQuality = !!bodyText.match(HL.getGroupLang(groupsDict, chatID, "high_Quality"));
        const mediumQuality = !!bodyText.match(HL.getGroupLang(groupsDict, chatID, "medium_Quality"));
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
            } else if (messageType === "chat") {
                //written in collaboration with Laniad27
                let canvas = createCanvas(512, 512)
                let ctx = canvas.getContext('2d')
                let phoneNumber = message.sender.formattedName.replace("⁦", "").replace("⁩", "");
                await (async () => {
                    let messageBody = encode(message.body);
                    let messageTime = encode(time);
                    let messageName = encode(message.sender.pushname);
                    let messagePhone = phoneNumber;
                    const browser = await puppeteer.launch();
                    const page = await browser.newPage();
                    if (highQuality) {
                        await page.setViewport({
                            width: 256,
                            height: 1024,
                            deviceScaleFactor: 2,
                        });
                    } else if (mediumQuality) {
                        await page.setViewport({
                            width: 362,
                            height: 1024,
                            deviceScaleFactor: 1.414,
                        });
                    } else {
                        await page.setViewport({
                            width: 512,
                            height: 1024,
                            deviceScaleFactor: 1,
                        });
                    }
                    await page.goto(`file://${__dirname}//template.mhtml`);
                    await page.evaluate(function (messageBody, messageTime, messagePhone, messageName) {
                        let domBody = document.querySelector('#app > div > div > div > div > div._2jGOb.copyable-text > div > span.i0jNr.selectable-text.copyable-text > span');
                        domBody.innerHTML = messageBody
                        let domTime = document.querySelector('#app > div > div > div > div > div._1beEj > div > span');
                        domTime.innerHTML = messageTime;
                        let domPhone = document.querySelector('#app > div > div > div > div > div.hooVq.color-2._1B9Rc > span._1BUvv');
                        domPhone.innerHTML = messagePhone;
                        let domName = document.querySelector('#app > div > div > div > div > div.hooVq.color-2._1B9Rc > span._1u3M2.ggj6brxn.gfz4du6o.r7fjleex.g0rxnol2.lhj4utae.le5p0ye3.ajgl1lbb.edeob0r2.i0jNr');
                        domName.innerHTML = messageName;
                        document.querySelector('#app > div > div > div > div > div.hooVq.color-2._1B9Rc').classList.remove('color-2');
                        let random = Math.floor(Math.random() * 21);
                        document.querySelector('#app > div > div > div > div > div.hooVq._1B9Rc').classList.add(`color-${random}`);

                    }, messageBody, messageTime, messagePhone, messageName);
                    let base64 = await page.screenshot({encoding: "base64", fullPage: true, omitBackground: true})
                    await browser.close();
                    loadImage('data:image/png;base64,' + base64).then((image) => {
                        draw(image, ctx)
                        let ntx = trimCanvas(canvas);
                        loadImage(ntx.toDataURL()).then((image) => {
                            let canvas = createCanvas(512, 512)
                            let ctx = canvas.getContext('2d')
                            if (image.height > image.width) {
                                ctx.drawImage(image, 0, 0, image.width, image.height, 256 - 256 * image.width / image.height, 0, 512 * image.width / image.height, 512)
                            } else {
                                ctx.drawImage(image, 0, 0, image.width, image.height, 0, 256 - 256 * image.height / image.width, 512, 512 * image.height / image.width)
                            }
                            client.sendImageAsSticker(message.chatId, canvas.toDataURL(), {
                                author: "ג'ון האגדי",
                                pack: "חצול",
                            })
                        })
                    })
                })()
            } else await client.reply(chatID, HL.getGroupLang(groupsDict, chatID, "not_sticker_material_error"), messageID);
        } catch (e) {
            console.log("error occurred at sticker making")
        }
    }

    static async createTextSticker(client, bodyText, chatID, messageID, groupsDict) {
        bodyText = bodyText.replace(HL.getGroupLang(groupsDict, chatID, "create_text_sticker"), "").trim();
        const canvas = createCanvas(150, 150), drawingBoard = canvas.getContext("2d"),
            [color, text] = await this.setColorAndText(bodyText);
        try {
            let lainadIndex = 0, words = text.split(" "), finalWord = "";
            //written by Laniad27
            while (lainadIndex !== words.length) {
                if (drawingBoard.measureText(words.slice(0, lainadIndex + 1).join(' ')).width > 100) {
                    if (lainadIndex === 0) {
                        finalWord += words.slice(0, 1).join(' ') + '\n';
                        words = words.slice(lainadIndex + 1);
                    } else {
                        finalWord += words.slice(0, lainadIndex).join(' ') + '\n';
                        words = words.slice(lainadIndex);
                    }
                    lainadIndex = -1;
                }
                lainadIndex++;
            }
            finalWord += words.join(' ');
            drawingBoard.font = `16px Sans serif`;
            drawingBoard.fillStyle = color;
            drawingBoard.textAlign = "center";
            drawingBoard.fillText(finalWord, 75, 75);
            await client.sendImageAsSticker(chatID, canvas.toDataURL(), {author: "ג'ון האגדי", pack: "חצול"});
        } catch (err) {
            await client.reply(chatID, HL.getGroupLang(groupsDict, chatID, "text_sticker_error"), messageID)
        }
    }

    static async setColorAndText(bodyText) {
        let color, text;
        if (bodyText.includes("-") && bodyText.split("-").length >= 2) {
            bodyText = bodyText.split("-");
            color = bodyText[0].trim();
            text = bodyText[1].trim();
        } else {
            color = "black";
            text = bodyText.trim();
        }
        return [color, text];
    }
}