import { LightningElement,wire } from 'lwc';
import { getPicklistValues } from 'lightning/uiObjectInfoApi';
import TYPE_FIELD from '@salesforce/schema/Account.Type';
import LEAD_SOURCE from '@salesforce/schema/Contact.LeadSource';
import getProfiles from '@salesforce/apex/PicklistHelper.getProfiles';
export default class PicklistExample extends LightningElement {
    selectedValue='';
    selectedLeadSource = '';
    selectedAccountType = '';
    profileOptionsList = [];
    selectedProfile='';
    errormessage='';
     /*Static Values*/
     get options() {
        return [
            { label: 'New', value: 'new' },
            { label: 'In Progress', value: 'inProgress' },
            { label: 'Finished', value: 'finished' },
        ];
     }
      /*Wire getPicklistValues for Type Field*/
    @wire(getPicklistValues, {
        recordTypeId: '012000000000000AAA',
        fieldApiName: TYPE_FIELD
    }) typeValues;
      /*Wire getPicklistValues for LEAD source Field*/
    @wire(getPicklistValues, {
        recordTypeId: '0122x000000DkNvAAK',
        fieldApiName: LEAD_SOURCE
    })  leadSourceValues;

    @wire(getProfiles) retrieveProfiles({error,data}){
        if(data){
            let tempArray = [];
            for(let key in data){              
                console.log(key+'-->'+data[key]);               
                tempArray.push({label:data[key],value:key});
           }
           this.profileOptionsList = tempArray;
        }
        else if(error){
            this.errormessage = error;
        }
    }

    handleChange(event) {
        this.selectedValue = event.target.value;
    }  
    handleLeadSourceChange(event){
        this.selectedLeadSource = event.target.value;        
    }
    handleTypeChange(event){
        this.selectedAccountType = event.target.value;
    } 
    handleProfileChange(event){        
        this.selectedProfile = event.target.value;
        this.template.querySelector("[data-id='selprof']").value = this.selectedProfile;  
        /*this.template.querySelector('select.selectProfileList').value  =   this.selectedProfile;*/
    }


}