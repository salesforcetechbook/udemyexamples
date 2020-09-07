import { LightningElement } from 'lwc';

export default class CalculatorExample extends LightningElement {
    firstNumber;
    secondNumber;
    result;
    handleAddition(){
        this.result = parseInt(this.firstNumber) + parseInt(this.secondNumber);
    }
    handleChange(event){
        if(event.target.name=='fstNumber'){
            this.firstNumber = event.target.value;
        }
        else if(event.target.name=='secNumber'){
            this.secondNumber = event.target.value;
        }
    }
}