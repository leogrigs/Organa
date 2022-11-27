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
  groups!: string[];

  showModal: boolean = false;
  showModalDel: boolean = false;
  showModalEdit: boolean = false;
  showModalGroup: boolean = false;

  actualCardTitle!: string;
  actualCard!: Card;
  actualGroup!: string;
  filteredDashboard!: Dashboard;
  innerValue!: string;
  formCard!: FormGroup;

  statusesState: any = {
    'To Do': false,
    Doing: false,
    Done: false,
  };

  constructor(private dataService: DataService, private fb: FormBuilder) {
    this.dataService.dbDashboard.valueChanges().subscribe((dash) => {
      this.dashboard = dash[0];
      this.cards = dash[0].cards;
      this.groups = dash[0].groups;
      this.makeFilter();
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

  filterByStatus(object: {
    status: boolean;
    value: 'To Do' | 'Doing' | 'Done';
  }) {
    let value = object.value;
    this.statusesState[value] = object.status;
    this.makeFilter();
  }

  makeFilter() {
    let allTrue = Object.values(this.statusesState).every(
      (status) => status === true
    );
    let allFalse = Object.values(this.statusesState).every(
      (status) => status === false
    );
    if (allTrue || allFalse) {
      this.cards = this.dashboard.cards;
    } else {
      this.cards = this.dashboard.cards.filter((card) => {
        return this.statusesCheked().indexOf(card.card_status) > -1;
      });
    }
  }

  statusesCheked() {
    let result: any = [];
    Object.keys(this.statusesState).forEach((value: any) => {
      if (this.statusesState[value]) {
        result.push(value);
      }
    });
    console.log(result);

    return result;
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
    } else if (type === 'deleteGroup') {
      this.showModalGroup = !this.showModalGroup;
      this.actualGroup = event;
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
    } else if (type === 'deleteGroup') {
      this.showModalGroup = state;
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

  onDeleteGroup() {
    this.dashboard.groups = this.dashboard.groups.filter(
      (group) => group !== this.actualGroup
    );
    this.dataService.dbDashboard
      .doc('dB6Y7wKB8Ki5vngQQG0Y')
      .update(this.dashboard);
    this.closeModal(false, 'deleteGroup');
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

  onStatusChange(object: { beforeCard: Card; newCard: Card }) {
    let index = this.dashboard.cards.indexOf(object.beforeCard);
    this.dashboard.cards[index] = object.newCard;
    this.updateDashboard();
  }

  updateDashboard() {
    this.dataService.dbDashboard
      .doc('dB6Y7wKB8Ki5vngQQG0Y')
      .update(this.dashboard);
  }
}
