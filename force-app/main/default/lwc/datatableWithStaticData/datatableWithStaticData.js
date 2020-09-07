import { LightningElement } from 'lwc';
const columns = [
    {label: 'Opportunity name', fieldName: 'opportunityName', type: 'text'},
    {label: 'Confidence', fieldName: 'confidence', type: 'percent', cellAttributes:
    { iconName: { fieldName: 'trendIcon' }, iconPosition: 'right' }},
    {label: 'Amount', fieldName: 'amount', type: 'currency', typeAttributes: { currencyCode: 'EUR'}},
    {label: 'Contact Email', fieldName: 'contact', type: 'email'},
    {label: 'Contact Phone', fieldName: 'phone', type: 'phone'},
];
const data = [
    {
        id: 'a',
        opportunityName: 'Cloudhub',
        confidence: 0.2,
        amount: 25000,
        contact: 'jrogers@cloudhub.com',
        phone: '2352235235',
        trendIcon: 'utility:down'
    },
    {
        id: 'b',
        opportunityName: 'Quip',
        confidence: 0.78,
        amount: 740000,
        contact: 'quipy@quip.com',
        phone: '2352235235',
        trendIcon: 'utility:up'
    }

];

export default class DatatableWithStaticData extends LightningElement {
    tablecolumns=columns;
    tabledata=data;
}