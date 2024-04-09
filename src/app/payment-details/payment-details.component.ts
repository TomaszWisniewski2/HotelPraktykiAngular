import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RoomsService } from '../services/rooms.service';
import { SharingService } from '../services/sharing.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-payment-details',
  templateUrl: './payment-details.component.html',
  styleUrl: './payment-details.component.css'
})
export class PaymentDetailsComponent implements OnInit{
  constructor(private router: Router,
    private roomService: RoomsService,  
    private route: ActivatedRoute,
    private sharingService: SharingService,
    ) { }
    payments$!: Observable<any>;
  id: any;
  payment: any = [];
  token = localStorage.getItem("token");
  ngOnInit(): void {
    this.id = this.sharingService.getData();
   this.getThatPayment();
 }
 getThatPayment() {
  this.roomService.getPayment(this.id, this.token).subscribe(res => (this.payment = res));
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
}
