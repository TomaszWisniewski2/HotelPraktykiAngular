import { Injectable } from '@angular/core';
import { AdminClient, FileParameter, RoomDTO } from '../api/ApiClient';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { EnvironmentUrlService } from './environment-url.service';
import { AddRoomDTO } from '../DTO/AddRoomDTO';
import { RoomDTO2 } from '../DTO/RoomDTO2';
import { EditRoomDTO } from '../DTO/EditRoomDTO';
import { AdminBookingDTO } from '../DTO/AdminBookingDTO';

@Injectable({
  providedIn: 'root'
})
export class RoomsService {
  private baseUrl: string = 'http://localhost:7195';
  private _authChangeSub = new Subject<boolean>()
  public authChanged = this._authChangeSub.asObservable();
  constructor(private _http: HttpClient,private adminService: AdminClient, private _envUrl: EnvironmentUrlService) { }
  id!: any;
  token!: string;
  //roomDTO!: RoomDTO;
  listRooms(){
    return this.adminService.listRooms()
  }
  getRoom(id: number | undefined, token: string | null ){
    return this.adminService.getRoom(id, token || '')
  }
  public sendAuthStateChangeNotification = (isAuthenticated: boolean) => {
    this._authChangeSub.next(isAuthenticated);
  }
  private createCompleteRoute = (route: string, envAddress: string) => {
    return `${envAddress}/${route}`;
  }
  addRoom(route: string,dto: AddRoomDTO){
    return this._http.post(this.createCompleteRoute(route, this._envUrl.urlAddress), dto);
  }
  deleteRoom(token: string | undefined, dto: RoomDTO ) {
    return this.adminService.deleteRoom(token || '', dto);
  }
  deleteBooking(token: string | undefined, id: number  ) {
    return this.adminService.deleteBooking(token || '', id);
  }
  editRoom(route: string,dto: EditRoomDTO){
    //return this.adminService.editRoom(dto);
    return this._http.post(this.createCompleteRoute(route, this._envUrl.urlAddress), dto);
  }
  bookingRoom(route: string,dto:AdminBookingDTO){
    return this._http.post(this.createCompleteRoute(route, this._envUrl.urlAddress), dto);
  }
  bookingList(token: string | undefined){
    return this.adminService.getBookingList(token || '')

  }
  getBooking(id: number | undefined, token: string | null ){
    return this.adminService.getBooking(id, token || '')
  }
  pay(token: string | undefined, amount: number, bookingId: number ){
    return this.adminService.payment(token, amount, bookingId)
  }
  paymentList(token: string | undefined){
    return this.adminService.getPaymentList(token || '')
  }
  getPayment(id: number | undefined, token: string | null){
    return this.adminService.getPayment(id,token||'')
  }
  updatePhoto(token: string | undefined, roomId: number,file: FileParameter | null | undefined){
    return this.adminService.updatePhoto(token,roomId,file)
  }
}
