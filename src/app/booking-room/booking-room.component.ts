import { Component, OnInit } from '@angular/core';
import { SharingService } from '../services/sharing.service';
import { RoomsService } from '../services/rooms.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AdminBookingDTO } from '../DTO/AdminBookingDTO';

@Component({
  selector: 'app-booking-room',
  templateUrl: './booking-room.component.html',
  styleUrls: ['./booking-room.component.css']
})
export class BookingRoomComponent implements OnInit {
  id: any;
  bookingRoomForm!: FormGroup;
  public isUserAuthenticated: boolean | undefined;
  private _returnUrl: string | undefined;
  public errorMessage: string = '';
  public showError: boolean | undefined;

  constructor(
    private sharingService: SharingService,
    private roomService: RoomsService,
    private _router: Router,
    private _route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.id = this.sharingService.getData();
    this.roomService.authChanged
      .subscribe((res: boolean | undefined) => {
        this.isUserAuthenticated = res;
      });
      
    this.bookingRoomForm = new FormGroup({     
      name: new FormControl("", [Validators.required]),
      surname: new FormControl("", [Validators.required]),
      bookingFrom: new FormControl("", [Validators.required]),
      bookingTo: new FormControl("", [Validators.required])
    });
    
    this._returnUrl = this._route.snapshot.queryParams['returnUrl'] || '/';
  }

  public validateControl = (controlName: string) => {
    return this.bookingRoomForm.controls[controlName].invalid && this.bookingRoomForm.controls[controlName].touched;
  }

  public hasError = (controlName: string, errorName: string) => {
    return this.bookingRoomForm.controls[controlName].hasError(errorName);
  }

  public AddRoom = (bookingFormValue: any) => {
    this.showError = false;
    const formValue = { ...bookingFormValue };
    const dto: AdminBookingDTO = {
      token: localStorage.getItem("token") || "",
      name: formValue.name,
      surname: formValue.surname,
      roomId: this.id,
      bookingFrom: formValue.bookingFrom,
      bookingTo: formValue.bookingTo
    };

    this.roomService.bookingRoom('api/Admin/BookingRoom', dto)
      .subscribe(
        (res: any) => {
          if (res && res.isAuthSuccessful) {
            this.roomService.sendAuthStateChangeNotification(true);
            // this._router.navigate([this._returnUrl]);
          } else {
            console.error('Booking room failed.');
            this.showError = true;
          }
        },
        (error) => {
          console.error('Error during room booking:', error);
          this.errorMessage = error;
          this.showError = true;
        }
      );
  }
}
