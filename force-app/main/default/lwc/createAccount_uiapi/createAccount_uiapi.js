import { LightningElement,wire } from 'lwc';
import { createRecord } from 'lightning/uiRecordApi';
import { getPicklistValues } from 'lightning/uiObjectInfoApi';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import ACCOUNT_OBJECT from '@salesforce/schema/Account';
import NAME_FIELD from '@salesforce/schema/Account.Name';
import INDUSTRY_FIELD from '@salesforce/schema/Account.Industry';
import ACCOUNT_PHONE from '@salesforce/schema/Account.Phone';
import ACCOUNT_RATING from '@salesforce/schema/Account.Rating'
export default class CreateAccount_uiapi extends LightningElement {
    accountId;
    name;
    selectedIndustry;
    phone;
    selectedRating;
    @wire(getPicklistValues, {
        recordTypeId: '012000000000000AAA',
        fieldApiName: INDUSTRY_FIELD
    }) industryValues;
    @wire(getPicklistValues, {
        recordTypeId: '012000000000000AAA',
        fieldApiName: ACCOUNT_RATING
    }) accountRatingValues;

    handleNameChange(event) {       
        this.name = event.target.value;
    }
    handleindustryChange(event){
        this.selectedIndustry = event.target.value;
    }
    handlephoneChange(event){
        this.phone = event.target.value;
    }
    handleRatingChange(event){
        this.selectedRating = event.target.value;
    }
    createAccount() {
        const fields = {};
        fields[NAME_FIELD.fieldApiName] = this.name;
        fields[INDUSTRY_FIELD.fieldApiName] = this.selectedIndustry;
        fields[ACCOUNT_PHONE.fieldApiName] = this.phone;
        fields[ACCOUNT_RATING.fieldApiName] = this.selectedRating;
        const recordInput =  {apiName: ACCOUNT_OBJECT.objectApiName, fields};
        createRecord(recordInput)
        .then(account =>{
            this.accountId = account.id;
            this.dispatchEvent(
                new ShowToastEvent({
                    title: 'Success',
                    message: 'Account created',
                    variant: 'success',
                }),
            );
        })
        .catch(error => {
            console.log('error::'+JSON.stringify(error));
            this.dispatchEvent(                
                new ShowToastEvent({
                    title: 'Error creating record',
                    message: error.body.message,
                    variant: 'error',
                }),
            );     
        });
    }
}