import { Routes } from '@angular/router';

export const routes: Routes = [

  { path: 'home', loadChildren: './home/home.module#HomeModule' },
  { path: 'test', loadChildren: './test/test.module#TestModule' },
  { path: 'user', loadChildren: './user/user.module#UserModule' },
  { path: 'tea', loadChildren: './TeaSession/tea.module#TeaModule' },
    
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: '**', redirectTo: 'home' },
];
