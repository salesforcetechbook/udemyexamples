import { LightningElement,api } from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
export default class QuickCaseCreationformEdit extends LightningElement {
    @api recordId;
    handleSuccess(event) {
        const evt = new ShowToastEvent({
            title: "Case Creation",
            message: "Case is Successfully Created!",
            variant: "success"
        });
        this.dispatchEvent(evt);  
        eval("$A.get('e.force:refreshView').fire();");
    }
    handleReset(event){
        const inputFields = this.template.querySelectorAll('lightning-input-field');
        if (inputFields) {
            inputFields.forEach(field => {
                if(!field.getAttribute('data-contactrecid')){
                    field.reset();
                }                    
            });
        }

    }



}