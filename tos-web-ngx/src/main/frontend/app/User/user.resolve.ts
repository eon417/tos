import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import { UserService } from '../service/user.service';
import { UserModel } from '../model/user.model';


@Injectable()
export class ResolveUserByUserId implements Resolve<UserModel>
{
  constructor(private userService: UserService) {}
  resolve(route: ActivatedRouteSnapshot) 
  {
    const userID = route.params['userID'];
    if(userID==null)
    {
      return Observable.of(<UserModel>null)
    }
    return this.userService.getAllUserById(userID);
  }
}


