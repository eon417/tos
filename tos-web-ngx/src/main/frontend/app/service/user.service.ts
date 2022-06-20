import { Injectable } from '@angular/core'
import { Http, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { UserModel } from '../model/user.model';

@Injectable()
export class UserService
{
  static readonly URL = 'http://localhost:50001/tos-rest';
  constructor( private http:Http) {}

  findAllUser():Observable<UserModel>
  {
    return this.http.post(`${UserService.URL}/rest/user/find-all-user`,'').map(res => res.json());
  }

  getAllUserById(userID:number):Observable<UserModel>
  {
    const headers = new Headers();

    headers.append('Content-Type', 'application/x-www-form-urlencoded');

    const params = new URLSearchParams();
    params.append('userID', <string><any>userID);
    return this.http.post(`${UserService.URL}/rest/user/admin-get-user-by-id`,params.toString(), { headers: headers }).map(res => res.json());
  }

  getAllUserByName(username:string):Observable<UserModel>
  {
    const headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded');

    const params = new URLSearchParams();
    params.append('username', <string><any>username);
    return this.http.post(`${UserService.URL}/rest/user/admin-get-user-by-name`,params.toString(), { headers: headers }).map(res => res.json());
  }

  adminUpdateUserById(userID: number, username: string, userPwd: string, userEnabled: boolean, userLastLogin: string, userIsAdmin: boolean, isAdmin: number):Observable<Map<string, any>>
  {
    const headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded');
    
    const params = new URLSearchParams();
    params.append('userID', <string><any>userID);
    params.append('username', username);
    params.append('userPwd', userPwd);
    params.append('userEnabled', <string><any>userEnabled);
    params.append('userLastLogin', userLastLogin);
    params.append('userIsAdmin', <string><any>userIsAdmin);
    params.append('isAdmin', <string><any>isAdmin);
    return this.http.post(`${UserService.URL}/rest/user/admin-update-user-by-id`,params.toString(), { headers: headers }).map(res => res.json());
  }

  ownerUpdateUserById(userID:number, ownerPwd:string, username:string, userPwd:string):Observable<Map<string,any>>
  {
    const headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded');

    const params = new URLSearchParams();
    params.append('userID', <string><any>userID);
    params.append('ownerPwd', ownerPwd);
    params.append('username', username);
    params.append('userPwd', userPwd);
    return this.http.post(`${UserService.URL}/rest/user/owner-update-user-by-id`,params.toString(), { headers: headers }).map(res => res.json());
  }

  adminDeleteUserById(userID:number):Observable<Map<string,any>>
  {
    const headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded');
    
    const params = new URLSearchParams();
    params.append('userID', <string><any>userID);
    return this.http.post(`${UserService.URL}/rest/user/delete-user-by-id`,params.toString(), { headers: headers }).map(res => res.json());
  
  }

  addUser(username: string, userPwd: string, userEnabled: boolean, userLastLogin: string, userIsAdmin: boolean):Observable<Map<string, any>>
  {
    const headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded');
    
    const params = new URLSearchParams();
    params.append('username', username);
    params.append('userPwd', userPwd);
    params.append('userEnabled', <string><any>userEnabled);
    params.append('userLastLogin', userLastLogin);
    params.append('userIsAdmin', <string><any>userIsAdmin);
    return this.http.post(`${UserService.URL}/rest/user/add-user`,params.toString(), { headers: headers }).map(res => res.json());
  }

  loginUser(username: string, userPwd: string):Observable<Map<string, any>>
  {
    const headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded');

    const params = new URLSearchParams();
    params.append('username', username);
    params.append('userPwd', userPwd);
    return this.http.post(`${UserService.URL}/rest/user/user-login`,params.toString(), { headers: headers }).map(res => res.json());
  }
  
}
