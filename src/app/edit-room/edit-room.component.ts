import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { SharingService } from '../services/sharing.service';
import { RoomsService } from '../services/rooms.service';
import { RoomDTO2 } from '../DTO/RoomDTO2';
import {  FileParameter, RoomDTO } from '../api/ApiClient';
import { EditRoomDTO } from '../DTO/EditRoomDTO';

@Component({
  selector: 'app-edit-room',
  templateUrl: './edit-room.component.html',
  styleUrls: ['./edit-room.component.css']
})
export class EditRoomComponent implements OnInit {
  public editRoomForm!: FormGroup;
  public errorMessage: string = '';
  public showError: boolean | undefined;
  public isUserAuthenticated: boolean | undefined;
  private _returnUrl: string | undefined;
  private id: any;
  public room!: RoomDTO;
  fileParameter!: FileParameter;
  fileToUpload!: File | null;
  constructor(
    private sharingService: SharingService,
    private roomService: RoomsService,
    private route: ActivatedRoute,
    private _router: Router
  ) {}

  ngOnInit(): void {
    this.id = this.sharingService.getData();
    this.getRoomDetails(this.id);
    this.editRoomForm = new FormGroup({
      roomNumber: new FormControl('', [Validators.required]),
      roomPrice: new FormControl('', [Validators.required]),
      roomCapacity: new FormControl('', [Validators.required]),
      roomType: new FormControl('', [Validators.required]),
      roomStatus: new FormControl('', [Validators.required])
    });
    this._returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  getRoomDetails(id: any): void {
    this.roomService.getRoom(id, localStorage.getItem("token")).subscribe(
      (res: RoomDTO) => {
        this.room = res;
        // Wypełnienie pól formularza danymi pokoju
        this.editRoomForm.patchValue({
          id: this.id,
          roomNumber: this.room.roomNumber,
          roomPrice: this.room.roomPrice,
          roomCapacity: this.room.roomCapacity,
          roomType: this.room.roomType,
          roomStatus: this.room.roomStatus
        });
      },
      (error) => {
        console.error('Error while fetching room details:', error);
      }
    );
  }

  public validateControl = (controlName: string) => {
    return (
      this.editRoomForm.controls[controlName].invalid &&
      this.editRoomForm.controls[controlName].touched
    );
  };

  public hasError = (controlName: string, errorName: string) => {
    return this.editRoomForm.controls[controlName].hasError(errorName);
  };
  handleFileInput(target: EventTarget | null) {
    if (target instanceof HTMLInputElement && target.files && target.files.length > 0) {
      const files = target.files;
      const file = files.item(0);
      if (file) {
        this.fileToUpload = file;
        this.fileParameter = { data: this.fileToUpload, fileName: this.fileToUpload.name };
      } else {
        console.error("No file selected.");
      }
    } else {
      console.error("No files provided.");
    }
  }
  
  
  public editRoom = (editRoomForm: any) => {
    this.showError = false;
    if (this.room) {
      const roomValue = {...editRoomForm};
      const dto: EditRoomDTO = {
        ...this.room,
        id: this.id || undefined,
        roomNumber: roomValue.roomNumber,
        roomPrice: roomValue.roomPrice,
        roomCapacity: roomValue.roomCapacity,
        //roomPhoto: roomValue.roomPhoto,
        roomType: +roomValue.roomType,
        roomStatus: +roomValue.roomStatus,
        token: localStorage.getItem("token")||''
      };
  
      this.roomService.editRoom('api/Admin/editRoom', dto).subscribe(
        (res: any) => {
          this.roomService.sendAuthStateChangeNotification(
            res.isAuthSuccessful
          );
  
          if (this.fileParameter) {
            // Wywołanie aktualizacji zdjęcia
            this.roomService.updatePhoto(localStorage.getItem("token") || "", this.id, this.fileParameter).subscribe(
              (res) => {
                console.log('Photo updated successfully:', res);
                // Tutaj możesz dodać dodatkowe działania po udanej aktualizacji zdjęcia, jeśli to konieczne
                this._router.navigate(['/roomList']);
              },
              (error) => {
                console.error('Error while updating photo:', error);
                this.showError = true;
              }
            );
          }
          this._router.navigate(['/roomList']);
          // Przekierowanie użytkownika po edycji pokoju
          // this._router.navigate([this._returnUrl]);
        },
        (error) => {
          this.errorMessage = error;
          this.showError = true;
        }
      );
    } else {
      console.error('Room details are not available.');
    }
  };
  
}


// import { HttpClient } from '@angular/common/http';
// import { Component, OnInit } from '@angular/core';
// import { ActivatedRoute, Router } from '@angular/router';
// import { SharingService } from '../services/sharing.service';
// import { RoomsService } from '../services/rooms.service';
// import { AdminClient, RoomDTO } from '../api/ApiClient';
// import { FormControl, FormGroup, Validators } from '@angular/forms';
// import { AddRoomDTO } from '../DTO/AddRoomDTO';
// import { RoomDTO2 } from '../DTO/RoomDTO2';

// @Component({
//   selector: 'app-edit-room',
//   // standalone: true,
//   // imports: [],
//   templateUrl: './edit-room.component.html',
//   styleUrl: './edit-room.component.css'
// })
// export class EditRoomComponent implements OnInit{
//   public editRoomForm!: FormGroup;
//   public errorMessage: string = '';
//   public showError: boolean | undefined;
//   public isUserAuthenticated: boolean | undefined;
//   private _returnUrl: string | undefined;
//   token!: string;
//   id: any;
//   room: any = [];

//   constructor( private sharingService: SharingService,private _authService: RoomsService, private _router: Router, private _route: ActivatedRoute) { }
//   ngOnInit(): void {
//     this.id = this.sharingService.getData();
//     this.getThatRecipe();
//     this._authService.authChanged
//     .subscribe((res: boolean | undefined) => {
//       this.isUserAuthenticated = res;
//     })
//     this.editRoomForm = new FormGroup({
//       roomNumber: new FormControl(this.room.roomNumber, [Validators.required]),
//       roomPrice: new FormControl(this.room.roomPrice, [Validators.required]),
//       roomCapacity: new FormControl(this.room.roomCapacity, [Validators.required]),
//       roomType: new FormControl(this.room.roomType, [Validators.required]),
//       roomStatus: new FormControl(this.room.roomStatus, [Validators.required])
      
//     })
//     this._returnUrl = this._route.snapshot.queryParams['returnUrl'] || '/';
//   }
//   getThatRecipe() {
//     this._authService.getRoom(this.id, this.token).subscribe(res => (this.room = res));
//   }
//   public validateControl = (controlName: string) => {
//     return this.editRoomForm.controls[controlName].invalid && this.editRoomForm.controls[controlName].touched
//   }
//   public hasError = (controlName: string, errorName: string) => {
//     return this.editRoomForm.controls[controlName].hasError(errorName)
//   }
//   public EditRoom = (loginFormValue: any) => {
//     this.showError = false;
//     const roomValue = {... loginFormValue };
//     const dto: RoomDTO = {
//       roomNumber: roomValue.roomNumber,
//       roomPrice: roomValue.roomPrice,
//       roomCapacity: roomValue.roomCapacity,
//       roomType: roomValue.roomType,
//       roomStatus: roomValue.roomStatus,
      
//     }
//     this._authService.editRoom( localStorage.getItem("token")||"",dto)
//     .subscribe((res:any) => {
       
//        this._authService.sendAuthStateChangeNotification(res.isAuthSuccessful);
//        //this._router.navigate([this._returnUrl]);
       
//     },
//     (error) => {
//       this.errorMessage = error;
//       this.showError = true;
//     })
//   }
// }
