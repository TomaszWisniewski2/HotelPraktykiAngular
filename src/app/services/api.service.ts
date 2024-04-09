import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiUrl = 'https://example.com/api'; // Adres URL Twojego API

  constructor(private http: HttpClient) { }

  getRooms(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/rooms`);
  }

  createRoom(roomData: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/rooms`, roomData);
  }

  // Dodaj inne metody do komunikacji z API w tej klasie
}
