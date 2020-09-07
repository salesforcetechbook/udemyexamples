import { LightningElement, track, wire,api } from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import { updateRecord } from 'lightning/uiRecordApi';
import FIRSTNAME_FIELD from '@salesforce/schema/Contact.FirstName';
import LASTNAME_FIELD from '@salesforce/schema/Contact.LastName';
import ID_FIELD from '@salesforce/schema/Contact.Id';
import { getRecord } from 'lightning/uiRecordApi';
const FIELDS = [FIRSTNAME_FIELD, LASTNAME_FIELD];
export default class QuickContactUpdate_uiapi extends LightningElement {
    @api recordId;
    contact;
    lastname;
    firstname;
    @wire(getRecord, { recordId: '$recordId', fields: FIELDS })
    wiredRecord({ error, data }){
        if (data) { 
            this.contact = data;
            this.lastname = this.contact.fields.LastName.value;
            this.firstname = this.contact.fields.FirstName.value;
        }
    }
    updateContact() {
        const fields = {};
        fields[ID_FIELD.fieldApiName] = this.recordId;
        fields[FIRSTNAME_FIELD.fieldApiName] = this.firstname;
        fields[LASTNAME_FIELD.fieldApiName] = this.lastname;
        const recordInput = { fields };
        updateRecord(recordInput)
        .then(() => {
            this.dispatchEvent(
                new ShowToastEvent({
                    title: 'Success',
                    message: 'Contact updated',
                    variant: 'success'
                })
            );
            eval("$A.get('e.force:refreshView').fire();");
        })
        .catch(error => {
            this.dispatchEvent(
                new ShowToastEvent({
                    title: 'Error creating record',
                    message: error.body.message,
                    variant: 'error'
                })
            );
        });
    }
    handlefnameChange(event){
        this.firstname = event.target.value;
    }
    handlelnameChange(event){
        this.lastname = event.target.value;
    }

}