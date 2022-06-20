import {Component, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';


@Component(
{
    templateUrl: './template-default.component.htm'
})
export class TemplateDefaultComponent 
{
  
}

@Component(
{
    templateUrl: './template-default-header.component.htm'
})
export class TemplateDefaultHeaderComponent implements OnInit
{
    readonly dashboard:any;
    logged:boolean
    private userData:object = JSON.parse(sessionStorage.getItem("user"))

    constructor(private route: ActivatedRoute, private router: Router)
    {
    }

    ngOnInit(): void {
      if(sessionStorage.getItem("logged") == "true")
          this.logged = true
        else this.logged = false
    }

    logout(){
        sessionStorage.clear()
    }

    navigateProfile() {
        this.router.navigate(['/user/profile',this.userData['userID']], {relativeTo: this.route});
    }
}

@Component(
{
    templateUrl: 'template-default-footer.component.htm'
})
export class TemplateDefaultFooterComponent 
{
        
}