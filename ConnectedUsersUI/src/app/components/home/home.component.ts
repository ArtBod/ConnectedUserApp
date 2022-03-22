import { HttpClient } from '@angular/common/http';
import { Component, OnInit ,Input, ViewChild, ElementRef} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { interval, Subscription } from 'rxjs';
import { RegistrationService } from 'src/app/registration.service';
import { User } from 'src/app/user';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  
  msg ='';
  loginUser!: User;
  users : User[] = [];
  displayedColumns: string[] = ['email', 'loginTime', 'lastLoginDate', 'ip','getdetais'];
  private updateSubscription!: Subscription;

  constructor(public activatedRoute: ActivatedRoute,private http:HttpClient,private router:Router,private _service: RegistrationService) {
  }

  ngOnInit(): void {

    this.loginUser = JSON.parse(localStorage.getItem('user') || '{}');
    console.log(this.loginUser);

    Swal.fire({
      icon: 'success',
      title: 'Welcome',
      text: 'Hi ' + this.loginUser.email + ' Welcome to the App!'
    })

    this.getAllUsers();
    this.updateSubscription = interval(1000).subscribe(
      (val) => {this.getAllUsers()
    });
    
  }
 
  /* Get all get from the server */
  public getAllUsers(){
    let url = "http://localhost:8080/users";
    this.http.get<User[]>(url).subscribe(
        res =>{
          this.users = res;
        },
        err =>{
          alert("An error has occured")
        }
    );
  }
  /* Logut action with post data to the server*/
  logoutUser() {
    this._service.logoutUserFromRemote(this.loginUser).subscribe(
      data =>{
        this.router.navigate(['/login'])
      },
      error => {console.log("exception occured")
      this.msg="Email was already exsist";
    }
    );
  }
 /* Function to show the user data from the table*/
  getRecord(user:User){
    Swal.fire(   
    "Username: " + user.email+ "\n"+
    "Register time: "+user.registrationDate+"\n"+
    "Login Count: " +user.loginCount+"\n"
    )
  }
}
