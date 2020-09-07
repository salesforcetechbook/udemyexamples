import { LightningElement } from 'lwc';

export default class ParentComp extends LightningElement {
    messagefromparent;
    handlechange(event){
        this.messagefromparent = event.target.value;
    }
}