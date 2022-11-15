import { Component, OnInit } from '@angular/core';
import { ContactService } from 'src/app/shared/services/contact.service';
import { IContact } from 'src/app/shared/models/IContact';
import ContactStore from 'devextreme/data/custom_store';
import { first, last, lastValueFrom, tap } from 'rxjs';

@Component({
  selector: 'app-contacs',
  templateUrl: './contacs.component.html',
  styleUrls: ['./contacs.component.scss']
})
export class ContacsComponent implements OnInit {
  contacts: IContact [] = [];
  expanded: boolean = true;
  contactDataSource: ContactStore;

  constructor(private contactService: ContactService) { 

    this.contactDataSource = new ContactStore({
      key: '_id',
      load: async () => {
        const contacts = await lastValueFrom(this.contactService.getContacts());        
        return {data: contacts, totalCount: contacts.length};
      },
      insert: async (values) => {
        try {
          return await lastValueFrom(this.contactService.addContact(values));          
        } catch (error) {
          throw 'Insert failed'
        }
      },
      update: async (key, values) => {
        try {
          const updatedContact = {
            _id: key,
            ...values
          }
          await lastValueFrom(this.contactService.editContact(updatedContact));          
        } catch (error) {
          throw 'Update failed'
        }
      },
      remove: async (key) => {
        try {
          await lastValueFrom(this.contactService.deleteContact(key));
        } catch (error) {
          throw 'Deletion failed'
        }
      }
    })

  }

  ngOnInit(): void {
  }
}

