import { Injectable } from '@angular/core'
import { Http, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { OrderModel } from '../model/order.model';
import {TeaModel} from "../model/tea.model";

@Injectable()
export class OrderService
{
  static readonly URL = 'http://localhost:50001/tos-rest';
  
  constructor( private http:Http) {}

  addOrder(itemName:string, itemQty:number, orderCreator:number, orderTeaID:number, orderCutoffDate:string):Observable<OrderModel>
  {
    const headers = new Headers();

    headers.append('Content-Type', 'application/x-www-form-urlencoded');

    const params = new URLSearchParams();
    params.append('itemName', <string><any>itemName);
    params.append('itemQty', <string><any>itemQty);
    params.append('orderCreator', <string><any>orderCreator);
    params.append('orderTeaID', <string><any>orderTeaID);
    params.append('orderCutoffDate', <string><any>orderCutoffDate);
    return this.http.post(`${OrderService.URL}/rest/order/add-order`,params.toString(), { headers: headers }).map(res => res.json());
  }

  adminDeleteOrderById(orderID:number):Observable<OrderModel>
  {
    const headers = new Headers();

    headers.append('Content-Type', 'application/x-www-form-urlencoded');

    const params = new URLSearchParams();
    params.append('orderID', <string><any>orderID);
    return this.http.post(`${OrderService.URL}/rest/order/delete-order-by-id`,params.toString(), { headers: headers }).map(res => res.json());
  }

  adminUpdateOrderById(orderID:number, itemName:string, itemQty:number, orderCreator:number, orderTeaID:number, orderCutoffDate:string):Observable<OrderModel>
  {
    const headers = new Headers();

    headers.append('Content-Type', 'application/x-www-form-urlencoded');

    const params = new URLSearchParams();
    params.append('orderID', <string><any>orderID);
    params.append('itemName', <string><any>itemName);
    params.append('itemQty', <string><any>itemQty);
    params.append('orderCreator', <string><any>orderCreator);
    params.append('orderTeaID', <string><any>orderTeaID);
    params.append('orderCutoffDate', <string><any>orderCutoffDate);
    return this.http.post(`${OrderService.URL}/rest/order/admin-update-order-by-id`,params.toString(), { headers: headers }).map(res => res.json());
  }

  getAllOrderById(orderID:number):Observable<OrderModel>
  {
    const headers = new Headers();

    headers.append('Content-Type', 'application/x-www-form-urlencoded');

    const params = new URLSearchParams();
    params.append('orderID', <string><any>orderID);
    return this.http.post(`${OrderService.URL}/rest/order/admin-get-order-by-id`,params.toString(), { headers: headers }).map(res => res.json());
  }

  getAllOrderByTeaId(teaID:number):Observable<OrderModel>
  {
    const headers = new Headers();

    headers.append('Content-Type', 'application/x-www-form-urlencoded');

    const params = new URLSearchParams();
    params.append('teaID', <string><any>teaID);
    return this.http.post(`${OrderService.URL}/rest/order/admin-get-order-by-tea-id`,params.toString(), { headers: headers }).map(res => res.json());
  }

  checkDupeOrder(itemName:string, username: string):Observable<OrderModel>
  {
    const headers = new Headers();

    headers.append('Content-Type', 'application/x-www-form-urlencoded');

    const params = new URLSearchParams();
    params.append('itemName', itemName);
    params.append('username', username);

    return this.http.post(`${OrderService.URL}/rest/order/check-dupe-order`,params.toString(), { headers: headers }).map(res => res.json());

  }

  generateOrder(teaID:number):Observable<OrderModel>
  {
    const headers = new Headers();

    headers.append('Content-Type', 'application/x-www-form-urlencoded');

    const params = new URLSearchParams();
    params.append('teaID', <string><any>teaID);

    return this.http.post(`${OrderService.URL}/rest/order/generate-order`,params.toString(), { headers: headers }).map(res => res.json());

  }
}
