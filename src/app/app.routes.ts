import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { NotfoundComponent } from './notfound/notfound.component';
import { RoomListComponent } from './room-list/room-list.component';
import { RoomComponent } from './room/room.component';
import { AddRoomComponent } from './add-room/add-room.component';
import { EditRoomComponent } from './edit-room/edit-room.component';
import { BookingRoomComponent } from './booking-room/booking-room.component';
import { BookingListComponent } from './booking-list/booking-list.component';
import { BookingDetailsComponent } from './booking-details/booking-details.component';
import { PaymentListComponent } from './payment-list/payment-list.component';
import { PaymentDetailsComponent } from './payment-details/payment-details.component';


export const routes: Routes = [
  {path: '', component:LoginComponent},
  {path: 'login', component:LoginComponent},
  {path: 'roomList', component:RoomListComponent},
  {path: 'room', component:RoomComponent, children: [
    { path: ':id', component: RoomListComponent },]},
  {path: 'editRoom', component:EditRoomComponent, children: [
    { path: ':id', component: EditRoomComponent },]},
  {path: 'BookingRoom', component:BookingRoomComponent, children: [
    { path: ':id', component: BookingRoomComponent },]},
  {path: 'BookingDetails', component:BookingDetailsComponent, children: [
    { path: ':id', component: BookingDetailsComponent },]},
  {path: 'addRoom', component:AddRoomComponent},
  {path: 'bookingList', component:BookingListComponent},
  {path: 'paymentList', component:PaymentListComponent},
  {path: 'PaymentDetails', component:PaymentDetailsComponent, children: [
    { path: ':id', component: PaymentDetailsComponent },]},
  {path: '**', component:NotfoundComponent}
];
