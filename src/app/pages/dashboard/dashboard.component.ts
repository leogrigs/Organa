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
  showModal: boolean = false;
  showModalDel: boolean = false;


  constructor(private dataService: DataService) {
    this.dashboard = this.dataService.getCards();
  }

  ngOnInit(): void {
  }

  openModal(type: string){
    if (type === 'create'){
      this.showModal = !this.showModal;
    }
    else{
      this.showModalDel = !this.showModalDel;
    }
  }

  closeModal(state: boolean, type: string){
    if (type === 'create') {
      this.showModal = state;
    }
    else{
      this.showModalDel = state;
    }
  }

}
