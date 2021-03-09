import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RegisterComponent, 
         LoginComponent, 
         MessageChatComponent } from '../components';
import { SignupLoginComponent } from '../components/signup-login/signup-login.component';


const routes: Routes = [
  {path:'',component:SignupLoginComponent},
  {path:'*',component:SignupLoginComponent},
  {path:'register',component:RegisterComponent},
  {path:'login',component:LoginComponent},
  { path: 'messages', component: MessageChatComponent },
];

// configures NgModule imports and exports
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
