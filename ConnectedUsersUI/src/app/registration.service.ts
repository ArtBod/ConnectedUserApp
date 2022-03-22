import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { User } from './user';
import{tap} from 'rxjs/operators'
@Injectable({
  providedIn: 'root'
})
export class RegistrationService {

  constructor(private _http :HttpClient) { }

  private _refreshNeeded$= new Subject<void>();
  
  get refreshNeeded$(){
    return this._refreshNeeded$;
  }

  public loginUserFromRemote(user:User):Observable<any>{
    return this._http.post<any>("http://localhost:8080/login",user).pipe(
    tap(() =>{
      this._refreshNeeded$.next();
    })
    );
  }

  public singUp(user:User):Observable<any>{
    return this._http.post<any>("http://localhost:8080/signup",user)
  }

  public logoutUserFromRemote(user:User):Observable<any>{
    return this._http.post<any>("http://localhost:8080/logout",user)
  }
}
