import { NgModule } from '@angular/core';
import {CommonModule, DatePipe} from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { TemplateModule } from '../template/template.module';

import * as resolve from './tea.resolve';
import { routes } from './tea.routes';
import {AllTeaComponent} from "./all-tea.component";
import {TeaSessionComponent} from "./tea-session.component";

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
        AllTeaComponent,
        TeaSessionComponent
    ]
})
export class TeaModule {
    public static routes = routes;
}
