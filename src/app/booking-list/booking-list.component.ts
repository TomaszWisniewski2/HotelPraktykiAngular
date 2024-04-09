import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RoomsService } from '../services/rooms.service';
import { SharingService } from '../services/sharing.service';
import { Observable, switchMap } from 'rxjs';
import { BookingDTO } from '../api/ApiClient';

@Component({
  selector: 'app-booking-list',
  // standalone: true,
  // imports: [],
  templateUrl: './booking-list.component.html',
  styleUrl: './booking-list.component.css'
})
export class BookingListComponent implements OnInit{
  constructor(private router: Router,
    private roomService: RoomsService,  
    private route: ActivatedRoute,
    private sharingService: SharingService,
    ) { }
  rooms$!: Observable<any>;
  selectedId: any;
  bookingDTO!: BookingDTO[];
  respones: any;
  token = localStorage.getItem("token");

  ngOnInit(): void {
    this.rooms$ = this.route.paramMap.pipe(switchMap(params => {
      this.selectedId = Number(params.get('id'));
      return this.roomService.bookingList(localStorage.getItem("token")||"");
    }))

    this.roomService.bookingList(localStorage.getItem("token")||"").subscribe(
      res => {
        this.bookingDTO = res;
      },
      error => {
        console.error('An error occurred while fetching room data:', error);
        // Dodaj obsługę błędów, np. wyświetl komunikat użytkownikowi
      }
    );
  }
  viewBookingDetail(id: any) {
    let url: string = "/BookingDetails/" +id
    this.router.navigateByUrl(url);
    //console.log(recipe_id);
    this.sharingService.setData(id);
  }
  viewPaymentForm(id: any) {
    let url: string = "/payment/" +id
    this.router.navigateByUrl(url);
    //console.log(recipe_id);
    this.sharingService.setData(id);
  }
  pay(bookingId: number, amount: number) {
    if (this.token) {
      this.roomService.pay(this.token, amount, bookingId).subscribe(
        res => {
          console.log("Payment successful:", res);
          // Dodaj tutaj odpowiednią obsługę, np. wyświetlenie komunikatu o sukcesie
        },
        error => {
          console.error("Payment error:", error);
          // Dodaj tutaj odpowiednią obsługę błędu, np. wyświetlenie komunikatu o błędzie
        }
      );
    } else {
      console.error("User not authenticated.");
      // Dodaj tutaj odpowiednią obsługę, np. przekierowanie użytkownika do strony logowania
    }
  }
}
