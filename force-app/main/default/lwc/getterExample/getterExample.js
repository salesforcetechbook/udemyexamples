import { LightningElement } from 'lwc';

export default class GetterExample extends LightningElement {
    fName = '';
    lName = '';
    handleChange(event) {
        const targetName = event.target.name;
        if(targetName=='firstName'){
            this.fName = event.target.value;
        }
        else if(targetName=='lastName'){
            this.lName = event.target.value;
        }
    }
    
    get uppercasedFullName() {
        console.log('this.fName:'+this.fName);
       console.log('this.lName::'+this.lName);  
        return (this.fName+' '+this.lName).toUpperCase();
    }
}