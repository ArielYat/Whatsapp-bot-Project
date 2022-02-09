export const Strings = {
    "hyphen_reply": {
        "he": "כבודו אתה בטוח שהשתמשת במקף?",
        "en": "Are you sure you used a hyphen correctly?",
        "la": "Certusne tu adhibuisse recte eo iungente te?",
        "ar": "",
        "fr": "Êtes-vous sûr d'avoir correctement utilisé un tiret?"
    }, "command_spam_reply": {
        "he": "וואי ילד תירגע עם הפקודות. זהו, אני לא מקשיב לך יותר עד %s:%s",
        "en": "OK kid, calm down with the commands, will you? that's it, I'm not listening to you anymore until %s:%s",
        "la": "",
        "ar": "",
        "fr": "OK gamin, calme-toi avec les ordres,ça y est, je ne t'écoute plus jusqu'à %s:%s"
    }, "filter_spam_reply": {
        "he": "כמה פילטרים שולחים פה? אני הולך לישון עד %s:%s",
        "en": "How many filters are you guys sending here? I'm going to sleep until %s:%s",
        "la": "",
        "ar": "",
        "fr": "Combien de filtres vous envoyez ici les gars? Je vais dormir jusqu'à %s:%s"
    }, //filters
    "add_filter": {
        "he": /^הוסף פילטר/i,
        "en": /^Add filter/i,
        "la": "Crea invenientem",
        "ar": "",
        "fr": /^Ajoute le filtre/i
    }, "add_filter_reply": {
        "he": "הפילטר %s נוסף בהצלחה",
        "en": "The filters %s has been successfully added",
        "la": "Invenientem %s creatur feliciter",
        "ar": "",
        "fr": "Le filtre %s à été ajouté avec succès"
    }, "add_filter_already_exists_error": {
        "he": "הפילטר %s כבר קיים במאגר של קבוצה זו \nאם אתה רוצה לערוך אותו תכתוב את זה: \nערוך פילטר %s - %s",
        "en": "The filters %s already exists in this group\n If u want to edit the filters please write this:\n Edit filters %s - %s",
        "la": "Reprehendentem %s iam in systemae est\nScribe 'recense invenientem %s - %s' recensitum reprehendentem",
        "ar": "",
        "fr": "Le filtre %s existe déjà dans ce groupe\n si vous souhaitez modifier le filtre, écrivez ceci:\n Modifie le filtre %s - %s"
    }, "remove_filter": {
        "he": /^הסר פילטר/i,
        "en": /^Remove filter/i,
        "la": "Dele invenientem",
        "ar": "",
        "fr": /^Supprime le filtre/i
    }, "remove_filter_reply": {
        "he": "הפילטר %s הוסר בהצלחה",
        "en": "The filters %s has been successfully removed",
        "la": "Invenientem %s deletur feliciter",
        "ar": "",
        "fr": "Le filtre %s a été supprimé avec succès"
    }, "remove_filter_doesnt_exist_error": {
        "he": "רק אלוהים יכול למחוק פילטר לא קיים",
        "en": "Only the god of light and all that is good can can delete a filters which doesn't exist",
        "la": "Deus Iupiter solum potest delere invenientem qui non exsistit",
        "ar": "",
        "fr": "Seul le dieu de la lumière et tout ce qui est bon peut supprimer un filtre qui n'existe pas"
    }, "group_doesnt_have_filters_error": {
        "he": "אין פילטרים בקבוצה זו",
        "en": "This group doesn't have any filters",
        "la": "Coetus hoc non habet invenientes",
        "ar": "",
        "fr": "Ce groupe n'a aucun filtres"
    }, "edit_filter": {
        "he": /^ערוך פילטר/i,
        "en": /^Edit filter/i,
        "la": "Recense invenientem",
        "ar": "",
        "fr": /^Modifie le filtre/i
    }, "edit_filter_reply": {
        "he": "הפילטר %s נערך בהצלחה",
        "en": "The filters %s has been successfully edited",
        "la": "Invenientem %s recensetur felicitur",
        "ar": "",
        "fr": "Le filtre %s a été modifié avec succès"
    }, "edit_filter_not_existent_error": {
        "he": "סליחה כבודו אבל אי אפשר לערוך פילטר שלא קיים",
        "en": "Apologies good sir, but you tried to edit a filter which doesn't exist in this group",
        "la": "Paenito, mihi amice, sed recensere invenientem non exsistentem impossibile est",
        "ar": "",
        "fr": "Désolé monsieur, mais vous avez essayé de modifier un filtre qui n'existe pas dans ce groupe"
    }, "filter_not_filter_material_error": {
        "he": "הפילטר שניסית להוסיף אינו טקסט, תמונה או סרטון",
        "en": "The filter you tried to add isn't text, an image or a video",
        "la": "",
        "ar": "",
        "fr": "Le filtre que vous avez essayé d'ajouter n'est pas un texte, une image ou une vidéo"
    }, "show_filters": {
        "he": /^הראה פילטרים/i,
        "en": /^Show filters/i,
        "la": /^Ostende invenientes/i,
        "ar": "",
        "fr": /^Affiche les filtres/i
    }, "filter_type_image": {
        "he": "[תמונה]", "en": "[Image]", "la": "", "ar": "", "fr": "[Image]"
    }, "filter_type_video": {
        "he": "[וידאו]", "en": "[Video]", "la": "", "ar": "", "fr": "[Video]"
    }, //tags
    "tag_person": {
        "he": /^תייג /i, "en": /^Tag /i, "la": "Clama ad ", "ar": "", "fr": /^Tag /i
    }, "tag_person_doesnt_exist_error": {
        "he": "אתה בטוח שצדקת בשם? בכל מקרה האדם שניסית לתייג לא נמצא פה",
        "en": "The person you tried to tags doesn't exist",
        "la": "Quem debeo clamare? Is/ea non exsistet",
        "ar": "",
        "fr": "La personne que vous avez essayé de taguer n'existe pas"
    }, "add_tag": {
        "he": /^הוסף חבר לתיוג/i,
        "en": /^Add tag buddy/i,
        "la": "Adde amicum",
        "ar": "",
        "fr": /^Ajoute la personne au tag/i
    }, "add_tag_reply": {
        "he": "מספר הטלפון של האדם %s נוסף בהצלחה",
        "en": "The phone number of the person %s has been successfully added",
        "la": "Amicum %s additur feliciter",
        "ar": "",
        "fr": "Le numéro de téléphone de la personne %s a été ajouté avec succès"
    }, "add_tag_already_exists_error": {
        "he": "האדם %s כבר קיים במאגר של קבוצה זו",
        "en": "The person %s already exists in this group's database",
        "la": "Amicum %s iam exsistet in sistema",
        "ar": "",
        "fr": "La personne %s existe déjà dans la base de données de ce groupe"
    }, "add_tag_doesnt_exist_error": {
        "he": "מספר הטלפון לא קיים בקבוצה זו",
        "en": "This phone number does not exist in this group",
        "la": "Amicum non exsistet in coetu",
        "ar": "",
        "fr": "Ce numéro de téléphone n'existe pas dans ce groupe"
    }, "remove_tag": {
        "he": /^הסר חבר מתיוג/i,
        "en": /^Remove tag buddy/i,
        "la": "Dele amicum",
        "ar": "",
        "fr": /^Supprime la personne du tag/i
    }, "remove_tag_reply": {
        "he": "מספר הטלפון של האדם %s הוסר בהצלחה",
        "en": "The phone number of the person %s has been successfully removed",
        "la": "Amicum %s delitur feliciter",
        "ar": "",
        "fr": "Le numéro de téléphone de la personne %s a été supprimé avec succès"
    }, "remove_tag_doesnt_exist_error": {
        "he": "רק נפוליאון יכול למחוק אנשים לא קיימים",
        "en": "Only Napoleon can remove people who don't exist",
        "la": "Napoleonus solum potest delere amici non exsistentes",
        "ar": "",
        "fr": "Seul Napoléon peut supprimer des personnes qui n'existent pas"
    }, "group_doesnt_have_tags_error": {
        "he": "אין תיוגים לקבוצה זו",
        "en": "This group doesn't have any tags",
        "la": "Hoc coetus non habet amici",
        "ar": "",
        "fr": "Ce groupe n'a aucun tags"
    }, "tag_all": {
        "he": /^תייג כולם/i,
        "en": /^Tag everyone/i,
        "la": "Clama ad quoque",
        "ar": "",
        "fr": /^Tag tout le monde/i
    }, "show_tags": {
        "he": /^הראה רשימת חברים לתיוג/i,
        "en": /^Show tag buddies/i,
        "la": "Ostende amici",
        "ar": "",
        "fr": /^Affiche la liste des personnes taguées/i
    }, "check_tags": {
        "he": /^בדוק היכן תייגוני/i,
        "en": /^Check my tags/i,
        "la": "",
        "ar": "",
        "fr": /^Vérifie où j'ai été tagué/i
    }, "check_tags_reply": {
        "he": "הנה תיוגך, אדוני הטוב",
        "en": "You've been tagged here, Good Sir",
        "la": "",
        "ar": "",
        "fr": "Vous avez été tagué ici, monsieur"
    }, "check_tags_no_messages_error": {
        "he": "לא תוייגת מאז שאני זוכר את עצמי",
        "en": "You haven't been tagged for as long as I can remember myself",
        "la": "",
        "ar": "",
        "fr": "Vous n'avez pas été tagué depuis aussi longtemps que je me souvienne de moi"
    }, "clear_tags": {
        "he": /^נקה תיוגיי/i, "en": /^Clear my tags/i, "la": "", "ar": "", "fr": /^Efface mes tags/i
    }, "clear_tags_reply": {
        "he": "נוקתה רשימת תיוגך",
        "en": "Your tag list has been cleared",
        "la": "",
        "ar": "",
        "fr": "Votre liste de tags a été effacée"
    }, "create_tag_list": {
        "he": /^צור רשימה לתיוג/i,
        "en": /^Create tag list/i,
        "la": "",
        "ar": "",
        "fr": /^Crée une liste de tags/i
    }, "create_tag_list_reply": {
        "he": "הרשימה לתיוג נוצרה בהצלחה מרובה",
        "en": "The tag list has been created",
        "la": "",
        "ar": "",
        "fr": "La liste de tags a été créée"
    }, "create_tag_list_empty_error": {
        "he": "אני לא יכול ליצור רשימת תיוג ריקה",
        "en": "I simply cannot create an empty tag list",
        "la": "",
        "ar": "",
        "fr": "Je ne peux tout simplement pas créer une liste de tags vide"
    }, "next_tag_list": {
        "he": /^הבא בתור/i, "en": /^Next in line/i, "la": "", "ar": "", "fr": /^Au suivant/i
    }, "tag_list_next_reply": {
        "he": "האדם הבא בתור (כלומר עכשיו!) הינו %s ואחריו %s (אז תהיה מוכן!) \nכדי לעבור לאיש הבא, כתבו 'הבא בתור'",
        "en ": "The next person in the que (which means now!) is %s and after them it's %s (so be ready!) \n To go the next person, write 'Next in line'",
        "la": "",
        "ar": "",
        "fr": "La personne suivante dans la file d'attente (c'est-à-dire maintenant!) est %s et après elle, c'est %s (soyez donc prêt!) \n Pour passer à la personne suivante, écrivez 'Au suivant'"
    }, "tag_list_last_reply": {
        "he": "האדם הבא ברשימה הינו האחרון: %s",
        "en": "The next person in the list is the last one: %s",
        "la": "",
        "ar": "",
        "fr": "La personne suivante dans la liste est la dernière: %s"
    }, "add_tagging_group": {
        "he": /^הוסף קבוצת תיוג/i,
        "en": /^Add tagging group/i,
        "la": "",
        "ar": "",
        "fr": /^Ajoute un groupe de tags/i
    }, "add_tagging_group_reply": {
        "he": "קבוצת התיוג %s נוספה בהצלחה",
        "en": "The tagging group %s has been added successfully",
        "la": "",
        "ar": "",
        "fr": "Le groupe de tags %s a été ajouté avec succès"
    }, "add_tagging_group_already_exists_error": {
        "he": "קבוצת התיוג %s כבר קיימת במאגר",
        "en": "The tagging group %s already exists in the database",
        "la": "",
        "ar": "",
        "fr": "Le groupe de tags %s existe déjà dans la base de données"
    }, "add_tagging_group_invalid_phone_numbers_error": {
        "he": "מבין כל השמות שנתת לי אין אפילו אחד מהם בקבוצה!",
        "en": "Out of all the names you've given me, not even one of them is in the group!",
        "la": "",
        "ar": "",
        "fr": "De tous les noms que vous m'avez donnés, aucun d'entre eux n'est dans le groupe!"
    }, "add_tagging_group_no_phone_numbers_error": {
        "he": "תבדוק שהשתמשת בפורמט הנכון להוספת שמות: \nהוסף קבוצת תיוג בננה - משה, יוסי, שלום",
        "en": "Check you've used the correct format for adding names: \nAdd tagging group Banana - Moshe, Joseph, Shalom",
        "la": "",
        "ar": "",
        "fr": "Vérifiez que vous avez utilisé le bon format pour ajouter des noms: \nAjoute un groupe de tags Banane - Moshe, Joseph, Shalom"
    }, "remove_tagging_group": {
        "he": /^הסר קבוצת תיוג/i,
        "en": /^Remove tagging group/i,
        "la": "",
        "ar": "",
        "fr": /^Supprime le groupe de tags/i
    }, "remove_tagging_group_reply": {
        "he": "קבוצת התיוג %s הוסרה בהצלחה",
        "en": "The tagging group %s has been removed successfully",
        "la": "",
        "ar": "",
        "fr": "Le groupe de tags %s a été supprimé avec succès"
    }, "remove_tagging_group_does_not_exist_error": {
        "he": "רק סבתא משה יכולה למחוק קבוצות תיוג שלא קיימות",
        "en": "Only grandma can remove non-existant groups",
        "la": "",
        "ar": "",
        "fr": "Seule grand-mère peut supprimer des groupes qui n'existent pas"
    }, "tagging_group": {
        "he": "קבוצת תיוגים: ",
        "en": "Tagging group: ",
        "la": "",
        "ar": "",
        "fr": "Groupe de tags: "
    }, "add_person_to_tagging_group": {
        "he": /^הוסף את (.+) לקבוצת התיוג (.+)/i,
        "en": /^Add (.+) to tagging group (.+)/i,
        "la": "",
        "ar": "",
        "fr": ""
    }, "remove_person_from_tagging_group": {
        "he": /^הסר את (.+) מקבוצת התיוג (.+)/i,
        "en": /^Remove (.+) from tagging group (.+)/,
        "la": "",
        "ar": "",
        "fr": ""
    }, "add_person_to_tagging_group_reply": {
        "he": "האדם %s נוסף לקבוצת התיוג %s",
        "en": "The person %s has been successfully added to the tagging group %s",
        "la": "",
        "ar": "",
        "fr": ""
    }, "add_person_to_tagging_group_already_exists_error": {
        "he": "האדם %s כבר נמצא בקבוצת התיוג %s",
        "en": "The person %s is already in the tagging group %s",
        "la": "",
        "ar": "",
        "fr": ""
    }, "tagging_group_group_doesnt_exist_error": {
        "he": "קבוצת התיוג %s לא קיימת בקבוצה זו",
        "en": "The tagging group %s does not exist in this group",
        "la": "",
        "ar": "",
        "fr": ""
    }, "person_doesnt_exist_in_this_group_error": {
        "he": "האדם %s לא קיים בקבוצה זו",
        "en": "The person %s does not exist in this group",
        "la": "",
        "ar": "",
        "fr": ""
    }, "remove_person_from_tagging_group_reply": {
        "he": "האדם %s הוסר מקבוצת התיוג %s",
        "en": "The person %s has been successfully removed from the tagging group %s",
        "la": "",
        "ar": "",
        "fr": ""
    }, "remove_person_from_tagging_group_does_not_exist_error": {
        "he": "האדם %s לא נמצא בקבוצת התיוג %s",
        "en": "The person %s is not in the tagging group %s",
        "la": "",
        "ar": "",
        "fr": ""
    }, "tagging_group_no_more_persons_error": {
        "he": "כל האנשים בקבוצת התיוג %s נמחקו ולכן הקבוצה הוסרה",
        "en": "All the people in the tagging group %s have been deleted so the tagging group has been removed",
        "la": "",
        "ar": "",
        "fr": ""
    }, "tagging_group_does_not_exist_error": {
        "he": "כבודו, קבוצת התיוג שביקשתך אינה קיימת",
        "en": "Sir, the tagging group you requested does not exist",
        "la": "",
        "ar": "",
        "fr": "Monsieur, le groupe de tags que vous avez demandé n'existe pas"
    }, "tags_removed_problematic_tag_error": {
        "he": "התיוגים בקבוצה זו נמצאו בעייתיים. בהתאם לכך ואם לזאת, הם כולם נמחקו. יום טוב!",
        "en": "The tags in this group has been found to be troublesome. In accordance, all the tags in this group have been deleted. Good day!",
        "la": "",
        "ar": "",
        "fr": "Les tags de ce groupe se sont avérés gênants. Conformément, tout les tags de ce groupe ont été supprimés. Bonne journée"
    }, "personIn_removed_problematic_error": {
        "he": "רשימת האנשים בקבוצה זו נמחקה. תאשימו את החזירים הקפיטליסטים",
        "en": "The list of people in this group has been deleted. Blame the Capitalist pigs",
        "la": "",
        "ar": "",
        "fr": ""
    }, "filter_removed_problematic_tag_error": {
        "he": "הפילטר היה מחובר לתיוג בעייתי לכן הוסר",
        "en": "This filter was attached to a problematic tag and as such, was removed",
        "la": "",
        "ar": "",
        "fr": "Ce filtre était associé à un tag problématique et a donc été supprimé"
    }, //birthdays
    "birthday_wishes_reply": {
        "he": "מזל טוב ל%s! הוא/היא בן/בת %s!",
        "en": "Happy birthday to %s! He/she is %s years old!",
        "la": "%s, felix sit natalis dies! Habes %s annos",
        "ar": "",
        "fr": "Joyeux anniversaire à %s! Il/elle a %s ans!"
    }, "add_birthday": {
        "he": /^הוסף יום הולדת/i,
        "en": /^Add birthday/i,
        "la": "Adde natalis dies",
        "ar": "",
        "fr": /^Ajoute l'anniversaire/i
    }, "add_birthday_reply": {
        "he": "יום ההולדת של הבחור %s נוסף בהצלחה",
        "en": "%s's birthday has been successfully added",
        "la": "Natalis dies %s additur feliciter",
        "ar": "",
        "fr": "L'anniversaire de %s a été ajouté avec succès"
    }, "add_birthday_already_exists_error": {
        "he": "יום ההולדת של הבחור %s כבר קיים",
        "en": "%s's birthday already exists in this group",
        "la": "Natalis dies %s iam exsistet in hoc coetu",
        "ar": "",
        "fr": "L'anniversaire de %s existe déjà dans ce groupe"
    }, "date_existence_error": {
        "he": "מה לעזאזל זה השטויות האלה? אתה בטוח שזה תאריך מציאותי?",
        "en": "Are you sure what you inputted is a date or something along those lines?",
        "la": "Certusne tu hoc natalis dies esse?",
        "ar": "",
        "fr": "Êtes-vous sûr que ce que vous avez entré est une date ou quelque chose du genre"
    }, "date_syntax_error": {
        "he": "תראה אתה אמור להשתמש בשתי נקודות כשאתה כותב תאריך אבל מי אני שאשפוט",
        "en": "Yeah that's not how you write a date... You should be using periods",
        "la": "Rescribe dies cum periodes",
        "ar": "",
        "fr": "Ouais, ce n'est pas comme ça qu'on écrit une date... Vous devriez utiliser des points"
    }, "remove_birthday": {
        "he": /^הסר יום הולדת/i,
        "en": /^Remove birthday/i,
        "la": "Dele natalis dies",
        "ar": "",
        "fr": /^Supprime l'anniversaire/i
    }, "remove_birthday_reply": {
        "he": "יום ההולדת של הבחור %s הוסר בהצלחה",
        "en": "%s's birthday has been successfully removed",
        "la": "%s natalis dies delitur feliciter",
        "ar": "",
        "fr": "L'anniversaire de %s a été supprimé avec succès"
    }, "remove_birthday_doesnt_exist_error": {
        "he": "רק דוקטור דופנשמירץ יכול למחוק ימי הולדת לא קיימים",
        "en": "Only Dr. Doofenshmirtz can remove birthday which don't exist",
        "la": "Doctor Doofenshmirtz solum potest delere natalis dies non exsistentes",
        "ar": "",
        "fr": "Seul le Dr Doofenshmirtz peut supprimer des anniversaires qui n'existent pas"
    }, "show_birthdays": {
        "he": /^הראה ימי הולדת/i,
        "en": /^Show birthdays"/i,
        "la": "Ostende natalis dies",
        "ar": "",
        "fr": /^Affiche les anniversaires/i
    }, "group_doesnt_have_birthdays_error": {
        "he": "אין לקבוצה זו ימי הולדת",
        "en": "This group don't have any birthday registered",
        "la": "Hoc coetus non habet natalis dies",
        "ar": "",
        "fr": "Ce groupe n'a pas d'anniversaire enregistré"
    }, "add_birthday_to_group": {
        "he": /^הוסף קבוצה לרשימת התפוצה של יום ההולדת/i,
        "en": /^Add group to the birthday distribution list/i,
        "la": "",
        "ar": "",
        "fr": /^Ajoute un groupe a la liste diffusion du message d'anniversaire/i
    }, "birthday_added_to_group_reply": {
        "he": "הקבוצה נוספה בהצלחה לרשימת התפוצה של ימי הולדת שלך",
        "en": "The group has been successfully added to this person's birthday message broadcast list",
        "la": "",
        "ar": "",
        "fr": "Le groupe a été ajouté avec succès à la liste de diffusion des messages d'anniversaire de cette personne"
    }, "birthday_added_to_group_error": {
        "he": "הקבוצה כבר קיימת ברשימת התפוצה של ימי ההולדת שלך",
        "en": "This group is already in your birthday message's broadcast",
        "la": "",
        "ar": "",
        "fr": "Ce groupe est déjà dans la liste de diffusion de votre message d'anniversaire"
    }, "remove_birthday_from_group": {
        "he": /^הסר קבוצה מרשימת התפוצה של יום ההולדת/i,
        "en": /^Remove group from the birthday distribution list/i,
        "la": "",
        "ar": "",
        "fr": /^Supprime le groupe de la liste de diffusion du message d'anniversaire/i
    }, "birthday_removed_from_group_reply": {
        "he": "הקבוצה הוסרה בהצלחה מרשימת התפוצה של ימי הולדת של אדם זה",
        "en": "The group has been successfully removed from this person's birthday message broadcast list",
        "la": "",
        "ar": "",
        "fr": "Le groupe a été supprimé avec succès de la liste de diffusion des messages d'anniversaire de cette personne"
    }, "birthday_removed_from_group_error": {
        "he": "רק סמי יכול להסיר קבוצות שלא קיימות ברשימת התפוצה שלך",
        "en": "Only Sam can remove groups which aren't in your birthday message's broadcast",
        "la": "",
        "ar": "",
        "fr": "Seul Sam peut supprimer les groupes qui ne figurent pas dans la liste de diffusion de votre message d'anniversaire"
    }, "person_doesnt_have_birthday_error": {
        "he": "לבחורצ'יק כאן אין יום הולדת (מוגדר)",
        "en": "This man does not have a birthday (defined)",
        "la": "",
        "ar": "",
        "fr": "Cet homme n'a pas défini d'anniversaire"
    }, //permissions & muting
    "set_permissions": {
        "he": /^קבע הרשאה ל/i,
        "en": /^Define permission for/i,
        "la": "",
        "ar": "",
        "fr": /^Définis l'autorisation pour/i
    }, "set_permissions_reply": {
        "he": "ההרשאה שונתה בהצלחה",
        "en": "Permission changed successfully",
        "la": "",
        "ar": "",
        "fr": /^L'autorisation a été modifiée avec succès/i
    }, "set_permissions_error": {
        "he": "אין לך הרשאה מספיק גבוהה בשביל מה שניסית לעשות",
        "en": "You don't have a high enough clearance level for what you were trying to do",
        "la": "",
        "ar": "",
        "fr": "Vous n'avez pas un niveau suffisamment élevé pour ce que vous essayez de faire"
    }, "permission_option_does_not_exist_error": {
        "he": "רק האיש והאגדה משה יכול לשנות אופציה לא קיימת",
        "en": "Only the man, the myth, the legend Moses can select a nonexistent option",
        "la": "",
        "ar": "",
        "fr": "Seul l'homme, le mythe, la légende Moïse peut sélectionner une option inexistante"
    }, "permission_level_does_not_exist_error": {
        "he": "רק ביג מוישה יכול לבחור הרשאה שלא קיימת \nבדוק שבחרת אחד מאלה: מנהל/רגיל/מושתק",
        "en": "Only big Moshe can choose a non-existent\n Check you've chosen one of these: Admin/Regular/Muted",
        "la": "",
        "ar": "",
        "fr": "Seul le grand Moïse peut choisir un niveau inexistant\n Vérifiez que vous avez choisi l'un de ces éléments: Admin/Ordinaire/En sourdine"
    }, "filters_permission_type": {
        "he": /פילטרים/i, "en": /filters/i, "la": "", "ar": "", "fr": /^Filtres/i
    }, "tags_permission_type": {
        "he": /תיוגים/i, "en": /tags/i, "la": "", "ar": "", "fr": /^Tags/i
    }, "handleFilters_permission_type": {
        "he": /ניהול_פילטרים/i, "en": /handle_Filters/i, "la": "", "ar": "", "fr": /^Gérer_Filtres/i
    }, "handleTags_permission_type": {
        "he": /ניהול_תיוגים/i, "en": /handle_Tags/i, "la": "", "ar": "", "fr": /^Gérer_Tags/i
    }, "handleBirthdays_permission_type": {
        "he": /ניהול_ימיהולדת/i,
        "en": /handle_Birthdays/i,
        "la": "",
        "ar": "",
        "fr": /^Gérer_Anniversaires/i
    }, "handleShows_permission_type": {
        "he": /ניהול_הראה/i, "en": /handle_Shows/i, "la": "", "ar": "", "fr": /^Gérer_Affiches/i
    }, "handleOther_permission_type": {
        "he": /ניהול_שונות/i, "en": /handle_Other/i, "la": "", "ar": "", "fr": /^Gérer_Autre/i
    }, "filters_permission_type_replace": {
        "he": "פילטרים", "en": "filters", "la": "", "ar": "", "fr": "Filtres"
    }, "tags_permission_type_replace": {
        "he": "תיוגים", "en": "tags", "la": "", "ar": "", "fr": "Tags"
    }, "handleFilters_permission_type_replace": {
        "he": "ניהול_פילטרים", "en": "handle_Filters", "la": "", "ar": "", "fr": "Gérer_Filtres"
    }, "handleTags_permission_type_replace": {
        "he": "ניהול_תיוגים", "en": "handle_Tags", "la": "", "ar": "", "fr": "Gérer_Tags"
    }, "handleBirthdays_permission_type_replace": {
        "he": "ניהול_ימיהולדת", "en": "handle_Birthdays", "la": "", "ar": "", "fr": "Gérer_Anniversaires"
    }, "handleShows_permission_type_replace": {
        "he": "ניהול_הראה", "en": "handle_Shows", "la": "", "ar": "", "fr": "Gérer_affiche"
    }, "handleOther_permission_type_replace": {
        "he": "ניהול_שונות", "en": "handle_Other", "la": "", "ar": "", "fr": "Gérer_Autre"
    }, "muted_permission_level": {
        "he": /מושתק/, "en": /Muted/i, "la": "", "ar": "", "fr": /En sourdine/i
    }, "regular_permission_level": {
        "he": /רגיל/, "en": /Regular/i, "la": "", "ar": "", "fr": /Ordinaire/i
    }, "admin_permission_level": {
        "he": /מנהל/, "en": /Admin/i, "la": "", "ar": "", "fr": /Admin/i
    }, "developer_permission_level": {
        "he": /אלוהים/, "en": /God/i, "la": "", "ar": "", "fr": /Dieu/i
    }, "muted_permission_level_replace": {
        "he": "מושתק", "en": "Muted", "la": "", "ar": "", "fr": "En sourdine"
    }, "regular_permission_level_replace": {
        "he": "רגיל", "en": "Regular", "la": "", "ar": "", "fr": "Ordinaire"
    }, "admin_permission_level_replace": {
        "he": "מנהל", "en": "Admin", "la": "", "ar": "", "fr": "Admin"
    }, "developer_permission_level_replace": {
        "he": "אלוהים", "en": "God", "la": "", "ar": "", "fr": "Dieu"
    }, "show_group_function_permissions": {
        "he": /^הראה הרשאות פונקציות/i,
        "en": /^Show function permissions/i,
        "la": "",
        "ar": "",
        "fr": /^Affiche les niveaux de fonction/i
    }, "show_group_user_permissions": {
        "he": /^הראה הרשאות אנשים/i,
        "en": /^Show people permissions/i,
        "la": "",
        "ar": "",
        "fr": /^Affiche les niveaux des personnes/i
    }, "mute_participant": {
        "he": /^השתק/i, "en": /^Mute/i, "la": "", "ar": "", "fr": /^Met en sourdine/i
    }, "mute_participant_reply": {
        "he": "המשתמש %s לא יכול להשתמש בפקודות יותר",
        "en": "User %s cannot use commands anymore",
        "la": "",
        "ar": "",
        "fr": "L'utilisateur %s ne peut plus utiliser les commandes"
    }, "unmute_participant": {
        "he": /^הסר השתקה/i,
        "en": /^Unmute person/i,
        "la": "",
        "ar": "",
        "fr": /^Réactive la personne/i
    }, "unmute_participant_reply": {
        "he": "המשתמש %s יכול להשתמש בפקודות שוב",
        "en": "User %S can use commands again",
        "la": "",
        "ar": "",
        "fr": "L'utilisateur %S peut à nouveau utiliser les commandes"
    }, "participant_not_in_group_error": {
        "he": "אני יכול להשתיק רק מישהו שכתב בקבוצה פעם. סליחה!",
        "en": "I can only mute someone who has been in this group in the past. Sorry!",
        "la": "",
        "ar": "",
        "fr": "Je ne peux mettre en sourdine que quelqu'un qui a déjà fait partie de ce groupe dans le passé. Desolé!"
    }, "no_participant_chosen_error": {
        "he": "אני לא יכול להשתיק את אף אחד, אתה חייב לבחור מישהו",
        "en": "I can't mute nobody, you gotta choose someone",
        "la": "",
        "ar": "",
        "fr": "Je ne peux pas mettre personne en sourdine, tu dois choisir quelqu'un"
    }, //immediate commands
    "scan_link": {
        "he": /^סרוק/i, "en": /^Scan/i, "la": /^Examina/i, "ar": "", "fr": /^Analyse/i
    }, "link_validity_error": {
        "he": "חביבי, זה לא קישור תקין",
        "en": "bro that's not a valid link",
        "la": "",
        "ar": "",
        "fr": "frère, ce n'est pas un lien valide"
    }, "scan_link_checking_reply": {
        "he": "%s \n בודק...",
        "en": "%s \n Checking...",
        "la": "%s \n Examino...",
        "ar": "",
        "fr": "%s \n J'examine..."
    }, "scan_link_result_reply": {
        "he": " וואלה אחי בדקתי את הקישור כמו שביקשת ומצאתי ש־%s אנטי וירוסים מצאו אותו סאחי",
        "en": "%s antivirus engines detected this link as malicious",
        "la": "%s deprehendentes reperiebant hoc ligentem malum esse",
        "ar": "",
        "fr": "Écoute frère j'ai examiné le lien comme tu l'as demandé et Les moteurs antivirus %s ont détecté ce lien comme malveillant"
    }, "scan_link_upload_error": {
        "he": "שגיאה בהעלאת הקישור",
        "en": "Error received while uploading the link",
        "la": "Error #1 in ligente est",
        "ar": "",
        "fr": "Erreur reçue lors du téléchargement du lien"
    }, "scan_link_checking_error": {
        "he": "שגיאה בבדיקת הקישור",
        "en": "Error received while checking the link",
        "la": "Error #2 in ligente est",
        "ar": "",
        "fr": "Erreur reçue lors de la vérification du lien"
    }, "make_sticker": {
        "he": /^הפוך לסטיקר/i,
        "en": /^Create sticker/i,
        "la": "Fac hoc imaginem",
        "ar": "",
        "fr": /^Crée un autocollant/i
    }, "crop_sticker": {
        "he": /^ללא חיתוך/i, "en": /^without cropping/i, "la": "", "ar": "", "fr": /^Sans coupures/i
    }, "high_Quality": {
        "he": /^איכות גבוהה/i, "en": /^High Quality/i, "la": "", "ar": "", "fr": /^Haute qualité/i
    }, "medium_Quality": {
        "he": /^איכות בינונית/i, "en": /^Medium Quality/i, "la": "", "ar": "", "fr": /^Qualité moyenne/i
    }, "not_sticker_material_error": {
        "he": "טיפש אי אפשר להפוך משהו שהוא לא תמונה או סרטון או הודעה לסטיקר",
        "en": "Idiot, a sticker has to be an image or a video or a message",
        "la": "",
        "ar": "",
        "fr": "Idiot, un autocollant doit être une image ou une vidéo ou un message"
    }, "create_text_sticker": {
        "he": /^צור סטיקר טקסט/i,
        "en": /^Create text sticker/i,
        "la": "",
        "ar": "",
        "fr": /^Crée un autocollant de texte/i
    }, "text_sticker_error": {
        "he": "התרחשה שגיאה ביצירת הסטיקר\nבדוק שבחרת צבע באנגלית ומילה",
        "en": "An error occurred while making your sticker \nCheck you've chosen a colour in English and at least one word",
        "la": "",
        "ar": "",
        "fr": "Une erreur s'est produite lors de la création de votre autocollant \nVérifiez que vous avez choisi une couleur en anglais et au moins un mot"
    }, "create_survey": {
        "he": /^צור סקר/i,
        "en": /^Create survey/i,
        "la": "Crea census",
        "ar": "",
        "fr": /^Crée un sondage/i
    }, "survey_title": {
        "he": /כותרת - (.)+/, "en": /Title - (.)+/, "la": /Nomen - (.)+/, "ar": "", "fr": /Titre - (.)+/
    }, "survey_subtitle": {
        "he": /כותרת משנה - (.)+/,
        "en": /Subtitle - (.)+/,
        "la": /Subnomen - (.)+/,
        "ar": "",
        "fr": /Deuxième titre - (.)+/
    }, "third_survey_title": {
        "he": /כותרת שלישית - (.)+/,
        "en": /Third title - (.)+/,
        "la": /Nomen tertium - (.)+/,
        "ar": "",
        "fr": /Troisième titre - (.)+/
    }, "survey_button_1": {
        "he": /כפתור 1 - (.)+/,
        "en": /Button 1 - (.)+/,
        "la": /Buttonus 1 - (.)+/,
        "ar": "",
        "fr": /Bouton 1 - (.)+/
    }, "survey_button_2": {
        "he": /כפתור 2 - (.)+/,
        "en": /Button 2 - (.)+/,
        "la": /Buttonus 2 - (.)+/,
        "ar": "",
        "fr": /Bouton 2 - (.)+/
    }, "survey_button_3": {
        "he": /כפתור 3 - (.)+/,
        "en": /Button 3 - (.)+/,
        "la": /Buttonus 3 - (.)+/,
        "ar": "",
        "fr": /Bouton 3 - (.)+/
    }, "survey_title_replace": {
        "he": "כותרת -", "en": "Title -", "la": "Nomen -", "ar": "", "fr": "Titre -"
    }, "second_survey_title_replace": {
        "he": "כותרת משנה -", "en": "Body -", "la": "Subnomen -", "ar": "", "fr": "Corps -"
    }, "third_survey_title_replace": {
        "he": "כותרת שלישית -", "en": "Footer -", "la": "Nomen tertium -", "ar": "", "fr": "Bas de page -"
    }, "survey_button_1_replace": {
        "he": "כפתור 1 -", "en": "Button 1 -", "la": "Buttonus 1 -", "ar": "", "fr": "Bouton 1 -"
    }, "survey_button_2_replace": {
        "he": "כפתור 2 -", "en": "Button 2 -", "la": "Buttonus 2 -", "ar": "", "fr": "Bouton 2 -"
    }, "survey_button_3_replace": {
        "he": "כפתור 3 -", "en": "Button 3 -", "la": "Buttonus 3 -", "ar": "", "fr": "Bouton 3 -"
    }, "survey_creation_error": {
        "he": "אני צריך כותרת, כותרת משנה ולפחות כפתור אחד בשביל ליצור סקר",
        "en": "I need a title, a body and at least one button to make a survey",
        "la": "Necessitudines sunt nomen atque subnomen atque buttonus namque census",
        "ar": "",
        "fr": "J'ai besoin d'un titre, d'un corps et d'au moins un bouton pour faire un sondage"
    }, "check_crypto": {
        "he": /^בדוק קריפטו/i,
        "en": /^Check Crypto/i,
        "la": "",
        "ar": "",
        "fr": /^Verifie la Crypto/i
    }, "crypto_check_reply": {
        "he": "הנה השטויות שביקשת: \n %s",
        "en": "Here's the junk you requsted: \n %s",
        "la": "Hoc non est similacrum",
        "ar": "",
        "fr": "Voici les trucs que vous avez demandé"
    }, "crypto_api_error": {
        "he": "נתקלתי בבעיה איפהשהו בדרך",
        "en": "I've ran into a problem somewhere along the way",
        "la": "",
        "ar": "",
        "fr": "J'ai rencontré un problème quelque part en cours de route"
    }, "crypto_limit_error": {
        "he": "אני מצטער אבל כל קבוצה יכולה לבדוק את שערי המרת הקריפטו רק פעם אחת ביום",
        "en": "Forgive me but each group can check the Crypto exchange rates only once per day",
        "la": "",
        "ar": "",
        "fr": "Pardonnez-moi mais chaque groupe ne peut vérifier les taux de change Crypto qu'une seule fois par jour"
    }, "search_in_urban": {
        "he": /^הגדרת אינטרנט/i,
        "en": /^Internet definition/i,
        "la": "",
        "ar": "",
        "fr": /^Définition Internet/i
    }, "search_in_urban_reply": {
        "he": "הגדרה", "en": "Definition", "la": "", "ar": "", "fr": "Définition"
    }, "urban_word_not_found_error": {
        "he": "לא נמצאות תוצאות למילה שחופשה",
        "en": "No definitions were found for the searched word",
        "la": "",
        "ar": "",
        "fr": "Aucune définition n'a été trouvée pour le mot recherché"
    }, "urban_api_error": {
        "he": "סלח לי, אך התנגשתי בבעיה בדרכי להביא את ההגדרה",
        "en": "Forgive me, but I crash into a problem on my way to fetch the definition",
        "la": "",
        "ar": "",
        "fr": "Pardonnez-moi, mais je me heurte à un problème en allant chercher la définition"
    }, "translate_to": {
        "he": /^תרגם ל/i, "en": /^Translate To/i, "la": "", "ar": "", "fr": /^Traduis en/i
    }, "translate_reply": {
        "he": "*תרגום*: \n %s \n משפה (קוד שפה): \n %s",
        "en": "*Translation*: \n %s \n From language (language code): \n %s",
        "la": "",
        "ar": "",
        "fr": "*Traduction*: \n %s \n De la langue (code de langue): \n %s"
    }, "translate_language_error": {
        "he": "גברבר, השפה שבחרת לא קיימת",
        "en": "Dude, the language you choose doesn't exist",
        "la": "",
        "ar": "",
        "fr": "Mec, la langue que tu as choisie n'existe pas"
    }, "translate_language_api_error": {
        "he": "לא ניתן לתרגם לשפה שבחרת, סליחה!",
        "en": "The language you chose couldn't be translated to, Sorry!",
        "la": "",
        "ar": "",
        "fr": "La langue que vous avez choisie n'a pas pu être traduite, désolé!"
    }, "translate_language_limit_error": {
        "he": "תנסה מחר לבקש תרגום, ביקשו יותר מדי תרגומים בקבוצה זו",
        "en": "Try again tomorrow, you guys are translating too many words",
        "la": "",
        "ar": "",
        "fr": "Réessayez demain, vous traduisez trop de mots"
    }, "show_profile": {
        "he": /^פרופיל$/i, "en": /^Profile$/i, "la": "", "ar": "", "fr": /^Profil$/i
    }, "tagged_messages_amount_reply": {
        "he": "תוייגת: %s פעמים מאז הבדיקה/ניקיון האחרון",
        "en": "You've been tagged %s time since the last check/reset",
        "la": "",
        "ar": "",
        "fr": "Vous avez été tagué %s fois depuis la dernière vérification/réinitialisation"
    }, "permission_level_reply": {
        "he": "רמת ההרשאה שלך בקבוצה זו: %s",
        "en": "Your permission level in this group: %s",
        "la": "",
        "ar": "",
        "fr": "Votre niveau dans ce groupe: %s"
    }, "profile_birthday_reply": {
        "he": "אם שכחת במקרה אז יום הולדתך הוא: %s",
        "en": "In case you forgot, your birthday is: %s",
        "la": "",
        "ar": "",
        "fr": "Au cas où vous l'auriez oublié, votre anniversaire est : %s"
    }, "profile_birthday_error": {
        "he": "מישהו פה לא הגדיר יום הולדת :(",
        "en": "Someone here didn't set a birthday :(",
        "la": "",
        "ar": "",
        "fr": "Quelqu'un ici n'a pas fixé d'anniversaire :("
    }, "download_music": {
        "he": /^הורד מוזיקה/i,
        "en": /^Download music/i,
        "la": "",
        "ar": "",
        "fr": /^Télécharge la musique/i
    }, "download_music_downloading_reply": {
        "he": "מוריד...", "en": "Downloading...", "la": "", "ar": "", "fr": "Téléchargement..."
    }, "download_music_unknown_error": {
        "he": "או שהקישור שבחרת לא אמיתי או שנתקלתי בשגיאה - נסה שוב עוד כמה דקות",
        "en": "Either you haven't sent a real link or I encountered a problem - try again in a couple of minutes",
        "la": "",
        "ar": "",
        "fr": "Soit vous n'avez pas envoyé de lien réel, soit j'ai rencontré un problème - réessayez dans quelques minutes"
    }, "download_music_not_found_error": {
        "he": "אין קישור ליוטיוב בהודעה הזו שובב",
        "en": "There's no link to youtube in that message you naughty boy",
        "la": "",
        "ar": "",
        "fr": "Il n'y a pas de lien vers youtube dans ce message, coquin"
    }, "download_music_limit_error": {
        "he": "הורדתם יותר מדי שירים היום תנסו שוב מחר",
        "en": "You've downloaded too many songs today - try again tomorrow",
        "la": "",
        "ar": "",
        "fr": "Vous avez téléchargé trop de chansons aujourd'hui - réessayez demain"
    }, "fetch_stock": {
        "he": /^בדוק מנייה/i,
        "en": /^Check stock/i,
        "la": "",
        "ar": "",
        "fr": ""
    }, "fetch_stock_reply": {
        "he": "הנה המידע שביקשת על המנייה של %s:\n%s",
        "en": "Here's the information you requested about %s's stock:\n%s",
        "la": "",
        "ar": "",
        "fr": ""
    }, "fetch_stock_api_error": {
        "he": "אופס... משהו לא עבד לי...",
        "en": "Oops... something went wrong...",
        "la": "",
        "ar": "",
        "fr": ""
    }, "check_stock_limit_error": {
        "he": "אני מצטער אבל כל קבוצה יכולה לבדוק מניות רק שלוש פעמים ביום",
        "en": "Forgive me but each group can check the stocks only thrice per day",
        "la": "",
        "ar": "",
        "fr": ""
    }, "afk_me_pwease": {
        "he": /^!afk$/i,
        "en": /^!afk$/i,
        "la": "",
        "ar": "",
        "fr": ""
    }, "afk_reply": {
        "he": "הבחור @%s נכנס למצב שינה (ידוע גם כנא לא להפריע) הוא לא יהיה זמין יותר לזמן הקרוב",
        "en": "@%s has entered deep sleep mode (also known as Do Not Disturb) and will not be available for the time being",
        "la": "",
        "ar": "",
        "fr": ""
    }, "afk_off_reply": {
        "he": "ברוך שובך מתרדמת החורף שלך מר בחור D:\nתייגו אותך %s פעמים בזמן שישנת",
        "en": "Welcome back from hibernation Mr guy :D\nYou've been tagged %s times while you were sleeping",
        "la": "",
        "ar": "",
        "fr": ""
    }, "afk_tagged_reply": {
        "he": "הבחור %s ישן שנת חורף עמוקה מהתאריך %s בשעה %s ולכן כנראה הוא לא יראה את התיוג עכשיו\nכשהוא יקום הוא יוכל לראות מי מפריע בשנתו",
        "en": "Mr %s is in hibernation from %s at %s and so he won't see the tag now\nWhen he wakes up he'll be able to see who's disturbing his sleep",
        "la": "",
        "ar": "",
        "fr": ""
    }, "show_webpage": {
        "he": /^שלח קישור לאתר/i,
        "en": /^Send website link/i,
        "la": "Ostende situs texti",
        "ar": "",
        "fr": /^Envoie le lien/i
    }, "show_webpage_reply": {
        "he": "קח את הקישור אחי: %s",
        "en": "Here's the link you requested: %s",
        "la": "Hic est ligens quod petitis: %s",
        "ar": "",
        "fr": "Voici le lien que vous avez demandé: %s"
    }, "show_webpage_error": {
        "he": "הקישור לא עבד לי... סליחוש",
        "en": "Sorry bro, the link didn't work...",
        "la": "Paenito frater, sed ligens non oportet...",
        "ar": "",
        "fr": "Désolé frère, le lien ne fonctionne pas..."
    },//reminders
    "add_reminder": {
        "he": /^הוסף תזכורת/i, "en": /^Add reminder/i, "la": "", "ar": "", "fr": /^Ajoute un rappel/i
    }, "add_reminder_reply": {
        "he": "התזכורת נוספה בהצלחה בשעה %s",
        "en": "The reminder has been successfully set to %s",
        "la": "",
        "ar": "",
        "fr": "Le rappel a été défini avec succès à %s"
    }, "reminder_already_exists_error": {
        "he": "קיימת תזכורת כבר בשעה הזאת",
        "en": "There already exists a reminder at that time",
        "la": "",
        "ar": "",
        "fr": "Il existe déjà un rappel à ce moment-là"
    }, "reminder_time_error": {
        "he": "אני מצטער אבל בימים אלו עדיין אני לא יכול לנחש שעות בעצמי \nתבדוק שכתבת נכון את השעה",
        "en": "I'm sorry but at this day in age I'm still not able to guess the time on my own \nPlease check you've written it correctly",
        "la": "",
        "ar": "",
        "fr": "Je suis désolé, mais à ce jour, je ne suis toujours pas capable de deviner l'heure par moi-même \nVeuillez vérifier que vous l'avez écrite correctement"
    }, "remove_reminder": {
        "he": /^הסר תזכורת/i,
        "en": /^Remove reminder/i,
        "la": "",
        "ar": "",
        "fr": /^Supprime le rappel/i
    }, "remove_reminder_reply": {
        "he": "התזכורת שנקבעה לשעה %s הוסרה בהצלחה",
        "en": "The reminder set at %s has been removed",
        "la": "",
        "ar": "",
        "fr": "Le rappel défini à %s a été supprimé"
    }, "reminder_doesnt_exist_error": {
        "he": "עדיין אין לי את היכולת למחוק התראות שלא נקבעו",
        "en": "I'm still not able to delete reminders which weren't ever set",
        "la": "",
        "ar": "",
        "fr": "Je ne parviens toujours pas à supprimer des rappels qui n'ont jamais été définis"
    }, "show_reminders": {
        "he": /^הראה תזכורות/i,
        "en": /^Show reminders/i,
        "la": "",
        "ar": "",
        "fr": /^Affiche les rappels/i
    }, "show_reminder_error": {
        "he": "אין לך תזכורות פעילות",
        "en": "You don't have any active reminders",
        "la": "",
        "ar": "",
        "fr": "Vous n'avez aucun rappel actif"
    }, "repeat_reminder": {
        "he": /^חוזרת/i, "en": /Repeat/i, "la": "", "ar": "", "fr": /Répète/i
    }, "day_Sunday": {
        "he": /ליום ראשון/i, "en": /Sunday/i, "la": "", "ar": "", "fr": /Dimanche/i
    }, "day_Monday": {
        "he": /ליום שני/i, "en": /Monday/i, "la": "", "ar": "", "fr": /Lundi/i
    }, "day_Tuesday": {
        "he": /ליום שלישי/i, "en": /Tuesday/i, "la": "", "ar": "", "fr": /Mardi/i
    }, "day_Wednesday": {
        "he": /ליום רביעי/i, "en": /Wednesday/i, "la": "", "ar": "", "fr": /Mercredi/i
    }, "day_Thursday": {
        "he": /ליום חמישי/i, "en": /^Thursday/i, "la": "", "ar": "", "fr": /Jeudi/i
    }, "day_Friday": {
        "he": /ליום שישי/i, "en": /^Friday/i, "la": "", "ar": "", "fr": /Vendredi/i
    }, "day_Saturday": {
        "he": /ליום שבת/i, "en": /^Saturday/i, "la": "", "ar": "", "fr": /^Samedi/i
    }, //
    "init_tic_tac_toe": {
        "he": /^התחל איקס עיגול (\d),(\d)/i,
        "en": /^Start tic tac toe (\d),(\d)/i,
        "la": "",
        "ar": "",
        "fr": ""
    }, "move_tic_tac_toe": {
        "he": /^מהלך (\d),(\d)/i, "en": /^Move (\d),(\d)/i, "la": "", "ar": "", "fr": ""
    }, "move_tic_tac_toe_reply": {
        "he": "הנה הלוח הנוכחי:\n",
        "en": "Here's the current board:\n",
        "la": "",
        "ar": "",
        "fr": ""
    }, "win_tic_tac_toe_reply": {
        "he": "ניצחת באיקס עיגול!", "en": "You won Tic Tac Toe!", "la": "", "ar": "", "fr": ""
    }, "lose_tic_tac_toe_reply": {
        "he": "הפסדת במשחק.", "en": "You lost the game.", "la": "", "ar": "", "fr": ""
    }, "draw_tic_tac_toe_reply": {
        "he": "המשחק הגיע למצב של פט בו איני יכול לזוז עוד",
        "en": "The game has reached a point of stalemate in which I cannot make any more moves",
        "la": "",
        "ar": "",
        "fr": ""
    }, "tic_tac_toe_time_out_error": {
        "he": "אם אתה רוצה לנצח אולי כדאי שתשחק מהר יותר, יא חמור",
        "en": "If you want to win you should consider playing faster, ye donkey",
        "la": "",
        "ar": "",
        "fr": ""
    }, //language
    "change_language": {
        "he": /^שנה שפה/i,
        "en": /^Change language to/i,
        "la": "Muta lingua ad",
        "ar": "",
        "fr": /^Change la langue en/i
    }, "language_change_reply": {
        "he": "השפה שונתה בהצלחה",
        "en": "Language successfully changed",
        "la": "Lingua mutatur feliciter",
        "ar": "",
        "fr": "Langue modifiée avec succès"
    }, "language_change_error": {
        "he": "בימינו רק עברית, אנגלית, וצרפתית נתמכות על ידי הבוט",
        "en": "Only Hebrew, English, French and Latin are currently supported by the bot",
        "la": "",
        "ar": "",
        "fr": "Seuls l'hébreu, l'anglais, le latin et le français sont actuellement pris en charge par le bot"
    }, "help_me_pwease": {
        "he": /^עזרה/i, "en": /^Help/i, "la": /^Auxilium/i, "ar": "", "fr": /^Aide/i
    }, "help_general": {
        "he": /^עזרה$/i, "en": /^Help$/i, "la": /^Auxilium$/i, "ar": "", "fr": /^Aide$/i
    }, "help_language": {
        "he": /^עזרה שפה$/i, "en": /^Help language$/i, "la": "", "ar": "", "fr": /^Aide langue$/i
    }, "help_filters": {
        "he": /^עזרה פילטרים$/i, "en": /^Help filters$/i, "la": "", "ar": "", "fr": /^Aide filtres$/i
    }, "help_tags": {
        "he": /^עזרה תיוגים$/i, "en": /^Help tags$/i, "la": "", "ar": "", "fr": /^Aide tags$/i
    }, "help_birthdays": {
        "he": /^עזרה ימי הולדת$/i,
        "en": /^Help birthdays$/i,
        "la": "",
        "ar": "",
        "fr": /^Aide anniversaires$/i
    }, "help_permissions": {
        "he": /^עזרה הרשאות$/i,
        "en": /^Help permissions$/i,
        "la": "",
        "ar": "",
        "fr": /^Aide niveaux$/i
    }, "help_reminders": {
        "he": /^עזרה תזכורות$/i,
        "en": /^Help reminders$/i,
        "la": "",
        "ar": "",
        "fr": /^Aide rappels$/i
    }, "help_stickers": {
        "he": /^עזרה סטיקרים$/i, "en": /^Help sticker$/i, "la": "", "ar": "", "fr": /^Aide autocollant$/i
    }, "help_internet": {
        "he": /^עזרה אינטרנט$/i, "en": /^Help internet$/i, "la": "", "ar": "", "fr": /^Aide internet$/i
    }, "help_others": {
        "he": /^עזרה אחר$/i, "en": /^Help others$/i, "la": "", "ar": "", "fr": /^Aide autre$/i
    }, "help_general_reply": {
        "he": `_*רשימת הפקודות ועזרה כללית בעברית*_\nאם נפשיכם חשקה בעזרה ספציפית בנוגע לפקודה כלשהי, היעזרו בפקודות הבאות:\n"עזרה שפה", "עזרה פילטרים", "עזרה תיוגים", "עזרה ימי הולדת", "עזרה הרשאות" "עזרה תזכורות", "עזרה סטיקרים", "עזרה אינטרנט", "עזרה אחר"\nאם לא, וסתם רציתם לראות את ההודעה הזו, תרגישו חופשי להישאר!\nמפותח ומתוחזק על ידי אריאל יצקן (972543293155) ואיתן עמירן (972586809911)\nקישור למאגר הקוד ב־Github (הקוד), לסקרנים: https://github.com/ArielYat/Whatsapp-bot-Project`,
        "en": `_*English Command List and General Help*_\nIf you desire help regarding a specific command, try one of the following:\n"Help language", "Help filters", "Help tags", "Help birthdays", "Help permissions" "Help reminders", "Help stickers", "Help internet", "Help others"\nIf not, and you just wanted to see this message, feel free to stick around! \nDeveloped and maintained by Ariel Yatskan (972543293155) and Ethan Amiran (972586809911)\nThe GitHub repository (the code), for the curious: https://github.com/ArielYat/Whatsapp-bot-Project`,
        "la": ``,
        "ar": ``,
        "fr": `_*Liste des commandes en français et aide générale*_\nSi vous souhaitez obtenir de l'aide concernant une commande spécifique, essayez l'une des options suivantes:\n"Aide langue", "Aide filtres", "Aide tags", "Aide anniversaires", "Aide niveaux " "Aide rappels", "Aide autocollant", "Aide internet", "Aide autre"\nSi ce n'est pas le cas, et que vous vouliez simplement voir ce message, n'hésitez pas à rester! \nDéveloppé et maintenu par Ariel Yatskan (972543293155) et Ethan Amiran (972586809911)\nLe référentiel GitHub (le code), pour les curieux: https://github.com/ArielYat/Whatsapp-bot-Project`
    }, "help_language_reply": {
        "he": `*שפת הבוט:*\n- "שנה שפה ל[שפה]" - משנה את בה הבוט מקבל ומגיב לפקודות\n  - לדוגמה: שנה שפה לאנגלית\n  - אפשר להשתמש בפקודה הזו בכל שפה\n  - שפות שנתמכות כעת: עברית, אנגלית, צרפתית`,
        "en": `*Bot's Language:*\n- "Change language to [language]" - changes the language the bot receives and sends messages in\n  - For example: Change language to Hebrew\n  - This command can be used at all times in every language\n  - Languages currently supported: Hebrew, English, French`,
        "la": ``,
        "ar": ``,
        "fr": `*Langue du bot:*\n- "Change la langue en [langue]" - change la langue dans laquelle le bot reçoit et envoie des messages\\n  - Par exemple: Change la langue en hébreu\n  - Cette commande peut être utilisée à tout moment dans toutes les langues\\n  - Langues actuellement prises en charge: Hébreu, Anglais et Français`
    }, "help_filters_reply": {
        "he": `*פילטרים:*\n_פילטרים יכולים להיות טקסט, תמונה או סרטון_\n- "הוסף פילטר [פילטר] - [תגובת הבוט]" - מוסיף פילטר לקבוצה\n  - לדוגמה: הוסף פילטר אוכל - בננה\n- "הסר פילטר [פילטר]" - מסיר את הפילטר המצויין מהקבוצה\n  - לדוגמה: הסר פילטר אוכל\n- "ערוך פילטר [פילטר קיים] - [תשובה חדשה]" - עורך פילטר קיים בקבוצה\n  - לדוגמה: ערוך פילטר אוכל - אפרסק\n- "הראה פילטרים" - מציג את רשימת הפילטרים הקיימים כעת בקבוצה\n_טיפ מיוחד!_\n- בהוספת פילטר אפשר גם להשתמש ב[שם] בשביל לתייג מישהו כשהפילטר נקרא\n  - לדוגמה: "הוסף פילטר אוכל - [יוסי]" יגרום לבוט לתייג את יוסי כשנאמר "אוכל"`,
        "en": `*Filters:*\n_Filters can be text, an image or a video_\n- "Add filter [filter] - [bot reply]" - adds a filter to the group\n  - For example: Add filter food - banana\n- "Remove filter [filter]" - removes the specified filter from the group\n  - For example: Remove filter food\n- "Edit filter [existing filter] - [new reply]" - edits the specified filter\n  - For example: Edit filter food - peach\n- "Show filters" - displays the list of all filter and their replies in the group\n_Special tip!_\n- When adding a filter you can use [name] to tag someone when the filter is invoked\n  - For example: "Add filter food - [Joseph]" will make the bot tag Joseph whenever "food" is said`,
        "la": ``,
        "ar": ``,
        "fr": `*Filtres:*\n_Les filtres peuvent être un texte, une image ou une vidéo_ \n- "Ajoute le filtre [filtre] - [réponse du bot]" - ajoute un filtre au groupe\n  - Par exemple: Ajoute le filtre Nourriture - banane\n- "Supprime le filtre [filtre]" - supprime le filtre spécifié du groupe\n  - Par exemple : Supprime le filtre Nourriture\n- "Modifie le filtre [filtre existant] - [nouvelle réponse]" - modifie le filtre spécifié\n  - Par exemple: Modifie le filtre Nourriture - pêche\n- "Affiche les filtres" - affiche la liste de tous les filtres et leurs réponses dans le groupe\n_Conseil spécial!_\n- Lors de l'ajout d'un filtre, vous pouvez utiliser [nom] pour marquer quelqu'un lorsque le filtre est appelé\n  - Par exemple: "Ajoute le filtre Nourriture - [Joseph]" fera que le bot marquera Joseph chaque fois que "nourriture" sera dit`
    }, "help_tags_reply": {
        "he": `*תיוגים:*\n- "בדוק היכן תייגוני" - מראה את ההודעה האחרונה בה כותב ההודעה תויג, ניתן לשימוש כמה פעמים\n- "נקה תיוגיי" - מנקה את התיוגים השמורים של כותב ההודעה\n- "תייג [אדם]" - מתייג אדם כך שיקבל התראה גם אם הקבוצה מושתקת אצלו\n  - לדוגמה: תייג יוסי\n- "תייג כולם" - מתייג את כל האנשים שנמצאים בקבוצה\n- "הוסף חבר לתיוג [אדם] - [מספר טלפון בפורמט בין לאומי או תיוג של האדם]" - מוסיף אדם לתיוג בקבוצה\n  - לדוגמה: הוסף חבר לתיוג יוסי - 972501234567\n  - לדוגמה: הוסף חבר לתיוג יוסי - @יוסי\n- "הסר חבר מתיוג [אדם]" - מסיר אדם מתיוג בקבוצה\n  - לדוגמה: הסר חבר מתיוג יוסי\n- "הוסף קבוצת תיוג [שמה של קבוצת התיוג] - [שמות של אנשים שנמצאים בקבוצה, מופרדים בפסיקים]" - מוסיף קבוצת תיוג שניתן להשתמש בה כדי לתייג אנשים מרובים במכה אחת\n  - לדוגמה: הוסף קבוצת תיוג ירושלמיים - משה, אבירם, יוסי\n- "הסר קבוצת תיוג [קבוצת תיוג]" - מסיר את קבוצת התיוג הנזכרת\n- "הוסף את [אדם] לקבוצת התיוג [קבוצת תיוג]" - מוסיף את האדם הנזכר לקבוצת התיוג\n  - לדוגמה: הוסף את יוסי לקבוצת התיוג ירושלמים\n- "הסר את [אדם] מקבוצת התיוג [קבוצת תיוג]" - מסיר את האדם הנזכר מקבוצת התיוג\n  - לדוגמה: הסר את יוסי מקבוצת התיוג ירושלמים\n- "הראה רשימת חברים לתיוג" - מציג את רשימת החברים והקבוצות לתיוג שמוגדרים בקבוצה`,
        "en": `*Tags:*\n- "Check my tags" - shows the last message in which the message author's been tagged, bringing them to the front of the chat\n- "Clear my tags" - clears the saved tags of the message's author\n- "Tag [person]" - tags someone so that they get a notification even if the group is muted on their phone\n  - For example: Tag Joseph\n- "Tag everyone" - tags all people in the group\n- "Add tag buddy [person] - [phone number in international format or a that person's tag]" - adds the person to the list of taggable people\n  - For example: Add tagging buddy Joseph - 972501234567\n  - For example: Add tagging buddy Joseph - @Joseph\n- "Remove tag buddy [person]" - removes the person from the list of taggable people\n  - For example: Remove tagging buddy Joseph\n- "Add tagging group [tagging group name] - [names of people in the group, divided by commas]" - Adds a tagging group which can be used to tag multiple people at once\n  - For example: Add tagging group Banana - Moshe, Joseph, Aviram\n- "Remove tagging group [tagging group]" - removed the mentioned tagging group\n- "Add [person] to tagging group [tagging group]" - adds the specified person to the tagging group  \n  - For example: Add Joseph to tagging group Banana\n- "Remove [person] from tagging group [tagging group]" - removed the specified person from the tagging group\n  - For example: Remove Joseph from tagging group Banana\n- "Show tag buddies" - displays the list of all taggable people in the group`,
        "la": ``,
        "ar": ``,
        "fr": `*Tags:*\n- "Vérifie où j'ai été tagué" - affiche le dernier message dans lequel l'auteur du message a été tagué, peut être utilisé plusieurs fois\n- "Efface mes tags" - efface les tags enregistrés de l'auteur du message\n- "Tag [personne]" - tague quelqu'un pour qu'il reçoive une notification même si le groupe est en mode silencieux sur son téléphone\n  - Par exemple: tag Joseph\n- "Tag tout le monde" - tague toutes les personnes dans le groupe\n- "Ajoute la personne au tag [nom] - [numéro de téléphone au format international ou le tag de cette personne]" - ajoute la personne à la liste des personnes pouvant être taguées\n  - Par exemple: Ajoute la personne au tag Joseph - 972501234567\n  - Par exemple: Ajoute la personne au tag Joseph - @Joseph\n- "Supprime la personne du tag [nom]" - supprime la personne de la liste des personnes pouvant être taguées\n  - Par exemple: Supprime la personne du tag Joseph\n- "Affiche la liste des personnes taguées" - affiche la liste de toutes les personnes pouvant être taguées dans le groupe`
    }, "help_birthdays_reply": {
        "he": `*ימי הולדת:*\n- "הוסף יום הולדת [תאריך מנוקד בפורמט בינלאומי]" - מוסיף יום הולדת לכותב ההודעה\n  - לדוגמה: הוסף יום הולדת 1.11.2011\n- "הסר יום הולדת" - מסיר את יום ההולדת של כותב ההודעה\n- "הראה ימי הולדת" - מציג את ימי ההולדת של כל חברי הקבוצה\n- "הוסף קבוצה לרשימת התפוצה של יום ההולדת" - מוסיף את הקבוצה בה נשלחה ההודעה לרשימת התפוצה של הודעת יום ההולדת של כותב ההודעה\n- "הסר קבוצה מרשימת התפוצה של יום ההולדת" - מסיר את הקבוצה בה נשלחה ההודעה מרשימת התפוצה של הודעת יום ההולדת של כותב ההודעה`,
        "en": `*Birthdays:*\n- "Add birthday [date in international format with periods]" - adds a birthday for message's author\n  - For example: Add birthday 1.11.2011\n- "Remove birthday" - removes the author's birthday\n- "Show birthdays" - displays the birthdays of the group members\n- "Add group to the birthday distribution list" - adds the group the message was sent in to the author's birthday message broadcast\n- "Remove group from the birthday distribution list" - removes the group the message was sent in from the author's birthday message broadcast`,
        "la": ``,
        "ar": ``,
        "fr": `*Anniversaires:*\n- "Ajoute l'anniversaire [date au format international avec des points]" - ajoute un anniversaire pour l'auteur du message\n  - Par exemple: Ajoute l'anniversaire 1.11.2011\n- "Supprime l'anniversaire" - supprime l'anniversaire de l'auteur\ n- "Affiche les anniversaires" - affiche les anniversaires des membres du groupe\n- "Ajoute le groupe a la liste diffusion du message d'anniversaire" - ajoute le groupe dans lequel le message a été envoyé à la diffusion du message d'anniversaire de l'auteur\n- "Supprime le groupe de la diffusion du message d'anniversaire" - supprime le groupe auquel le message a été envoyé de la diffusion du message d'anniversaire de l'auteur`
    }, "help_permissions_reply": {
        "he": `*הרשאות (למנהלי קבוצות בלבד):*\n- "קבע הרשאה ל[סוג הרשאה] - [רמת הרשאה]" - קובע את רמה ההרשאה הנדרשת לסוג פקודות מסוים\n  - לדוגמה: קבע הרשאה לפילטרים - רגיל\n  - סוגי ההרשאות: פילטרים, תיוגים, טיפול_פילטרים, טיפול_תיוגים, טיפול_ימיהולדת, טיפול_הראה, טיפול_שונות\n  - רמות הרשאה אפשריות: מושתק, רגיל ומנהל\n- "השתק [תיוג של אדם]" - משתיק את האדם המתוייג כך שלא יוכל להשתמש בפקודות\nלדוגמה: השתק @יוסי\n- "הסר השתקה [תיוג של אדם]" - מבטל את ההשתקה של האדם המתוייג\nלדוגמה: בטל השתקה @יוסי\n- "הראה הרשאות פונקציות" - מציג את רמות ההרשאות של סוגי הפקודות השונים\n- "הראה הרשאות אנשים" - מציג את רמות ההרשאות של האנשים בקבוצה`,
        "en": `*Permissions (for group admins solely):*\n- "Define permission for [permission type] - [Admin/Regular/Muted]" - defines the permission level required for a certain type of commands\n  - For example: Define permission filters - Regular\n  - Permission types: filters, tags, handle_Filters, handle_Tags, handle_Birthdays, handle_Shows & handle_Other\n- "Mute [person tag]" - mutes the tagged person so they aren't able to use commands\n  - For example: Mute @Joseph\n- "Unmute person [person tag]" - unmutes the tagged person\n  - For example: Unmute @Joseph\n- "Show function permissions" - displays the permission levels of the different types of commands\n- "Show people permissions" - displays the permission levels of the people in the group`,
        "la": ``,
        "ar": ``,
        "fr": `*Autorisations (pour les admins de groupe uniquement):*\n- "Définis l'autorisation pour [type d'autorisation] - [niveau]" - définit le niveau d'autorisation requis pour un certain type de commandes\n  - Par exemple: Définis les  autorisation pour filtres- Ordinaire \n  - Types d'autorisation:filtres, tags, gérer_Filtres, Gérer_Tags, Gérer_Anniversaires, Gérer_Affiche et Gérer_autre\n  - Niveaux :En sourdine, Ordinaire et Admin\n-"Met en sourdine [Tag de la personne] désactive la personne taguée afin qu'elle ne soit pas capable d'utiliser des commandes\n  - Par exemple: Met en sourdine @Joseph\n- "Réactive la personne [Tag de la personne]" - réactive la personne taguée\n  - Par exemple: Réactive @Joseph\n- "Affiche les niveaux de fonction" - affiche les niveaux des différents types de commandes\n- "Affiche les niveaux des personnes" - affiche les niveaux des personnes du groupe`
    }, "help_reminders_reply": {
        "he": `*תזכורות:*\n_כל הפקודות של התזכורות עובדות רק בצ'ט פרטי עם הבוט\nתזכורות יכולות להיות מלל, תמונה או סרטון_\nהתאריך אופציונלי (אם לא קיים ההנחה היא שהתזכורת לאותו יום שבו ההודעה נכתבה) ויכול או לכלול לא לכלול לכלול שנה\n- "הוסף תזכורת [חוזרת] [תאריך/יום בשבוע] [שעה] [טקסט]" - מוסיף תזכורת לכותב ההודעה\n  - לדוגמה: הוסף תזכורת חוזרת 2.5.2023 7:34 להוציא את החתול לטיול\n  - לדוגמה: הוסף תזכורת ליום רביעי 16:52 להוציא את החתול לטיול\n  - הפרמטר האופציונלי "חוזרת" יוצר תזכורת קבועה הפועלת כל יום בשעה הידועה החל מהתאריך המצויין\n- "הסר תזכורת [תאריך] [שעה]" - מסיר את התזכורת המכוונת לזמן המצויין\n  - לדוגמה: הסר תזכורת 7:34\n- "הראה תזכורת" - מראה את כל התזכורות של כותב ההודעה`,
        "en": `*Reminders:*\n_All the reminder related commands work only in a private chat with the bot_\n_Reminders can be text, images or videos_\n_The date in the commands is optional (if no date is inputted the assumption is that the reminder is for the same date the message was written in) and can include or not include a year_\n- "Add reminder [repeat] [date/weekday] [time] [text]" - adds a reminder to the message's author\n  - For example: Add reminder repeat 2.5.2023 7:34 Walk the cat\n  - For example: Add reminder Wednesday 16:52 Walk the cat\n  - The optional parameter "repeat" creates a repeating reminder every day from the first date specified at the specified hour\n- "Remove reminder [date] [hour]" - deletes the reminder set at the specified time\n  - For example: Remove reminder 7:34\n- "Show reminders" - Shows the author's reminders`,
        "la": ``,
        "ar": ``,
        "fr": `*Rappels:*\n_Toutes les commandes liées aux rappels ne fonctionnent que dans un chat privé avec le bot_\n_Les rappels peuvent être du texte, des images ou des vidéos_\nLa date est facultative (si aucune date n'est saisie, l'hypothèse est que le rappel est pour la même date que celle à laquelle le message a été écrit) et peut inclure ou non une année\n- "Ajoute un rappel [Répète] [date/jour de la semaine] [heure] [texte]" - ajoute un rappel à l'auteur du message\n  - Par exemple: Ajoute un rappel Répète 2.5.2023 7:34 Promener le chat\n  - Par exemple: Ajoute un rappel Mercredi 16:52 Promener le chat\n  - Le paramètre facultatif "répète" crée un rappel répétitif tous les jours à partir de la première date spécifiée à l'heure spécifiée\n- "Supprime le rappel [date] [heure]" - supprime le rappel défini à l'heure spécifiée\n  - Par exemple: Supprime le rappel 7:34\n- "Affiche les rappels" - Affiche les rappels de l'auteur du message`
    }, "help_stickers_reply": {
        "he": `*פקודות סטיקרים:*\n- "הפוך לסטיקר [ללא חיתוך] [איכות גבוהה/איכות בינונית]" - הופך הודעה או מדיה לסטיקר ושולח אותו\n  - ניתן להשתמש בפקודה גם בהודעה בה שולחים את התמונה/סרטון וגם בתור תגובה אליה\n  - "ללא חיתוך" הוא פרמטר אופציונלי, הוא יוצר סטיקר לא חתוך\n  - "איכות גבוהה" ו"איכות בינונית" הם פרמטרים אופציונליים להכנה סטיקר מהודעה ששולטים על איכות התמונה; ברירת המחדל היא איכות בינונית\n- "צור סטיקר טקסט [צבע באנגלית] - [טקסט]" - יוצר סטיקר בעל רקע שקוף מהטקסט שניתן\n  - אם הפרטמר "צבע באנגלית" לא ניתן, ברירת המחדל תהיה שחור`,
        "en": `*Sticker Commands:*\n- "Create sticker [without cropping] [High Quality/Medium Quality]" - creates a sticker out of a message or a media file and sends it\n  - This command can be used in the message the media was sent in and as a reply to it\n  - "without cropping" is an optional parameter which creates the sticker without cropping it\n  - "high quality" and "medium quality" and option parameter which control the sticker's resolution; the default is medium quality\n- "Create text sticker [colour] - [text]" - creates a sticker without a background with the given text\n  - If the parameter "colour" isn't given, the default is black`,
        "la": ``,
        "ar": ``,
        "fr": `*Commandes autocollantes:*\n- "Crée un autocollant [sans coupures]" - crée un autocollant à partir d'un fichier multimédia et l'envoie\n  - Cette commande peut être utilisée dans le message dans lequel le media a été envoyé et en réponse à celui-ci \n  - "sans coupures" est un paramètre facultatif qui crée l'autocollant sans le recadrer\n- "Crée un autocollant de texte [couleur en anglais] - [texte]" - crée un autocollant sans fond avec le texte donné\n  - Si le paramètre "couleur en anglais" n'est pas donné, la couleur sera noir par défaut`
    }, "help_internet_reply": {
        "he": `*פקודות אינטרנט:*\n_יש לכל הפקודות האלו מגבלה יומית מסויימת_\n- "בדוק קריפטו" - שולח הודעה עם שערי המטבע של מטבעות קריפטו שונים לעומת הדולר\n- "בדוק מנייה [קוד מנייה]" - מציג מידע על המנייה שנבחרה\n- "הגדרת אינטרנט [מילה באנגלית]" - מחפש את המילה באתר Urban Dictionary ומחזיר את תוצאות החיפוש\n  - לדוגמה: הגדרת אינטרנט Chair\n- "תרגם ל[שפה כלשהי] [מילים]" - מתרגם את רצף המילים לשפה הנתונה באמצעות גוגל תרגום\n  - לדוגמה: תרגם לאנגלית כיסא\n- "הורד מוזיקה [קישור ליוטיוב]" - מוריד שיר כלשהו מיוטיוב ושולח אותו בקבוצה בתור הודעה קולית\n- "סרוק [קישור]" - סורק קישור לוירוסים\n  - לדוגמה: סרוק https://www.google.com/\n  - ניתן לסרוק קישורים בהודעה בה נשלחת הפקודה או בהודעה מצוטטת`,
        "en": `*Internet Commands:*\n_All of the commands below have a certain daily limit_\n- "Check Crypto" - sends a message with the exchange rates of ten different cryptocurrencies compared to the Dollar\n- "Check stock [stock code]" - shows information about the stock given\n- "Internet definition [word]" - searches for the word in the website Urban Dictionary and returns the search result\n  - For example: Internet definition chair\n- "Translate to [some language] [words]" - translates the words to the given language via Google Translate\n  - For example: Translate to Hebrew chair\n- "Download music [link to youtube]" - downloads a song from youtube and sends it as voice message\n- "Scan [link]" - scans the given link for viruses\n  - For example: Scan https://www.google.com/\n  - Links can be scanned in the message the command is sent in or in a quoted message`,
        "la": ``,
        "ar": ``,
        "fr": `*Commandes Aide internet:*\n- "Vérifie le Crypto" - envoie un message avec les taux de change de dix crypto-monnaies différentes par rapport au dollar\n- "Définition Internet [Mot en anglais] " - recherche le mot sur le site Web Urban Dictionary et renvoie le résultat de la recherche\n  - Par exemple: définition Internet chaise\n- "Traduis en [Code de la langue] [mots]" - traduit les mots dans la langue donnée via Google Traduction \n  - Par exemple: Traduis en Hebreux Chaise\n- "Télécharge musique [lien vers youtube]" - télécharge une chanson depuis youtube et l'envoie en tant que message vocal\n- "Analyse [lien]" - analyse le lien donné à la recherche de virus\n  - Par exemple: Analyse https://www.google.com/\n  - Les liens peuvent être analysé dans le message dans lequel la commande est envoyée ou dans un message entre guillemets`
    }, "help_others_reply": {
        "he": `*פקודות נוספות:*\n- "פרופיל" - מראה את המידע של הבוט על כותב ההודעה\n- "!afk" - מכניס את כותב ההודעה למצב שינה, שזה אומר שלא יהיה ניתן לתייגו\n- "שלח קישור" - שולח קישור לאתר של הבוט (בתהליך עבודה)\n- יצירת סקר של וואטסאפ:\n- "צור סקר\nכותרת - [כותרת סקר]  \nכותרת משנה - [כותרת משנה]  \nכותרת שלישית - [כותרת שלישית]  \nכפתור 1 - [אופציה ראשונה]  \nכפתור 2 - [אופציה שנייה]  \nכפתור 3 - [אופציה שלישית]"  \n  - (הכותרת השלישית והכפתורים השני והשלישי אופציונליים)`,
        "en": `*Miscellaneous Commands:*\n- "Profile" - displays the bot's information about the message's author\n- "!afk" - puts the message's sender in Hibernation mode, which means tagging him won't work\n- "Send link" - sends a link to the bots webpage (work in progress)\n- Create a WhatsApp survey:\n- "Create survey\n    Title - [survey title]\n    Subtitle - [survey subtitle]\n    Third Title - [third title]\n    Button 1 - [first option]\n    Button 2 - [second option]\n    Button 3 - [third option]"\n  - (The third title and buttons 1 and 2 aren't required)`,
        "la": ``,
        "ar": ``,
        "fr": `*Commandes diverses:*\n- "Profil" - affiche les informations du bot sur l'auteur du message\n  - "Envoie le lien" - envoie un lien vers la page Web des bots (travail en cours)\n- Crée un sondage:\n- "Crée un sondage\n Titre - [titre du sondage]\n Deuxième titre - [Deuxième titre du sondage]\n Troisième titre - [troisième titre]\n Bouton 1 - [première option]\n Bouton 2 - [deuxième option]\n Bouton 3 - [troisième option]"\n - (Le troisième titre et les boutons 1 et 2 ne sont pas obligatoire)`
    }, "help_reply_old": {
        "he_old": `*הוראות בעברית*\n _שפה_: \n - "שנה שפה ל[שפה]" - משנה את בה הבוט מקבל ומגיב לפקודות \n לדוגמה: שנה שפה לאנגלית \n  אפשר להשתמש בפקודה הזו בכל שפה\nשפות שנתמכות כעת: עברית, אנגלית ולטינית  \n  \n _פילטרים_: \n- "הוסף פילטר [פילטר] - [תגובת הבוט]" - מוסיף פילטר לקבוצה  \n לדוגמה: הוסף פילטר אוכל - בננה \n  אפשר להוסיף פילטר של טקסט, תמונה או סרטון\n- "הסר פילטר [פילטר]" - מסיר את הפילטר המצויין מהקבוצה  \n לדוגמה: הסר פילטר אוכל \n- "ערוך פילטר [פילטר קיים] - [תשובה חדשה]" - עורך פילטר קיים בקבוצה  \n לדוגמה: ערוך פילטר אוכל - אפרסק \n- "הראה פילטרים" - מציג את רשימת הפילטרים הקיימים כעת בקבוצה  \n  \n _תיוגים_: \n- "תייג [אדם]" - מתייג אדם כך שיקבל התראה גם אם הקבוצה מושתקת אצלו  \n לדוגמה: תייג יוסי \n- "הוסף חבר לתיוג [אדם] - [מספר טלפון בפורמט בין לאומי]" - מוסיף אדם לתיוג בקבוצה  \n לדוגמה: הוסף חבר לתיוג יוסי - 972501234567 \n- "הסר חבר מתיוג [אדם]" - מסיר אדם מתיוג בקבוצה  \n לדוגמה: הסר חבר מתיוג יוסי \n- "תייג כולם" - מתייג את כל האנשים שנמצאים בקבוצה  \n- "הראה רשימת חברים לתיוג" - מציג את רשימת החברים לתיוג שמוגדרים בקבוצה  \n  - "בדוק היכן תייגוני" - מראה את ההודעה האחרונה בה כותב ההודעה תויג, ניתן לשימוש כמה פעמים\n  - "נקה תיוגיי" - מנקה את התיוגים השמורים של כותב ההודעה\n  \n _ימי הולדת_: \n  - "הוסף יום הולדת - [תאריך מנוקד בפורמט בינלאומי הפוך]" - מוסיף יום הולדת לכותב ההודעה\n  לדוגמה: הוסף יום הולדת 1.11.2011\n  - "הסר יום הולדת" - מסיר את יום ההולדת של כותב ההודעה\n  - "הוסף קבוצה להודעת יום ההולדת" - מוסיף את הקבוצה בה נשלחה ההודעה לרשימת התפוצה של הודעת יום ההולדת של כותב ההודעה\n  - "הסר קבוצה מהודעת יום ההולדת" - מסיר את הקבוצה בה נשלחה ההודעה מרשימת התפוצה של הודעת יום ההולדת של כותב ההודעה\n  - "הראה ימי הולדת" - מציג את ימי ההולדת של כל חברי הקבוצה\n  \n  _הרשאות והשתקות_:\n  - "קבע הרשאה ל[סוג הרשאה] - [מספר מ־0 עד 2]" - קובע את רמה ההרשאה הנדרשת לסוג פקודות מסוים\n  לדוגמה: קבע הרשאה לפילטרים - רגיל\n  סוגי ההרשאות: פילטרים, תיוגים, טיפול-פילטרים, טיפול-תיוגים, טיפול-ימיהולדת, טיפול-הראה, טיפול-שונות\n  רמות הרשאה אפשריות: מושתק, רגיל ומנהל\n  - "השתק [תיוג של אדם]" - משתיק את האדם המתוייג כך שלא יוכל להשתמש בפקודות\n  לדוגמה: השתק @יוסי\n  - "הסר השתקה [תיוג של אדם]" - מבטל את ההשתקה של האדם המתוייג\n  לדוגמה: בטל השתקה @יוסי\n  - "הראה הרשאות פונקציות" - מציג את רמות ההרשאות של סוגי הפקודות השונים\n  - "הראה הרשאות אנשים" - מציג את רמות ההרשאות של האנשים בקבוצה\n  \n _פונקציות נוספות_ \n - "הפוך לסטיקר [ללא חיתוך/-]" - הופך הודעת מדיה לסטיקר ושולח אותו \n ניתן להשתמש בפקודה גם בהודעה בה שולחים את התמונה/סרטון וגם בתור תגובה אליה \n  ללא חיתוך הוא פרמטר שלא חייבים לשים, הוא יוצר סטיקר לא חתוך\n  - "בדוק קריפטו" - שולח הודעה עם שערי המטבע של מטבעות קריפטו שונים לעומת הדולר\n  - "הגדרת אינטרנט [מילה באנגלית]" - מחפש את המילה באתר Urban Dictionary ומחזיר את תוצאות החיפוש\n  לדוגמה: הגדרת אינטרנט Chair\n  - "תרגם ל[שפה כלשהי] [מילים]" - מתרגם את רצף המילים לשפה הנתונה באמצעות גוגל תרגום\n  לדוגמה: תרגם לאנגלית כיסא\n  בתרגום ניתן לכתוב רק משפט אחד בגלל מגבלות של גוגל תרגום\n  - "סרוק [קישור]" - סורק קישור לוירוסים\n  לדוגמה: סרוק https://www.google.com/\n - "שלח קישור" - שולח קישור לאתר של הבוט (בתהליך עבודה) \n  - יצירת סקר של וואטסאפ:\n "צור סקר \n כותרת - [כותרת סקר] \n כותרת משנה - [כותרת משנה] \n כותרת שלישית - [כותרת שלישית] \n כפתור 1 - [אופציה ראשונה] \n כפתור 2 - [אופציה שנייה] \n כפתור 3 - [אופציה שלישית]" \n (הכותרת השלישית והכפתורים השני והשלישי אופציונליים) \n  \n _טיפ מיוחד!_ \n בהוספת פילטר אפשר גם להשתמש ב[שם] בשביל לתייג מישהו כשהפילטר נקרא \n  לדוגמה: "הוסף פילטר אוכל - [יוסי]" יגרום לבוט לתייג את יוסי כשנאמר "אוכל"\n\n  _קרדיטים_\n  מפותח ומתוחזק על ידי אריאל יצקן (@972543293155) ואיתן עמירן (@972586809911)\n  קישור ל־Github Repository, לסקרנים: https://github.com/ArielYat/Whatsapp-bot-Project`,
        "en_old": `*English Instructions* \n  _Language_:\n  - "Change language to [language]" - changes the language the bot receives and sends messages in\n  For example: Change language to Hebrew\n  This command can be used at all times in every language\n  Languages currently supported: Hebrew, English & Latin\n  \n  _Filters_:\n  - "Add filter [filter] - [bot reply]" - adds a filter to the group\n  For example: Add filter food - banana\n  Filters can be text, an image or a video\n  - "Remove filter [filter]" - removes the specified filter from the group\n  For example: Remove filter food\n  - "Edit filter [existing filter] - [new reply]" - edits the specified filter\n  For example: Edit filter food - peach\n  - "Show filters" - displays the list of all filter and their replies in the group\n  \n  _Tags_:\n  - "Tag [person]" - tags someone so that they get a notification even if the group is muted on their phone\n  For example: Tag Joseph\n  - "Add tag buddy [name] - [phone number in international format]" - adds the person to the list of taggable people\n  For example: Add tagging buddy Joseph - 972501234567\n  - "Remove tag buddy [name]" - removes the person from the list of taggable people\n  For example: Remove tagging buddy Joseph\n  - "Tag everyone" - tags all people in the group\n  - "Show tag buddies" - displays the list of all taggable people in the group\n  - "Check where I've been tagged" - shows the last message in which the message author's been tagged, can be used multiple times\n  - "Clear my tags" - clears the saved tags of the message's author\n  \n  _Birthdays_:\n  - "Add birthday [date in reverse international format with periods]" - adds a birthday for message's author\n  For example: Add birthday 1.11.2011\n  - "Remove birthday" - removes the author's birthday\n  - "Add group to birthday message" - adds the group the message was sent in to the author's birthday message broadcast\n  - "Remove group from birthday message" - removes the group the message was sent in from the author's birthday message broadcast\n  -"Show birthdays" - displays the birthdays of the group members  \n  \n  _Permissions & Muting_:\n  "Define permission for [permission type] - [number from 0 to 2]" - defines the permission level required for a certain type of commands\n  For example: Define permission filters - Regular\n  Permission types: filters, tags, handle-Filters, handle-Tags, handle-Birthdays, handle-Shows, handle-Other\n  Permission levels: Muted, Regular & Admin\n  - "Mute [person tag]" - mutes the tagged person so they aren't able to use commands\n  For example: Mute @Joseph\n  - "Unmute person [person tag]" - unmutes the tagged person\n  For example: Unmute @Joseph  \n  - "Show function permissions" - displays the permission levels of the different types of commands\n  - "Show people permissions" - displays the permission levels of the people in the group\n  \n  _Miscellaneous_:\n  - "Create sticker [without cropping/-]" - creates a sticker out of a media file and sends it\n  This command can be used in the message the media was sent in and as a reply to it\n  "without cropping" is an optional parameter which creates the sticker without cropping it  \n  - "Check Crypto" - sends a message with the exchange rates of ten different cryptocurrencies compared to the Dollar\n  - "Internet definition [work]" - searches for the word on the website Urban Dictionary and returns the search result\n  For example: Internet definition chair\n  - "Translate to [some language] [words]" - translates the words to the given language via Google Translate\n  For example: Translate to Hebrew chair\n  In the translation text only one sentence can be written due to Google Translate restrictions\n  - "Scan [link]" - scans the given link for viruses\n  For example: Scan https://www.google.com/\n  - "Send link" - sends a link to the bots webpage (work in progress)\n  - Create a WhatsApp survey:\n  "Create survey\n  Title - [survey title]\n  Subtitle - [survey subtitle]\n  Third Title - [third title]\n  Button 1 - [first option]\n  Button 2 - [second option]\n  Button 3 - [third option]"\n  (The third title and buttons 1 and 2 aren't required)\n    \n  _Special tip!_\n  When adding a filter you can use [name] to tag someone when the filter is invoked\n  For example: "Add filter food - [Joseph]" will make the bot tag Joseph whenever "food" is said\n  \n  _Deletion from the database_\n  - "Delete this group from the database" - deletes all of the group's information from the database\n  - "Delete me from the database" - deletes all of the author's information from the database\n  *Use these commands with caution, their effects are irreversible*\n  \n  _Credits_\n  Developed and maintained by Ariel Yatskan (@972543293155) and Ethan Amiran (@972586809911)\n  The GitHub repository, for the curious: https://github.com/ArielYat/Whatsapp-bot-Project`
    }, "start_message": {
        "he": `כדי לשנות שפה כתבו "שנה שפה ל[שפה שאתם רוצים לשנות לה]".\nהשפה בררת המחדל היא עברית, והשפות האפשריות כעת הן עברית, אנגלית וצרפתית.\nכדי להציג את הודעת העזרה כתבו "עזרה" בשפה הפעילה.`,
        "en": `Hello, I'm John!\nTo change language type "Change language to [language you want to change to]".\nThe default language is Hebrew, and the currently available languages are Hebrew, English and French.\nTo display a help message type "Help" in the active language.`,
        "la": `Salve amici, John sum!\nMea lingua mutatum, scriba "Muta lingua ad [lingua quam desideras]".\nLingua Hebraica defalta est, et in sistema Linguae Anglica et Latina sunt.\nPropter auxilium, scriba "Auxilium" in mea lingua.`,
        "ar": ``,
        "fr": `Bonjour, je m'appelle John!\nPour changer de langue, saisissez "Change la langue en [langue souhaitée]".\nLa langue par défaut est l'hébreu, et les langues actuellement disponibles sont l'hébreu, l'anglais et le Français.\nPour afficher le message de type aide tapez "Aide" dans la langue active.`,
    }
}