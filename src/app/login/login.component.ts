
import { Component, OnInit } from '@angular/core';
import { AuthorizationClient } from '../api/ApiClient';
import { FormGroup, FormControl,  Validators} from '@angular/forms';
import { RegisterDTO } from '../DTO/RegisterDTO.model'; 
import { Router, ActivatedRoute } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public loginForm!: FormGroup;
  public errorMessage: string = '';
  public showError: boolean | undefined;
  public isUserAuthenticated: boolean | undefined;
  private _returnUrl: string | undefined;
  token!: string;
  constructor(private _authService: AuthenticationService, private _router: Router, private _route: ActivatedRoute) { }
  ngOnInit(): void {
    this._authService.authChanged
    .subscribe((res: boolean | undefined) => {
      this.isUserAuthenticated = res;
    })
    this.loginForm = new FormGroup({
      username: new FormControl("", [Validators.required]),
      password: new FormControl("", [Validators.required])
      
    })
    this._returnUrl = this._route.snapshot.queryParams['returnUrl'] || '/';
  }
  public validateControl = (controlName: string) => {
    return this.loginForm.controls[controlName].invalid && this.loginForm.controls[controlName].touched
  }
  public hasError = (controlName: string, errorName: string) => {
    return this.loginForm.controls[controlName].hasError(errorName)
  }
  public Login = (loginFormValue: any) => {
    this.showError = false;
    const login = {... loginFormValue };
    const userForAuth: RegisterDTO = {
      email: login.username,
      password: login.password
    }
    this._authService.Login('api/Authorization/Login', userForAuth)
    .subscribe((res:any) => {
       localStorage.setItem("token", res.token);
       this._authService.sendAuthStateChangeNotification(res.isAuthSuccessful);
       this._router.navigate(['/roomList']);
       //this._router.navigate([this._returnUrl]);
       
    },
    (error) => {
      this.errorMessage = error;
      this.showError = true;
    })
  }
  public logout = () => {
    this._authService.logout();
    this._router.navigate(["/"]);
  }
 
}
