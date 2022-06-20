import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import { TeaService } from '../service/tea.service';
import { TeaModel } from '../model/tea.model';


@Injectable()
export class ResolveUserByUserId implements Resolve<TeaModel>
{
    constructor(private teaService: TeaService) {}
    resolve(route: ActivatedRouteSnapshot)
    {
        const userID = route.params['userID'];
        if(userID==null)
        {
            return Observable.of(<TeaModel>null)
        }
        return this.teaService.getAllTeaSessionById(userID);
    }
}


