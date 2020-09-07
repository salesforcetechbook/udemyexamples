import { LightningElement } from 'lwc';

export default class ParentGetSet extends LightningElement {
    messagefromparent;
    handlechange(event){
        this.messagefromparent = event.target.value;
    }
}