trigger AccountTrigger on Account (before insert,after insert,after update,before delete) {
    if(trigger.isInsert && trigger.isBefore){
        AccountTriggerHandler.validateAccountBeforeInsert(trigger.new);
    }

    if(trigger.isInsert && trigger.isAfter){
        AccountTriggerHandler.publishAccountNotificationEvent(trigger.new);
        AccountTriggerHandler.insertContact(trigger.new);
    }

    if(trigger.isUpdate && trigger.isAfter){
        
        AccountTriggerHandler.createOpportunity(trigger.newMap,trigger.oldMap);
        if(AvoidRecursivecls.isUpdate==false){
            AccountTriggerHandler.updatePrimaryContact(trigger.new);
        }        
    }

    if(trigger.isDelete && trigger.isBefore){
        AccountTriggerHandler.preventAccountDeletion(trigger.old);
    }
   
    
}