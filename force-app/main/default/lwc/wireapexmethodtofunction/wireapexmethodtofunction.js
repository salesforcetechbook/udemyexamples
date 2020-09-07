import { LightningElement,wire } from 'lwc';
import getContacts from '@salesforce/apex/ContactController.getContactList';
export default class Wireapexmethodtofunction extends LightningElement {
    contacts;
    errormessage;
    @wire(getContacts) retrieveContacts({error,data}){
        if(data){
            this.contacts = data;
            this.errormessage = undefined;
        }
        else if(error){
            this.contacts = undefined;
            this.errormessage = error;
        }
    }
}