import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RoomsService } from '../services/rooms.service';
import { SharingService } from '../services/sharing.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-booking-details',
  // standalone: true,
  // imports: [],
  templateUrl: './booking-details.component.html',
  styleUrl: './booking-details.component.css'
})
export class BookingDetailsComponent implements OnInit{

  constructor(private router: Router,
    private roomService: RoomsService,  
    private route: ActivatedRoute,
    private sharingService: SharingService,
    ) { }
  bookings$!: Observable<any>;
  id: any;
  booking: any = [];
  token = localStorage.getItem("token");

  ngOnInit(): void {
     this.id = this.sharingService.getData();
    this.getThatBooking();
  }
  getThatBooking() {
    this.roomService.getBooking(this.id, this.token).subscribe(res => (this.booking = res));
  }
  deleteBooking() {
    this.roomService.deleteBooking(this.token||'', this.id).subscribe(
      () => {
        // Pomyślnie usunięto pokój, wykonaj odpowiednie działania (np. przekierowanie)
      },
      error => {
        console.error('Błąd podczas usuwania pokoju:', error);
        // Obsługa błędu
      }
    );
  }
}
