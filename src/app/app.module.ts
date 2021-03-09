import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { PickerModule } from '@ctrl/ngx-emoji-mart';

import { AppComponent } from './app.component';
import { MessageChatComponent, 
         RegisterComponent, 
         LoginComponent } from './components';

import { AppRoutingModule } from './app-routing';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { SignupLoginComponent } from './components/signup-login/signup-login.component';
import { AuthenticationInterceptor, ErrorInterceptor } from './helpers';
import { WebsocketService } from './services';

@NgModule({
  declarations: [
    AppComponent,
    MessageChatComponent,
    RegisterComponent,
    LoginComponent,
    SignupLoginComponent
  ],
  imports: [
    BrowserModule,
    FontAwesomeModule,
    PickerModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [
    WebsocketService,
    { provide: HTTP_INTERCEPTORS, 
      useClass: AuthenticationInterceptor , 
      multi: true 
    },
    { provide: HTTP_INTERCEPTORS, 
      useClass: ErrorInterceptor, 
      multi: true 
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
