import { LightningElement } from 'lwc';

export default class ParentCompEventExample extends LightningElement {
    message='Parent message';
    hanldMessage(event){
        this.message = event.detail;
    }
}