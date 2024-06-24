import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, provideHttpClient, withFetch } from '@angular/common/http'; // Importa HttpClientModule y los proveedores necesarios

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { NavperfilComponent } from './components/navperfil/navperfil.component';
import { ResidentesComponent } from './components/residentes/residentes.component';
import { DepartamentoComponent } from './components/departamento/departamento.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavbarComponent,
    NavperfilComponent,
    ResidentesComponent,
    DepartamentoComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'my-app' }),
    HttpClientModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [
    provideHttpClient(withFetch()), // Utiliza withFetch() para habilitar fetch en HttpClient
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
