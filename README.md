# Whatsapp Group Bot

## Features
- Multilanguage Support - each command can be typed in whatever language the user wants (Currently available: Hebrew, English, Latin)

- Tags - Tagging people with "Tag [person]".

- Filters - The bot can respond to certain words as configured.

- Birthdays - The bot notifies the group on someone's birthday.

- Creating Stickers - The bot is able to create a sticker out of any given image or video.

- Creating Surveys - The bot is able to create a whatsapp survey from a command.

- Scanning URLs - The bot is able to scan any URL given to it for viruses.

- Website - Configure user permissions (pre group) by the group admins.

- Bot devs' functions: blocking/unblocking a user or group and inviting the bot to a group via a link.

- The bot autobans groups or users who are spamming it for a short period of time.

## Usage
Add the bot's phone number to your Whatsapp group and start sending out commands - As simple as that!

## Dependencies
[@open-wa/wa-automate](https://www.npmjs.com/package/@open-wa/wa-automate) for the WhatsApp "link". 

[mongodb](https://www.npmjs.com/package/mongodb) for storing our database.

[node-schedule](https://www.npmjs.com/package/node-schedule) for timing the birthday checking. 

[node-virustotal](https://www.npmjs.com/package/node-virustotal) for scanning links for viruses. 

[usleep](https://www.npmjs.com/package/usleep) for timing out the bot while the antivirus scan takes place.

[util](https://www.npmjs.com/package/util) for formatting strings.

## Credits
[@ArielYat](https://github.com/ArielYat) for the idea, starting the project and adding most of the functionality.

[@TheBooker66](https://github.com/TheBooker66) for helping greatly with development, expanding the bot, documentation and grammar.

[@Arbel99](https://github.com/Arbel99) for the Latin support.
