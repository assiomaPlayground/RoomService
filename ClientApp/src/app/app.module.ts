import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { HomeComponent } from './home/home.component';
import { CounterComponent } from './counter/counter.component';
import { FetchDataComponent } from './fetch-data/fetch-data.component';
import { UserComponent } from './user/user.component';
import { ReservationComponent } from './reservation/reservation.component';
import { BuildingComponent } from './building/building.component';
import { RoomComponent } from './room/room.component';
import { QrmapComponent } from './qrmap/qrmap.component';
import { FavouritesComponent } from './favourites/favourites.component';
import { getBaseUrl } from 'src/main';
import { UserModule } from './user/user.module';
import { RoomModule } from './room/room.module';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { AlertComponent } from './alert/alert.component';
import { HomeModule } from './home/home.module';
import { routing } from './app.routing';
import { NgxQRCodeModule} from 'ngx-qrcode2';
import { ZXingScannerModule } from './scanner/zxing-scanner.module';
import { JwtInterceptor } from './helpers/jwt.interceptor';
import { ErrorInterceptor } from './helpers/error.interceptor';

@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    HomeComponent,
    CounterComponent,
    FetchDataComponent,
    UserComponent,
    ReservationComponent,
    BuildingComponent,
    RoomComponent,
    QrmapComponent,
    FavouritesComponent,
    LoginComponent,
    RegisterComponent,
    AlertComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    UserModule,
    HomeModule,
    RoomModule,
    routing,
    NgxQRCodeModule,
    ZXingScannerModule
  ],
  
providers: [
  {provide:'BASE_URL', useFactory : getBaseUrl},
  { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
  { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },

  // provider used to create fake backend
 
],
  bootstrap: [AppComponent]
})
export class AppModule { }
