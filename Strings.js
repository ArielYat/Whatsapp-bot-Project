// noinspection RegExpSingleCharAlternation

class Strings {
    static strings = {
        "hyphen_reply": {
            "he": "כבודו אתה בטוח שהשתמשת במקף?",
            "en": "Are you sure you used a hyphen correctly?",
            "la": "Certusne tu adhibuisse recte eo iungente te?"
        }, "add_filter": {
            "he": "הוסף פילטר", "en": /(a|A)dd filter/, "la": /(c|C)rea invenientem/
        }, "add_filter_reply": {
            "he": "הפילטר %s נוסף בהצלחה",
            "en": "The filter %s has been successfully added",
            "la": "Invenientem %s creatur feliciter"
        }, "add_filter_error_already_exists": {
            "he": "הפילטר %s כבר קיים במאגר של קבוצה זו \n  אם אתה רוצה לערוך אותו תכתוב את זה: \n ערוך פילטר %s - %s",
            "en": "The filter %s already exists in this group \n If u want to edit the filter please write this: \n Edit filter %s - %s",
            "la": "Reprehendentem %s iam in systemae est \nScribe 'recense invenientem %s - %s' recensitum reprehendentem"
        }, "remove_filter": {
            "he": "הסר פילטר", "en": /(r|R)emove filter/, "la": /(d|D)ele invenientem/
        }, "remove_filter_reply": {
            "he": "הפילטר %s הוסר בהצלחה",
            "en": "The filter %s has been successfully removed",
            "la": "Invenientem %s deletur feliciter"
        }, "remove_filter_error_doesnt_exist": {
            "he": "רק אלוהים יכול למחוק פילטר לא קיים",
            "en": "Only the god of light and all that is good can can delete a filter which doesn't exist",
            "la": "Deus Iupiter solum potest delere invenientem qui non exsistit"
        }, "group_doesnt_have_filters_error": {
            "he": "אין פילטרים בקבוצה זו",
            "en": "This group doesn't have any filters",
            "la": "Coetus hoc non habet invenientes"
        }, "edit_filter": {
            "he": "ערוך פילטר", "en": /(e|E)dit filter/, "la": /(r|R)ecense invenientem/
        }, "edit_filter_reply": {
            "he": "הפילטר %s נערך בהצלחה",
            "en": "The filter %s has been successfully edited",
            "la": "Invenientem %s recensetur felicitur"
        }, "edit_filter_error_doesnt_exist": {
            "he": "סליחה כבודו אבל אי אפשר לערוך פילטר שלא קיים במאגר",
            "en": "Apologies good sir, but you tried to edit a filter which doesn't exit in this group",
            "la": "Paenito, mihi amice, sed recensere invenientem non exsistentem impossibile est"
        }, "show_filters": {
            "he": "הראה פילטרים", "en": /(s|S)how filters/, "la": /(o|O)stende invenientes/
        }, "filter_spam": {
            "he": "כמה פילטרים שולחים פה? אני הולך לישון ל־20 דקות",
            "en": "Wow you're spamming filters, I'm going to sleep for 20 minutes",
            "la": "Retarda! Eo dormitum quoniam mittabas etiam multos invenientes"
        }, "tag": {
            "he": "תייג", "en": /(t|T)ag/, "la": /(c|C)lama ad/
        }, "tag_person_error_doesnt_exist": {
            "he": "אתה בטוח שצדקת בשם? בכל מקרה האדם שניסית לתייג לא נמצא פה",
            "en": "The person you tried to tag doesn't exist",
            "la": "Quem debeo clamare? Is/ea non exsistet"
        }, "add_tag": {
            "he": "הוסף חבר לתיוג", "en": /(a|A)dd tag buddy/, "la": /(a|A)dde amicum/
        }, "add_tag_reply": {
            "he": "מספר הטלפון של האדם %s נוסף בהצלחה",
            "en": "The phone number of the person %s has been successfully added",
            "la": "Amicum %s additur feliciter"
        }, "add_tag_error_already_exists": {
            "he": "האדם %s כבר קיים במאגר של קבוצה זו",
            "en": "The person %s already exists in this group's database",
            "la": "Amicum %s iam exsistet in sistema"
        }, "add_tag_error_doesnt_exist": {
            "he": "מספר הטלפון לא קיים בקבוצה זו",
            "en": "This phone number does not exist in this group",
            "la": "Amicum non exsistet in coetu"
        }, "remove_tag": {
            "he": "הסר חבר מתיוג", "en": /(e|E)emove tag buddy/, "la": /(d|D)ele amicum/
        }, "remove_tag_reply": {
            "he": "מספר הטלפון של האדם %s הוסר בהצלחה",
            "en": "The phone number of the person %s has been successfully removed",
            "la": "Amicum %s delitur feliciter"
        }, "remove_tag_error_doesnt_exist": {
            "he": "רק נפוליאון יכול למחוק אנשים לא קיימים",
            "en": "Only Napoleon can remove people who don't exist",
            "la": "Napoleonus solum potest delere amici non exsistentes"
        }, "group_doesnt_have_tags_error": {
            "he": "אין תיוגים לקבוצה זו",
            "en": "This group doesn't have any tags",
            "la": "Hoc coetus non habet amici"
        }, "tag_all": {
            "he": "תייג כולם", "en": /(t|T)ag everyone/, "la": /(c|C)lama ad quoque/
        }, "show_tags": {
            "he": "הראה רשימת חברים לתיוג", "en": /(s|S)how tag buddies/, "la": /(o|O)stende amici/
        }, "send_birthday_wishes": {
            "he": "מזל טוב ל%s! הוא/היא בן/בת %s!",
            "en": "Happy birthday to %s! He/she is %s years old!",
            "la": "%s, felix sit natalis dies! Habes %s annos"
        }, "add_birthday": {
            "he": "הוסף יום הולדת", "en": /(a|A)dd birthday/, "la": /(a|A)dde natalis dies/
        }, "add_birthday_reply": {
            "he": "יום ההולדת של האדם %s נוסף בהצלחה",
            "en": "%s's birthday has been successfully added",
            "la": "Natalis dies %s additur feliciter"
        }, "add_birthday_error_already_exists": {
            "he": "יום ההולדת של האדם %s כבר קיים במאגר של קבוצה זו",
            "en": "%s's birthday already exists in this group",
            "la": "Natalis dies %s iam exsistet in hoc coetu"
        }, "date_existence_error": {
            "he": "מה לעזאזל זה השטויות האלה? אתה בטוח שזה תאריך מהמאה האחרונה?",
            "en": "Are you sure what you inputted is a date from the last century or something along those lines?",
            "la": "Certusne tu hoc natalis dies esse?"
        }, "date_syntax_error": {
            "he": "תראה אתה אמור להשתמש בנקודות כשאתה כותב תאריך אבל מי אני שאשפוט",
            "en": "Yeah that's not how you write a date... You should be using periods",
            "la": "Rescribe dies cum periodes"
        }, "remove_birthday": {
            "he": "הסר יום הולדת", "en": /(r|R)emove birthday/, "la": /(d|D)ele natalis dies/
        }, "remove_birthday_reply": {
            "he": "יום ההולדת של האדם %s הוסר בהצלחה",
            "en": "%s's birthday has been successfully removed",
            "la": "%s natalis dies delitur feliciter"
        }, "remove_birthday_error_doesnt_exist": {
            "he": "רק דוקטור דופנשמירץ יכול למחוק ימי הולדת לא קיימים",
            "en": "Only Dr. Doofenshmirtz can remove birthdays which don't exist",
            "la": "Doctor Doofenshmirtz solum potest delere natalis dies non exsistentes"
        }, "group_doesnt_have_birthdays_error": {
            "he": "אין לקבוצה זו ימי הולדת",
            "en": "This group don't have any birthdays registered",
            "la": "Hoc coetus non habet natalis dies"
        }, "show_birthDays": {
            "he": "הראה ימי הולדת", "en": /(s|S)how birthdays/, "la": /(o|O)stende natalis dies/
        }, "make_sticker": {
            "he": "הפוך לסטיקר", "en": /(c|C)reate sticker/, "la": /(f|F)ac hoc imaginem/
        }, "not_image_error": {
            "he": "טיפש אי אפשר להפוך משהו שהוא לא תמונה לסטיקר",
            "en": "The message you replied to isn't an image, you big-fingered individual",
            "la": "Hoc non est similacrum"
        }, "no_quoted_message_error": {
            "he": "אתה בטוח שסימנת הודעה?",
            "en": "Are you sure you replied to a message?",
            "la": "Certusne tu respondere te nuntium?"
        }, "scan_link": {
            "he": "סרוק", "en": /(s|S)can/, "la": /(e|E)xamina/
        }, "scan_link_checking": {
            "he": "%s \n בודק...",
            "en": "%s \n Checking...",
            "la": "%s \n Examino..."
        }, "scan_link_result": {
            "he": " וואלה אחי בדקתי את הקישור כמו שביקשת ומצאתי ש-%s אנטי וירוסים מצאו אותו סאחי",
            "en": "%s antivirus engines detected this link as malicious",
            "la": "%s deprehendentes reperiebant hoc ligentem malum esse"
        }, "scan_link_upload_error": {
            "he": "שגיאה בהעלאת הקישור",
            "en": "Error received while uploading the link",
            "la": "Error #1 in ligente est"
        }, "scan_link_checking_error": {
            "he": "שגיאה בבדיקת הקישור",
            "en": "Error received while checking the link",
            "la": "Error #2 in ligente est"
        }, "create_survey": {
            "he": "צור סקר", "en": /(c|C)reate survey/, "la": /(c|C)rea census/
        }, "survey_title": {
            "he": /כותרת - (.)+/, "en": /Title - (.)+/, "la": /Nomen - (.)+/
        }, "survey_subtitle": {
            "he": /כותרת משנה - (.)+/, "en": /Subtitle - (.)+/, "la": /Subnomen - (.)+/
        }, "third_survey_title": {
            "he": /כותרת שלישית - (.)+/, "en": /Third title - (.)+/, "la": /Nomen tertium - (.)+/
        }, "survey_button_1": {
            "he": /כפתור1 - (.)+/, "en": /Button1 - (.)+/, "la": /Buttonus1 - (.)+/
        }, "survey_button_2": {
            "he": /כפתור2 - (.)+/, "en": /Button2 - (.)+/, "la": /Buttonus2 - (.)+/
        }, "survey_button_3": {
            "he": /כפתור3 - (.)+/, "en": /Button3 - (.)+/, "la": /Buttonus3 - (.)+/
        }, "survey_title_replace": {
            "he": "כותרת -", "en": "Title -", "la": "Nomen -"
        }, "second_survey_title_replace": {
            "he": "כותרת משנה -", "en": "Body -", "la": "Subnomen -"
        }, "third_survey_title_replace": {
            "he": "כותרת שלישית -", "en": "Footer -", "la": "Nomen tertium -"
        }, "survey_button_1_replace": {
            "he": "כפתור1 -", "en": "Button1 -", "la": "Buttonus1 -"
        }, "survey_button_2_replace": {
            "he": "כפתור2 -", "en": "Button2 -", "la": "Buttonus2 -"
        }, "survey_button_3_replace": {
            "he": "כפתור3 -", "en": "Button3 -", "la": "Buttonus3 -"
        }, "survey_creation_error": {
            "he": "אני צריך כותרת, כותרת משנה ולפחות כפתור 1 בשביל ליצור סקר",
            "en": "I need a title, a body and at least one button to make a survey",
            "la": "Necessitudines sunt nomen atque subnomen atque buttonus namque census"
        }, "change_language": {
            "he": "שנה שפה", "en": /(c|C)hange language to/, "la": /(m|M)uta lingua ad/
        }, "language_change_reply": {
            "he": "השפה שונתה בהצלחה",
            "en": "Language successfully changed",
            "la": "Lingua mutatur feliciter"
        }, "language_change_error": {
            "he": "בימינו אנו רק עברית, אנגלית ולטינית נתמכות על ידי הבוט",
            "en": "Only Hebrew, English and Latin are currently supported by the bot",
            "la": "Tantum Lingua Hebraice, Anglice et Latine nunc sustentantur per bot."
        }, "help": {
            "he": "הראה עזרה", "en": /(s|S)how help/, "la": /(o|O)stende auxilium/
        }, "help_reply": {
            "he": "*הוראות בעברית* \n _שינוי שפה_ \n כדי לשנות את שפת הבוט כתוב 'שנה שפה ל־[איזו שפה שאתה רוצה]' \n לדוגמה: שנה שפה לאנגלית \n שפות שקיימות כעת: אנגלית, עברית \n \n _פילטרים_ \n הוסף פילטר[פילטר] - [תגובת הבוט] \n לדוגמה: הוסף פילטר אוכל - בננה \n הסר פילטר [פילטר] \n לדוגמה: הסר פילטר אוכל \n ערוך פילטר [פילטר ישן] - [תשובה חדשה] \n לדוגמה: ערוך פילטר אוכל - אפרסק \n הראה פילטרים - מראה את רשימת הפילטרים הקיימים כעת \n \n _תיוגים_ \n תייג [אדם] \n לדוגמה: תייג יוסי \n הוסף חבר לתיוג [אדם] - [מספר טלפון] \n לדוגמה: הוסף חבר לתיוג יוסי - 972501234567 \n הסר חבר מתיוג [אדם] \n לדוגמה: הסר חבר מתיוג יוסי \n תייג כולם - מתייג את כל האנשים הנמצאים בקבוצה שיש להם תיוג מוגדר \n הראה רשימת חברים לתיוג - מראה את רשימת החברים לתיוג \n \n _ימי הולדת_ \n הוסף יום הולדת [אדם] - [שנה.חודש.יום] \n לדוגמה: הוסף יום הולדת שלמה - 27.6.2021 \n הסר יום הולדת [אדם] \n לדוגמה: הסר יום הולדת יוסי \n הראה ימי הולדת - מראה את רשימת ימי ההולדת הקיימים כעת \n \n _יצירת סטיקרים_  \n הפוך לסטיקר - הבוט הופך לסטיקר את התמונה שמשיבים אליה \n \n _סריקת קישורים_ \n סרוק [קישור] - הבוט יסרוק את הקישור הנתון לוירוסים ויקבע אם הוא בטוח \n \n _יצירת סקרים (לא פעיל בגלל תקלה של וואטסאפ)_ \n צור סקר \n כותרת - [כותרת סקר] \n כותרת משנה - [כותרת משנה] \n כותרת שלישית - [כותרת שלישית] \n כפתור1 - [אופציה ראשונה] \n כפתור2 - [אופציה שנייה] \n כפתור3 - [אופציה שלישית] \n (הכותרת השלישית והכפתורים השני והשלישי אופציונליים) \n \n _טיפ מיוחד!_  \n בהוספת פילטר אפשר גם להשתמש ב־[שם] בשביל לתייג מישהו בפילטר \n לדוגמה: 'הוסף פילטר אוכל - [יוסי]' יגרום לבוט לענות '@יוסי' ולתייג את יוסי",
            "en": "*English Instructions* \n To change the language type 'Change language to [whatever language you want]' \n For example: Change language to Hebrew \n Currently available languages are: English and Hebrew \n \n _Filters_ \n Add filter [filter] - [bot response] \n For example: Add filter food - banana \n Remove filter food \n For example: Remove filter food \n Edit filter [old filter] - [new response] \n For example: Edit filter food - peach \n Show filters - displays a list of filters defined in the group \n \n _Tags_ \n Tag [person] \n For example: Tag Joseph \n Add tag buddy [person] - [phone number] \n For example: Add tag buddy Joseph - 972501234567 \n Remove tag buddy [person] \n For example: Remove tag buddy Joseph \n Tag everyone - tags all people in the group who have a set tag \n Show tag buddies - displays a list of all tags defined in the group \n \n _Birthdays_ \n Add birthday [person] - [day.month.year] \n For example: Add birthday Joseph - 27.6.2021 \n Remove birthday [person] \n For example: Remove birthday Joseph \n Show birthdays - displays a list of all birthdays defined in the group \n \n _Sticker Making_ \n Make into sticker - the bot makes the replied to image into a sticker and sends it \n \n _Link Scanning_ \n Scan [link] - Scans the given link for viruses and determines if it's safe \n \n _Creating surveys (Inactive due to Whatsapp bug)_ \n Create survey \n Title - [title] \n Subtitle - [subtitle] \n Third title - [third title] \n Button1 - [first option] \n Button2 - [second option] \n Button3 - [third option] \n (The third title, second and third buttons are optional) \n \n _Special Tip!_ \n When creating a filter you can also use [person] to tag someone whenever the filter is invoked \n For example: 'Add filter food - [Joseph]' will make the bot say 'Joseph' and tag Joseph",
            "la": "*Instructiones in Lingua Latina* \nMutatum linguam - Muta lingua ad \nExampli gratia: Muta lingua ad Hebraice \nLinguae in sistema: Hebraice, et Anglicus et Latina. \n \n_Invenientes_ \nCrea invenientem [inveniens] - [responsum] \nExampli gratia: Crea invenientem Alexander - Magnus! \nDele invenientem [inveniens] \nExampli gratia: Dele invenientem Alexander \nRecense invenientem [reprehendens vetus] - [novum responsum] \nExampli gratia: Recense invenientem Alexander - Giganteus! \nOstende invenientes - Ostentum invenientes \n \n_Clamores_ \nClama ad [amico] \nExampli gratia: Clama ad Caesare \nAdde amicum Caesar - 972501234567 \nDele amicum \nExampli gratia: Dele amicum Caesar \nClama ad quoque - clamatum ad quoque \nOstende amici - ostentum amici \n \n_Natalis dies_ \nAdde natalis dies [homo] - [dies.mensis.annus] \nExampli gratia: Adde natalis dies Caesar - 5.7.-100 \nDele natalis dies [homo] \nExampli gratia: dele natalis dies Caesar \nOstende natalis dies - ostentum natalis dies \n \n_Creatio imagines_ \nFac hoc imaginem - factum similacrum imaginem \n \n_Investigation ligentes_ \nExamina [ligens] - examinatum lignes \n \n_Creatio census_ \nCrea census \nNomen - [Nomen] \nSubnomen - [Subnomen] \nNomen tertium - [Nomen tertium] \nButtonus1 - [Buttonus1] \nButtonus2 - [Buttonus2] \nButtonus3 - [Buttonus3]"
        }, "show_webpage": {
            "he": "הראה דף אינטרנט", "en": /(s|S)how webpage/, "la": /(o|O)stende situs texti/
        }, "show_webpage_reply": {
            "he": "קח קישור אחי: ",
            "en": "Here's the link you requested: ",
            "la": "Hic est ligens quod petitis: "
        }, "show_webpage_error": {
            "he": "הקישור לא עבד לי... סליחוש",
            "en": "Sorry bro, the link didn't work...",
            "la": "Paenito frater, sed ligens non oportetץץץ..."
        }
    }
}

module.exports = Strings;
