import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import Swal from "sweetalert2";
import { LoginService } from '../services/login.service';
import { Login } from './dto/login';
import { ILogin, IResponseErrorLogin, IResponseLogin } from './interfaces/login.interface';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  user: ILogin;
  rexEmail = /^[a-zA-Z0-9.!#$%&'*+=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
  rexNumber = /[0-9]{9}/;
  constructor(
    private loginService: LoginService
  ) {
    this.user = new Login();
   }

  ngOnInit(): void {
    
  }

  login(f: NgForm) {
    const user = this.user.user;
    if ((!this.rexEmail.test(user) && !this.rexNumber.test(user))
    ) {
      console.log("es invalido", f);
      throw {
        formulario: f.invalid,
      };
    }

    Swal.fire({
      allowOutsideClick: false,
      icon: 'info',
      text: "Espere un momento por favor..."
    });
    Swal.showLoading();

    this.loginService.login(this.user)
      .subscribe(
        (response: IResponseLogin) => {

          window.sessionStorage.setItem("access_token", response.access_token);

          Swal.fire({
            allowOutsideClick: false,
            icon: "success",
            text: "¡Listo!"
          });


        },
        (error) => {
          Swal.fire({
            allowOutsideClick: false,
            icon: "error",
            text: error.error.message,
            timer: 1750
          });
        }
      );    
  }
}
