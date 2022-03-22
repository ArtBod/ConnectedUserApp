import { HttpClient } from '@angular/common/http';
import { Component, OnInit ,Input, ViewChild, ElementRef} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { map, Observable } from 'rxjs';
import { RegistrationService } from 'src/app/registration.service';
import { User } from 'src/app/user';
import { LoginComponent } from '../login/login.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  
  msg ='';
  loginUser!: User;

  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
  users : User[] = [];
  dataSource=this.users;
  constructor(public activatedRoute: ActivatedRoute,private http:HttpClient,private router:Router,private _service: RegistrationService) {
  }

  ngOnInit(): void {
    this.loginUser = JSON.parse(localStorage.getItem('user') || '{}');
    console.log(this.loginUser);
    alert("Hi "+ this.loginUser.email + " Welcome to the App!")
    this.getAllUsers();
  }


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
}
