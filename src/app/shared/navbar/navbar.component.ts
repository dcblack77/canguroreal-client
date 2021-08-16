import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  isLogged: boolean = false;

  constructor() { }

  ngOnInit(): void {
    this.isLogged = Boolean(window.sessionStorage?.getItem("isLogged"));
  }


}
