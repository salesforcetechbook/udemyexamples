import { LightningElement,wire } from 'lwc';
import getContacts from '@salesforce/apex/ContactController.getContactList';
export default class WireamethodtoProperty extends LightningElement {
    @wire(getContacts) contacts;
}