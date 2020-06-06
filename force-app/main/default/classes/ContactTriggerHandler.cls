public with sharing class ContactTriggerHandler {
    public ContactTriggerHandler() {

    }
    public static void countContactsOnInsert(List<Contact> contactList){
        Set<Id> accountIdSet = new Set<Id>();      
        for(Contact contObj:contactList){
            if(contObj.AccountId!=null){
                accountIdSet.add(contObj.AccountId);
            }
        }
        if(accountIdSet!=null && accountIdSet.size()>0){
            updateAccount(accountIdSet);
        }

    }

    public static void countContactonUpdate(Map<Id,Contact> contNewMap,Map<Id,Contact> contOldMap){
        Set<Id> accountIdSet = new Set<Id>();
        Map<Id,Account> accountMap = new Map<Id,Account>();
        for(Contact contObj:contNewMap.values()){
            if(contnewMap.get(contObj.Id).AccountId!=contOldMap.get(contObj.Id).AccountId){
                if(contnewMap.get(contObj.Id).AccountId!=null){
                    accountIdSet.add(contnewMap.get(contObj.Id).AccountId);
                }
                if(contOldMap.get(contObj.Id).AccountId!=null){
                    accountIdSet.add(contOldMap.get(contObj.Id).AccountId);
                }
            }
        }
        if(accountIdSet!=null && accountIdSet.size()>0){
            updateAccount(accountIdSet);
        }

    }

    public static void countContactonDelete(List<Contact> contactList){
        Set<Id> accountIdSet = new Set<Id>();
        Map<Id,Account> accountMap = new Map<Id,Account>();
        Set<Id> contactIdSet = new Set<Id>();
        for(Contact contObj:contactList){
            if(contObj.AccountId!=null){
                accountIdSet.add(contObj.AccountId);
                contactIdSet.add(contObj.Id);
            }
        }
        if(accountIdSet!=null && accountIdSet.size()>0){
            for(AggregateResult agResultObj:[select count(id) contCount,AccountId 
                                from Contact where AccountId in:accountIdSet and id not in:contactIdSet 
                                group by AccountId]){
                Account actObj = new Account(id=(Id)agResultObj.get('AccountId'),
                    Contact_Count__c=(decimal)agResultObj.get('contCount'));
                accountMap.put(actObj.id,actObj);
            }
            if(accountMap!=null && accountMap.size()>0){
                update accountMap.values();
            }
        }

    }

    public static void updateAccount(Set<Id> accountIdSet){
        Map<Id,Account> accountMap = new Map<Id,Account>();
        for(AggregateResult agResultObj:[select count(id) contCount,AccountId 
                    from Contact where AccountId in:accountIdSet 
                    group by AccountId]){
            Account actObj = new Account(id=(Id)agResultObj.get('AccountId'),
            Contact_Count__c=(decimal)agResultObj.get('contCount'));
            accountMap.put(actObj.id,actObj);
        }
        if(accountMap!=null && accountMap.size()>0){
        update accountMap.values();
        }
    }

    //update account billing city when primary contact mailing city is changed
    public static void updateAccountBillingcity(List<Contact> contactList){
        Map<Id,Account> accountMap = new Map<Id,Account>();
        for(Contact contObj:contactList){
            if(contObj.Is_Primay__c==true && contObj.AccountId!=null){
                Account actObj = new Account(id=contObj.AccountId,BillingCity=contObj.MailingCity);
               /* Account actObj = new Account();
                actObj.Id = contObj.AccountId;
                actObj.BillingCity = contObj.MailingCity;*/
                accountMap.put(actObj.Id,actObj);
            }
        }

        if(accountMap!=null && accountMap.size()>0){
            AvoidRecursivecls.isUpdate =true; 
            update accountMap.values();
        }

    }

}