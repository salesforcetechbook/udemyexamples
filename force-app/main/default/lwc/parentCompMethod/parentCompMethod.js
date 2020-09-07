import { LightningElement } from 'lwc';

export default class ParentCompMethod extends LightningElement {
    messagefromparent;
    handlechange(event){
        this.template.querySelector('c-child-compmethod').acceptMessage(event.target.value);     
           
    }
}