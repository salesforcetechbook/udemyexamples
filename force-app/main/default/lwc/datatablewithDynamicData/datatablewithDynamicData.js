import { LightningElement,wire,track } from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import { refreshApex } from '@salesforce/apex';
import getContactList from '@salesforce/apex/ContactController.getContactList';
import deleteSelectedContacts from '@salesforce/apex/ContactController.deleteSelectedContacts';
const columns = [
    {label: 'First Name', fieldName: 'FirstName', type: 'text'},
    {label: 'Last Name', fieldName: 'LastName', type: 'text'},    
    {label: 'Contact Email', fieldName: 'Email', type: 'email'},
    {label: 'Contact Phone', fieldName: 'Phone', type: 'phone'},
];
export default class DatatablewithDynamicData extends LightningElement {
    tablecolumns = columns;
    @wire(getContactList) contacts; 
    @track contactRecordList=[];      
    selectedRecordIdList = [];
    error;
    handelSelectedRows(event){
        this.contactRecordList =[];
        this.selectedRecordIdList = [];
        const selectedRows = event.detail.selectedRows;    
        selectedRows.forEach(element => {
            this.contactRecordList.push(element);
            this.selectedRecordIdList.push(element.Id);
        });

    }
    handleDeleteSelectedContacts(){
        if(this.selectedRecordIdList){
            deleteSelectedContacts({contactIdList:this.selectedRecordIdList})
            .then(result => {
                this.dispatchEvent(
                    new ShowToastEvent({
                        title: 'Success',
                        message: result,
                        variant: 'success'
                    })
                );
                this.template.querySelector('lightning-datatable').selectedRows = [];                       
                return refreshApex(this.contacts);
            })
            .catch(error => {
                    this.error = error;
                }
            );
        }
        
    }

}