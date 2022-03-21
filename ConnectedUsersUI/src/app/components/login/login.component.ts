import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RegistrationService } from 'src/app/registration.service';
import { User } from 'src/app/user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  user = new User();
  msg = '';

  loginForm=new FormGroup({
    email:new FormControl('',[Validators.required,Validators.email]),
    password: new FormControl('',Validators.required)
  });
  constructor(private _service: RegistrationService,private _router : Router){}
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
      data =>{
        console.log("response recieved");
        this._router.navigate(['/home'])
        
      },
      error => {console.log("exception occured")
      this.msg="Bad credentials,please enter valid email and password";
    }
    );
  }

}
