trigger OpportunityLineItemTrigger on OpportunityLineItem (before insert) {
    if(trigger.isInsert && trigger.isBefore){
        OpportunityLineItemTriggerHandler.preventOLIinsertonopp(trigger.new);
        switch on trigger.operationType {
         
            when AFTER_INSERT, AFTER_UPDATE {
                //create related records
            }
            when BEFORE_INSERT {
                //set value on record create
            }
            when AFTER_DELETE {
                //prevent deletion of sensitive data
            }
            when else {
                //do nothing for AFTER_UNDELETE, BEFORE_DELETE, or BEFORE_UPDATE
            }
        }
    }
}