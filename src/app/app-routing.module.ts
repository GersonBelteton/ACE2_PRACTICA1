import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { PageComponent } from './page/page.component';
import { RegisterComponent } from './register/register.component';
import { NoPageFoundComponent } from './shared/no-page-found/no-page-found.component';
import {PerfilComponent} from './page/perfil/perfil.component'
import {HomeGuard} from './auth/home.guard'
import {AuthGuard} from './auth/auth.guard'
const routes: Routes = [
  { path: 'login',
    
    component: LoginComponent,  
    canActivate: [HomeGuard],
  
  },
  { path: 'register',
    component: RegisterComponent,  
    canActivate: [HomeGuard],
  },
  {
    path: '',
    component: PageComponent,
    canActivate: [AuthGuard],
    loadChildren: './page/page.module#PageModule'
    
  },
  { 
    path: '**', 
    component: NoPageFoundComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
