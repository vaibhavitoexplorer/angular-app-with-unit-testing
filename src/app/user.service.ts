import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from "rxjs/operators";
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl: string = "https://reqres.in/api/users";

  constructor(private http: HttpClient) { }

  addUser(user): Observable<any> {
    return this.http.post(this.apiUrl, user);
  }

  getUsers(pageCount): Observable<any> {
    return this.http.get(this.apiUrl + "?page=" + pageCount);
  }
}
