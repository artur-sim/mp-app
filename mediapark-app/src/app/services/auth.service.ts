import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Injectable()

export class UserAuthService {

    loginUrl: string = "http://localhost:3000/login";
    signupUrl: string = "http://localhost:3000/signup";
    constructor(private httpClient: HttpClient, private router: Router) { }

    login(user): Observable<{ token: string }> {
        return this.httpClient.post<any>(this.loginUrl, user)
    }

    signup(user): Observable<{ token: string }> {
        return this.httpClient.post<any>(this.signupUrl, user)
    }

    loggedIn() {
        if (localStorage.getItem('token')) {
            return true;
        } else {
            return false;
        }
    }
    getToken() {
        return localStorage.getItem('token')
    }

    LogOut() {
        localStorage.removeItem('token');
        this.router.navigate(['/login'])
    }
}