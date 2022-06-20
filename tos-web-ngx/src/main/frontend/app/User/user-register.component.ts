import { Component, OnInit} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../service/user.service';

import { UserModel } from '../model/user.model';
import DateTimeFormat = Intl.DateTimeFormat;

@Component(
    {
        templateUrl: './user-register.component.htm'
    })
export class UserRegisterComponent implements OnInit
{
    private errorStatus:boolean
    private errorMsg:string
    private data:object

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

    constructor(private route: ActivatedRoute, private router: Router, private userService:UserService)
    {
    }

    ngOnInit()
    {
        this.userService.findAllUser().subscribe(data=>{
            if(!data[status])
                this.userService.addUser("admin", "qwe123", true, "2000/01/01", true).subscribe()
        });

        if(sessionStorage.length > 0)
            this.router.navigate(['/tea'], {relativeTo: this.route})
        this.errorStatus = true
        this.errorMsg = ""
    }

    onSubmit() {
        this.userService.addUser(this.form.data.username, this.form.data.userPwd, this.form.data.userEnabled, "2000/01/01", this.form.data.userIsAdmin).subscribe(res =>
            {
                this.errorStatus = res["status"]
                this.errorMsg = res["statusMsg"]
                this.data = res['data']
                if(this.errorStatus)
                    this.router.navigate(['/user/login'], {relativeTo: this.route});
            }
        )
        setTimeout(()=>{
            this.errorStatus = true;
        }, 3000);
    }
}
