import { LightningElement,track} from 'lwc';
export default class Testcomponent extends LightningElement {
    @track fullName = { firstName : 'Balu', lastName : ''};
    handleClick(event){
        this.fullName.firstName = 'Navarshi';
    }    
}