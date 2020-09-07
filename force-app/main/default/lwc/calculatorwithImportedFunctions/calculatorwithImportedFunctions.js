import { LightningElement } from 'lwc';
import myfunction from 'c/defaultFunctionComp';
import {add2numbers,sub2numbers,fnum,snum} from 'c/calculatorFunctionsComp';

export default class CalculatorwithImportedFunctions extends LightningElement {
    firstNumber=fnum;
    secondNumber=snum;
    result;
    title=myfunction();
    handleAddition(){
        //this.result = parseInt(this.firstNumber) + parseInt(this.secondNumber);
        this.result = add2numbers(this.firstNumber,this.secondNumber);
    }
    handleSub(){
        this.result = sub2numbers(this.firstNumber,this.secondNumber);
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