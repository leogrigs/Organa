import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Card } from 'src/app/core/models/card.model';
import { Dashboard } from 'src/app/core/models/dashboard.model';
import { DataService } from 'src/app/core/services/data/data.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  dashboard!: Dashboard;
  cards!: Card[];
  showModal: boolean = false;
  showModalDel: boolean = false;
  actualCardTitle!: string;
  filteredDashboard!: Dashboard;
  innerValue!: string;

  formCard!: FormGroup;

  constructor(private dataService: DataService, private fb: FormBuilder) {
    this.dataService.dbDashboard.valueChanges().subscribe((dash) => {
      this.dashboard = dash[0];
      this.cards = dash[0].cards;
    });
    this.formCard = this.fb.group({
      card_title: [''],
      card_description: [''],
      card_group: [''],
      card_status: [''],
    });
  }

  ngOnInit(): void {}

  get filter() {
    return this.innerValue;
  }

  set filter(value: string) {
    this.innerValue = value;
    this.cards = this.dashboard.cards.filter(
      (card) =>
        card.card_title
          .toLowerCase()
          .indexOf(this.innerValue.toLocaleLowerCase()) > -1
    );
  }

  openModal(type: string, title: string) {
    if (type === 'create') {
      this.showModal = !this.showModal;
    } else {
      this.showModalDel = !this.showModalDel;
      this.actualCardTitle = title;
    }
  }

  closeModal(state: boolean, type: string) {
    if (type === 'create') {
      this.showModal = state;
    } else {
      this.showModalDel = state;
    }
  }

  onDelete() {
    this.dashboard.cards = this.dashboard.cards.filter(
      (card) => card.card_title !== this.actualCardTitle
    );
    this.dataService.dbDashboard
      .doc('dB6Y7wKB8Ki5vngQQG0Y')
      .update(this.dashboard);
    this.closeModal(false, 'delete');
  }

  onSubmit() {
    this.dashboard.cards.push(this.formCard.value);
    this.dataService.dbDashboard
      .doc('dB6Y7wKB8Ki5vngQQG0Y')
      .update(this.dashboard);
    this.closeModal(false, 'create');
  }
}
