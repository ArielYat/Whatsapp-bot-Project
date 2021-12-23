class Strings {
    static strings = {
        "hyphen_reply": {
            "he": "כבודו אתה בטוח שהשתמשת במקף?",
            "en": "Are you sure you used a hyphen correctly?",
            "la": "Certusne tu adhibuisse recte eo iungente te?"
        }, "command_spam": {
            "he": "וואי ילד תירגע עם הפקודות. זהו, אני לא מקשיב לך למשך 15 דקות",
            "en": "Chill out with all the commands kid. You won't be getting a responce out of me for the next 15 minutes",
            "la": "Retarda! Eo dormitum quoniam mittabas etiam multos invenientes"
        }, "add_filter": {
            "he": "הוסף פילטר", "en": /([aA])dd filters/, "la": /([cC])rea invenientem/
        }, "add_filter_reply": {
            "he": "הפילטר %s נוסף בהצלחה",
            "en": "The filters %s has been successfully added",
            "la": "Invenientem %s creatur feliciter"
        }, "add_filter_error_already_exists": {
            "he": "הפילטר %s כבר קיים במאגר של קבוצה זו \n  אם אתה רוצה לערוך אותו תכתוב את זה: \n ערוך פילטר %s - %s",
            "en": "The filters %s already exists in this group \n If u want to edit the filters please write this: \n Edit filters %s - %s",
            "la": "Reprehendentem %s iam in systemae est \nScribe 'recense invenientem %s - %s' recensitum reprehendentem"
        }, "remove_filter": {
            "he": "הסר פילטר", "en": /([rR])emove filters/, "la": /([dD])ele invenientem/
        }, "remove_filter_reply": {
            "he": "הפילטר %s הוסר בהצלחה",
            "en": "The filters %s has been successfully removed",
            "la": "Invenientem %s deletur feliciter"
        }, "remove_filter_error_doesnt_exist": {
            "he": "רק אלוהים יכול למחוק פילטר לא קיים",
            "en": "Only the god of light and all that is good can can delete a filters which doesn't exist",
            "la": "Deus Iupiter solum potest delere invenientem qui non exsistit"
        }, "group_doesnt_have_filters_error": {
            "he": "אין פילטרים בקבוצה זו",
            "en": "This group doesn't have any filters",
            "la": "Coetus hoc non habet invenientes"
        }, "edit_filter": {
            "he": "ערוך פילטר", "en": /([eE])dit filters/, "la": /([rR])ecense invenientem/
        }, "edit_filter_reply": {
            "he": "הפילטר %s נערך בהצלחה",
            "en": "The filters %s has been successfully edited",
            "la": "Invenientem %s recensetur felicitur"
        }, "edit_filter_error": {
            "he": "סליחה כבודו אבל אי אפשר לערוך פילטר שלא קיים וגם אי אפשר לערוך פילטר בלי באמת לעורכו",
            "en": "Apologies good sir, but you tried to edit a filter which doesn't exist in this group, or you didn't change the response",
            "la": "Paenito, mihi amice, sed recensere invenientem non exsistentem impossibile est"
        }, "show_filters": {
            "he": "הראה פילטרים", "en": /([sS])how filters/, "la": /([oO])stende invenientes/
        }, "filter_spam": {
            "he": "כמה פילטרים שולחים פה? אני הולך לישון ל־15 דקות",
            "en": "Wow you're spamming filters, I'm going to sleep for 15 minutes",
            "la": "Retarda! Eo dormitum quoniam mittabas etiam multos invenientes"
        }, "tag": {
            "he": "תייג ", "en": /([tT])ag /, "la": /([cC])lama ad /
        }, "tag_person_error_doesnt_exist": {
            "he": "אתה בטוח שצדקת בשם? בכל מקרה האדם שניסית לתייג לא נמצא פה",
            "en": "The person you tried to tags doesn't exist",
            "la": "Quem debeo clamare? Is/ea non exsistet"
        }, "add_tag": {
            "he": "הוסף חבר לתיוג", "en": /([aA])dd tags buddy/, "la": /([aA])dde amicum/
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
            "he": "הסר חבר מתיוג", "en": /([eE])emove tags buddy/, "la": /([dD])ele amicum/
        }, "remove_tag_reply": {
            "he": "מספר הטלפון של האדם %s הוסר בהצלחה",
            "en": "The phone number of the person %s has been successfully removed",
            "la": "Amicum %s delitur feliciter"
        }, "remove_tag_error_doesnt_exist": {
            "he": "רק נפוליאון יכול למחוק אנשים לא קיימים",
            "en": "Only Napoleon can remove people who don't exist",
            "la": "Napoleonus solum potest delere amici non exsistentes"
        }, "group_doesnt_have_tags_error": {
            "he": "אין תיוגים לקבוצה זו", "en": "This group doesn't have any tags", "la": "Hoc coetus non habet amici"
        }, "tag_all": {
            "he": "תייג כולם", "en": /([tT])ag everyone/, "la": /([cC])lama ad quoque/
        }, "show_tags": {
            "he": "הראה רשימת חברים לתיוג", "en": /([sS])how tags buddies/, "la": /([oO])stende amici/
        }, "send_birthday_wishes": {
            "he": "מזל טוב ל%s! הוא/היא בן/בת %s!",
            "en": "Happy birthday to %s! He/she is %s years old!",
            "la": "%s, felix sit natalis dies! Habes %s annos"
        }, "add_birthday": {
            "he": "הוסף יום הולדת", "en": /([aA])dd birthday/, "la": /([aA])dde natalis dies/
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
            "he": "הסר יום הולדת", "en": /([rR])emove birthday/, "la": /([dD])ele natalis dies/
        }, "remove_birthday_reply": {
            "he": "יום ההולדת של האדם %s הוסר בהצלחה",
            "en": "%s's birthday has been successfully removed",
            "la": "%s natalis dies delitur feliciter"
        }, "remove_birthday_error_doesnt_exist": {
            "he": "רק דוקטור דופנשמירץ יכול למחוק ימי הולדת לא קיימים",
            "en": "Only Dr. Doofenshmirtz can remove birthday which don't exist",
            "la": "Doctor Doofenshmirtz solum potest delere natalis dies non exsistentes"
        }, "group_doesnt_have_birthdays_error": {
            "he": "אין לקבוצה זו ימי הולדת",
            "en": "This group don't have any birthday registered",
            "la": "Hoc coetus non habet natalis dies"
        }, "person_doesnt_have_birthday_groups_error": {
            "he": "אין לאדם זה קבוצות לפרסום הודעת ימי ההולדת",
            "en": "This person does not have groups in which to publish his birthday message",
            "la": null
        }, "add_group_birthDay": {
            "he": "הוסף קבוצה להודעת יום הולדת", "en": /([aA])dd group to birthday message/, "la": null
        }, "birthDay_added_to_group_reply": {
            "he": "הקבוצה נוספה בהצלחה לרשימת התפוצה של ימי הולדת של אדם זה",
            "en": "The group has been successfully added to this person's birthday message broadcast list",
            "la": null
        }, "birthDay_added_to_group_error": {
            "he": "אני לא בטוח את מי אתה מנסה להוסיף אבל מעולם לא פגשתי את האדם הזה",
            "en": "I'm unsure of who you're trying to add as I've never met this human before",
            "la": null
        }, "remove_group_birthDay": {
            "he": "הסר קבוצה מהודעת יום ההולדת", "en": /([rR])emove group from birthday message/, "la": null
        }, "birthDay_removed_from_group_reply": {
            "he": "הקבוצה הוסרה בהצלחה ממאגר ימי הולדת של אדם זה",
            "en": "The group has been successfully removed from this person's birthday message broadcast list",
            "la": null
        }, "birthDay_removed_from_group_error": {
            "he": "אני לא בטוח את מי אתה מנסה להסיר אבל אני לא יכול להעיף אדם שלא פגשתי",
            "en": "I'm unsure of who you're trying to remove as I've never met this human before",
            "la": null
        }, "show_birthdays": {
            "he": "הראה ימי הולדת", "en": /([sS])how birthday/, "la": /([oO])stende natalis dies/
        }, "make_sticker": {
            "he": "הפוך לסטיקר", "en": /([cC])reate sticker/, "la": /([fF])ac hoc imaginem/
        }, "not_sticker_material_error": {
            "he": "טיפש אי אפשר להפוך משהו שהוא לא תמונה או סרטוןלסטיקר",
            "en": "Idiot, a sticker has to be an image or a video",
            "la": "Hoc non est similacrum"
        }, "scan_link": {
            "he": "סרוק", "en": /([sS])can/, "la": /([eE])xamina/
        }, "scan_link_error": {
            "he": "חביבי, זה לא קישור תקין", "en": "bro that's not a valid link", "la": null
        }, "scan_link_checking": {
            "he": "%s \n בודק...", "en": "%s \n Checking...", "la": "%s \n Examino..."
        }, "scan_link_result": {
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
        }, "create_survey": {
            "he": "צור סקר", "en": /([cC])reate survey/, "la": /([cC])rea census/
        }, "survey_title": {
            "he": /כותרת - (\w)+/, "en": /Title - (\w)+/, "la": /Nomen - (\w)+/
        }, "survey_subtitle": {
            "he": /כותרת משנה - (\w)+/, "en": /Subtitle - (\w)+/, "la": /Subnomen - (\w)+/
        }, "third_survey_title": {
            "he": /כותרת שלישית - (\w)+/, "en": /Third title - (.)+/, "la": /Nomen tertium - (.)+/
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
            "he": "אני צריך כותרת, כותרת משנה ולפחות כפתור אחד בשביל ליצור סקר",
            "en": "I need a title, a body and at least one button to make a survey",
            "la": "Necessitudines sunt nomen atque subnomen atque buttonus namque census"
        }, "show_webpage": {
            "he": "שלח קישור", "en": /([sS])end link/, "la": /([oO])stende situs texti/
        }, "show_webpage_reply": {
            "he": "קח את הקישור אחי: %s",
            "en": "Here's the link you requested: %s",
            "la": "Hic est ligens quod petitis: %s"
        }, "show_webpage_error": {
            "he": "הקישור לא עבד לי... סליחוש",
            "en": "Sorry bro, the link didn't work...",
            "la": "Paenito frater, sed ligens non oportet..."
        }, "change_language": {
            "he": "שנה שפה", "en": /([cC])hange language to/, "la": /([mM])uta lingua ad/
        }, "language_change_reply": {
            "he": "השפה שונתה בהצלחה", "en": "Language successfully changed", "la": "Lingua mutatur feliciter"
        }, "language_change_error": {
            "he": "בימינו רק עברית, אנגלית ולטינית נתמכות על ידי הבוט",
            "en": "Only Hebrew, English and Latin are currently supported by the bot",
            "la": "Tantum Lingua Hebraice, Anglice et Latine nunc sustentantur per bot."
        }, "help": {
            "he": "הראה עזרה", "en": /([sS])how help/, "la": /([oO])stende auxilium/
        }, "help_reply": {
            "he": `*הוראות בעברית*
 _שפה_ - השפה בה הבוט יגיב לפקודות: 
 "שנה שפה ל[איזו שפה שאתה רוצה]" 
 לדוגמה: שנה שפה לאנגלית 
  פקודה זו יכולה להישמש בכל זמן בכל שפה
 שפות שקיימות כעת: עברית, אנגלית ולטינית 
  
 _פילטרים_ - מילים שהבוט יענה להן באופן אוטומטי עם התגובה המוגדרת: 
"הוסף פילטר [פילטר] - [תגובת הבוט]"  
 לדוגמה: הוסף פילטר אוכל - בננה 
"הסר פילטר [פילטר]"  
 לדוגמה: הסר פילטר אוכל 
"ערוך פילטר [פילטר קיים] - [תשובה חדשה]"  
 לדוגמה: ערוך פילטר אוכל - אפרסק 
"הראה פילטרים" - מראה את רשימת הפילטרים הקיימים כעת  
  
 _תיוגים_ - האדם המתוייג יקבל התראה גם אם הקבוצה מושתקת אצלו בטלפון: 
"תייג [אדם]"  
 לדוגמה: תייג יוסי 
"הוסף חבר לתיוג [אדם] - [מספר טלפון בפורמט בין לאומי]"  
 לדוגמה: הוסף חבר לתיוג יוסי - 972501234567 
"הסר חבר מתיוג [אדם]"  
 לדוגמה: הסר חבר מתיוג יוסי 
"תייג כולם" - מתייג את כל האנשים הנמצאים בקבוצה שיש להם תיוג מוגדר  
"הראה רשימת חברים לתיוג" - מראה את רשימת החברים לתיוג  
  
 _ימי הולדת_ - הבוט יתריע בקבוצה על ימי ההולדת של חברי הקבוצה: 
 "הוסף יום הולדת [אדם] - [שנה.חודש.יום]" 
 לדוגמה: הוסף יום הולדת שלמה - 27.6.2021 
"הסר יום הולדת [אדם]"  
 לדוגמה: הסר יום הולדת יוסי 
 "הראה ימי הולדת" - מראה את רשימת ימי ההולדת הקיימים כעת 
  
 _סטיקרים_ - יצירת סטיקר מתמונה או מסרטון: 
 "הפוך לסטיקר" באותה הודעה בה נשלחים תמונה או סטיקר 
  
 _סריקת קישורים_ - סריקת קישור לווירוסים וקביעה אם הוא בטוח: 
 "סרוק [קישור]" 
  
 _סקרים_ - יצירת סקר של וואטסאפ: 
 צור סקר 
 כותרת - [כותרת סקר] 
 כותרת משנה - [כותרת משנה] 
 כותרת שלישית - [כותרת שלישית] 
 כפתור1 - [אופציה ראשונה] 
 כפתור2 - [אופציה שנייה] 
 כפתור3 - [אופציה שלישית] 
 (הכותרת השלישית והכפתורים השני והשלישי אופציונליים) 
  
  _אתר האינטרנט: (בתהליך עבודה) - אתר לשליטה על עוד אופציות של הבוט:
  "שלח קישור"
  
 _טיפ מיוחד!_ 
 בהוספת פילטר אפשר גם להשתמש ב־[שם] בשביל לתייג מישהו בפילטר 
  לדוגמה: "הוסף פילטר אוכל - [יוסי]" יגרום לבוט לתייג את יוסי
  
  מפותח ומתוחזק על ידי אריאל יצקן ואיתן עמירן
  קישור ל־Github Repository שלי, לסקרנים: https://github.com/ArielYat/Whatsapp-bot-Project`, "en": `*English Instructions* 
  _Language_ - the language in which the bot will respond to commands:
  "Change language to [whatever language you want]" 
  For example: Change language to Hebrew
  This command can be used at all time in all languages
  Currently available languages are: Hebrew, English and Latin
  
  _Filters_ - words the bot will automagically respond to which a preset response: 
  "Add filters [filters] - [bot response]" 
  For example: Add filters food - banana
  "Remove filters food"
  For example: Remove filters food
  "Edit filters [existing filters] - [new response]" 
  For example: Edit filters food - peach
  "Show filters" - displays a list of filters defined in the group 
  
  _Tags_ - the person tagged will receive a notification even if the group they muted the group:
  "Tag [person]"
  For example: Tag Joseph
  "Add tags buddy [person] - [phone number in the international format]"
  For example: Add tags buddy Joseph - 972501234567 
  "Remove tags buddy [person]"
  For example: Remove tags buddy Joseph
  "Tag everyone" - tags all people in the group who have a set tags
  "Show tags buddies" - displays a list of all tags defined in the group 
  
  _Birthdays_ - the bot will alert the group on everyone's birthday:
  "Add birthday [person] - [day.month.year]"
  For example: Add birthday Joseph - 27.6.2021 
  "Remove birthday [person]"
  For example: Remove birthday Joseph
  "Show birthday" - displays a list of all birthday defined in the group 
  
  _Stickers_ - create a sticker from an image or a video:
  "Create sticker" in the same message the image/video is sent 
  
  _Link Scanning_ - scan a link for viruses and determine if it's safe:
  "Scan [link]" 
  
  _Surveys_ - create a WhatsApp survey:
  Create survey
  Title - [title]
  Subtitle - [subtitle]
  Third title - [third title] 
  Button1 - [first option]
  Button2 - [second option] 
  Button3 - [third option] 
  (The third title, second and third buttons are optional)
  
  _Link to website_ (work in progress) - to control more bot options:
  "Send link"
  
  _Special Tip!_
  When creating a filters you can also use [person] to tags someone whenever the filters is invoked 
  For example: "Add filters food - [Joseph]" will make the bot tags Joseph
  
  Developed and maintained by Ariel Yatskan and Ethan Amiran
  Link to the Github Repository, for the curious: https://github.com/ArielYat/Whatsapp-bot-Project`, "la": `*Instructiones in Lingua Latina
  __
  "Muta lingua ad []" 
  Exampli gratia: Muta lingua ad Hebraice 
  Linguae in sistema: Hebraice, et Anglicus et Latina. 
  
  _Invenientes_ - :
  Crea invenientem [inveniens] - [responsum] 
  Exampli gratia: Crea invenientem Alexander - Magnus! 
  Dele invenientem [inveniens] 
  Exampli gratia: Dele invenientem Alexander 
  Recense invenientem [reprehendens vetus] - [novum responsum] 
  Exampli gratia: Recense invenientem Alexander - Giganteus! 
  Ostende invenientes - Ostentum invenientes 
  
  _Clamores_ - :
  Clama ad [amico] 
  Exampli gratia: Clama ad Caesare 
  Adde amicum Caesar - 972501234567 
  Dele amicum 
  Exampli gratia: Dele amicum Caesar 
  Clama ad quoque - clamatum ad quoque 
  Ostende amici - ostentum amici 
  
  _Natalis dies_ - :
  Adde natalis dies [homo] - [dies.mensis.annus] 
  Exampli gratia: Adde natalis dies Caesar - 5.7.-100 
  Dele natalis dies [homo] 
  Exampli gratia: dele natalis dies Caesar 
  Ostende natalis dies - ostentum natalis dies 
  
  _Creatio imagines_ - :
  Fac hoc imaginem - factum similacrum imaginem 
  
  _Investigation ligentes_ - :
  Examina [ligens] - examinatum lignes 
  
  _Creatio census_ - :
  Crea census 
  Nomen - [Nomen] 
  Subnomen - [Subnomen] 
  Nomen tertium - [Nomen tertium] 
  Buttonus1 - [Buttonus1] 
  Buttonus2 - [Buttonus2] 
  Buttonus3 - [Buttonus3]
  
  __ () - :
  
  _!_
  `
        }, "start_message": {
            "all": `שלום, אני אלכס!
כדי לשנות שפה כתבו "שנה שפה ל[שפה שאתם רוצים לשנות לה]".
השפה בררת המחדל היא עברית, והשפות האפשריות כעת הן עברית, אנגלית ולטינית.
כדי להציג את הודעת העזרה כתבו "הראה עזרה" בשפה הפעילה.


Hello, I'm Alex!
To change language type "Change language to [language you want to change to]".
The default language is Hebrew, and the currently available languages are Hebrew, English and Latin.
To display a help message type "Show help" in the active language.


Salve amici, Alex sum!
Mea lingua mutatum, scriba "Muta lingua ad [lingua quam desideras]".
Lingua Hebraica defalta est, et in sistema Linguae Anglica et Latina sunt.
Propter auxilium, scriba "Ostende auxilium" in mea lingua.`
        }, "about": {
            "all": `עדכון ענק! שלחו לי "הראה עזרה" כדי לראות את כל הפקודות החדשות!` + `\n Huge update! Message Me "Show help" to see the new commands!`
        }
    }
}

module.exports = Strings;
