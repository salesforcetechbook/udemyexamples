import { LightningElement,wire } from 'lwc';
import { CurrentPageReference } from 'lightning/navigation';
import { fireEvent } from 'c/pubsub';
import getAccounts from '@salesforce/apex/AccountController.getAccounts';
export default class AccountPublisher_pubsub extends LightningElement {
    @wire(getAccounts) accounts;
    @wire(CurrentPageReference) pageRef;
    publishMessage(event){
        event.preventDefault();
        fireEvent(this.pageRef,'accountsend',event.target.dataset.accountid);
    }  

}