import { RouterModule, Routes } from "@angular/router";
import { DashboardComponent } from "./dashboard/dashboard.component";
import {TemperaturaComponent} from './temperatura/temperatura.component'
import {FrecuenciaComponent} from './frecuencia/frecuencia.component'
import {OxigenoComponent} from './oxigeno/oxigeno.component'
import {PerfilComponent} from './perfil/perfil.component'
import {AtletascoachComponent} from './atletascoach/atletascoach.component'
const pagesRoutes: Routes = [
    {
        path: 'dashboard',
        component: DashboardComponent,
        data: { titulo: 'Dashboard' }
    },
    {
        path: '',
        component: PerfilComponent,

        
      },
    {
        path:'dashboard/temperatura',
        component: TemperaturaComponent
    },
    {
        path:'dashboard/frecuencia',
        component: FrecuenciaComponent
    },
    {
        path:'dashboard/oxigeno',
        component: OxigenoComponent
    },
    {
        path:'perfil',
        component: PerfilComponent
    },
    {
        path: 'atletascoach',
        component: AtletascoachComponent
    }
];


export const PAGES_ROUTES = RouterModule.forChild( pagesRoutes );