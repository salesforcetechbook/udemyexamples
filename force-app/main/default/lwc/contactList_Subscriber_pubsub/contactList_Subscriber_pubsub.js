import { LightningElement,wire,api,track} from 'lwc';
import { CurrentPageReference } from 'lightning/navigation';
import { registerListener, unregisterAllListeners} from 'c/pubsub';
import findContactByAccountId from '@salesforce/apex/ContactController.findContactByAccountId';
const columns = [
    { label: 'First Name', fieldName: 'FirstName' },
    { label: 'Last Name', fieldName: 'LastName'},
    { label: 'Email', fieldName: 'Email', type: 'email' },    
];
export default class ContactList_Subscriber_pubsub extends LightningElement {
    tablecolumns = columns;
    @track accountId;
    @track contactList;
    message;
    @wire(CurrentPageReference) pageRef;
    @wire(findContactByAccountId,{accountid:'$accountId'})   
        contacts({error,data}){
            if(data){
                if(data.length>0){
                    this.contactList = data;
                    this.message = undefined;
                }
                else{
                    this.message = 'No Records Found';
                    this.contactList = undefined;
                }
            }

        }
    connectedCallback() {       
        registerListener('accountsend', this.handlemessagesend, this);
    }
    handlemessagesend(publisherMessage) {   
        this.accountId = publisherMessage;
    }
    disconnectedCallback() {
        unregisterAllListeners(this);
    }
}