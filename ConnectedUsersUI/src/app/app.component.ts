import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { RegistrationService } from './registration.service';
import { User } from './user';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'login-ui-app';
  user = new User();
  loginForm=new FormGroup({
    email:new FormControl('',[Validators.required,Validators.email]),
    password: new FormControl('',Validators.required)
  });
  constructor(private _service: RegistrationService){}
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

  get email(){
    return this.loginForm.get('email');
  }

  get password(){
    return this.loginForm.get('password');
  }

  loginUser(){
    const { email, password } = this.loginForm.value;
    this.user.email=email;
    this.user.password=password;
    this._service.loginUserFromRemote(this.user).subscribe(
      data =>console.log("response recieved"),
      error =>console.log("exception occured")
    );
  }
}
