import { Routes } from '@angular/router';

import { TemplateDefaultHeaderComponent, TemplateDefaultFooterComponent, TemplateDefaultComponent } from '../template/default/template-default.component';
import {AllTeaComponent} from "./all-tea.component";
import {TeaSessionComponent} from "./tea-session.component";

export const routes:Routes = [
    {
        path: '',
        component: TemplateDefaultComponent,
        children: [
            { path: '', component: AllTeaComponent, outlet: 'content' },
            { path: '', component: TemplateDefaultHeaderComponent, outlet: 'header' },
            { path: '', component: TemplateDefaultFooterComponent, outlet: 'footer' }
        ]
    },
    {
        path: 'teaSession/:teaID',
        component: TemplateDefaultComponent,
        children: [
            { path: '', component: TeaSessionComponent, outlet: 'content' },
            { path: '', component: TemplateDefaultHeaderComponent, outlet: 'header' },
            { path: '', component: TemplateDefaultFooterComponent, outlet: 'footer' }
        ]
    },
    {
        path: 'teaSession/:teaLink',
        component: TemplateDefaultComponent,
        children: [
            { path: '', component: TeaSessionComponent, outlet: 'content' },
            { path: '', component: TemplateDefaultHeaderComponent, outlet: 'header' },
            { path: '', component: TemplateDefaultFooterComponent, outlet: 'footer' }
        ]
    },

];