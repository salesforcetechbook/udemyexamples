public with sharing class OpportunityLineItemTriggerHandler {
    public static void preventOLIinsertonopp(List<OpportunityLineItem> oliList){
        Set<Id> oppIdSet = new Set<Id>();
        Map<Id,integer> oppIdoliCountMap = new Map<Id,integer>();

        //Preparation of Map for inserting OLI 
        for(OpportunityLineItem oliObj:oliList){
            oppIdSet.add(oliObj.OpportunityId);
            if(oppIdoliCountMap.get(oliObj.OpportunityId)!=null){
                oppIdoliCountMap.put(oliObj.OpportunityId,oppIdoliCountMap.get(oliObj.OpportunityId)+1);
            }
            else{
                oppIdoliCountMap.put(oliObj.OpportunityId,1);
            }
            
        }

        //Preparation or updating oppIdoliCountMap for existing line items 
        for(AggregateResult agResultObj:[select count(id) oliCount,OpportunityId 
                        from OpportunityLineItem where OpportunityId in:oppIdSet 
                        group by OpportunityId]){
            if(oppIdoliCountMap.get((id)agResultObj.get('OpportunityId'))!=null){
                oppIdoliCountMap.put((id)agResultObj.get('OpportunityId'),
                    oppIdoliCountMap.get((id)agResultObj.get('OpportunityId'))+(integer)agResultObj.get('oliCount'));
            }
            else{
                oppIdoliCountMap.put((id)agResultObj.get('OpportunityId'),(integer)agResultObj.get('oliCount'));
            }

        }

        //Preventing starts
        for(OpportunityLineItem oliObj:oliList){
            if(oppIdoliCountMap.get(oliObj.OpportunityId)!=null && oppIdoliCountMap.get(oliObj.OpportunityId)>5){
                oliObj.addError(Label.Oli_Error);
            }
        }



    }
}