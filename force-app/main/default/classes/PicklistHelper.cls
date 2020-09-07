public with sharing class PicklistHelper {
    public PicklistHelper() {

    }
    @AuraEnabled(cacheable=true)
    public static Map<Id,String> getProfiles(){
        Map<Id,String> profileMap = new Map<Id,String>();
        for(Profile profileObj:[select id,name from Profile limit 10]){
            profileMap.put(profileObj.Id,profileObj.Name);
        }
        return profileMap;

    }
}