public with sharing class AccountController {
    public String accountId{get;set;}
    public Account actObj{get;set;}
    public AccountController() {
        actobj= new Account();
    }
    public pagereference retrieveAccountDetail(){
        system.debug('accountId::'+accountId);
        if(accountId!=null){
            actObj = [select id,name,type,industry from Account where id=:accountId];
        }
        return null;
    }
    @AuraEnabled(cacheable=true)
    public static List<Account> getAccounts(){
        return [select id,name,type from Account limit 10];
    }
    @AuraEnabled
    public static Account createAccount(Account accountRec){
        try{
            insert accountRec;
            return accountRec;
        }
        catch(Exception ex){
            throw new AuraHandledException(ex.getMessage());
        }
    }
    @AuraEnabled
    public static List<Account> createAccounts(List<Account> accountList){
        insert accountList;
        return accountList;
    }


    @AuraEnabled(cacheable=true)
    public static List<String> getAccountFields(){
        List<String> fieldList = new List<String>();
        fieldList.add('Name');
        fieldList.add('Type');
        fieldList.add('Industry');
        return fieldList;
    }
}