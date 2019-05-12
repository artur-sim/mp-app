import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserAuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-singup',
  templateUrl: './singup.component.html',
  styleUrls: ['./singup.component.css']
})
export class SingupComponent implements OnInit {
  errorText = '';
  signupForm: FormGroup;
  constructor(private userAuthService: UserAuthService, private router: Router) {


  }

  ngOnInit() {

    this.signupForm = new FormGroup({
      'email': new FormControl(null, [Validators.required, Validators.email]),
      'password': new FormControl(null, [Validators.required, Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d.*)(?=.*\W.*)[a-zA-Z0-9\S]{3,15}$/)
      ]),

    })
  }

  onSignUp() {
    let user = {
      'email': this.signupForm.value.email,
      'password': this.signupForm.value.password
    }
    this.userAuthService.signup(user).subscribe((data) => {
      console.log(data)
      localStorage.setItem('token', data.token);
      this.router.navigate(['/data'])
    }, (error) => {

      console.log(error['error']['text'])
      this.errorText = error['error']['text'];
    })
  }
}
