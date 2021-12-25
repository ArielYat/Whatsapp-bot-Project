class Strings {
    static strings = {
        //general
        "hyphen_reply": {
            "he": "כבודו אתה בטוח שהשתמשת במקף?",
            "en": "Are you sure you used a hyphen correctly?",
            "la": "Certusne tu adhibuisse recte eo iungente te?"
        }, "command_spam_reply": {
            "he": "וואי ילד תירגע עם הפקודות. זהו, אני לא מקשיב לך למשך 15 דקות",
            "en": "Chill out with all the commands kid. You won't be getting a responce out of me for the next 15 minutes",
            "la": "Retarda! Eo dormitum quoniam mittabas etiam multos invenientes"
        }, "filter_spam_reply": {
            "he": "כמה פילטרים שולחים פה? אני הולך לישון ל־15 דקות",
            "en": "Wow you're spamming filters, I'm going to sleep for 15 minutes",
            "la": "Retarda! Eo dormitum quoniam mittabas etiam multos invenientes"
        }, //filters
        "add_filter": {
            "he": "הוסף פילטר", "en": "Add filter", "la": "Crea invenientem"
        }, "add_filter_reply": {
            "he": "הפילטר %s נוסף בהצלחה",
            "en": "The filters %s has been successfully added",
            "la": "Invenientem %s creatur feliciter"
        }, "add_filter_already_exists_error": {
            "he": "הפילטר %s כבר קיים במאגר של קבוצה זו \n  אם אתה רוצה לערוך אותו תכתוב את זה: \n ערוך פילטר %s - %s",
            "en": "The filters %s already exists in this group \n If u want to edit the filters please write this: \n Edit filters %s - %s",
            "la": "Reprehendentem %s iam in systemae est \nScribe 'recense invenientem %s - %s' recensitum reprehendentem"
        }, "remove_filter": {
            "he": "הסר פילטר", "en": "Remove filter", "la": "Dele invenientem"
        }, "remove_filter_reply": {
            "he": "הפילטר %s הוסר בהצלחה",
            "en": "The filters %s has been successfully removed",
            "la": "Invenientem %s deletur feliciter"
        }, "remove_filter_doesnt_exist_error": {
            "he": "רק אלוהים יכול למחוק פילטר לא קיים",
            "en": "Only the god of light and all that is good can can delete a filters which doesn't exist",
            "la": "Deus Iupiter solum potest delere invenientem qui non exsistit"
        }, "group_doesnt_have_filters_error": {
            "he": "אין פילטרים בקבוצה זו",
            "en": "This group doesn't have any filters",
            "la": "Coetus hoc non habet invenientes"
        }, "edit_filter": {
            "he": "ערוך פילטר", "en": "Edit filter", "la": "Recense invenientem"
        }, "edit_filter_reply": {
            "he": "הפילטר %s נערך בהצלחה",
            "en": "The filters %s has been successfully edited",
            "la": "Invenientem %s recensetur felicitur"
        }, "edit_filter_error": {
            "he": "סליחה כבודו אבל אי אפשר לערוך פילטר שלא קיים",
            "en": "Apologies good sir, but you tried to edit a filter which doesn't exist in this group",
            "la": "Paenito, mihi amice, sed recensere invenientem non exsistentem impossibile est"
        }, "show_filters": {
            "he": "הראה פילטרים", "en": "Show filters", "la": "Ostende invenientes"
        }, //tags
        "tag": {
            "he": "תייג ", "en": "Tag ", "la": "Clama ad "
        }, "tag_person_doesnt_exist_error": {
            "he": "אתה בטוח שצדקת בשם? בכל מקרה האדם שניסית לתייג לא נמצא פה",
            "en": "The person you tried to tags doesn't exist",
            "la": "Quem debeo clamare? Is/ea non exsistet"
        }, "add_tag": {
            "he": "הוסף חבר לתיוג", "en": "Add tag buddy", "la": "Adde amicum"
        }, "add_tag_reply": {
            "he": "מספר הטלפון של האדם %s נוסף בהצלחה",
            "en": "The phone number of the person %s has been successfully added",
            "la": "Amicum %s additur feliciter"
        }, "add_tag_already_exists_error": {
            "he": "האדם %s כבר קיים במאגר של קבוצה זו",
            "en": "The person %s already exists in this group's database",
            "la": "Amicum %s iam exsistet in sistema"
        }, "add_tag_doesnt_exist_error": {
            "he": "מספר הטלפון לא קיים בקבוצה זו",
            "en": "This phone number does not exist in this group",
            "la": "Amicum non exsistet in coetu"
        }, "remove_tag": {
            "he": "הסר חבר מתיוג", "en": "Remove tag buddy", "la": "Dele amicum"
        }, "remove_tag_reply": {
            "he": "מספר הטלפון של האדם %s הוסר בהצלחה",
            "en": "The phone number of the person %s has been successfully removed",
            "la": "Amicum %s delitur feliciter"
        }, "remove_tag_doesnt_exist_error": {
            "he": "רק נפוליאון יכול למחוק אנשים לא קיימים",
            "en": "Only Napoleon can remove people who don't exist",
            "la": "Napoleonus solum potest delere amici non exsistentes"
        }, "group_doesnt_have_tags_error": {
            "he": "אין תיוגים לקבוצה זו", "en": "This group doesn't have any tags", "la": "Hoc coetus non habet amici"
        }, "tag_all": {
            "he": "תייג כולם", "en": "Tag everyone", "la": "Clama ad quoque"
        }, "show_tags": {
            "he": "הראה רשימת חברים לתיוג", "en": "Show tag buddies", "la": "Ostende amici"
        }, //birthdays
        "birthday_wishes_reply": {
            "he": "מזל טוב ל-- %s! הוא/היא בן/בת %s!",
            "en": "Happy birthday to %s! He/she is %s years old!",
            "la": "%s, felix sit natalis dies! Habes %s annos"
        }, "add_birthday": {
            "he": "הוסף יום הולדת", "en": "Add birthday", "la": "Adde natalis dies"
        }, "add_birthday_reply": {
            "he": "יום ההולדת של הבחור %s נוסף בהצלחה",
            "en": "%s's birthday has been successfully added",
            "la": "Natalis dies %s additur feliciter"
        }, "add_birthday_already_exists_error": {
            "he": "יום ההולדת של הבחור %s כבר קיים",
            "en": "%s's birthday already exists in this group",
            "la": "Natalis dies %s iam exsistet in hoc coetu"
        }, "date_existence_error": {
            "he": "מה לעזאזל זה השטויות האלה? אתה בטוח שזה תאריך מציאותי?",
            "en": "Are you sure what you inputted is a date or something along those lines?",
            "la": "Certusne tu hoc natalis dies esse?"
        }, "date_syntax_error": {
            "he": "תראה אתה אמור להשתמש בשתי נקודות כשאתה כותב תאריך אבל מי אני שאשפוט",
            "en": "Yeah that's not how you write a date... You should be using periods",
            "la": "Rescribe dies cum periodes"
        }, "remove_birthday": {
            "he": "הסר יום הולדת", "en": "Remove birthday", "la": "Dele natalis dies"
        }, "remove_birthday_reply": {
            "he": "יום ההולדת של הבחור %s הוסר בהצלחה",
            "en": "%s's birthday has been successfully removed",
            "la": "%s natalis dies delitur feliciter"
        }, "remove_birthday_doesnt_exist_error": {
            "he": "רק דוקטור דופנשמירץ יכול למחוק ימי הולדת לא קיימים",
            "en": "Only Dr. Doofenshmirtz can remove birthday which don't exist",
            "la": "Doctor Doofenshmirtz solum potest delere natalis dies non exsistentes"
        }, "group_doesnt_have_birthdays_error": {
            "he": "אין לקבוצה זו ימי הולדת",
            "en": "This group don't have any birthday registered",
            "la": "Hoc coetus non habet natalis dies"
        }, "add_birthday_to_group": {
            "he": "הוסף קבוצה להודעת יום הולדת", "en": "Add group to birthday message", "la": null
        }, "birthday_added_to_group_reply": {
            "he": "הקבוצה נוספה בהצלחה לרשימת התפוצה של ימי הולדת שלך",
            "en": "The group has been successfully added to this person's birthday message broadcast list",
            "la": null
        }, "birthday_added_to_group_error": {
            "he": "הקבוצה כבר קיימת ברשימת התפוצה של ימי ההולדת שלך",
            "en": "This group is already in your birthday message's broadcast",
            "la": null
        }, "remove_birthday_from_group": {
            "he": "הסר קבוצה מהודעת יום ההולדת", "en": "Remove group from birthday message", "la": null
        }, "birthday_removed_from_group_reply": {
            "he": "הקבוצה הוסרה בהצלחה מרשימת התפוצה של ימי הולדת של אדם זה",
            "en": "The group has been successfully removed from this person's birthday message broadcast list",
            "la": null
        }, "birthday_removed_from_group_error": {
            "he": "רק סמי יכול להסיר קבוצות שלא קיימות ברשימת התפוצה שלך",
            "en": "Only Sammy can remove groups which aren't in your birthday message's broadcast",
            "la": null
        }, "person_doesnt_have_birthday_groups_error": {
            "he": "לבחורצ'יק כאן אין יום הולדת (מוגדר)",
            "en": "This man does not have a birthday (defined)",
            "la": null
        }, "show_birthdays": {
            "he": "הראה ימי הולדת", "en": "Show birthdays", "la": "Ostende natalis dies"
        }, //permissions & muting
        "set_permissions": {
            "he": "קבע הרשאה ל", "en": "Define permission for", "la": null
        }, "set_permissions_reply": {
            "he": "ההרשאה שונתה בהצלחה",
            "en": "Permission changed successfully",
            "la": null
        }, "set_permissions_error": {
            "he": "אין לך הרשאה מספיק גבוהה בשביל מה שניסית לעשות",
            "en": "You don't have a high enough clearance level for what you were trying to do",
            "la": null
        }, "permission_option_does_not_exist_error": {
            "he": "רק האיש והאגדה משה יכול לשנות אופציה לא קיימת",
            "en": "Only the man, the myth, the legend Moses can select a nonexistent option",
            "la": null
        }, "filters": {
            "he": "פילטרים", "en": "filters", "la": null
        }, "tags": {
            "he": "תיוגים", "en": "tags", "la": null
        }, "handleFilters": {
            "he": "טיפולבפילטרים", "en": "handleFilters", "la": null
        }, "handleTags": {
            "he": "טיפולבתיוגים", "en": "handleTags", "la": null
        }, "handleBirthdays": {
            "he": "טיפולבימיהולדת", "en": "handleBirthdays", "la": null
        }, "handleOthers": {
            "he": "טיפולבשונות", "en": "handleOthers", "la": null
        }, "show_group_permissions": {
            "he": "הראה הרשאות",
            "en": "Show permissions",
            "la": null
        }, "mute_participant": {
            "he": "השתק ", "en": "Mute ", "la": null
        }, "mute_participant_reply": {
            "he": "המשתמש %s לא יכול להשתמש בפקודות יותר",
            "en": "User %s cannot use commands anymore",
            "la": null
        }, "unmute_participant": {
            "he": "בטל השתקה", "en": "Unmute person", "la": null
        }, "unmute_participant_reply": {
            "he": "המשתמש %s יכול להשתמש בפקודות שוב",
            "en": "User %S can use commands again",
            "la": null
        }, "participant_not_in_group_error": {
            "he": "אני יכול להשתיק רק מישהו שכתב בקבוצה פעם. סליחה!",
            "en": "I can only mute someone who has been in this group in the past. Sorry!",
            "la": null
        }, "no_participant_chosen_error": {
            "he": "אני לא יכול להשתיק את אף אחד, אתה חייב לבחור מישהו",
            "en": "I can't mute nobody, you gotta choose someone",
            "la": null
        }, //stickers
        "make_sticker": {
            "he": "הפוך לסטיקר", "en": "Create sticker", "la": "Fac hoc imaginem"
        }, "not_sticker_material_error": {
            "he": "טיפש אי אפשר להפוך משהו שהוא לא תמונה או סרטון לסטיקר",
            "en": "Idiot, a sticker has to be an image or a video",
            "la": "Hoc non est similacrum"
        }, //links
        "scan_link": {
            "he": "סרוק ", "en": "Scan ", "la": "Examina "
        }, "link_validity_error": {
            "he": "חביבי, זה לא קישור תקין", "en": "bro that's not a valid link", "la": null
        }, "scan_link_checking_reply": {
            "he": "%s \n בודק...", "en": "%s \n Checking...", "la": "%s \n Examino..."
        }, "scan_link_result_reply": {
            "he": " וואלה אחי בדקתי את הקישור כמו שביקשת ומצאתי ש־%s אנטי וירוסים מצאו אותו סאחי",
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
        }, //surveys
        "create_survey": {
            "he": "צור סקר", "en": "Create survey", "la": "Crea census"
        }, "survey_title": {
            "he": /כותרת - (.)+/,
            "en": /Title - (.)+/,
            "la": /Nomen - (.)+/
        },
        "survey_subtitle": {
            "he": /כותרת משנה - (.)+/,
            "en": /Subtitle - (.)+/,
            "la": /Subnomen - (.)+/
        },
        "third_survey_title": {
            "he": /כותרת שלישית - (.)+/,
            "en": /Third title - (.)+/,
            "la": /Nomen tertium - (.)+/
        },
        "survey_button_1": {
            "he": /כפתור1 - (.)+/,
            "en": /Button1 - (.)+/,
            "la": /Buttonus1 - (.)+/
        },
        "survey_button_2": {
            "he": /כפתור2 - (.)+/,
            "en": /Button2 - (.)+/,
            "la": /Buttonus2 - (.)+/
        },
        "survey_button_3": {
            "he": /כפתור3 - (.)+/,
            "en": /Button3 - (.)+/,
            "la": /Buttonus3 - (.)+/

        }, "survey_title_replace": {
            "he": "כותרת -", "en": "Title -", "la": "Nomen -"
        }, "second_survey_title_replace": {
            "he": "כותרת משנה -", "en": "Body -", "la": "Subnomen -"
        }, "third_survey_title_replace": {
            "he": "כותרת שלישית -", "en": "Footer -", "la": "Nomen tertium -"
        }, "survey_button_1_replace": {
            "he": "כפתור 1 -", "en": "Button 1 -", "la": "Buttonus 1 -"
        }, "survey_button_2_replace": {
            "he": "כפתור 2 -", "en": "Button 2 -", "la": "Buttonus 2 -"
        }, "survey_button_3_replace": {
            "he": "כפתור 3 -", "en": "Button 3 -", "la": "Buttonus 3 -"
        }, "survey_creation_error": {
            "he": "אני צריך כותרת, כותרת משנה ולפחות כפתור אחד בשביל ליצור סקר",
            "en": "I need a title, a body and at least one button to make a survey",
            "la": "Necessitudines sunt nomen atque subnomen atque buttonus namque census"
        }, //website
        "show_webpage": {
            "he": "שלח קישור", "en": "Send link", "la": "Ostende situs texti"
        }, "show_webpage_reply": {
            "he": "קח את הקישור אחי: %s",
            "en": "Here's the link you requested: %s",
            "la": "Hic est ligens quod petitis: %s"
        }, "show_webpage_error": {
            "he": "הקישור לא עבד לי... סליחוש",
            "en": "Sorry bro, the link didn't work...",
            "la": "Paenito frater, sed ligens non oportet..."
        }, //language
        "change_language": {
            "he": "שנה שפה", "en": "Change language to", "la": "Muta lingua ad"
        }, "language_change_reply": {
            "he": "השפה שונתה בהצלחה", "en": "Language successfully changed", "la": "Lingua mutatur feliciter"
        }, "language_change_error": {
            "he": "בימינו רק עברית, אנגלית ולטינית נתמכות על ידי הבוט",
            "en": "Only Hebrew, English and Latin are currently supported by the bot",
            "la": "Tantum Lingua Hebraice, Anglice et Latine nunc sustentantur per bot."
        }, "help": {
            "he": "עזרה", "en": "Help", "la": "Auxilium"
        }, "help_reply": {
            "he": `*הוראות בעברית*
 _שפה_: 
 "שנה שפה ל[שפה]" - משנה את בה הבוט מקבל ומגיב לפקודות 
 לדוגמה: שנה שפה לאנגלית 
  פקודה זו יכולה להישמש בכל זמן בכל שפה
שפות שנתמכות כעת: עברית, אנגלית ולטינית  
  
 _פילטרים_: 
"הוסף פילטר [פילטר] - [תגובת הבוט]" - מוסיף פילטר לקבוצה  
 לדוגמה: הוסף פילטר אוכל - בננה 
"הסר פילטר [פילטר]" - מסיר את הפילטר המצויין מהקבוצה  
 לדוגמה: הסר פילטר אוכל 
"ערוך פילטר [פילטר קיים] - [תשובה חדשה]" - עורך פילטר קיים בקבוצה  
 לדוגמה: ערוך פילטר אוכל - אפרסק 
"הראה פילטרים" - מציג את רשימת הפילטרים הקיימים כעת בקבוצה  
  
 _תיוגים_: 
"תייג [אדם]" - מתייג אדם כך שיראה הודעה גם אם הקבוצה מושתקת אצלו  
 לדוגמה: תייג יוסי 
"הוסף חבר לתיוג [אדם] - [מספר טלפון בפורמט בין לאומי]" - מוסיף אדם לתיוג בקבוצה  
 לדוגמה: הוסף חבר לתיוג יוסי - 972501234567 
"הסר חבר מתיוג [אדם]" - מסיר אדם מתיוג בקבוצה  
 לדוגמה: הסר חבר מתיוג יוסי 
"תייג כולם" - מתייג את כל האנשים שנמצאים בקבוצה  
"הראה רשימת חברים לתיוג" - מציג את רשימת החברים לתיוג שמוגדרים בקבוצה  
  
 _ימי הולדת_: 
  "הוסף יום הולדת - [תאריך מנוקד בפורמט בינלאומי הפוך]" - מוסיף יום הולדת לכותב ההודעה
  לדוגמה: הוסף יום הולדת 1.11.2011
  "הסר יום הולדת" - מסיר את יום ההולדת של כותב ההודעה
  לדוגמה: הסר יום הולדת
  הוסף קבוצה להודעת יום הולדת - מוסיף את הקבוצה בה נשלחה ההודעה לרשימת התפוצה של הודעת יום ההולדת של כותב ההודעה
  הסר קבוצה מהודעת יום הולדת - מסיר את הקבוצה בה נשלחה ההודעה מרשימת התפוצה של הודעת יום ההולדת של כותב ההודעה
  הראה ימי הולדת - מציג את ימי ההולדת של כל חברי הקבוצה
  
  _הרשאות והשתקות_:
  סוגי ההרשאות: פילטרים, תיוגים, טיפולבפילטרים, טיפולבתיוגים, טיפולבימיהולדת, טיפולבשונות
  משמעות המספר: 0 - חבר קבוצה מושתק, 1 - חבר קבוצה רגיל, 2 - מנהל קבוצה
  "קבע הרשאה ל[סוג הרשאה] - [מספר מ־0 עד 2]" - קובע את רמה ההרשאה הנדרשת לסוג פקודות מסוים
  לדוגמה: קבע הרשאה לפילטרים - 1
  "הראה הרשאות" - מציג את רמות ההרשאות של סוגי הפקודות השונים
  "השתק [תיוג של אדם]" - משתיק את האדם המתוייג כך שלא יוכל להשתמש בפקודות
  לדוגמה: השתק @יוסי
  "בטל השתקה [תיוג של אדם]" - מבטל את ההשתקה של האדם המתוייג
  לדוגמה: בטל השתקה @יוסי
  
 _סטיקרים_ - הופך מדיה לסטיקר ושולח אותו: 
 "הפוך לסטיקר" 
 ניתן להשתמש בפקודה גם בהודעה בה שולחים את התמונה/סרטון וגם בתור תגובה אליה 
  
 _סריקת קישורים_ - סורק קישור לוירוסים: 
  "סרוק [קישור]"
  לדוגמה: סרוק https://www.google.com/
  
 _סקרים_ - יוצר סקר של וואטסאפ: 
 צור סקר 
 כותרת - [כותרת סקר] 
 כותרת משנה - [כותרת משנה] 
 כותרת שלישית - [כותרת שלישית] 
 כפתור 1 - [אופציה ראשונה] 
 כפתור 2 - [אופציה שנייה] 
 כפתור 3 - [אופציה שלישית] 
 (הכותרת השלישית והכפתורים השני והשלישי אופציונליים) 
  
  _אתר אינטרנט_ (בתהליך עבודה):
  "שלח קישור" - שולח קישור לאתר
  
 _טיפ מיוחד!_ 
 בהוספת פילטר אפשר גם להשתמש ב[שם] בשביל לתייג מישהו כשהפילטר נקרא 
  לדוגמה: "הוסף פילטר אוכל - [יוסי]" יגרום לבוט לתייג את יוסי כשנאמר "אוכל"
  
  _קרדיטים_
  מפותח ומתוחזק על ידי אריאל יצקן ואיתן עמירן
  קישור ל־Github Repository, לסקרנים: https://github.com/ArielYat/Whatsapp-bot-Project`,
            "en": `*English Instructions* \n  _Language_:\n  "Change language to [language]" - changes the language the bot receives and sends messages in\n  For example: Change language to Hebrew\n  This command can be used at all times in every language\n  Languages currently supported: Hebrew, English & Latin\n  \n  _Filters_:\n  "Add filter [filter] - [bot reply]" - adds a filter to the group\n  For example: Add filter food - banana\n  "Remove filter [filter]" - removes the specified filter from the group\n  For example: Remove filter food\n  "Edit filter [existing filter] - [new reply]" - edits the specified filter\n  For example: Edit filter food - peach\n  "Show filters" - displays the list of all filter and their replies in the group\n  \n  _Tags_:\n  "Tag [person]" - tags someone so that they get a notification even if the group is muted on their phone\n  For example: Tag Joseph\n  "Add tag buddy [name] - [phone number in international format]" - adds the person to the list of taggable people\n  For example: Add tagging buddy Joseph - 972501234567\n  "Remove tag buddy [name]" - removes the person from the list of taggable people\n  For example: Remove tagging buddy Joseph\n  "Tag everyone" - tags all people in the group\n  "Show tag buddies" - displays the list of all taggable people in the group\n  \n  _Birthdays_:\n  "Add birthday [date in reverse international format with periods]" - adds a birthday for message's author\n  For example: Add birthday 1.11.2011\n  "Remove birthday" - removes the author's birthday\n  For example: Remove birthday\n  "Add group to birthday message" - adds the group the message was sent in to the author's birthday message broadcast\n  "Remove group from birthday message" - removes the group the message was sent in from the author's birthday message broadcast\n  "Show birthdays" - displays the birthdays of the group members  \n  \n  _Permissions & Muting_:\n  Permission types: filters, tags, handleFilters, handleTags, HandleBirthdays, HandleOthers\n  Number meaning: 0 - muted member, 1 - regular member, 2 - group admin\n  "Define permission for [permission type] - [number from 0 to 2]" - defines the permission level required for a certain type of commands\n  For example: Define permission filters - 1\n  "Show permissions" - displays the permissions levels of the different types of commands\n  "Mute [person tag]" - mutes the tagged person so they aren't able to use commands\n  For example: Mute @Joseph\n  "Unmute person [person tag]" - unmutes the tagged person\n  For example: Unmute @Joseph  \n  \n  \n  _Stickers_ - creates a sticker out of an image or a video and sends it:\n  "Create sticker"\n  This command can be used in the message the media was sent in and as a reply to it\n  \n  _Scanning_ - scans the given link for viruses:\n  "Scan [link]"\n  For example: Scan https://www.google.com/\n  \n  _Surveys_ - Creates a WhatsApp survey:\n  Create survey\n  Title - [survey title]\n  Subtitle - [survey subtitle]\n  Third Title - [third title]\n  Button 1 - [first option]\n  Button 2 - [second option]\n  Button 3 - [third option]\n  (The third title and buttons 1 and 2 aren't required)\n  \n  _Website_ (work in progress):\n  "Send link" - sends a link to the webpage\n  \n  _Special tip!_\n  When adding a filter you can use [name] to tag someone when the filter is invoked\n  For example: "Add filter food - [Joseph]" will make the bot tag Joseph whenever "food" is said\n  \n  _Credits_\n  Developed and maintained by Ariel Yatskan and Ethan Amiran\n  The GitHub repository, for the curious: https://github.com/ArielYat/Whatsapp-bot-Project`,
            "la": null
        }, "start_message": {
            "all": `שלום, אני אלכס!\nכדי לשנות שפה כתבו "שנה שפה ל[שפה שאתם רוצים לשנות לה]".\nהשפה בררת המחדל היא עברית, והשפות האפשריות כעת הן עברית, אנגלית ולטינית.\nכדי להציג את הודעת העזרה כתבו "הראה עזרה" בשפה הפעילה.\n\n\nHello, I'm Alex!\nTo change language type "Change language to [language you want to change to]".\nThe default language is Hebrew, and the currently available languages are Hebrew, English and Latin.\nTo display a help message type "Show help" in the active language.\n\n\nSalve amici, Alex sum!\nMea lingua mutatum, scriba "Muta lingua ad [lingua quam desideras]".\nLingua Hebraica defalta est, et in sistema Linguae Anglica et Latina sunt.\nPropter auxilium, scriba "Ostende auxilium" in mea lingua.`
        }
    }
}

module.exports = Strings;
