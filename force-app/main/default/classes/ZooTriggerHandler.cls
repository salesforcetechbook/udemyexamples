public with sharing class ZooTriggerHandler {
    public static void insertAnimals(List<Zoo__c> zooList){
        /*Set<Id> zooIdSet = new Set<Id>();
        for(Zoo__c zooObj:zooList){
            zooIdSet.add(zooObj.Id);
        }*/
        //doCallout(zooIdSet);
        doCallout(JSON.serialize(zooList));

    }

    @future(callout=true)
    public static void doCallout(String jsonZooList){
        List<Zoo__c> zooList = (List<Zoo__c>) JSON.deserialize(jsonZooList,List<Zoo__c>.class);
        List<Animals__c> animalList = new List<Animals__c>();
        for(Zoo__c zooObj:zooList){
            Http http = new Http();
            HttpRequest request = new HttpRequest();
            request.setEndpoint('https://th-apex-http-callout.herokuapp.com/animals');
            request.setMethod('GET');
            HttpResponse response = http.send(request);
            // If the request is successful, parse the JSON response.
            if (response.getStatusCode() == 200) {
                //Deserialize the JSON string into collections of primitive data types.
                Map<String, Object> results = (Map<String, Object>) JSON.deserializeUntyped(response.getBody());
                
                //Cast the values in the 'animals' key as a list
                List<Object> animals = (List<Object>) results.get('animals');
                
                System.debug('Received the following animals:');
                for (Object animal: animals) {
                    Animals__c animalObj = new Animals__c();   
                    animalObj.Name = (String)animal;
                    animalObj.Zoo__c = zooObj.Id;
                    animalList.add(animalObj);
                }
            }
        }

        if(animalList!=null && animalList.size()>0){
                insert animalList;
        }



    }

    

}