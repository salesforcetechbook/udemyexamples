import { LightningElement,track } from 'lwc';
import saveAccounts from '@salesforce/apex/AccountController.createAccounts';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
export default class Adddynamicrowsdelete extends LightningElement {
    keyIndex = 0;  
    error;
    message;
    @track accountRecList = [
        {                      
            Name: '',
            Industry: '',
            Phone: ''
        }
    ];
    addRow() {
        this.keyIndex+1;
        this.accountRecList.push ({            
            Name: '',
            Industry: '',
            Phone: ''
        });
    }
    removeRow(event){   
        if(this.accountRecList.length>=1){    
            this.accountRecList.splice(event.target.dataset.rowindex,1);
            this.keyIndex-1;
        }

    }
    changeHandler(event){  
        if(event.target.name==='accName'){
            this.accountRecList[event.target.dataset.rowindex].Name = event.target.value;
        }
        else if(event.target.name==='accIndustry'){
            this.accountRecList[event.target.dataset.rowindex].Industry = event.target.value;
        }
        else if(event.target.name==='accPhone'){
            this.accountRecList[event.target.dataset.rowindex].Phone = event.target.value;
        }
    }
    saveMultipleAccounts() {
        saveAccounts({ accountList : this.accountRecList })
            .then(result => {
                    this.message = result;
                    this.error = undefined;   
                    this.accountRecList.forEach(function(item){                   
                        item.Name='';
                        item.Industry='';
                        item.Phone='';                   
                    });
                    if(this.message !== undefined) {
                        this.dispatchEvent(
                            new ShowToastEvent({
                                title: 'Success',
                                message: 'Accounts Created!',
                                variant: 'success',
                            }),
                        );
                    }
                })
            .catch(error => {
                this.message = undefined;
                this.error = error;
                this.dispatchEvent(
                    new ShowToastEvent({
                        title: 'Error creating records',
                        message: error.body.message,
                        variant: 'error',
                    }),
                );
                console.log("error", JSON.stringify(this.error));
            });
              


    }
}