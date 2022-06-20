import { Component, OnInit} from '@angular/core';
import {ActivatedRoute, Params, Router} from '@angular/router';
import { UserService } from '../service/user.service';

import { UserModel } from '../model/user.model';
import DateTimeFormat = Intl.DateTimeFormat;
import {DatePipe} from "@angular/common";

@Component(
    {
        templateUrl: './user-profile.component.htm'
    })
export class userProfileComponent implements OnInit
{
    errorStatus:boolean
    errorMsg:string
    private data:object = new Object()
    private userData:object = new Object()
    userID:number
    isAdmin:boolean
    editing:boolean = false
    checkOwner:boolean = true
    popup:boolean = false

    form =
    {
        data:
            {
                username: <string> null,
                userPwd: <string> null,
                userLastLogin: <Date> null,
                userEnabled: <boolean> true,
                userIsAdmin: <boolean> false,
            },
        options:
            {
                users: <UserModel> null
            }
    };
    datePipe: DatePipe = new DatePipe('en-US')

    constructor(private route: ActivatedRoute, private router: Router, private userService:UserService)
    {
    }

    ngOnInit()
    {
        if(sessionStorage.length > 0)
            this.userData = JSON.parse(sessionStorage.user)
        else this.router.navigate(['/user/login'], {relativeTo: this.route})

        this.route.params.subscribe((params: Params) => {
            this.userID = params['userID']
        });
        this.errorStatus = true
        this.errorMsg = ""
        this.getUser()
    }

    getUser(){
        this.userService.getAllUserById(this.userID).subscribe(res=>{
            if(res['status']){
                this.data = res['data']
                this.isAdmin = this.userData['userIsAdmin']
                this.form.data.userEnabled = this.data['userEnabled']
                this.form.data.userIsAdmin = this.data['userIsAdmin']
                if(!this.isAdmin && this.userData['userID'] != this.data['userID']){
                    this.router.navigate(['/user/profile',this.userData['userID']], {relativeTo: this.route})
                }
            }
        })
    }

    triggerModal(event:Event){
        if(event.target == document.getElementById("addModal"))
            this.popup = false
    }

    validateOwner() {
        let ownerPwd = <HTMLInputElement>document.getElementById("ownerPwd")

        if(ownerPwd.value == this.data['userPwd']){
            this.checkOwner = true;
            this.popup = false;
            this.editing = true;
        }
        else {
            this.checkOwner = false;
        }
    }

    onSubmit() {
        this.userService.getAllUserByName(this.form.data.username).subscribe(res=>{
            if(res["status"]) {
                this.errorStatus = false;
                this.errorMsg = "This username is taken, please insert another username."
            }
            else {
                this.userService.adminUpdateUserById(this.userID, this.form.data.username, this.form.data.userPwd, this.form.data.userEnabled, this.datePipe.transform(this.data['userLastLogin'], "yyyy/MM/dd"), this.form.data.userIsAdmin, 1).subscribe(res =>
                    {
                        this.errorStatus = res["status"]
                        this.errorMsg = res["statusMsg"]
                        this.data = res['data']
                        if(this.errorStatus)
                            this.getUser()
                    }
                )
            }
        })
        setTimeout(()=>{
            this.errorStatus = true;
        }, 3000);
    }

    checkIsAdmin() {
        if(this.userData['userIsAdmin']) {
            this.popup = false
            this.checkOwner = true;
            this.editing = true;
        } else {
            this.popup = true
        }
    }

    resetForm() {
        this.form.data.username = ""
        this.form.data.userPwd = ""
        this.form.data.userIsAdmin = this.data['userIsAdmin']
        this.form.data.userEnabled = this.data['userEnabled']
    }

    back() {
        if(this.isAdmin)
            this.router.navigate(['/user/profile'], {relativeTo: this.route})
        else this.router.navigate(['/tea'], {relativeTo: this.route})
    }
}
