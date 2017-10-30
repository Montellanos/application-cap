import { NotificationsComponent } from './content/notifications/notifications.component';
import { CalendarComponent } from './content/calendar/calendar.component';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { AngularFireModule } from 'angularfire2';

import { AngularFireDatabaseModule } from 'angularfire2/database';

import { AngularFireAuthModule } from 'angularfire2/auth';
import { InstallService } from './series/services/install.service';

import { Ng2DeviceDetectorModule } from 'ng2-device-detector';
import { CompatibilityService } from './series/services/compatibility.service';
import { HeaderComponent } from './shell/header/header.component';
import { TextformatPipe } from './series/pipes/textformat.pipe';
import { HomeComponent } from './content/home/home.component';
import { NotfoundComponent } from './content/notfound/notfound.component';

import { LazyLoadImageModule } from 'ng-lazyload-image';
import { HttpModule } from '@angular/http';

import * as firebase from 'firebase';
import { PermissFormatPipe } from './series/pipes/permiss-format.pipe';
import { NotificationsService } from './series/services/notifications.service';
import { CartsComponent } from './content/carts/carts.component';
import { CartsService } from './series/services/carts.service';
import { ProductsComponent } from './content/products/products.component';
import { ProductsService } from './series/services/products.service';

const environment = {
  production: false,
  firebase: {
    apiKey: 'AIzaSyAwh5xWgPTdBxjWvalxGbftTzl3KiJc8WM',
    authDomain: 'application-cap.firebaseapp.com',
    databaseURL: 'https://application-cap.firebaseio.com',
    projectId: 'application-cap',
    storageBucket: 'application-cap.appspot.com',
    messagingSenderId: '983418984510'
  }
};

firebase.initializeApp(environment.firebase);



@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    TextformatPipe,
    CalendarComponent,
    NotificationsComponent,
    HomeComponent,
    NotfoundComponent,
    PermissFormatPipe,
    CartsComponent,
    ProductsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    Ng2DeviceDetectorModule.forRoot(),
    LazyLoadImageModule,
    HttpModule
  ],
  providers: [InstallService, CompatibilityService, NotificationsService, CartsService, ProductsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
