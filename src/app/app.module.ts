import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { NotfoundComponent } from './notfound/notfound.component';
import { routes } from './app.routes';

import { HttpClientModule } from '@angular/common/http';
import { AdminClient, AuthorizationClient } from './api/ApiClient';
import { CommonModule } from '@angular/common';
import { SharingService } from './services/sharing.service';
import { RoomListComponent } from './room-list/room-list.component';
import { RoomsService } from './services/rooms.service';
import { RoomComponent } from './room/room.component';
import { AddRoomComponent } from './add-room/add-room.component';
import { EditRoomComponent } from './edit-room/edit-room.component';
import { BookingRoomComponent } from './booking-room/booking-room.component';
import { BookingListComponent } from './booking-list/booking-list.component';
import { BookingDetailsComponent } from './booking-details/booking-details.component';
import { PaymentListComponent } from './payment-list/payment-list.component';
import { PaymentDetailsComponent } from './payment-details/payment-details.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RoomListComponent,
    RoomComponent,
    AddRoomComponent,
    EditRoomComponent,
    BookingRoomComponent,
    BookingListComponent,
    BookingDetailsComponent,
    PaymentListComponent,
    PaymentDetailsComponent,
    NotfoundComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  providers: [
    AuthorizationClient,
    AdminClient,
    SharingService,

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
