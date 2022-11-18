import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Card } from 'src/app/core/models/card.model';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
})
export class CardComponent implements OnInit {
  @Input() card!: Card;
  @Output() OnDelete = new EventEmitter();

  arrowSource: string = '/assets/img/gray_arrow.svg';

  constructor() {}

  ngOnInit(): void {}

  nextStatus() {
    switch (this.card.card_status) {
      case 'To Do':
        this.card.card_status = 'Doing';
        break;
      case 'Doing':
        this.card.card_status = 'Done';
        break;
      case 'Done':
        this.card.card_status = 'To Do';
        break;
      default:
        break;
    }
  }

  previousStatus() {
    switch (this.card.card_status) {
      case 'To Do':
        this.card.card_status = 'Done';
        break;
      case 'Doing':
        this.card.card_status = 'To Do';
        break;
      case 'Done':
        this.card.card_status = 'Doing';
        break;
      default:
        break;
    }
  }

  setStatusClass() {
    return {
      'card-status-text-todo': this.card.card_status === 'To Do',
      'card-status-text-doing': this.card.card_status === 'Doing',
      'card-status-text-done': this.card.card_status === 'Done',
    };
  }

  setArrowSource() {
    let color = '';

    if (this.card.card_status === 'To Do') color = 'gray';
    else if (this.card.card_status === 'Doing') color = 'blue';
    else color = 'green';

    let url = `/assets/img/${color}_arrow.svg`;
    return url;
  }

  deleteCard() {
    this.OnDelete.emit(this.card.card_title);
  }
}
