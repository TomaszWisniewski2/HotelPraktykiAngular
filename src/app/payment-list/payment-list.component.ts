import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RoomsService } from '../services/rooms.service';
import { SharingService } from '../services/sharing.service';
import { Observable, switchMap } from 'rxjs';
import { PaymentDTO } from '../api/ApiClient';

@Component({
  selector: 'app-payment-list',
  // standalone: true,
  // imports: [],
  templateUrl: './payment-list.component.html',
  styleUrl: './payment-list.component.css'
})
export class PaymentListComponent implements OnInit{
  constructor(private router: Router,
    private roomService: RoomsService,  
    private route: ActivatedRoute,
    private sharingService: SharingService,
    ) { }
  rooms$!: Observable<any>;
  selectedId: any;
  paymentDTO!: PaymentDTO[];
  respones: any;
  token = localStorage.getItem("token");
  ngOnInit(): void {
    this.rooms$ = this.route.paramMap.pipe(switchMap(params => {
      this.selectedId = Number(params.get('id'));
      return this.roomService.paymentList(localStorage.getItem("token")||"");
    }))

    this.roomService.paymentList(localStorage.getItem("token")||"").subscribe(
      res => {
        this.paymentDTO = res;
      },
      error => {
        console.error('An error occurred while fetching room data:', error);
        // Dodaj obsługę błędów, np. wyświetl komunikat użytkownikowi
      }
    );
  }
  getPayType(payType: number): string {
    if (payType === 0) {
      return 'None';
    } else if (payType === 1) {
      return 'Blick';
    } else if (payType === 2) {
      return 'Cash';
    } else {
      return 'Unknown'; // Obsługa nieznanego typu, jeśli jest taka potrzeba
    }
  }
  viewPaymentDetail(id: any) {
    let url: string = "/PaymentDetails/" +id
    this.router.navigateByUrl(url);
    //console.log(recipe_id);
    this.sharingService.setData(id);
  }
}
