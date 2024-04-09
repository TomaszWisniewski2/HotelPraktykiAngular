
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EnvironmentUrlService } from './environment-url.service';
import { Observable, Subject } from 'rxjs';
import { LoginDTO } from '../DTO/LoginDTO.model';
import { RegisterDTO } from '../DTO/RegisterDTO.model';
@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private baseUrl: string = 'http://localhost:7195';
  private _authChangeSub = new Subject<boolean>()
  public authChanged = this._authChangeSub.asObservable();

  constructor(private _http: HttpClient, private _envUrl: EnvironmentUrlService) { }

//   public registerUser = (route: string, body: UserForRegistrationDto) => {
//     return this._http.post(this.createCompleteRoute(route, this._envUrl.urlAddress), body);
//   }
  public sendAuthStateChangeNotification = (isAuthenticated: boolean) => {
    this._authChangeSub.next(isAuthenticated);
  }
  private createCompleteRoute = (route: string, envAddress: string) => {
    return `${envAddress}/${route}`;
  }
  public Login = (route: string, body: RegisterDTO) => {
    return this._http.post(this.createCompleteRoute(route, this._envUrl.urlAddress), body);
  }
  public logout = () => {
    localStorage.removeItem("token");
    this.sendAuthStateChangeNotification(false);
  }
}
