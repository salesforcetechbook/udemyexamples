trigger Account_Notification_Trigger on Account_Notification__e (after insert) {
    List<Account_Notifier__c> accountNoteList = new List<Account_Notifier__c>();
    for(Account_Notification__e actEventObj:trigger.new){
        Account_Notifier__c actNotifierObj = new Account_Notifier__c();
        actNotifierObj.Account__c = actEventObj.Account_Id__c;
        actNotifierObj.Account_Description__c = actEventObj.Account_Description__c;
        accountNoteList.add(actNotifierObj);
    }
    if(accountNoteList!=null && accountNoteList.size()>0){
        insert accountNoteList;
    }
}