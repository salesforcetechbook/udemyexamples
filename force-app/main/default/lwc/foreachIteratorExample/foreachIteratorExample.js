import { LightningElement } from 'lwc';

export default class ForeachIteratorExample extends LightningElement {
    contacts = [
        {
            Id: 1,
            Name: 'Navarshi Malemarpuram',
            Title: 'VP of Engineering',
        },
        {
            Id: 2,
            Name: 'Michael Jones',
            Title: 'VP of Sales',
        },
        {
            Id: 3,
            Name: 'Balaji M',
            Title: 'CEO',
        },

     ];

}