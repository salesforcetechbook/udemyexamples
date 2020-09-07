import { LightningElement,track } from 'lwc';
import getContacts from '@salesforce/apex/ContactController.getContactRecords';
export default class Invokeapexmethodimperatively extends LightningElement {
    @track contacts;
    @track error;    
    handleLoad() {
        getContacts()
        .then(result=>{
            this.contacts = result;
        })
        .catch(error=>{
            this.error=error;
        });
    }
}