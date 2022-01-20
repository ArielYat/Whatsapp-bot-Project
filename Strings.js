class Strings {
    static strings = {
        //general
        "hyphen_reply": {
            "he": "כבודו אתה בטוח שהשתמשת במקף?",
            "en": "Are you sure you used a hyphen correctly?",
            "la": "Certusne tu adhibuisse recte eo iungente te?",
            "ar": "",
            "fr": ""
        }, "command_spam_reply": {
            "he": "וואי ילד תירגע עם הפקודות. זהו, אני לא מקשיב לך יותר עד %s:%s",
            "en": "OK kid, calm down with the commands, will you? that's it, I'm not listening to you anymore until %s:%s",
            "la": "",
            "ar": "",
            "fr": ""
        }, "filter_spam_reply": {
            "he": "כמה פילטרים שולחים פה? אני הולך לישון עד %s:%s",
            "en": "How many filters are you guys sending here? I'm going to sleep until %s:%s",
            "la": "",
            "ar": "",
            "fr": ""
        }, //filters
        "add_filter": {
            "he": /^הוסף פילטר/i, "en": /^Add filter/i, "la": "Crea invenientem", "ar": "", "fr": ""
        }, "add_filter_reply": {
            "he": "הפילטר %s נוסף בהצלחה",
            "en": "The filters %s has been successfully added",
            "la": "Invenientem %s creatur feliciter",
            "ar": "",
            "fr": ""
        }, "add_filter_already_exists_error": {
            "he": "הפילטר %s כבר קיים במאגר של קבוצה זו \nאם אתה רוצה לערוך אותו תכתוב את זה: \nערוך פילטר %s - %s",
            "en": "The filters %s already exists in this group\n If u want to edit the filters please write this:\n Edit filters %s - %s",
            "la": "Reprehendentem %s iam in systemae est\nScribe 'recense invenientem %s - %s' recensitum reprehendentem",
            "ar": "",
            "fr": ""
        }, "remove_filter": {
            "he": /^הסר פילטר/i, "en": /^Remove filter/i, "la": "Dele invenientem", "ar": "", "fr": ""
        }, "remove_filter_reply": {
            "he": "הפילטר %s הוסר בהצלחה",
            "en": "The filters %s has been successfully removed",
            "la": "Invenientem %s deletur feliciter",
            "ar": "",
            "fr": ""
        }, "remove_filter_doesnt_exist_error": {
            "he": "רק אלוהים יכול למחוק פילטר לא קיים",
            "en": "Only the god of light and all that is good can can delete a filters which doesn't exist",
            "la": "Deus Iupiter solum potest delere invenientem qui non exsistit",
            "ar": "",
            "fr": ""
        }, "group_doesnt_have_filters_error": {
            "he": "אין פילטרים בקבוצה זו",
            "en": "This group doesn't have any filters",
            "la": "Coetus hoc non habet invenientes",
            "ar": "",
            "fr": ""
        }, "edit_filter": {
            "he": /^ערוך פילטר/i, "en": /^Edit filter/i, "la": "Recense invenientem", "ar": "", "fr": ""
        }, "edit_filter_reply": {
            "he": "הפילטר %s נערך בהצלחה",
            "en": "The filters %s has been successfully edited",
            "la": "Invenientem %s recensetur felicitur",
            "ar": "",
            "fr": ""
        }, "edit_filter_not_existent_error": {
            "he": "סליחה כבודו אבל אי אפשר לערוך פילטר שלא קיים",
            "en": "Apologies good sir, but you tried to edit a filter which doesn't exist in this group",
            "la": "Paenito, mihi amice, sed recensere invenientem non exsistentem impossibile est",
            "ar": "",
            "fr": ""
        }, "filter_not_filter_material_error": {
            "he": "הפילטר שניסית להוסיף אינו טקסט, תמונה או סרטון",
            "en": "The filter you tried to add isn't text, an image or a video",
            "la": "",
            "ar": "",
            "fr": ""
        }, "show_filters": {
            "he": /^הראה פילטרים/i, "en": /^Show filters/i, "la": "Ostende invenientes", "ar": "", "fr": ""
        }, "image": {
            "he": "[תמונה]", "en": "[Image]", "la": "", "ar": "", "fr": ""
        }, "video": {
            "he": "[וידאו]", "en": "[Video]", "la": "", "ar": "", "fr": ""
        }, //tags
        "tag": {
            "he": /^תייג /i, "en": /^Tag /i, "la": "Clama ad ", "ar": "", "fr": ""
        }, "tag_person_doesnt_exist_error": {
            "he": "אתה בטוח שצדקת בשם? בכל מקרה האדם שניסית לתייג לא נמצא פה",
            "en": "The person you tried to tags doesn't exist",
            "la": "Quem debeo clamare? Is/ea non exsistet",
            "ar": "",
            "fr": ""
        }, "add_tag": {
            "he": /^הוסף חבר לתיוג/i, "en": /^Add tag buddy/i, "la": "Adde amicum", "ar": "", "fr": ""
        }, "add_tag_reply": {
            "he": "מספר הטלפון של האדם %s נוסף בהצלחה",
            "en": "The phone number of the person %s has been successfully added",
            "la": "Amicum %s additur feliciter",
            "ar": "",
            "fr": ""
        }, "add_tag_already_exists_error": {
            "he": "האדם %s כבר קיים במאגר של קבוצה זו",
            "en": "The person %s already exists in this group's database",
            "la": "Amicum %s iam exsistet in sistema",
            "ar": "",
            "fr": ""
        }, "add_tag_doesnt_exist_error": {
            "he": "מספר הטלפון לא קיים בקבוצה זו",
            "en": "This phone number does not exist in this group",
            "la": "Amicum non exsistet in coetu",
            "ar": "",
            "fr": ""
        }, "remove_tag": {
            "he": /^הסר חבר מתיוג/i, "en": /^Remove tag buddy/i, "la": "Dele amicum", "ar": "", "fr": ""
        }, "remove_tag_reply": {
            "he": "מספר הטלפון של האדם %s הוסר בהצלחה",
            "en": "The phone number of the person %s has been successfully removed",
            "la": "Amicum %s delitur feliciter",
            "ar": "",
            "fr": ""
        }, "remove_tag_doesnt_exist_error": {
            "he": "רק נפוליאון יכול למחוק אנשים לא קיימים",
            "en": "Only Napoleon can remove people who don't exist",
            "la": "Napoleonus solum potest delere amici non exsistentes",
            "ar": "",
            "fr": ""
        }, "group_doesnt_have_tags_error": {
            "he": "אין תיוגים לקבוצה זו",
            "en": "This group doesn't have any tags",
            "la": "Hoc coetus non habet amici",
            "ar": "",
            "fr": ""
        }, "tag_all": {
            "he": /^תייג כולם/i, "en": /^Tag everyone/i, "la": "Clama ad quoque", "ar": "", "fr": ""
        }, "show_tags": {
            "he": /^הראה רשימת חברים לתיוג/i, "en": /^Show tag buddies/i, "la": "Ostende amici", "ar": "", "fr": ""
        }, "check_tags": {
            "he": /^בדוק היכן תייגוני/i, "en": /^Check where I've been tagged/i, "la": "", "ar": "", "fr": ""
        }, "check_tags_reply": {
            "he": "הנה תיוגך, אדוני הטוב", "en": "You've been tagged here, Good Sir", "la": "", "ar": "", "fr": ""
        }, "check_tags_no_messages_error": {
            "he": "לא תוייגת מאז שאני זוכר את עצמי",
            "en": "You haven't been tagged for as long as I can remember myself",
            "la": "",
            "ar": "",
            "fr": ""
        }, "clear_tags": {
            "he": /^נקה תיוגיי/i, "en": /^Clear my tags/i, "la": "", "ar": "", "fr": ""
        }, "clear_tags_reply": {
            "he": "נוקתה רשימת תיוגך", "en": "Your tag list has been cleared", "la": "", "ar": "", "fr": ""
        }, "create_tag_list": {
            "he": /^צור רשימה לתיוג/i, "en": /^Create tag list/i, "la": "", "ar": "", "fr": ""
        }, "create_tag_list_reply": {
            "he": "הרשימה לתיוג נוצרה בהצלחה מרובה", "en": "The tag list has been created", "la": "", "ar": "", "fr": ""
        }, "create_tag_list_empty_error": {
            "he": "אני לא יכול ליצור רשימת תיוג ריקה",
            "en": "I simply cannot create an empty tag list",
            "la": "",
            "ar": "",
            "fr": ""
        }, "next_tag_list": {
            "he": /^הבא בתור/i, "en": /^Next in line/i, "la": "", "ar": "", "fr": ""
        }, "tag_list_next_reply": {
            "he": "האדם הבא בתור (כלומר עכשיו!) הינו %s ואחריו %s (אז תהיה מוכן!) \nכדי לעבור לאיש הבא, כתבו 'הבא בתור'",
            "en ": "The next person in the que (which means now!) is %s and after them it's %s (so be ready!) \n To go the next person, write 'Next in line'",
            "la": "",
            "ar": "",
            "fr": ""
        }, "tag_list_last_reply": {
            "he": "האדם הבא ברשימה הינו האחרון: %s",
            "en": "The next person in the list is the last one: %s",
            "la": "",
            "ar": "",
            "fr": ""
        }, //birthdays
        "birthday_wishes_reply": {
            "he": "מזל טוב ל-- %s! הוא/היא בן/בת %s!",
            "en": "Happy birthday to %s! He/she is %s years old!",
            "la": "%s, felix sit natalis dies! Habes %s annos",
            "ar": "",
            "fr": ""
        }, "add_birthday": {
            "he": /^הוסף יום הולדת/i, "en": /^Add birthday/i, "la": "Adde natalis dies", "ar": "", "fr": ""
        }, "add_birthday_reply": {
            "he": "יום ההולדת של הבחור %s נוסף בהצלחה",
            "en": "%s's birthday has been successfully added",
            "la": "Natalis dies %s additur feliciter",
            "ar": "",
            "fr": ""
        }, "add_birthday_already_exists_error": {
            "he": "יום ההולדת של הבחור %s כבר קיים",
            "en": "%s's birthday already exists in this group",
            "la": "Natalis dies %s iam exsistet in hoc coetu",
            "ar": "",
            "fr": ""
        }, "date_existence_error": {
            "he": "מה לעזאזל זה השטויות האלה? אתה בטוח שזה תאריך מציאותי?",
            "en": "Are you sure what you inputted is a date or something along those lines?",
            "la": "Certusne tu hoc natalis dies esse?",
            "ar": "",
            "fr": ""
        }, "date_syntax_error": {
            "he": "תראה אתה אמור להשתמש בשתי נקודות כשאתה כותב תאריך אבל מי אני שאשפוט",
            "en": "Yeah that's not how you write a date... You should be using periods",
            "la": "Rescribe dies cum periodes",
            "ar": "",
            "fr": ""
        }, "remove_birthday": {
            "he": /^הסר יום הולדת/i, "en": /^Remove birthday/i, "la": "Dele natalis dies", "ar": "", "fr": ""
        }, "remove_birthday_reply": {
            "he": "יום ההולדת של הבחור %s הוסר בהצלחה",
            "en": "%s's birthday has been successfully removed",
            "la": "%s natalis dies delitur feliciter",
            "ar": "",
            "fr": ""
        }, "remove_birthday_doesnt_exist_error": {
            "he": "רק דוקטור דופנשמירץ יכול למחוק ימי הולדת לא קיימים",
            "en": "Only Dr. Doofenshmirtz can remove birthday which don't exist",
            "la": "Doctor Doofenshmirtz solum potest delere natalis dies non exsistentes",
            "ar": "",
            "fr": ""
        }, "show_birthdays": {
            "he": /^הראה ימי הולדת/i, "en": /^Show birthdays"/i, "la": "Ostende natalis dies", "ar": "", "fr": ""
        }, "group_doesnt_have_birthdays_error": {
            "he": "אין לקבוצה זו ימי הולדת",
            "en": "This group don't have any birthday registered",
            "la": "Hoc coetus non habet natalis dies",
            "ar": "",
            "fr": ""
        }, "add_birthday_to_group": {
            "he": /^הוסף קבוצה לרשימת התפוצה/i, "en": /^Add group to birthday message/i, "la": "", "ar": "", "fr": ""
        }, "birthday_added_to_group_reply": {
            "he": "הקבוצה נוספה בהצלחה לרשימת התפוצה של ימי הולדת שלך",
            "en": "The group has been successfully added to this person's birthday message broadcast list",
            "la": "",
            "ar": "",
            "fr": ""
        }, "birthday_added_to_group_error": {
            "he": "הקבוצה כבר קיימת ברשימת התפוצה של ימי ההולדת שלך",
            "en": "This group is already in your birthday message's broadcast",
            "la": "",
            "ar": "",
            "fr": ""
        }, "remove_birthday_from_group": {
            "he": /^הסר קבוצה מרשימת התפוצה/i,
            "en": /^Remove group from birthday message/i,
            "la": "",
            "ar": "",
            "fr": ""
        }, "birthday_removed_from_group_reply": {
            "he": "הקבוצה הוסרה בהצלחה מרשימת התפוצה של ימי הולדת של אדם זה",
            "en": "The group has been successfully removed from this person's birthday message broadcast list",
            "la": "",
            "ar": "",
            "fr": ""
        }, "birthday_removed_from_group_error": {
            "he": "רק סמי יכול להסיר קבוצות שלא קיימות ברשימת התפוצה שלך",
            "en": "Only Sam can remove groups which aren't in your birthday message's broadcast",
            "la": "",
            "ar": "",
            "fr": ""
        }, "person_doesnt_have_birthday_error": {
            "he": "לבחורצ'יק כאן אין יום הולדת (מוגדר)",
            "en": "This man does not have a birthday (defined)",
            "la": "",
            "ar": "",
            "fr": ""
        }, //permissions & muting
        "set_permissions": {
            "he": /^קבע הרשאה ל/i, "en": /^Define permission for/i, "la": "", "ar": "", "fr": ""
        }, "set_permissions_reply": {
            "he": "ההרשאה שונתה בהצלחה", "en": "Permission changed successfully", "la": "", "ar": "", "fr": ""
        }, "set_permissions_error": {
            "he": "אין לך הרשאה מספיק גבוהה בשביל מה שניסית לעשות",
            "en": "You don't have a high enough clearance level for what you were trying to do",
            "la": "",
            "ar": "",
            "fr": ""
        }, "permission_option_does_not_exist_error": {
            "he": "רק האיש והאגדה משה יכול לשנות אופציה לא קיימת",
            "en": "Only the man, the myth, the legend Moses can select a nonexistent option",
            "la": "",
            "ar": "",
            "fr": ""
        }, "permission_level_does_not_exist_error": {
            "he": "רק ביג מוישה יכול לבחור הרשאה שלא קיימת \nבדוק שבחרת אחד מאלה: מנהל/רגיל/מושתק",
            "en": "Only big Moshe can choose a non-existent\n Check you've chosen one of these: Admin/Regular/Muted",
            "la": "",
            "ar": "",
            "fr": ""
        }, "filters_permission_type": {
            "he": /פילטרים/i, "en": /filters/i, "la": "", "ar": "", "fr": ""
        }, "tags_permission_type": {
            "he": /תיוגים/i, "en": /tags/i, "la": "", "ar": "", "fr": ""
        }, "handleFilters_permission_type": {
            "he": /ניהול_פילטרים/i, "en": /handle_Filters/i, "la": "", "ar": "", "fr": ""
        }, "handleTags_permission_type": {
            "he": /ניהול_תיוגים/i, "en": /handle_Tags/i, "la": "", "ar": "", "fr": ""
        }, "handleBirthdays_permission_type": {
            "he": /ניהול_ימיהולדת/i, "en": /handle_Birthdays/i, "la": "", "ar": "", "fr": ""
        }, "handleShows_permission_type": {
            "he": /ניהול_הראה/i, "en": /handle_Shows/i, "la": "", "ar": "", "fr": ""
        }, "handleOther_permission_type": {
            "he": /ניהול_שונות/i, "en": /handle_Other/i, "la": "", "ar": "", "fr": ""
        }, "filters_permission_type_replace": {
            "he": "פילטרים", "en": "filters", "la": "", "ar": "", "fr": ""
        }, "tags_permission_type_replace": {
            "he": "תיוגים", "en": "tags", "la": "", "ar": "", "fr": ""
        }, "handleFilters_permission_type_replace": {
            "he": "ניהול_פילטרים", "en": "handle_Filters", "la": "", "ar": "", "fr": ""
        }, "handleTags_permission_type_replace": {
            "he": "ניהול_תיוגים", "en": "handle_Tags", "la": "", "ar": "", "fr": ""
        }, "handleBirthdays_permission_type_replace": {
            "he": "ניהול_ימיהולדת", "en": "handle_Birthdays", "la": "", "ar": "", "fr": ""
        }, "handleShows_permission_type_replace": {
            "he": "ניהול_הראה", "en": "handle_Shows", "la": "", "ar": "", "fr": ""
        }, "handleOther_permission_type_replace": {
            "he": "ניהול_שונות", "en": "handle_Other", "la": "", "ar": "", "fr": ""
        }, "muted_permission_level": {
            "he": /מושתק/, "en": /Muted/i, "la": "", "ar": "", "fr": ""
        }, "regular_permission_level": {
            "he": /רגיל/, "en": /Regular/i, "la": "", "ar": "", "fr": ""
        }, "admin_permission_level": {
            "he": /מנהל/, "en": /Admin/i, "la": "", "ar": "", "fr": ""
        }, "developer_permission_level": {
            "he": /אלוהים/, "en": /God/i, "la": "", "ar": "", "fr": ""
        }, "muted_permission_level_replace": {
            "he": "מושתק", "en": "Muted", "la": "", "ar": "", "fr": ""
        }, "regular_permission_level_replace": {
            "he": "רגיל", "en": "Regular", "la": "", "ar": "", "fr": ""
        }, "admin_permission_level_replace": {
            "he": "מנהל", "en": "Admin", "la": "", "ar": "", "fr": ""
        }, "developer_permission_level_replace": {
            "he": "אלוהים", "en": "God", "la": "", "ar": "", "fr": ""
        }, "show_group_function_permissions": {
            "he": /^הראה הרשאות פונקציות/i, "en": /^Show function permissions/i, "la": "", "ar": "", "fr": ""
        }, "show_group_user_permissions": {
            "he": /^הראה הרשאות אנשים/i, "en": /^Show people permissions/i, "la": "", "ar": "", "fr": ""
        }, "mute_participant": {
            "he": /^השתק /i, "en": /^Mute /i, "la": "", "ar": "", "fr": ""
        }, "mute_participant_reply": {
            "he": "המשתמש %s לא יכול להשתמש בפקודות יותר",
            "en": "User %s cannot use commands anymore",
            "la": "",
            "ar": "",
            "fr": ""
        }, "unmute_participant": {
            "he": /^הסר השתקה/i, "en": /^Unmute person/i, "la": "", "ar": "", "fr": ""
        }, "unmute_participant_reply": {
            "he": "המשתמש %s יכול להשתמש בפקודות שוב",
            "en": "User %S can use commands again",
            "la": "",
            "ar": "",
            "fr": ""
        }, "participant_not_in_group_error": {
            "he": "אני יכול להשתיק רק מישהו שכתב בקבוצה פעם. סליחה!",
            "en": "I can only mute someone who has been in this group in the past. Sorry!",
            "la": "",
            "ar": "",
            "fr": ""
        }, "no_participant_chosen_error": {
            "he": "אני לא יכול להשתיק את אף אחד, אתה חייב לבחור מישהו",
            "en": "I can't mute nobody, you gotta choose someone",
            "la": "",
            "ar": "",
            "fr": ""
        }, //Immediate commands
        "scan_link": {
            "he": /^סרוק/i, "en": /^Scan /i, "la": /^Examina /i, "ar": "", "fr": ""
        }, "link_validity_error": {
            "he": "חביבי, זה לא קישור תקין", "en": "bro that's not a valid link", "la": "", "ar": "", "fr": ""
        }, "scan_link_checking_reply": {
            "he": "%s \n בודק...", "en": "%s \n Checking...", "la": "%s \n Examino...", "ar": "", "fr": ""
        }, "scan_link_result_reply": {
            "he": " וואלה אחי בדקתי את הקישור כמו שביקשת ומצאתי ש־%s אנטי וירוסים מצאו אותו סאחי",
            "en": "%s antivirus engines detected this link as malicious",
            "la": "%s deprehendentes reperiebant hoc ligentem malum esse",
            "ar": "",
            "fr": ""
        }, "scan_link_upload_error": {
            "he": "שגיאה בהעלאת הקישור",
            "en": "Error received while uploading the link",
            "la": "Error #1 in ligente est",
            "ar": "",
            "fr": ""
        }, "scan_link_checking_error": {
            "he": "שגיאה בבדיקת הקישור",
            "en": "Error received while checking the link",
            "la": "Error #2 in ligente est",
            "ar": "",
            "fr": ""
        }, "make_sticker": {
            "he": /^הפוך לסטיקר/i, "en": /^Create sticker/i, "la": "Fac hoc imaginem", "ar": "", "fr": ""
        }, "crop_sticker": {
            "he": /^ללא חיתוך/i, "en": /^without cropping/i, "la": "", "ar": "", "fr": ""
        }, "not_sticker_material_error": {
            "he": "טיפש אי אפשר להפוך משהו שהוא לא תמונה או סרטון לסטיקר",
            "en": "Idiot, a sticker has to be an image or a video",
            "la": "Hoc non est similacrum",
            "ar": "",
            "fr": ""
        }, "create_survey": {
            "he": /^צור סקר/i, "en": /^Create survey/i, "la": "Crea census", "ar": "", "fr": ""
        }, "survey_title": {
            "he": /כותרת - (.)+/, "en": /Title - (.)+/, "la": /Nomen - (.)+/, "ar": "", "fr": ""
        }, "survey_subtitle": {
            "he": /כותרת משנה - (.)+/, "en": /Subtitle - (.)+/, "la": /Subnomen - (.)+/, "ar": "", "fr": ""
        }, "third_survey_title": {
            "he": /כותרת שלישית - (.)+/, "en": /Third title - (.)+/, "la": /Nomen tertium - (.)+/, "ar": "", "fr": ""
        }, "survey_button_1": {
            "he": /כפתור 1 - (.)+/, "en": /Button 1 - (.)+/, "la": /Buttonus 1 - (.)+/, "ar": "", "fr": ""
        }, "survey_button_2": {
            "he": /כפתור 2 - (.)+/, "en": /Button 2 - (.)+/, "la": /Buttonus 2 - (.)+/, "ar": "", "fr": ""
        }, "survey_button_3": {
            "he": /כפתור 3 - (.)+/, "en": /Button 3 - (.)+/, "la": /Buttonus 3 - (.)+/, "ar": "", "fr": ""
        }, "survey_title_replace": {
            "he": "כותרת -", "en": "Title -", "la": "Nomen -", "ar": "", "fr": ""
        }, "second_survey_title_replace": {
            "he": "כותרת משנה -", "en": "Body -", "la": "Subnomen -", "ar": "", "fr": ""
        }, "third_survey_title_replace": {
            "he": "כותרת שלישית -", "en": "Footer -", "la": "Nomen tertium -", "ar": "", "fr": ""
        }, "survey_button_1_replace": {
            "he": "כפתור 1 -", "en": "Button 1 -", "la": "Buttonus 1 -", "ar": "", "fr": ""
        }, "survey_button_2_replace": {
            "he": "כפתור 2 -", "en": "Button 2 -", "la": "Buttonus 2 -", "ar": "", "fr": ""
        }, "survey_button_3_replace": {
            "he": "כפתור 3 -", "en": "Button 3 -", "la": "Buttonus 3 -", "ar": "", "fr": ""
        }, "survey_creation_error": {
            "he": "אני צריך כותרת, כותרת משנה ולפחות כפתור אחד בשביל ליצור סקר",
            "en": "I need a title, a body and at least one button to make a survey",
            "la": "Necessitudines sunt nomen atque subnomen atque buttonus namque census",
            "ar": "",
            "fr": ""
        }, "check_crypto": {
            "he": /^בדוק קריפטו/i, "en": /^Check Crypto/i, "la": "", "ar": "", "fr": ""
        }, "crypto_check_reply": {
            "he": "הנה השטויות שביקשת: \n %s",
            "en": "Here's the junk you requsted: \n %s",
            "la": "Hoc non est similacrum",
            "ar": "",
            "fr": ""
        }, "crypto_api_error": {
            "he": "נתקלתי בבעיה איפהשהו בדרך",
            "en": "I've ran into a problem somewhere along the way",
            "la": "",
            "ar": "",
            "fr": ""
        }, "crypto_limit_error": {
            "he": "אני מצטער אבל כל קבוצה יכולה לבדוק את שערי המרת הקריפטו רק פעם אחת ביום",
            "en": "Forgive me but each group can check the Crypto exchange rates only once per day",
            "la": "",
            "ar": "",
            "fr": ""
        }, "search_in_urban": {
            "he": /^הגדרת אינטרנט/i, "en": /^Internet definition/i, "la": "", "ar": "", "fr": ""
        }, "search_in_urban_reply": {
            "he": "הגדרה", "en": "Definition", "la": "", "ar": "", "fr": ""
        }, "search_in_urban_error": {
            "he": "לא נמצאות תוצאות למילה שחופשה",
            "en": "No definitions were found for the searched word",
            "la": "",
            "ar": "",
            "fr": ""
        }, "translate_to": {
            "he": /^תרגם ל/i, "en": /^Translate To/i, "la": "", "ar": "", "fr": ""
        }, "translate_reply": {
            "he": "*תרגום*: \n %s \n משפה (קוד שפה): \n %s",
            "en": "*Translation*: \n %s \n From language (language code): \n %s",
            "la": "",
            "ar": "",
            "fr": ""
        }, "translate_language_error": {
            "he": "גברבר, השפה שבחרת לא קיימת",
            "en": "Dude, the language you choose doesn't exist",
            "la": "",
            "ar": "",
            "fr": ""
        }, "translate_language_google_error": {
            "he": "לא ניתן לתרגם לשפה שבחרת, סליחה!",
            "en": "The language you chose couldn't be translated to, Sorry!",
            "la": "",
            "ar": "",
            "fr": ""
        }, "translate_language_limit": {
            "he": "תנסה מחר לבקש תרגום, ביקשו יותר מדי תרגומים בקבוצה זו",
            "en": "Try again tomorrow, you guys are translating too many words",
            "la": "",
            "ar": "",
            "fr": ""
        }, "show_profile": {
            "he": /^פרופיל/i, "en": /^Profile/i, "la": "", "ar": "", "fr": ""
        }, "tagged_messages_amount_reply": {
            "he": "תוייגת: %s פעמים מאז הבדיקה/ניקיון האחרון",
            "en": "You've been tagged %s time since the last check/reset",
            "la": "",
            "ar": "",
            "fr": ""
        }, "permission_level_reply": {
            "he": "רמת ההרשאה שלך בקבוצה זו: %s",
            "en": "Your permission level in this group: %s",
            "la": "",
            "ar": "",
            "fr": ""
        }, "profile_birthday_reply": {
            "he": "אם שכחת במקרה אז יום הולדתך הוא: %s",
            "en": "In case you forgot, your birthday is: %s",
            "la": "",
            "ar": "",
            "fr": ""
        }, "profile_birthday_error": {
            "he": "מישהו פה לא הגדיר יום הולדת :(",
            "en": "Someone here didn't set a birthday :(",
            "la": "",
            "ar": "",
            "fr": ""
        }, "download_music": {
            "he": /^הורד מוזיקה/i, "en": /^Download music/i, "la": "", "ar": "", "fr": ""
        }, "download_music_downloading_reply": {
            "he": "מוריד...", "en": "Downloading...", "la": "", "ar": "", "fr": ""
        }, "download_music_unknown_error": {
            "he": "או שהקישור שבחרת לא אמיתי או שנתקלתי בשגיאה - נסה שוב עוד כמה דקות",
            "en": "Either you haven't sent a real link or I encountered a problem - try again in a couple of minutes",
            "la": "",
            "ar": "",
            "fr": ""
        }, "download_music_not_found_error": {
            "he": "אין קישור ליוטיוב בהודעה הזו שובב",
            "en": "There's no link to youtube in that message you naughty boy",
            "la": "",
            "ar": "",
            "fr": ""
        }, "download_music_limit_error": {
            "he": "הורדתם יותר מדי שירים היום תנסו שוב מחר",
            "en": "You've downloaded too many songs today - try again tomorrow",
            "la": "",
            "ar": "",
            "fr": ""
        }, "show_webpage": {
            "he": /^שלח קישור לאתר/i, "en": /^Send website link/i, "la": "Ostende situs texti", "ar": "", "fr": ""
        }, "show_webpage_reply": {
            "he": "קח את הקישור אחי: %s",
            "en": "Here's the link you requested: %s",
            "la": "Hic est ligens quod petitis: %s",
            "ar": "",
            "fr": ""
        }, "show_webpage_error": {
            "he": "הקישור לא עבד לי... סליחוש",
            "en": "Sorry bro, the link didn't work...",
            "la": "Paenito frater, sed ligens non oportet...",
            "ar": "",
            "fr": ""
        },//reminders
        "add_reminder": {
            "he": /^הוסף תזכורת/i, "en": /^Add reminder/i, "la": "", "ar": "", "fr": ""
        }, "add_reminder_reply": {
            "he": "התזכורת נוספה בהצלחה בשעה %s",
            "en": "The reminder has been successfully set to %s",
            "la": "",
            "ar": "",
            "fr": ""
        }, "reminder_already_exists_error": {
            "he": "קיימת תזכורת כבר בשעה הזאת",
            "en": "There already exists a reminder at that time",
            "la": "",
            "ar": "",
            "fr": ""
        }, "reminder_time_error": {
            "he": "אני מצטער אבל בימים אלו עדיין אני לא יכול לנחש שעות בעצמי \nתבדוק שכתבת נכון את השעה",
            "en": "I'm sorry but at this day in age I'm still not able to guess the time on my own \nPlease check you've written it correctly",
            "la": "",
            "ar": "",
            "fr": ""
        }, "remove_reminder": {
            "he": /^הסר תזכורת/i, "en": /^Remove reminder/i, "la": "", "ar": "", "fr": ""
        }, "remove_reminder_reply": {
            "he": "התזכורת שנקבעה לשעה %s הוסרה בהצלחה",
            "en": "The reminder set at %s has been removed",
            "la": "",
            "ar": "",
            "fr": ""
        }, "reminder_doesnt_exist_error": {
            "he": "עדיין אין לי את היכולת למחוק התראות שלא נקבעו",
            "en": "I'm still not able to delete reminders which weren't ever set",
            "la": "",
            "ar": "",
            "fr": ""
        }, "show_reminders": {
            "he": /^הראה תזכורות/i, "en": /^Show reminders/i, "la": "", "ar": "", "fr": ""
        }, "show_reminder_error": {
            "he": "אין לך תזכורות פעילות", "en": "You don't have any active reminders", "la": "", "ar": "", "fr": ""
        }, "repeatReminder": {
            "he": /^חוזרת/i, "en": /^Repeat/i, "la": "", "ar": "", "fr": ""
        },//language
        "change_language": {
            "he": /^שנה שפה/i, "en": /^Change language to/i, "la": "Muta lingua ad", "ar": "", "fr": ""
        }, "language_change_reply": {
            "he": "השפה שונתה בהצלחה",
            "en": "Language successfully changed",
            "la": "Lingua mutatur feliciter",
            "ar": "",
            "fr": ""
        }, "language_change_error": {
            "he": "בימינו רק עברית, אנגלית ולטינית נתמכות על ידי הבוט",
            "en": "Only Hebrew, English and Latin are currently supported by the bot",
            "la": "Tantum Lingua Hebraice, Anglice et Latine nunc sustentantur per bot.",
            "ar": "",
            "fr": ""
        }, "help": {
            "he": /^עזרה/i, "en": /^Help/i, "la": /^Auxilium$/i, "ar": "", "fr": ""
        }, "help_general": {
            "he": /^עזרה$/i, "en": /^Help$/i, "la": /^Auxilium$/i, "ar": "", "fr": ""
        }, "help_language": {
            "he": /^עזרה שפה$/i, "en": /^Help language$/i, "la": "", "ar": "", "fr": ""
        }, "help_filters": {
            "he": /^עזרה פילטרים$/i, "en": /^Help filters$/i, "la": "", "ar": "", "fr": ""
        }, "help_tags": {
            "he": /^עזרה תיוגים$/i, "en": /^Help tags$/i, "la": "", "ar": "", "fr": ""
        }, "help_birthdays": {
            "he": /^עזרה ימי הולדת$/i, "en": /^Help birthdays$/i, "la": "", "ar": "", "fr": ""
        }, "help_permissions": {
            "he": /^עזרה הרשאות$/i, "en": /^Help permissions$/i, "la": "", "ar": "", "fr": ""
        }, "help_reminders": {
            "he": /^עזרה תזכורות$/i, "en": /^Help reminders$/i, "la": "", "ar": "", "fr": ""
        }, "help_immediate": {
            "he": /^עזרה אחר$/i, "en": /^Help others$/i, "la": "", "ar": "", "fr": ""
        }, "help_general_reply": {
            "he": `_*רשימת הפקודות ועזרה כללית בעברית*_\nאם נפשיכם חשקה בעזרה ספציפית בנוגע לפקודה כלשהי, היעזרו בפקודות הבאות:\n"עזרה שפה", "עזרה פילטרים", "עזרה תיוגים", "עזרה ימי הולדת", "עזרה הרשאות" "עזרה תזכורות", "עזרה אחר"\nאם לא, וסתם רציתם לראות את ההודעה הזו, תרגישו חופשי להישאר!\nמפותח ומתוחזק על ידי אריאל יצקן (972543293155) ואיתן עמירן (972586809911)\nקישור למאגר הקוד ב־Github (הקוד), לסקרנים: https://github.com/ArielYat/Whatsapp-bot-Project`,
            "en": `_*English Command List and General Help*_\nIf you desire help regarding a specific command, try one of the following:\n"Help language", "Help filters", "Help tags", "Help birthdays", "Help permissions" "Help reminders", "Help other"\nIf not, and you just wanted to see this message, feel free to stick around! \nDeveloped and maintained by Ariel Yatskan (972543293155) and Ethan Amiran (972586809911)\nThe GitHub repository (the code), for the curious: https://github.com/ArielYat/Whatsapp-bot-Project`,
            "la": ``,
            "ar": ``,
            "fr": ``
        }, "help_language_reply": {
            "he": `*שפת הבוט:*\n- "שנה שפה ל[שפה]" - משנה את בה הבוט מקבל ומגיב לפקודות\n  - לדוגמה: שנה שפה לאנגלית\n  - אפשר להשתמש בפקודה הזו בכל שפה\n  - שפות שנתמכות כעת: עברית, אנגלית וחלקית לטינית`,
            "en": `*Bot's Language:*\n- "Change language to [language]" - changes the language the bot receives and sends messages in\n  - For example: Change language to Hebrew\n  - This command can be used at all times in every language\n  - Languages currently supported: Hebrew, English & Semi-Latin`,
            "la": ``,
            "ar": ``,
            "fr": ``
        }, "help_filters_reply": {
            "he": `*פילטרים:*\n- "הוסף פילטר [פילטר] - [תגובת הבוט]" - מוסיף פילטר לקבוצה\n  - לדוגמה: הוסף פילטר אוכל - בננה\n  - אפשר להוסיף פילטר של טקסט, תמונה או סרטון\n- "הסר פילטר [פילטר]" - מסיר את הפילטר המצויין מהקבוצה\n  - לדוגמה: הסר פילטר אוכל\n- "ערוך פילטר [פילטר קיים] - [תשובה חדשה]" - עורך פילטר קיים בקבוצה\n  - לדוגמה: ערוך פילטר אוכל - אפרסק\n- "הראה פילטרים" - מציג את רשימת הפילטרים הקיימים כעת בקבוצה\n*טיפ מיוחד!*\n- בהוספת פילטר אפשר גם להשתמש ב[שם] בשביל לתייג מישהו כשהפילטר נקרא\n  - לדוגמה: "הוסף פילטר אוכל - [יוסי]" יגרום לבוט לתייג את יוסי כשנאמר "אוכל"`,
            "en": `*Filters:*\n- "Add filter [filter] - [bot reply]" - adds a filter to the group\n  - For example: Add filter food - banana\n  - Filters can be text, an image or a video\n- "Remove filter [filter]" - removes the specified filter from the group\n  - For example: Remove filter food\n- "Edit filter [existing filter] - [new reply]" - edits the specified filter\n  - For example: Edit filter food - peach\n- "Show filters" - displays the list of all filter and their replies in the group\n*Special tip!*\n- When adding a filter you can use [name] to tag someone when the filter is invoked\n  - For example: "Add filter food - [Joseph]" will make the bot tag Joseph whenever "food" is said`,
            "la": ``,
            "ar": ``,
            "fr": ``
        }, "help_tags_reply": {
            "he": `*תיוגים:*\n- "תייג [אדם]" - מתייג אדם כך שיקבל התראה גם אם הקבוצה מושתקת אצלו\n  - לדוגמה: תייג יוסי\n- "תייג כולם" - מתייג את כל האנשים שנמצאים בקבוצה\n- "בדוק היכן תייגוני" - מראה את ההודעה האחרונה בה כותב ההודעה תויג, ניתן לשימוש כמה פעמים\n- "נקה תיוגיי" - מנקה את התיוגים השמורים של כותב ההודעה\n- "הראה רשימת חברים לתיוג" - מציג את רשימת החברים לתיוג שמוגדרים בקבוצה\n- "הוסף חבר לתיוג [אדם] - [מספר טלפון בפורמט בין לאומי]" - מוסיף אדם לתיוג בקבוצה\n  - לדוגמה: הוסף חבר לתיוג יוסי - 972501234567\n- "הסר חבר מתיוג [אדם]" - מסיר אדם מתיוג בקבוצה\n  - לדוגמה: הסר חבר מתיוג יוסי`,
            "en": `*Tags:*\n- "Tag [person]" - tags someone so that they get a notification even if the group is muted on their phone\n  - For example: Tag Joseph\n- "Tag everyone" - tags all people in the group\n- "Check where I've been tagged" - shows the last message in which the message author's been tagged, can be used multiple times\n- "Clear my tags" - clears the saved tags of the message's author\n- "Show tag buddies" - displays the list of all taggable people in the group\n- "Add tag buddy [name] - [phone number in international format]" - adds the person to the list of taggable people\n  - For example: Add tagging buddy Joseph - 972501234567\n- "Remove tag buddy [name]" - removes the person from the list of taggable people\n  - For example: Remove tagging buddy Joseph`,
            "la": ``,
            "ar": ``,
            "fr": ``
        }, "help_birthdays_reply": {
            "he": `*ימי הולדת:*\n- "הוסף יום הולדת [תאריך מנוקד בפורמט בינלאומי]" - מוסיף יום הולדת לכותב ההודעה\n  - לדוגמה: הוסף יום הולדת 1.11.2011\n- "הסר יום הולדת" - מסיר את יום ההולדת של כותב ההודעה\n- "הראה ימי הולדת" - מציג את ימי ההולדת של כל חברי הקבוצה\n- "הוסף קבוצה להודעת יום ההולדת" - מוסיף את הקבוצה בה נשלחה ההודעה לרשימת התפוצה של הודעת יום ההולדת של כותב ההודעה\n- "הסר קבוצה מהודעת יום ההולדת" - מסיר את הקבוצה בה נשלחה ההודעה מרשימת התפוצה של הודעת יום ההולדת של כותב ההודעה`,
            "en": `*Birthdays:*\n- "Add birthday [date in international format with periods]" - adds a birthday for message's author\n  - For example: Add birthday 1.11.2011\n- "Remove birthday" - removes the author's birthday\n- "Show birthdays" - displays the birthdays of the group members\n- "Add group to birthday message" - adds the group the message was sent in to the author's birthday message broadcast\n- "Remove group from birthday message" - removes the group the message was sent in from the author's birthday message broadcast`,
            "la": ``,
            "ar": ``,
            "fr": ``
        }, "help_permissions_reply": {
            "he": `*הרשאות (למנהלי קבוצות בלבד):*\n- "קבע הרשאה ל[סוג הרשאה] - [רמת הרשאה]" - קובע את רמה ההרשאה הנדרשת לסוג פקודות מסוים\n  - לדוגמה: קבע הרשאה לפילטרים - רגיל\n  - סוגי ההרשאות: פילטרים, תיוגים, טיפול_פילטרים, טיפול_תיוגים, טיפול_ימיהולדת, טיפול_הראה, טיפול_שונות\n  - רמות הרשאה אפשריות: מושתק, רגיל ומנהל\n- "השתק [תיוג של אדם]" - משתיק את האדם המתוייג כך שלא יוכל להשתמש בפקודות\nלדוגמה: השתק @יוסי\n- "הסר השתקה [תיוג של אדם]" - מבטל את ההשתקה של האדם המתוייג\nלדוגמה: בטל השתקה @יוסי\n- "הראה הרשאות פונקציות" - מציג את רמות ההרשאות של סוגי הפקודות השונים\n- "הראה הרשאות אנשים" - מציג את רמות ההרשאות של האנשים בקבוצה`,
            "en": `*Permissions (for group admins solely):*\n- "Define permission for [permission type] - [permission level]" - defines the permission level required for a certain type of commands\n  - For example: Define permission filters - Regular\n  - Permission types: filters, tags, handle_Filters, handle_Tags, handle_Birthdays, handle_Shows & handle_Other\n  - Permission levels: Muted, Regular & Admin\n- "Mute [person tag]" - mutes the tagged person so they aren't able to use commands\n  - For example: Mute @Joseph\n- "Unmute person [person tag]" - unmutes the tagged person\n  - For example: Unmute @Joseph\n- "Show function permissions" - displays the permission levels of the different types of commands\n- "Show people permissions" - displays the permission levels of the people in the group`,
            "la": ``,
            "ar": ``,
            "fr": ``
        }, "help_reminders_reply": {
            "he": `*תזכורות:*\n_כל הפקודות של התזכורות עובדות רק בצ'ט פרטי עם הבוט_\n- "הוסף תזכורת [חוזרת] [תאריך] [שעה] [טקסט]" - מוסיף תזכורת לכותב ההודעה\n  - לדוגמה: הוסף תזכורת 2.5.2023 7:34 להוציא את החתול לטיול\n  - התאריך אופציונלי (אם לא קיים ההנחה היא שהתזכורת לאותו יום שבו ההודעה נכתבה) ויכול או לכלול לא לכלול לכלול שנה\n  - הפרמטר האופציונלי "חוזרת" יוצר תזכורת קבועה הפועלת כל יום בשעה הידועה החל מהתאריך המצויין\n  - תזכורות יכולות להיות מלל, תמונה או סרטון\n- "הסר תזכורת [תאריך] [שעה]" - מסיר את התזכורת המכוונת לזמן המצויין\n  - לדוגמה: הסר תזכורת 7:34\n  - התאריך אופציונלי (אם לא קיים ההנחה היא שהתזכורת לאותו יום שבו ההודעה נכתבה) ויכול או לכלול לא לכלול לכלול שנה\n- "הראה תזכורת" - מראה את כל התזכורות של כותב ההודעה`,
            "en": `*Reminders:*\n_All the reminder related commands work only in a private chat with the bot_\n- "Add reminder [repeat] [date] [time] [text]" - adds a reminder to the message's author\n  - For example: Add reminder 2.5.2023 7:34 Walk the cat\n  - The date is optional (if no date is inputted the assumption is that the reminder is for the same date the message was written in) and can include or not include a year\n  - The optional parameter "repeat" creates a repeating reminder every day from the first date specified at the specified hour\n  - Reminders can be text, images or videos\n- "Remove reminder [date] [hour]" - deletes the reminder set at the specified time\n  - For example: Remove reminder 7:34\n  - The date is optional (if no date is inputted the assumption is that the reminder is for the same date the message was written in) and can include or not include a year\n- "Show reminders" - Shows the message's author's reminders`,
            "la": ``,
            "ar": ``,
            "fr": ``
        }, "help_immediate_reply": {
            "he": `*פקודות נוספות:*\n- "הפוך לסטיקר [ללא חיתוך]" - הופך הודעת מדיה לסטיקר ושולח אותו\n  - ניתן להשתמש בפקודה גם בהודעה בה שולחים את התמונה/סרטון וגם בתור תגובה אליה\n  - "ללא חיתוך" הוא פרמטר אופציונלי, הוא יוצר סטיקר לא חתוך\n- "בדוק קריפטו" - שולח הודעה עם שערי המטבע של מטבעות קריפטו שונים לעומת הדולר\n- "הגדרת אינטרנט [מילה באנגלית]" - מחפש את המילה באתר Urban Dictionary ומחזיר את תוצאות החיפוש\n  - לדוגמה: הגדרת אינטרנט Chair\n- "תרגם ל[שפה כלשהי] [מילים]" - מתרגם את רצף המילים לשפה הנתונה באמצעות גוגל תרגום\n  - לדוגמה: תרגם לאנגלית כיסא\n  - בתרגום ניתן לכתוב רק משפט אחד בגלל מגבלות של גוגל תרגום\n- "הורד מוזיקה [קישור ליוטיוב]" - מוריד שיר כלשהו מיוטיוב ושולח אותו בקבוצה בתור הודעה קולית\n- "סרוק [קישור]" - סורק קישור לוירוסים\n  - לדוגמה: סרוק https://www.google.com/\n  - ניתן לסרוק קישורים בהודעה בה נשלחת הפקודה או בהודעה מצוטטת\n- "פרופיל" - מראה את המידע של הבוט על כותב ההודעה\n- "שלח קישור" - שולח קישור לאתר של הבוט (בתהליך עבודה)\n- יצירת סקר של וואטסאפ:\n- "צור סקר\nכותרת - [כותרת סקר]  \nכותרת משנה - [כותרת משנה]  \nכותרת שלישית - [כותרת שלישית]  \nכפתור 1 - [אופציה ראשונה]  \nכפתור 2 - [אופציה שנייה]  \nכפתור 3 - [אופציה שלישית]"  \n  - (הכותרת השלישית והכפתורים השני והשלישי אופציונליים)`,
            "en": `*Miscellaneous Commands:*\n- "Create sticker [without cropping]" - creates a sticker out of a media file and sends it\n  - This command can be used in the message the media was sent in and as a reply to it\n  - "without cropping" is an optional parameter which creates the sticker without cropping it  \n- "Check Crypto" - sends a message with the exchange rates of ten different cryptocurrencies compared to the Dollar\n- "Internet definition [work]" - searches for the word on the website Urban Dictionary and returns the search result\n  - For example: Internet definition chair\n- "Translate to [some language] [words]" - translates the words to the given language via Google Translate\n  - For example: Translate to Hebrew chair\n  - In the translation text only one sentence can be written due to Google Translate restrictions\n- "Download music [link to youtube]" - downloads a song from youtube and sends it as voice message\n- "Scan [link]" - scans the given link for viruses\n  - For example: Scan https://www.google.com/\n  - Links can be scanned in the message the command is sent in or in a quoted message\n- "Profile" - shows the bot's information about the message's author\n- "Send link" - sends a link to the bots webpage (work in progress)\n- Create a WhatsApp survey:\n- "Create survey\n    Title - [survey title]\n    Subtitle - [survey subtitle]\n    Third Title - [third title]\n    Button 1 - [first option]\n    Button 2 - [second option]\n    Button 3 - [third option]"\n  - (The third title and buttons 1 and 2 aren't required)`,
            "la": ``,
            "ar": ``,
            "fr": ``
        }, "help_reply_old": {
            "he_old": `*הוראות בעברית*\n _שפה_: \n - "שנה שפה ל[שפה]" - משנה את בה הבוט מקבל ומגיב לפקודות \n לדוגמה: שנה שפה לאנגלית \n  אפשר להשתמש בפקודה הזו בכל שפה\nשפות שנתמכות כעת: עברית, אנגלית ולטינית  \n  \n _פילטרים_: \n- "הוסף פילטר [פילטר] - [תגובת הבוט]" - מוסיף פילטר לקבוצה  \n לדוגמה: הוסף פילטר אוכל - בננה \n  אפשר להוסיף פילטר של טקסט, תמונה או סרטון\n- "הסר פילטר [פילטר]" - מסיר את הפילטר המצויין מהקבוצה  \n לדוגמה: הסר פילטר אוכל \n- "ערוך פילטר [פילטר קיים] - [תשובה חדשה]" - עורך פילטר קיים בקבוצה  \n לדוגמה: ערוך פילטר אוכל - אפרסק \n- "הראה פילטרים" - מציג את רשימת הפילטרים הקיימים כעת בקבוצה  \n  \n _תיוגים_: \n- "תייג [אדם]" - מתייג אדם כך שיקבל התראה גם אם הקבוצה מושתקת אצלו  \n לדוגמה: תייג יוסי \n- "הוסף חבר לתיוג [אדם] - [מספר טלפון בפורמט בין לאומי]" - מוסיף אדם לתיוג בקבוצה  \n לדוגמה: הוסף חבר לתיוג יוסי - 972501234567 \n- "הסר חבר מתיוג [אדם]" - מסיר אדם מתיוג בקבוצה  \n לדוגמה: הסר חבר מתיוג יוסי \n- "תייג כולם" - מתייג את כל האנשים שנמצאים בקבוצה  \n- "הראה רשימת חברים לתיוג" - מציג את רשימת החברים לתיוג שמוגדרים בקבוצה  \n  - "בדוק היכן תייגוני" - מראה את ההודעה האחרונה בה כותב ההודעה תויג, ניתן לשימוש כמה פעמים\n  - "נקה תיוגיי" - מנקה את התיוגים השמורים של כותב ההודעה\n  \n _ימי הולדת_: \n  - "הוסף יום הולדת - [תאריך מנוקד בפורמט בינלאומי הפוך]" - מוסיף יום הולדת לכותב ההודעה\n  לדוגמה: הוסף יום הולדת 1.11.2011\n  - "הסר יום הולדת" - מסיר את יום ההולדת של כותב ההודעה\n  - "הוסף קבוצה להודעת יום ההולדת" - מוסיף את הקבוצה בה נשלחה ההודעה לרשימת התפוצה של הודעת יום ההולדת של כותב ההודעה\n  - "הסר קבוצה מהודעת יום ההולדת" - מסיר את הקבוצה בה נשלחה ההודעה מרשימת התפוצה של הודעת יום ההולדת של כותב ההודעה\n  - "הראה ימי הולדת" - מציג את ימי ההולדת של כל חברי הקבוצה\n  \n  _הרשאות והשתקות_:\n  - "קבע הרשאה ל[סוג הרשאה] - [מספר מ־0 עד 2]" - קובע את רמה ההרשאה הנדרשת לסוג פקודות מסוים\n  לדוגמה: קבע הרשאה לפילטרים - רגיל\n  סוגי ההרשאות: פילטרים, תיוגים, טיפול-פילטרים, טיפול-תיוגים, טיפול-ימיהולדת, טיפול-הראה, טיפול-שונות\n  רמות הרשאה אפשריות: מושתק, רגיל ומנהל\n  - "השתק [תיוג של אדם]" - משתיק את האדם המתוייג כך שלא יוכל להשתמש בפקודות\n  לדוגמה: השתק @יוסי\n  - "הסר השתקה [תיוג של אדם]" - מבטל את ההשתקה של האדם המתוייג\n  לדוגמה: בטל השתקה @יוסי\n  - "הראה הרשאות פונקציות" - מציג את רמות ההרשאות של סוגי הפקודות השונים\n  - "הראה הרשאות אנשים" - מציג את רמות ההרשאות של האנשים בקבוצה\n  \n _פונקציות נוספות_ \n - "הפוך לסטיקר [ללא חיתוך/-]" - הופך הודעת מדיה לסטיקר ושולח אותו \n ניתן להשתמש בפקודה גם בהודעה בה שולחים את התמונה/סרטון וגם בתור תגובה אליה \n  ללא חיתוך הוא פרמטר שלא חייבים לשים, הוא יוצר סטיקר לא חתוך\n  - "בדוק קריפטו" - שולח הודעה עם שערי המטבע של מטבעות קריפטו שונים לעומת הדולר\n  - "הגדרת אינטרנט [מילה באנגלית]" - מחפש את המילה באתר Urban Dictionary ומחזיר את תוצאות החיפוש\n  לדוגמה: הגדרת אינטרנט Chair\n  - "תרגם ל[שפה כלשהי] [מילים]" - מתרגם את רצף המילים לשפה הנתונה באמצעות גוגל תרגום\n  לדוגמה: תרגם לאנגלית כיסא\n  בתרגום ניתן לכתוב רק משפט אחד בגלל מגבלות של גוגל תרגום\n  - "סרוק [קישור]" - סורק קישור לוירוסים\n  לדוגמה: סרוק https://www.google.com/\n - "שלח קישור" - שולח קישור לאתר של הבוט (בתהליך עבודה) \n  - יצירת סקר של וואטסאפ:\n "צור סקר \n כותרת - [כותרת סקר] \n כותרת משנה - [כותרת משנה] \n כותרת שלישית - [כותרת שלישית] \n כפתור 1 - [אופציה ראשונה] \n כפתור 2 - [אופציה שנייה] \n כפתור 3 - [אופציה שלישית]" \n (הכותרת השלישית והכפתורים השני והשלישי אופציונליים) \n  \n _טיפ מיוחד!_ \n בהוספת פילטר אפשר גם להשתמש ב[שם] בשביל לתייג מישהו כשהפילטר נקרא \n  לדוגמה: "הוסף פילטר אוכל - [יוסי]" יגרום לבוט לתייג את יוסי כשנאמר "אוכל"\n\n  _קרדיטים_\n  מפותח ומתוחזק על ידי אריאל יצקן (@972543293155) ואיתן עמירן (@972586809911)\n  קישור ל־Github Repository, לסקרנים: https://github.com/ArielYat/Whatsapp-bot-Project`,
            "en_old": `*English Instructions* \n  _Language_:\n  - "Change language to [language]" - changes the language the bot receives and sends messages in\n  For example: Change language to Hebrew\n  This command can be used at all times in every language\n  Languages currently supported: Hebrew, English & Latin\n  \n  _Filters_:\n  - "Add filter [filter] - [bot reply]" - adds a filter to the group\n  For example: Add filter food - banana\n  Filters can be text, an image or a video\n  - "Remove filter [filter]" - removes the specified filter from the group\n  For example: Remove filter food\n  - "Edit filter [existing filter] - [new reply]" - edits the specified filter\n  For example: Edit filter food - peach\n  - "Show filters" - displays the list of all filter and their replies in the group\n  \n  _Tags_:\n  - "Tag [person]" - tags someone so that they get a notification even if the group is muted on their phone\n  For example: Tag Joseph\n  - "Add tag buddy [name] - [phone number in international format]" - adds the person to the list of taggable people\n  For example: Add tagging buddy Joseph - 972501234567\n  - "Remove tag buddy [name]" - removes the person from the list of taggable people\n  For example: Remove tagging buddy Joseph\n  - "Tag everyone" - tags all people in the group\n  - "Show tag buddies" - displays the list of all taggable people in the group\n  - "Check where I've been tagged" - shows the last message in which the message author's been tagged, can be used multiple times\n  - "Clear my tags" - clears the saved tags of the message's author\n  \n  _Birthdays_:\n  - "Add birthday [date in reverse international format with periods]" - adds a birthday for message's author\n  For example: Add birthday 1.11.2011\n  - "Remove birthday" - removes the author's birthday\n  - "Add group to birthday message" - adds the group the message was sent in to the author's birthday message broadcast\n  - "Remove group from birthday message" - removes the group the message was sent in from the author's birthday message broadcast\n  -"Show birthdays" - displays the birthdays of the group members  \n  \n  _Permissions & Muting_:\n  "Define permission for [permission type] - [number from 0 to 2]" - defines the permission level required for a certain type of commands\n  For example: Define permission filters - Regular\n  Permission types: filters, tags, handle-Filters, handle-Tags, handle-Birthdays, handle-Shows, handle-Other\n  Permission levels: Muted, Regular & Admin\n  - "Mute [person tag]" - mutes the tagged person so they aren't able to use commands\n  For example: Mute @Joseph\n  - "Unmute person [person tag]" - unmutes the tagged person\n  For example: Unmute @Joseph  \n  - "Show function permissions" - displays the permission levels of the different types of commands\n  - "Show people permissions" - displays the permission levels of the people in the group\n  \n  _Miscellaneous_:\n  - "Create sticker [without cropping/-]" - creates a sticker out of a media file and sends it\n  This command can be used in the message the media was sent in and as a reply to it\n  "without cropping" is an optional parameter which creates the sticker without cropping it  \n  - "Check Crypto" - sends a message with the exchange rates of ten different cryptocurrencies compared to the Dollar\n  - "Internet definition [work]" - searches for the word on the website Urban Dictionary and returns the search result\n  For example: Internet definition chair\n  - "Translate to [some language] [words]" - translates the words to the given language via Google Translate\n  For example: Translate to Hebrew chair\n  In the translation text only one sentence can be written due to Google Translate restrictions\n  - "Scan [link]" - scans the given link for viruses\n  For example: Scan https://www.google.com/\n  - "Send link" - sends a link to the bots webpage (work in progress)\n  - Create a WhatsApp survey:\n  "Create survey\n  Title - [survey title]\n  Subtitle - [survey subtitle]\n  Third Title - [third title]\n  Button 1 - [first option]\n  Button 2 - [second option]\n  Button 3 - [third option]"\n  (The third title and buttons 1 and 2 aren't required)\n    \n  _Special tip!_\n  When adding a filter you can use [name] to tag someone when the filter is invoked\n  For example: "Add filter food - [Joseph]" will make the bot tag Joseph whenever "food" is said\n  \n  _Deletion from the database_\n  - "Delete this group from the database" - deletes all of the group's information from the database\n  - "Delete me from the database" - deletes all of the author's information from the database\n  *Use these commands with caution, their effects are irreversible*\n  \n  _Credits_\n  Developed and maintained by Ariel Yatskan (@972543293155) and Ethan Amiran (@972586809911)\n  The GitHub repository, for the curious: https://github.com/ArielYat/Whatsapp-bot-Project`
        }, "start_message": {
            "he": `כדי לשנות שפה כתבו "שנה שפה ל[שפה שאתם רוצים לשנות לה]".\nהשפה בררת המחדל היא עברית, והשפות האפשריות כעת הן עברית, אנגלית ולטינית.\nכדי להציג את הודעת העזרה כתבו "עזרה" בשפה הפעילה.`,
            "en": `Hello, I'm John!\nTo change language type "Change language to [language you want to change to]".\nThe default language is Hebrew, and the currently available languages are Hebrew, English and Latin.\nTo display a help message type "Help" in the active language.`,
            "la": `Salve amici, John sum!\nMea lingua mutatum, scriba "Muta lingua ad [lingua quam desideras]".\nLingua Hebraica defalta est, et in sistema Linguae Anglica et Latina sunt.\nPropter auxilium, scriba "Auxilium" in mea lingua.`,
            "ar": ``,
            "fr": ``,
        }
    }
}

module.exports = Strings;
