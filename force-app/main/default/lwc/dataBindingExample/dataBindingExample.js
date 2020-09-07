import { LightningElement } from 'lwc';

export default class DataBindingExample extends LightningElement {
    message='Welcome to Lightning web components world!';
    handleChange(event){
        this.message = event.target.value;
    }
}