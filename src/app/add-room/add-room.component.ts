import { Component, OnInit } from '@angular/core';
import { RoomDTO, RoomType, RoomStatus } from '../api/ApiClient';
import { RoomsService } from '../services/rooms.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from '../services/authentication.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AddRoomDTO } from '../DTO/AddRoomDTO';

@Component({
  selector: 'app-add-room',
  templateUrl: './add-room.component.html',
  styleUrls: ['./add-room.component.css']
})
export class AddRoomComponent implements OnInit {

  public addRoomForm!: FormGroup;
  public errorMessage: string = '';
  public showError: boolean | undefined;
  public isUserAuthenticated: boolean | undefined;
  private _returnUrl: string | undefined;
  token!: string;
  constructor(private _authService: RoomsService, private _router: Router, private _route: ActivatedRoute) { }
  ngOnInit(): void {
    this._authService.authChanged
    .subscribe((res: boolean | undefined) => {
      this.isUserAuthenticated = res;
    })
    this.addRoomForm = new FormGroup({
      roomNumber: new FormControl("", [Validators.required]),
      roomPrice: new FormControl("", [Validators.required]),
      roomCapacity: new FormControl("", [Validators.required]),
      roomType: new FormControl("", [Validators.required]),
      roomStatus: new FormControl("", [Validators.required])
      
    })
    this._returnUrl = this._route.snapshot.queryParams['returnUrl'] || '/';
  }
  public validateControl = (controlName: string) => {
    return this.addRoomForm.controls[controlName].invalid && this.addRoomForm.controls[controlName].touched
  }
  public hasError = (controlName: string, errorName: string) => {
    return this.addRoomForm.controls[controlName].hasError(errorName)
  }
  public AddRoom = (loginFormValue: any) => {
    this.showError = false;
    const roomValue = {... loginFormValue };
    const dto: AddRoomDTO = {
      token: localStorage.getItem("token")||"",
      roomNumber: roomValue.roomNumber,
      roomPrice: roomValue.roomPrice,
     roomCapacity: roomValue.roomCapacity,
     roomType: +roomValue.roomType,
     roomStatus: 0
    }
    this._authService.addRoom('api/Admin/AddRoom', dto)
    .subscribe((res:any) => {
       
       this._authService.sendAuthStateChangeNotification(res.isAuthSuccessful);
       //this._router.navigate([this._returnUrl]);
       this._router.navigate(['/roomList']);
    },
    (error) => {
      this.errorMessage = error;
      this.showError = true;
    })
    
  }


}


// import { Component, OnInit, ViewChild } from '@angular/core';
// import { Router, ActivatedRoute } from '@angular/router';
// import { Observable, switchMap } from 'rxjs';
// import { RoomDTO } from '../api/ApiClient';
// import { RoomsService } from '../services/rooms.service';
// import { SharingService } from '../services/sharing.service';

// @Component({
//   selector: 'app-add-room',

//   templateUrl: './add-room.component.html',
//   styleUrl: './add-room.component.css'
// })
// export class AddRoomComponent {

//   @ViewChild('roomNumberInput') roomNumberInput: any;
//   @ViewChild('roomPriceInput') roomPriceInput: any;
//   @ViewChild('roomCapacityInput') roomCapacityInput: any;
//   @ViewChild('roomTypeInput') roomTypeInput: any;
//   @ViewChild('roomStatusInput') roomStatusInput: any;
//   constructor(private router: Router,
//     private roomService: RoomsService,  
//     private route: ActivatedRoute,
//     private sharingService: SharingService,
//     ) { }
//   roomDTO!: RoomDTO;
//   rooms$!: Observable<any>;
//   selectedId: any;
//   room: any = [];
//   respones: any;
//   token = localStorage.getItem("token");


//   addroom(roomDTO: RoomDTO) {
    
    
//     this.roomService.addRoom(localStorage.getItem('token') || '', roomDTO).subscribe(
//       res => {
//         console.log('Room added successfully:', res);
//         // Dodaj logikę obsługi po dodaniu pokoju, np. przekierowanie do innej strony
//       },
//       error => {
//         console.error('An error occurred while adding room:', error);
//         // Dodaj obsługę błędów, np. wyświetl komunikat użytkownikowi
//       }
//     );
//   }
// }
