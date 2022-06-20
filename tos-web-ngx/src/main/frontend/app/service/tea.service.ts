import { Injectable } from '@angular/core'
import { Http, Headers} from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { TeaModel } from '../model/tea.model';

@Injectable()
export class TeaService
{
    static readonly URL = 'http://localhost:50001/tos-rest';
    constructor( private http:Http) {}

    findTeaSession(teaVisible:boolean, ownerID:number):Observable<TeaModel>
    {
        const headers = new Headers();

        headers.append('Content-Type', 'application/x-www-form-urlencoded');

        const params = new URLSearchParams();
        params.append('teaVisible', <string><any>teaVisible);
        params.append('ownerID', <string><any>ownerID);
        return this.http.post(`${TeaService.URL}/rest/tea/find-tea`,params.toString(), { headers: headers }).map(res => res.json());
    }

    findAllTeaSession():Observable<TeaModel>
    {
        return this.http.post(`${TeaService.URL}/rest/tea/find-all-tea`,'').map(res => res.json());
    }

    getAllTeaSessionById(teaID:number):Observable<TeaModel>
    {
        const headers = new Headers();

        headers.append('Content-Type', 'application/x-www-form-urlencoded');

        const params = new URLSearchParams();
        params.append('teaID', <string><any>teaID);
        return this.http.post(`${TeaService.URL}/rest/tea/admin-get-tea-by-id`,params.toString(), { headers: headers }).map(res => res.json());
    }

    getTeaSessionById(teaID:number, teaVisible: boolean):Observable<TeaModel>
    {
        const headers = new Headers();

        headers.append('Content-Type', 'application/x-www-form-urlencoded');

        const params = new URLSearchParams();
        params.append('teaID', <string><any>teaID);
        params.append('teaVisible', <string><any>teaVisible);

        return this.http.post(`${TeaService.URL}/rest/tea/user-get-tea-by-id`,params.toString(), { headers: headers }).map(res => res.json());
    }

    getAllTeaSessionByName(teaName:string):Observable<TeaModel>
    {
        const headers = new Headers();

        headers.append('Content-Type', 'application/x-www-form-urlencoded');

        const params = new URLSearchParams();
        params.append('teaName', teaName);
        return this.http.post(`${TeaService.URL}/rest/tea/admin-get-tea-by-name`,params.toString(), { headers: headers }).map(res => res.json());
    }

    getTeaSessionByName(teaName:string, teaVisible: boolean):Observable<TeaModel>
    {
        const headers = new Headers();

        headers.append('Content-Type', 'application/x-www-form-urlencoded');

        const params = new URLSearchParams();
        params.append('teaName', teaName);
        params.append('teaVisible', <string><any>teaVisible);

        return this.http.post(`${TeaService.URL}/rest/tea/user-get-tea-by-name`,params.toString(), { headers: headers }).map(res => res.json());
    }

    getTeaSessionByLink(teaLink:string):Observable<TeaModel>
    {
        const headers = new Headers();

        headers.append('Content-Type', 'application/x-www-form-urlencoded');

        const params = new URLSearchParams();
        params.append('teaLink', teaLink);

        return this.http.post(`${TeaService.URL}/rest/tea/get-tea-by-link`,params.toString(), { headers: headers }).map(res => res.json());
    }

    adminUpdateTeaSessionById(teaID:number, teaName:string, teaDesc:string, teaCreator:string, teaPwd:string, teaTreatDate:string, teaCutOffDate:string, teaVisible:boolean, teaMenu:string, teaLink:string):Observable<TeaModel>
    {
        const headers = new Headers();

        headers.append('Content-Type', 'application/x-www-form-urlencoded');

        const params = new URLSearchParams();
        params.append('teaID', <string><any>teaID);
        params.append('teaName', teaName);
        params.append('teaDesc', teaDesc);
        params.append('teaCreator', teaCreator);
        params.append('teaPwd', teaPwd);
        params.append('teaTreatDate', teaTreatDate);
        params.append('teaCutOffDate', teaCutOffDate);
        params.append('teaVisible', <string><any>teaVisible);
        params.append('teaMenu', teaMenu);
        params.append('teaLink', teaLink);

        return this.http.post(`${TeaService.URL}/rest/tea/admin-update-tea-by-id`,params.toString(), { headers: headers }).map(res => res.json());
    }

    adminDeleteTeaSessionById(teaID:number):Observable<TeaModel>
    {
        const headers = new Headers();

        headers.append('Content-Type', 'application/x-www-form-urlencoded');

        const params = new URLSearchParams();
        params.append('teaID', <string><any>teaID);

        return this.http.post(`${TeaService.URL}/rest/tea/admin-delete-tea-by-id`,params.toString(), { headers: headers }).map(res => res.json());

    }

    ownerDeleteTeaSessionById(teaID:number, ownerPwd: string):Observable<TeaModel>
    {
        const headers = new Headers();

        headers.append('Content-Type', 'application/x-www-form-urlencoded');

        const params = new URLSearchParams();
        params.append('teaID', <string><any>teaID);
        params.append('ownerPwd', ownerPwd);

        return this.http.post(`${TeaService.URL}/rest/tea/owner-delete-tea-by-id`,params.toString(), { headers: headers }).map(res => res.json());

    }

    addTea(teaName:string, teaDesc:string, teaCreator:number, teaPwd:string, teaTreatDate:string, teaCutOffDate:string, teaVisible:boolean, teaMenu:string, teaLink:string):Observable<TeaModel> {
        const headers = new Headers();

        headers.append('Content-Type', 'application/x-www-form-urlencoded');

        const params = new URLSearchParams();
        params.append('teaName', teaName);
        params.append('teaDesc', teaDesc);
        params.append('teaCreator', <string><any>teaCreator);
        params.append('teaPwd', teaPwd);
        params.append('teaTreatDate', teaTreatDate);
        params.append('teaCutOffDate', teaCutOffDate);
        params.append('teaVisible', <string><any>teaVisible);
        params.append('teaMenu', <string><any>teaMenu);
        params.append('teaLink', teaLink);

        return this.http.post(`${TeaService.URL}/rest/tea/add-tea`, params.toString(), {headers: headers}).map(res => res.json());
    }
}
