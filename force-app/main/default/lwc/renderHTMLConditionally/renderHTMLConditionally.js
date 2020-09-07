import { LightningElement } from 'lwc';

export default class RenderHTMLConditionally extends LightningElement {
    areaDetailsVisible = false;
    handleChange(event){
        this.areaDetailsVisible = event.target.checked;
    }
}