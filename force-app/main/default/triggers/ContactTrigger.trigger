trigger ContactTrigger on Contact (before insert,after insert,after update,before delete) {
  /* if(trigger.isInsert && trigger.isBefore){
       //Contact contObj = trigger.new[0];
       //contObj.LeadSource = 'Trade Show';
       for(Contact contObj:trigger.new){
            contObj.LeadSource = 'Trade Show';
       }     
      
   }*/
   /*if(trigger.isAfter){
       if(trigger.isInsert){
            ContactTriggerHandler.countContactsOnInsert(trigger.new);
       }
       if(trigger.isUpdate){
            ContactTriggerHandler.countContactonUpdate(trigger.newMap,trigger.oldMap);
       }      
   } */

   /*if(trigger.isBefore && trigger.isDelete){
        ContactTriggerHandler.countContactonDelete(trigger.old);
   }*/

   /*if(trigger.operationType == TriggerOperation.BEFORE_DELETE){
     ContactTriggerHandler.countContactonDelete(trigger.old);
   }*/

 switch on trigger.operationType {
      when  BEFORE_INSERT{
          for(Contact contObj:trigger.new){
               contObj.LeadSource = 'Trade Show';
          }  
      }
      when  AFTER_INSERT{
          ContactTriggerHandler.countContactsOnInsert(trigger.new);
     }
     when  BEFORE_DELETE{
          ContactTriggerHandler.countContactonDelete(trigger.old);
     }
     when  AFTER_UPDATE{
          ContactTriggerHandler.countContactonUpdate(trigger.newMap,trigger.oldMap);
          if(AvoidRecursivecls.isUpdate==false){
               ContactTriggerHandler.updateAccountBillingcity(trigger.new);
          }
         
     }
      when else {
           
      }
 }
   

   

}