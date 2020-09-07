import { LightningElement,track, wire } from 'lwc';
import createAccount from '@salesforce/apex/AccountController.createAccount';
import getAccountFields from '@salesforce/apex/AccountController.getAccountFields';
import {ShowToastEvent} from 'lightning/platformShowToastEvent';
export default class AccountCreatiionDynamically extends LightningElement {
    @track error; 
    @track accountRecord = {};
    @track tempRecord={};
    @track fieldValuesList=[];
    @wire(getAccountFields) fieldValueList({error,data}){
        if(data){
            data.forEach(element => {
                //this.accountRecord[element]='';               
                this.fieldValuesList.push(element);
            });
            console.log('Hi:'+JSON.stringify(this.accountRecord));
        }
    }
    handleChange(event){  
        //this.tempRecord = this.accountRecord;    
        this.accountRecord[event.target.name] = event.target.value;
        //console.log('daat::'+this.template.querySelector("[data-id='Name']").value);
        console.log('accountRecord:::'+JSON.stringify(this.accountRecord));
    }

    createAccountRecord(){
        console.log('accountRecord:::'+this.accountRecord);
        console.log('accountRecord:::'+JSON.stringify(this.accountRecord));
        createAccount({accountRec:this.accountRecord})
        .then(result=>{
            this.fieldValuesList.forEach(element=>{
                this.template.querySelector("[data-id="+element+"]").value ='';
            });
           
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