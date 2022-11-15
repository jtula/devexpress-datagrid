import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { IContact } from '../models/IContact';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  }),
};

@Injectable({
  providedIn: 'root'
})
export class ContactService {

  constructor(private http:HttpClient) { }

  getContacts(): Observable<IContact[]> {
    return this.http.get<IContact[]>(environment.apiUrl)
  }

  searchContact(query: string[]): Observable<IContact[]> {
    const url = `${environment.apiUrl}?search=${query}`
    return this.http.get<IContact[]>(url)
  }

  addContact(contact: IContact): Observable<IContact> {
    return this.http.post<IContact>(environment.apiUrl, contact, httpOptions);
  }

  editContact(contact: IContact): Observable<IContact> {
    const url = `${environment.apiUrl}/${contact._id}`
    return this.http.put<IContact>(url, contact, httpOptions);
  }

  deleteContact(contactId: string): Observable<IContact> {
    const url = `${environment.apiUrl}/${contactId}`
    return this.http.delete<IContact>(url)
  }
}
