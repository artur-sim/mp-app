import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { UserAuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {


  userNotFound = false;
  passwordWrong = false;
  errorText: any;
  loginForm: FormGroup;

  constructor(private userAuthService: UserAuthService, private router: Router) {

  }

  ngOnInit() {
    this.loginForm = new FormGroup({
      'email': new FormControl(null, [Validators.required, Validators.email]),
      'password': new FormControl(null, [Validators.required]),

    })



  }

  onLogin() {
    let user = {
      'email': this.loginForm.value.email,
      'password': this.loginForm.value.password
    }
    this.userAuthService.login(user).subscribe((data) => {
      console.log(data)
      localStorage.setItem('token', data.token);
      this.router.navigate(['/data'])
    }, (error: HttpErrorResponse) => {
      console.log(error['error'])
      if (error['error'] === "user not found") {
        this.errorText = error['error'];
      } else if (error['error'] === "invalid password") {
        this.errorText = error['error'];
      } else {
        this.errorText = error['error'];
      }

    }
    )
  }

  onSingup() {
    this.router.navigate(['/signup'])
  }

}
