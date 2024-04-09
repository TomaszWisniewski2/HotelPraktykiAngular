import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { RoomsService } from '../services/rooms.service';
import { SharingService } from '../services/sharing.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-room',
  // standalone: true,
  // imports: [],
  templateUrl: './room.component.html',
  styleUrl: './room.component.css'
})
export class RoomComponent implements OnInit{

  constructor(private router: Router,
    private roomService: RoomsService,  
    private route: ActivatedRoute,
    private sharingService: SharingService,
    ) { }

  recipe$!: Observable<any>;
  id: any;
  room: any = [];
  token = localStorage.getItem("token");
  ngOnInit(): void {
    this.id = this.sharingService.getData();
    this.getThatRecipe();

  }
  getThatRecipe() {
    this.roomService.getRoom(this.id, this.token).subscribe(res => (this.room = res));
  }
  deleteRoom() {
    this.roomService.deleteRoom(this.token||'', this.room).subscribe(
      () => {
        // Pomyślnie usunięto pokój, wykonaj odpowiednie działania (np. przekierowanie)
      },
      error => {
        console.error('Błąd podczas usuwania pokoju:', error);
        // Obsługa błędu
      }
    );
  }
  editRecipeDetail(room_id: any) {

    let url: string = "/editRoom/" + room_id;
    this.router.navigateByUrl(url);
    this.sharingService.setData(room_id);
  }
  getRoomType(roomType: number): string {
    if (roomType === 0) {
      return 'Normal';
    } else if (roomType === 1) {
      return 'Vip';
    } else {
      return 'Unknown'; // Obsługa nieznanego typu, jeśli jest taka potrzeba
    }
  }

  // Metoda do konwersji numeru statusu pokoju na jego nazwę
  getRoomStatus(roomStatus: number): string {
    if (roomStatus === 0) {
      return 'free';
    } else if (roomStatus === 1) {
      return 'reserved';
    } else if (roomStatus === 2) {
      return 'occupied ';
    } else {
      return 'Unknown'; // Obsługa nieznanego typu, jeśli jest taka potrzeba
    }
  }
}
