import { Component, OnInit } from '@angular/core';
import { Observable, switchMap } from 'rxjs';
import { RoomDTO } from '../api/ApiClient';
import { ActivatedRoute, Router } from '@angular/router';
import { SharingService } from '../services/sharing.service';
import { RoomsService } from '../services/rooms.service';

@Component({
  selector: 'app-room-list',
  // standalone: true,
  // imports: [],
  templateUrl: './room-list.component.html',
  styleUrl: './room-list.component.css'
})
export class RoomListComponent implements OnInit {

  constructor(private router: Router,
    private roomService: RoomsService,  
    private route: ActivatedRoute,
    private sharingService: SharingService,
    ) { }
  rooms$!: Observable<any>;
  selectedId: any;
  roomsDTO!: RoomDTO[];
  respones: any;
  token = localStorage.getItem("token");

  ngOnInit(): void {
    this.rooms$ = this.route.paramMap.pipe(switchMap(params => {
      this.selectedId = Number(params.get('id'));
      return this.roomService.listRooms();
    }))

    this.roomService.listRooms().subscribe(
      res => {
        this.roomsDTO = res;
      },
      error => {
        console.error('An error occurred while fetching room data:', error);
        // Dodaj obsługę błędów, np. wyświetl komunikat użytkownikowi
      }
    );
  }

  viewRoomDetail(room_id: any) {
    let url: string = "/room/" + room_id
    this.router.navigateByUrl(url);
    //console.log(recipe_id);
    this.sharingService.setData(room_id);
  }
  bookingRoomView(room_id: any) {
    let url: string = "/BookingRoom/" + room_id
    this.router.navigateByUrl(url);
    //console.log(recipe_id);
    this.sharingService.setData(room_id);
  }
}
