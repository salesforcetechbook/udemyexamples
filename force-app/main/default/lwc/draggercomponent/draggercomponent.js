import { LightningElement,wire } from 'lwc';
import getAccounts from '@salesforce/apex/AccountController.getAccounts';
export default class Draggercomponent extends LightningElement {
    @wire(getAccounts) accounts;
    handleDragStart(event){
        event.dataTransfer.setData("account_id",event.target.dataset.accountid);
    }
}