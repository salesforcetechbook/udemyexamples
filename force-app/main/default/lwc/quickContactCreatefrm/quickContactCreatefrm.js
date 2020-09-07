import { LightningElement,api } from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import FIRST_NAME from '@salesforce/schema/Contact.FirstName';
import LAST_NAME from '@salesforce/schema/Contact.LastName';
import EMAIL from '@salesforce/schema/Contact.Email';
import PHONE from '@salesforce/schema/Contact.Phone';
export default class QuickContactCreatefrm extends LightningElement {
    contactfields = [FIRST_NAME,LAST_NAME,EMAIL,PHONE]; 
    @api recordId; 
    handleSuccess(event){
        const evt = new ShowToastEvent({
            title: "Contact created",
            message: "Record ID: " + event.detail.id,
            variant: "success"
        });
        this.dispatchEvent(evt);        
    }
    handleSubmit(event){
       event.preventDefault();
       const fields = event.detail.fields;
       fields.AccountId = this.recordId; // modify a field
       this.template.querySelector('lightning-record-form').submit(fields);
       eval("$A.get('e.force:refreshView').fire();");
    }
}