import { NgModule } from '@angular/core';
import {CommonModule, DatePipe} from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { TemplateModule } from '../template/template.module';

import * as resolve from './user.resolve';
import { routes } from './user.routes';
import {UserLoginComponent} from "./user-login.component";
import {UserRegisterComponent} from "./user-register.component";
import {userProfileComponent} from "./user-profile.component";
import {AllUserComponent} from "./all-user.component";

@NgModule({
  imports: [ 
      CommonModule,
      RouterModule.forChild(routes),
      FormsModule,
      TemplateModule,
  ],
  providers: [
      resolve.ResolveUserByUserId,
      DatePipe
  ],
  declarations: [
      UserLoginComponent,
      UserRegisterComponent,
      userProfileComponent,
      AllUserComponent
  ]
})
export class UserModule {
  public static routes = routes; 
}
