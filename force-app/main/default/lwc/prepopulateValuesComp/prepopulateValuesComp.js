import { LightningElement,api,wire} from 'lwc';
import { NavigationMixin } from 'lightning/navigation';
import { encodeDefaultFieldValues } from 'lightning/pageReferenceUtils';
import {ShowToastEvent} from 'lightning/platformShowToastEvent';
import {getRecord} from 'lightning/uiRecordApi';
import ACT_NAME from '@salesforce/schema/Account.Name';
import ACT_BILL_STREET from '@salesforce/schema/Account.BillingStreet';
import ACT_BILL_CITY from '@salesforce/schema/Account.BillingCity';
import ACT_BILL_STATE from '@salesforce/schema/Account.BillingState';
import ACT_BILL_POSTAL_CODE from '@salesforce/schema/Account.BillingPostalCode';
import ACT_BILL_COUNTRY from '@salesforce/schema/Account.BillingCountry';
const FIELDS = [ACT_NAME,ACT_BILL_STREET,ACT_BILL_CITY,ACT_BILL_STATE,ACT_BILL_POSTAL_CODE,ACT_BILL_COUNTRY];
export default class PrepopulateValuesComp extends NavigationMixin(LightningElement) {
    @api recordId;
    accountRec;
    @wire(getRecord, { recordId: '$recordId', fields: FIELDS }) 
        acccountRecord({ error, data }){
            if (error) {
                let errmessage = 'Unknown error';
                if (Array.isArray(error.body)) {
                    errmessage = error.body.map(e => e.message).join(', ');
                }
                else if (typeof error.body.message === 'string') {
                    errmessage = error.body.message;
                }
                this.dispatchEvent(
                    new ShowToastEvent({
                        title: 'Error loading contact Page',
                        message: errmessage,
                        variant: 'error',
                    }),
                );
            }
            else if (data) {
                this.accountRec = data;
                this.navigateToNewContactWithDefaults();
            }
    }
    navigateToNewContactWithDefaults() {
        const    act_name = this.accountRec.fields.Name.value?String(this.accountRec.fields.Name.value):'';
        const    act_street = this.accountRec.fields[ACT_BILL_STREET.fieldApiName].value?String(this.accountRec.fields[ACT_BILL_STREET.fieldApiName].value):'';
        const    act_state=this.accountRec.fields[ACT_BILL_STATE.fieldApiName].value?String(this.accountRec.fields[ACT_BILL_STATE.fieldApiName].value):''; 
        const    act_city=this.accountRec.fields[ACT_BILL_CITY.fieldApiName].value?String(this.accountRec.fields[ACT_BILL_CITY.fieldApiName].value):'';
        const    act_postal_code=this.accountRec.fields[ACT_BILL_POSTAL_CODE.fieldApiName].value?String(this.accountRec.fields[ACT_BILL_POSTAL_CODE.fieldApiName].value):'';
        const    act_country=this.accountRec.fields[ACT_BILL_COUNTRY.fieldApiName].value?String(this.accountRec.fields[ACT_BILL_COUNTRY.fieldApiName].value):'';
        const defaultValues = encodeDefaultFieldValues({           
            LastName: act_name,
            MailingStreet: act_street,
            MailingState: act_state,
            MailingCity: act_city,
            MailingPostalCode:act_postal_code,
            MailingCountry:act_country,            
            AccountId:this.recordId
        });
        this[NavigationMixin.Navigate]({
            type: 'standard__objectPage',
            attributes: {
                objectApiName: 'Contact',
                actionName: 'new'
            },
            state: {
                defaultFieldValues: defaultValues
            }
        });
    }



}