import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { User } from './user';

@Injectable({
  providedIn: 'root'
})
export class RegistrationService {

  constructor(private _http :HttpClient) { }


  public loginUserFromRemote(user:User):Observable<any>{
    return this._http.post<any>("http://localhost:8080/login",user)
  }

  public singUp(user:User):Observable<any>{
    return this._http.post<any>("http://localhost:8080/signup",user)
  }

  public logoutUserFromRemote(user:User):Observable<any>{
    return this._http.post<any>("http://localhost:8080/logout",user)
  }
}
