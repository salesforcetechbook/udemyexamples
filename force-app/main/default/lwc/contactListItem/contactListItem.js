import { LightningElement,api } from 'lwc';

export default class ContactListItem extends LightningElement {
    @api contactRec;
    selectHandler(event) {
        event.preventDefault();
         // Creates the event with the contact ID data.
         const selectedEvent = new CustomEvent('selected', { detail: this.contactRec.Id });

         // Dispatches the event.
         this.dispatchEvent(selectedEvent);
    }
}