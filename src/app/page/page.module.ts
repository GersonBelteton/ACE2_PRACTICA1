import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PageComponent } from './page.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PAGES_ROUTES } from './page.routes';
import { SharedModule } from '../shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ChartsModule } from 'ng2-charts';
import { TemperaturaComponent } from './temperatura/temperatura.component';
import { FrecuenciaComponent } from './frecuencia/frecuencia.component';
import { OxigenoComponent } from './oxigeno/oxigeno.component';
import { PerfilComponent } from './perfil/perfil.component';
import { AtletascoachComponent } from './atletascoach/atletascoach.component';
@NgModule({
  declarations: [
    PageComponent,
    DashboardComponent,
    TemperaturaComponent,
    FrecuenciaComponent,
    OxigenoComponent,
    PerfilComponent,
    AtletascoachComponent
  ],
  exports: [
    DashboardComponent,
    PerfilComponent,
  ],
  imports: [
    CommonModule,
    PAGES_ROUTES,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    ChartsModule
  ]
})
export class PageModule { }
