import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AlmacenComponent } from './components/inventarios/almacen/almacen.component';
import { ComprasComponent } from './components/inventarios/compras/compras.component';
import { ProveedoresComponent } from './components/inventarios/proveedores/proveedores.component';
import { VentasComponent } from './components/inventarios/ventas/ventas.component';
import { ClientesComponent } from './pages/clientes/clientes.component';
import { CotizacionComponent } from './pages/cotizacion/cotizacion.component';
import { EmpleadosComponent } from './pages/empleados/empleados.component';
import { HomeComponent } from './pages/home/home.component';
import { IndexHomeComponent } from './pages/index-home/index-home.component';
import { InventariosComponent } from './pages/inventarios/inventarios.component';
import { LoginComponent } from './pages/login/login.component';
import { canActivate, redirectUnauthorizedTo} from '@angular/fire/auth-guard'
const routes: Routes = [
  {path:'', redirectTo:'Login', pathMatch:'full'},
  {path:'cotizacion', component:CotizacionComponent, ...canActivate(()=> redirectUnauthorizedTo(['/Login']))},
  {path:'home', component:HomeComponent, ...canActivate(()=> redirectUnauthorizedTo(['/Login']))},
  {path:'Login', component:LoginComponent},
  {path:'Index', component:IndexHomeComponent, ...canActivate(()=> redirectUnauthorizedTo(['/Login']))},
  {path:'empleados', component:EmpleadosComponent, ...canActivate(()=> redirectUnauthorizedTo(['/Login']))},
  {path:'cliente', component:ClientesComponent, ...canActivate(()=> redirectUnauthorizedTo(['/Login']))},
  {
    path:'Invetarios', component:InventariosComponent,  ...canActivate(()=> redirectUnauthorizedTo(['/Login'])),
    children:[
      {path:'proveedores', component:ProveedoresComponent, ...canActivate(()=> redirectUnauthorizedTo(['/Login']))},
      {path:'Compras', component:ComprasComponent, ...canActivate(()=> redirectUnauthorizedTo(['/Login']))},
      {path:'ventas', component:VentasComponent, ...canActivate(()=> redirectUnauthorizedTo(['/Login']))},
      {path:'Almacen', component:AlmacenComponent, ...canActivate(()=> redirectUnauthorizedTo(['/Login']))}
    ]

  },

  

  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
