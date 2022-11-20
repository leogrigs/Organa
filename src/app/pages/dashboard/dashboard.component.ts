import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Card } from 'src/app/core/models/card.model';
import { Dashboard } from 'src/app/core/models/dashboard.model';
import { DataService } from 'src/app/core/services/data/data.service';
import { data } from '../../core/utils/mock/data';

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
  showModalEdit: boolean = false;
  actualCardTitle!: string;
  actualCard!: Card;
  filteredDashboard!: Dashboard;
  innerValue!: string;

  formCard!: FormGroup;

  constructor(private dataService: DataService, private fb: FormBuilder) {
    this.dataService.dbDashboard.valueChanges().subscribe((dash) => {
      this.dashboard = dash[0];
      this.cards = dash[0].cards;
    });
  }

  ngOnInit(): void {}

  get filter() {
    return this.innerValue;
  }

  set filter(value: string) {
    this.innerValue = value;
    this.cards = this.dashboard.cards.filter((card) => {
      return (
        card.card_title
          .toLowerCase()
          .indexOf(this.innerValue.toLocaleLowerCase()) > -1 ||
        card.card_description
          .toLowerCase()
          .indexOf(this.innerValue.toLocaleLowerCase()) > -1
      );
    });
  }

  filterByStatus(object: any) {
    console.log(object);

    if (object.value === true) {
      this.cards = this.dashboard.cards.filter((card) => {
        return card.card_status === object.value;
      });
    }
  }

  newGroup(groupName: string) {
    this.dashboard.groups.push(groupName);
    this.updateDashboard();
  }

  openModal(type: string, event: any) {
    if (type === 'create') {
      this.showModal = !this.showModal;
    } else if (type === 'edit') {
      this.showModalEdit = !this.showModalEdit;
      this.actualCard = event;
    } else {
      this.showModalDel = !this.showModalDel;
      this.actualCardTitle = event;
    }
  }

  closeModal(state: boolean, type: string) {
    if (type === 'create') {
      this.showModal = state;
    } else if (type === 'edit') {
      this.showModalEdit = state;
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

  onSubmit(values: Card) {
    this.dashboard.cards.push(values);
    this.updateDashboard();
    this.closeModal(false, 'create');
  }

  onEdit(values: Card) {
    let index = this.dashboard.cards.indexOf(this.actualCard);
    this.dashboard.cards[index] = values;
    this.updateDashboard();
    this.closeModal(false, 'edit');
  }

  updateDashboard() {
    this.dataService.dbDashboard
      .doc('dB6Y7wKB8Ki5vngQQG0Y')
      .update(this.dashboard);
  }
}
