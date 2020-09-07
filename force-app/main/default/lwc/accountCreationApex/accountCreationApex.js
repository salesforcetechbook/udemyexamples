import { LightningElement,track } from 'lwc';
import createAccount from '@salesforce/apex/AccountController.createAccount';
import {ShowToastEvent} from 'lightning/platformShowToastEvent';
import ACCOUNT_NAME from '@salesforce/schema/Account.Name';
import ACCOUNT_TYPE from '@salesforce/schema/Account.Type';
import ACCOUNT_INDUSTRY from '@salesforce/schema/Account.Industry';
import ACCOUNT_PHONE from '@salesforce/schema/Account.Phone';
export default class AccountCreationApex extends LightningElement {
    @track error; 
    @track accountRecord = {
        [ACCOUNT_NAME.fieldApiName]:'',
        [ACCOUNT_INDUSTRY.fieldApiName]:'',
        [ACCOUNT_PHONE.fieldApiName]:'',
        [ACCOUNT_TYPE.fieldApiName]:''
    }
    handleNameChange(event){       
        this.accountRecord[ACCOUNT_NAME.fieldApiName] = event.target.value;
    }
    handleTypeChange(event){
        this.accountRecord[ACCOUNT_TYPE.fieldApiName] = event.target.value;
    }
    handleIndustryChange(event){
        this.accountRecord[ACCOUNT_INDUSTRY.fieldApiName] = event.target.value;
    }
    handlePhoneChange(event){
        this.accountRecord[ACCOUNT_PHONE.fieldApiName] = event.target.value;
    }

    handleChange(event){
        if(event.target.name=='actName'){
            this.accountRecord[ACCOUNT_NAME.fieldApiName] = event.target.value;
        }
        else if(event.target.name=='actType'){
            this.accountRecord[ACCOUNT_TYPE.fieldApiName] = event.target.value;
        }
        console.log('accountRecord:::'+JSON.stringify(this.accountRecord));
    }


    createAccountRecord(){
        console.log('accountRecord:::'+this.accountRecord);
        console.log('accountRecord:::'+JSON.stringify(this.accountRecord));
        createAccount({accountRec:this.accountRecord})
        .then(result=>{
            this.accountRecord = {};
            const toastEvent = new ShowToastEvent({
                title: 'Success!',
                message: 'Account Created Successfully!!',
                variant: 'success'
            });
            this.dispatchEvent(toastEvent);
        })
        .catch(error=>{
            this.error = error.message;
        });

    }
}