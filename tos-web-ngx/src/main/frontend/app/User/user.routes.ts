import { Routes } from '@angular/router';

import { TemplateDefaultHeaderComponent, TemplateDefaultFooterComponent, TemplateDefaultComponent } from '../template/default/template-default.component';
import {UserLoginComponent} from "./user-login.component";
import {UserRegisterComponent} from "./user-register.component";
import {userProfileComponent} from "./user-profile.component";
import {AllUserComponent} from "./all-user.component";

export const routes:Routes = [
  {
    path: 'login',
    component: TemplateDefaultComponent,
    children: [
      { path: '', component: UserLoginComponent, outlet: 'content' },
      { path: '', component: TemplateDefaultHeaderComponent, outlet: 'header' },
      { path: '', component: TemplateDefaultFooterComponent, outlet: 'footer' }
    ]
  },
  {
    path: 'register',
    component: TemplateDefaultComponent,
    children: [
      {path: '', component: UserRegisterComponent, outlet: 'content'},
      {path: '', component: TemplateDefaultHeaderComponent, outlet: 'header'},
      {path: '', component: TemplateDefaultFooterComponent, outlet: 'footer'}
    ]
  },
  {
    path: 'profile',
    component: TemplateDefaultComponent,
    children: [
      {path: '', component: AllUserComponent, outlet: 'content'},
      {path: '', component: TemplateDefaultHeaderComponent, outlet: 'header'},
      {path: '', component: TemplateDefaultFooterComponent, outlet: 'footer'}
    ]
  },
  {
    path: 'profile/:userID',
    component: TemplateDefaultComponent,
    children: [
      {path: '', component: userProfileComponent, outlet: 'content'},
      {path: '', component: TemplateDefaultHeaderComponent, outlet: 'header'},
      {path: '', component: TemplateDefaultFooterComponent, outlet: 'footer'}
    ]
  }
];