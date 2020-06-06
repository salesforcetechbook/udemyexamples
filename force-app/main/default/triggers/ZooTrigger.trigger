trigger ZooTrigger on Zoo__c (after insert) {
  switch on trigger.operationType {
      when AFTER_INSERT {
        ZooTriggerHandler.insertAnimals(trigger.new);
      }
      when else {
          
      }
  }
}