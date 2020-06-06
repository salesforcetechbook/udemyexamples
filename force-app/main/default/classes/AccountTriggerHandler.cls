public with sharing class AccountTriggerHandler {    
    //This method validates Account Record 
    public static void validateAccountBeforeInsert(List<Account> accountList){
        for(Account actObj:accountList){
            if(actObj.Rating=='Hot' && actobj.Type==null){
                actObj.addError('Account Type is Mandatory when Rating is Hot.');
            }
        }
    }

    //This method inserts a contact when an account is inserted
    public static void insertContact(List<Account> accountList){
        List<Contact> contactList = new List<Contact>();
        for(Account actObj:accountList){
              Contact contObj = new Contact();
              contObj.LastName = actObj.Name;
              contObj.AccountId = actObj.Id; 
              contactList.add(contObj);
        }
        if(contactList!=null && contactList.size()>0){
            insert contactList;
        }

    }


    
    public static void createOpportunity(Map<id,Account> actNewMap,Map<Id,Account> actOldMap){
        List<Opportunity> opportunityList = new List<Opportunity>();
        for(Account actObj:actNewMap.values()){
                        //compare old value of Rating with new value of rating 
            //check whether new value of Rating is hot or not
            if(actNewMap.get(actObj.Id).Rating!=actOldMap.get(actObj.Id).Rating 
                && actNewMap.get(actObj.Id).Rating == 'Hot'){
                Opportunity oppObj = new Opportunity();
                oppObj.AccountId = actObj.id;
                oppObj.Name = actObj.Name;
                oppObj.Stagename = 'Needs Analysis';
                oppObj.closeDate = System.today().addDays(3);
                opportunityList.add(oppObj);
            }           

        }

        if(!opportunityList.isEmpty()){
            try{
                insert opportunityList;
            }
            catch(Exception e){
                System.debug('eg:'+e.getMessage());
            }
                
        }

    }

    public static void preventAccountDeletion(List<Account> accountList){
        Set<Id> accountIdSet = new Set<Id>();
        Map<Id,boolean> accountIdisPrimayMap = new Map<Id,boolean>();
        //Prepartion of accountIdSet 
        for(Account actObj:accountList){
            accountIdSet.add(actObj.id);
        }
        //preparation of map 
        if(accountIdSet!=null && accountIdSet.size()>0){
            for(Contact contObj:[select id,Is_Primay__c,accountId from Contact 
                        where accountId in:accountIdSet and Is_Primay__c=true]){
                accountIdisPrimayMap.put(contObj.accountId,contObj.Is_Primay__c);              
            }
        }
        //start validating and prevent
        for(Account actObj:accountList){
            if(accountIdisPrimayMap.get(actObj.Id)!=null && accountIdisPrimayMap.get(actObj.Id)==true){
                actObj.addError('You can\'t delete account');
            }
        }

    }

    public static void publishAccountNotificationEvent(List<Account> accountList){
        List<Account_Notification__e> actNoteList = new List<Account_Notification__e>();
        for(Account actObj:accountList){
            Account_Notification__e actNoteEventObj = new Account_Notification__e();
            actNoteEventObj.Account_Id__C = actObj.Id;
            actNoteEventObj.Account_Description__c = actObj.Description;
            actNoteList.add(actNoteEventObj);
        }

        if(actNoteList!=null && actNoteList.size()>0){
                List<Database.saveResult> saveResult = EventBus.publish(actNoteList);
        }
    }

    //update primary contact
    public static void updatePrimaryContact(List<Account> accountList){
        Set<Id> accountIdSet = new Set<Id>();
        Map<Id,Contact> actIdPrimaryContactMap = new Map<Id,Contact>();
        List<Contact> contactList = new List<Contact>();
        for(Account actObj:accountList){
            accountIdSet.add(actObj.id);
        }
        if(accountIdSet!=null && accountIdSet.size()>0){
            for(Contact contObj:[select id,MailingCity,AccountID from Contact 
                    where AccountId in:accountIdSet and Is_Primay__c=true]){
                actIdPrimaryContactMap.put(contObj.AccountId,contObj);       
            }
        }

        for(Account actObj:accountList){
            if(actIdPrimaryContactMap.get(actObj.id)!=null){
                Contact contObj = new Contact();
                contObj.Id = actIdPrimaryContactMap.get(actObj.id).Id;
                contObj.MailingCity = actObj.BillingCity;
                contactList.add(contObj);
            }
        }

        if(contactList!=null && contactList.size()>0){
            AvoidRecursivecls.isUpdate = true;
            update contactList;
        }
        
        
    }




}