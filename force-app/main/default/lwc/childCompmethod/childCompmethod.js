import { LightningElement, api } from 'lwc';

export default class ChildCompmethod extends LightningElement {
    messagefrommethod;
    @api acceptMessage(msg){
        this.messagefrommethod = msg;
    }

}