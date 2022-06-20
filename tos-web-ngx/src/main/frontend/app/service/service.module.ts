import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TestService } from './test.service';
import {UserService} from "./user.service";
import {TeaService} from "./tea.service";
import {OrderService} from "./order.service";

@NgModule({
    imports: [ 
      CommonModule,
    ],
    providers:
    [
        TestService,
        UserService,
        TeaService,
        OrderService
    ],
})
export class ServiceModule {
}
