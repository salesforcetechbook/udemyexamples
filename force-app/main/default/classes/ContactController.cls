public with sharing class ContactController {
    public ContactController() {

    }
    @AuraEnabled(cacheable=true)  
    public static List<Contact> getContactList() {
        return [
            SELECT Id, FirstName,LastName,Name,Title, Phone, Email,LeadSource 
            FROM Contact   where Email!=null   order by createdDate Desc      
            LIMIT 10
        ];
    }
    
    @AuraEnabled
    public static List<Contact> getContactRecords(){
        return [
            SELECT Id, FirstName,LastName,Name,Title, Phone, Email,LeadSource 
            FROM Contact   where Email!=null   order by createdDate Desc      
            LIMIT 10
        ];
    }
    
    @AuraEnabled(cacheable=true)
    public static List<Contact> findContactByAccountId(String accountid){
        return [select id,FirstName,LastName,Email from Contact where accountId=:accountid];
    }
    @AuraEnabled
    public static string deleteSelectedContacts(List<String> contactIdList){      
        List<Contact> contactList = new List<Contact>();
        contactList = [select id from Contact where id in:contactIdList];
        if(contactList!=null && contactList.size()>0){
            try{
                delete contactList;
                return 'Contacts deleted successfully';
            }
            catch(Exception e){
                return e.getMessage();
            }  
        }
        else{
                return 'No Contacts Found';
        }        
    }
    @AuraEnabled(cacheable=true)
    public static List<Contact> findContactRecords(String searchKey) {
        String key = '%' + searchKey + '%';
        return [
            SELECT Id, LastName 
            FROM Contact 
            WHERE LastName LIKE :key 

            LIMIT 10];
    }

}