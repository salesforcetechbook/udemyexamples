import { LightningElement } from 'lwc';

export default class ChildMessage extends LightningElement {
    handleClick(event){
        const messageEvent = new CustomEvent('childmessage', { detail: 'Hi,i came from child' });
        this.dispatchEvent(messageEvent);
    }
}