import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AbstractControl } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = 'http://localhost:5000/api/auth/';

  constructor(private http: HttpClient) { }

  login(email:
    string, password: string) {
    return this.http.post(this.apiUrl + 'login', { 'email': email, 'password': password });
  }

  signup(username: string, email:
    string, password: string) {
    return this.http.post(this.apiUrl + 'register', { 'username': username, 'email': email, 'password': password });
  }


}
