import { LightningElement,wire } from 'lwc';
import getContactList from '@salesforce/apex/ContactController.getContactList';
import { deleteRecord } from 'lightning/uiRecordApi';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import { refreshApex } from '@salesforce/apex';
export default class Contactrowdelete_uiapi extends LightningElement {
    @wire(getContactList) contactList;
    deleteContact(event) {
        const recordId = event.target.dataset.recordid;
        deleteRecord(recordId)
            .then(() => {
                this.dispatchEvent(
                    new ShowToastEvent({
                        title: 'Success',
                        message: 'Contact deleted',
                        variant: 'success'
                    })
                );
                return refreshApex(this.contactList);  
            })
            .catch((error) => {
                console.log(JSON.stringify(error));
                this.dispatchEvent(
                    new ShowToastEvent({
                        title: 'Error deleting record',
                        message: error.body.output.errors[0].message,
                        variant: 'error'
                    })
                );
            });


    }
}