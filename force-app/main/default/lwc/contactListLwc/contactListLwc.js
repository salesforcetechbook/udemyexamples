import { LightningElement,wire } from 'lwc';
import getContactList from '@salesforce/apex/ContactController.getContactList';
export default class ContactListLwc extends LightningElement {
    @wire(getContactList) contacts;
    sendidtoAura(event){
        event.preventDefault();        
        const contactDeleteEvent = new CustomEvent('selectedcontact',{detail:{contactid:event.target.dataset.contid}}); 
        this.dispatchEvent(contactDeleteEvent);   
    }
}