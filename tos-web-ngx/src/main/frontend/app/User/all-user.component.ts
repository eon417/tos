import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../service/user.service';
import {UserModel} from "../model/user.model";
import {DatePipe} from "@angular/common";
import {setInputValues} from "@angularclass/hmr";

@Component(
    {
        templateUrl: './all-user.component.htm'
    })
export class AllUserComponent implements OnInit
{
    datePipe: DatePipe = new DatePipe('en-US')
    user:UserModel[] = [];

    userExists:boolean = false;
    searchUserExists:boolean = false;

    popupEdit:boolean = false;
    popupRemove:boolean = false;

    headers = ['ID','Username','Is Admin','Is Enabled']
    displayedColumns =
        ['userID',
        'username',
        'userIsAdmin',
        'userEnabled'];

    private errorStatus:boolean
    private errorMsg:string
    private data = new Object()

    private userToUpdate = new Object();
    userAmount:number;
    form =
        {
            data:
                {
                    username: <string> null,
                    userPwd: <string> null,
                    userLastLogin: <number> null,
                    userIsAdmin: <boolean> null,
                    userEnabled: <boolean> null,
                }
        };

    constructor(private route: ActivatedRoute, private router: Router, private UserService:UserService)
    {
    }

    ngOnInit()
    {
        if(sessionStorage.length < 1)
            this.router.navigate(['/user/login'], {relativeTo: this.route})
        this.findUser()
    }

    findUser(){
        this.UserService.findAllUser().subscribe(res=>{
            if(res['status']){
                this.userAmount = res['data'].length
                this.userExists = true;
                this.data = res['data']
            }
        })
    }

    triggerModal(event:Event){
        if(event.target == document.getElementById("removeModal"))
            this.popupRemove = false
        else if(event.target == document.getElementById("editModal"))
            this.popupEdit = false
    }


    viewDetails(userID: number) {
        this.UserService.getAllUserById(userID).subscribe(res=>{
            if(res['status'])
                this.router.navigate(['/user/profile',userID], {relativeTo: this.route});
        })
    }

    searchUser() {
        let searchName = <HTMLInputElement>document.getElementById("searchContent")
        if(searchName.value != ""){
            this.searchByName()
        } else {
            searchName.placeholder = "Please enter a username"
        }
    }
    searchByName(){
        let searchName = <HTMLInputElement>document.getElementById("searchContent")
        this.UserService.getAllUserByName(searchName.value).subscribe(res=>{
            if(res['status']){
                this.searchUserExists = true
                this.data = res['data']
                searchName.value = ""
                searchName.placeholder = "User found"
            }
            else {
                searchName.placeholder = "User not found"
                searchName.value = ""
                this.searchUserExists = false
            }
        });

        this.errorStatus = true
        this.errorMsg = ""
    }

    removeUser() {
        this.UserService.adminUpdateUserById(this.userToUpdate['userID'],null,null,!this.userToUpdate['userEnabled'],this.datePipe.transform(this.userToUpdate['userLastLogin'],"yyyy/MM/dd"),this.userToUpdate['userIsAdmin'],1).subscribe(res=>{
            if(res['status']){
                this.popupRemove = false;
                this.findUser()
            }
        })
    }

    clearInputBox() {
        let searchName = <HTMLInputElement>document.getElementById("searchContent")
        searchName.placeholder = ""
    }
}
