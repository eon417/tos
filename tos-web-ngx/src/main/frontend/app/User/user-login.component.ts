import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../service/user.service';
import { UserModel } from '../model/user.model';
import {DatePipe} from "@angular/common";
@Component(
    {
        templateUrl: './user-login.component.htm'
    })
export class UserLoginComponent implements OnInit
{
    users:UserModel[] = []
    private errorStatus:boolean
    private errorMsg:string
    private data:object
    private dateNow:Date

    private userData:object

    form =
        {
            data:
                {
                    username: <string> null,
                    userPwd: <string> null,
                }
        };
    private datePipe: DatePipe;

    constructor(private route: ActivatedRoute, private router: Router, private userService:UserService, private datepipe:DatePipe)
    {
    }

    ngOnInit()
    {
        if(sessionStorage.length > 0)
            this.router.navigate(['/tea'], {relativeTo: this.route})

        this.userService.findAllUser().subscribe(data=>{
            if(!data[status])
                this.userService.addUser("admin", "qwe123", true, "2000/01/01", true).subscribe()
        });
    }


    onSubmit() {
        this.userService.loginUser(this.form.data.username, this.form.data.userPwd).subscribe(res =>
            {
                this.errorStatus = res["status"]
                this.errorMsg = res["statusMsg"]
                this.data = res['data']
                if(this.errorStatus) {
                    if(res['data'][0]['userEnabled']){
                        this.dateNow = new Date()
                        this.userService.adminUpdateUserById(this.data[0]['userID'],this.data[0]['username'],this.data[0]['userPwd'],true,this.datepipe.transform(this.dateNow,"yyyy/MM/dd"),this.data[0]['userIsAdmin'],1).subscribe()
                        this.userData = res['data'][0]

                        sessionStorage.setItem('user',JSON.stringify(this.userData))
                        sessionStorage.setItem('logged',"true")
                        this.router.navigate(['/tea'], {relativeTo: this.route});
                    } else {
                        this.errorStatus = false
                        this.errorMsg = "Your account has been disabled."
                    }
                }
            }
        )
        setTimeout(()=>{
            this.errorStatus = true;
        }, 3000);
    }

}
