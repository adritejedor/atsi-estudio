import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { ContactRequest, ContactResponse } from './contact.models';

@Injectable({ providedIn: 'root' })
export class ContactService {
  private readonly http = inject(HttpClient);

  submit(request: ContactRequest): Observable<ContactResponse> {
    return this.http.post<ContactResponse>('/api/contact', request);
  }
}
