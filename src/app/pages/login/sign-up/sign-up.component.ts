import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Route, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { LoginService } from '../services/login.service';
import { Signup } from './dto/signup';
import { IResponseSignUp, ISignUp } from './interfaces/sign-up.interface';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {

  signForm: ISignUp;
  constructor( 
    private loginService: LoginService,
    private router: Router
  ) {
    this.signForm = new Signup;
  }

  ngOnInit(): void {
  }

  singUp(f: NgForm) {

    Swal.fire({
      allowOutsideClick: false,
      icon: 'info',
      text: "Espere un momento por favor..."
    });
    Swal.showLoading();
    
    this.loginService.signup(this.signForm)
    .subscribe(
      (response: IResponseSignUp) => {
        
          this.signForm = new Signup();
        
          Swal.fire({
            allowOutsideClick: false,
            icon: "success",
            title: `¡Bienvenido ${response.name}!`,
            text: `Puedes revisar tu email: ${response.email} para validar tu usuario, el cual puedes acceder con tu numero telefónico o tu email`,
            timer: 7500
          });

        setTimeout(() => this.router.navigate(["login"]), 7550);
      },
      (error) => {
        Swal.fire({
          allowOutsideClick: false,
          icon: "error",
          text: error.error.message,
          timer: 3500
        });
      }
    );
  }

}
