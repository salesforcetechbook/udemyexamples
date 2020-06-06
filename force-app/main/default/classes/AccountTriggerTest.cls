@isTest
private class AccountTriggerTest {
    static testMethod void insertContact(){
        List<Account> accountList = new List<Account>();
        Account actObj = new Account();
        actObj.Name = 'Test1';
        actObj.Rating = 'Warm';
        accountList.add(actObj);
        Account actObj1 = new Account();
        actObj1.Name = 'Test1';
        actObj1.Rating = 'Warm';
        accountList.add(actObj1);
        Test.startTest();
            insert accountList;
        Test.stopTest();
        List<Contact> contactList = [select id from Contact where accountId in :accountList];
        System.assert(contactList.size()==2);
    }
    static testMethod void insertOpportunity(){
        Account actObj = new Account();
        actObj.Name = 'Test1';
        actObj.Rating = 'Warm';
        insert actObj;
        Test.startTest();
            actObj.Rating = 'Hot';
            update actObj;
        Test.stopTest();
        Opportunity opportunity = [select id from Opportunity where accountId = :actObj.Id];
        System.assert(opportunity.id!=null);
    }
    static testMethod void validateAccountRating(){
        Account actObj = new Account();
        actObj.Name = 'Test1';
        actObj.Rating = 'Hot';       
        Test.startTest();
            Database.saveResult saveResObj =  database.insert(actObj,false);
        Test.stopTest();          
    }
    static testMethod void validateAccountPrimaryContact(){
        Account actObj = new Account();
        actObj.Name = 'Test1';
        actObj.Rating = 'Warm'; 
        insert actObj;
        Contact contObj = new Contact();
        contObj.AccountId = actObj.Id;
        contObj.LastName = 'Test Contact';
        contObj.Is_Primay__c = true;
        insert contObj;      
        Test.startTest();
            Database.DeleteResult saveResObj =  database.delete(actObj,false);
        Test.stopTest();          
    }
}