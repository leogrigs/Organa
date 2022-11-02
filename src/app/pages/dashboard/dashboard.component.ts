import { Component, OnInit } from '@angular/core';
import { Dashboard } from 'src/app/core/models/dashboard.model';
import { DataService } from 'src/app/core/services/data/data.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  dashboard!: Dashboard;


  constructor(private dataService: DataService) {
    this.dashboard = this.dataService.getCards();
  }

  ngOnInit(): void {
  }

}
