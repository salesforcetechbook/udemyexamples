import { LightningElement,wire} from 'lwc';
import getAccounts from '@salesforce/apex/AccountSearchCls.getAccounts';
const DELAY = 300;
export default class SearchExample extends LightningElement {
    accountName='';
    accountList =[];
    handleKeyChange(event){        
        window.clearTimeout(this.delayTimeout);
        this.delayTimeout = setTimeout(()=>{
            this.accountName = event.target.value;
        },DELAY);
    }
    @wire(getAccounts,{actName:'$accountName'}) 
        retrieveAccouts({error,data}){
            if(data){
                this.accountList = data;
            }    
    }



}