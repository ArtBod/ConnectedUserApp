import { HttpClient } from '@angular/common/http';
import { ThisReceiver } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RegistrationService } from 'src/app/registration.service';
import { User } from 'src/app/user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {

  user = new User();
  msg = '';
  hide = true; 
 
  loginForm=new FormGroup({
    email:new FormControl('',[Validators.required,Validators.email]),
    password: new FormControl('',Validators.required)
  });
  
  constructor(private httpClient:HttpClient,private _service: RegistrationService,private _router : Router){}
  

  
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

    //after we get that the user exsist take ip
    this.httpClient.get('https://jsonip.com/').subscribe(
      (response:any) => {
        this.user.ip =response.ip;
        console.log(this.user.ip + "my ip")
      },
      (error)=>{
        console.log(error)
      }
    )

    //set wait to get response from :'https://jsonip.com/'
    setTimeout(() =>{
      //do what you need here
      this._service.loginUserFromRemote(this.user).subscribe(
        data =>{
          console.log("response recieved");
          this.user=data
          console.log(this.user);
          localStorage.setItem('user', JSON.stringify(this.user));
          this._router.navigate(['/home']);
        },
        error => {console.log("exception occured")
        this.msg="Bad credentials,please enter valid email and password";
      }
      );
  }, 1000);


  }

}
