import { Component, OnInit } from '@angular/core';
import { DashboardService } from './dashboard.service';
import { IRerservas } from './intefaces/dashboard.interface';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  reservas: IRerservas[] = [];


  constructor( 
    private dashService: DashboardService
  ) { }

  ngOnInit() {
    this.dashService.getReservas()
      .subscribe(resp => {
        this.reservas = resp;
      });
  }
  
}
