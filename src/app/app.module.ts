import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { EffectsModule } from '@ngrx/effects';
import { UsersEffects } from '@store/effects/users.effects';
import { StoreModule } from '@ngrx/store';
import { appReducers } from '@store/reducers';
import { ToastrModule } from 'ngx-toastr';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

const effects = [
  UsersEffects,
];

const toastrConfig = {
  timeOut: 4000,
  positionClass: 'toast-top-right',
  progressBar: true,
};

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    NgbModalModule,
    HttpClientModule,
    ToastrModule.forRoot(toastrConfig),
    StoreModule.forRoot(appReducers),
    EffectsModule.forRoot(effects),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
