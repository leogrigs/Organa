import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {
  @Input('cardStatus') cardStatus: string = 'To Do';
  arrowSource: string = '/assets/img/gray_arrow.svg'

  constructor() { }

  ngOnInit(): void {
  }

  nextStatus(){
    switch (this.cardStatus) {
      case 'To Do':
        this.cardStatus = 'Doing'
        break;
      case 'Doing':
        this.cardStatus = 'Done'
        break;
      case 'Done':
        this.cardStatus = 'To Do'
        break;
      default:
        break;
    }
  }

  previousStatus(){
    switch (this.cardStatus) {
      case 'To Do':
        this.cardStatus = 'Done'
        break;
      case 'Doing':
        this.cardStatus = 'To Do'
        break;
      case 'Done':
        this.cardStatus = 'Doing'
        break;
      default:
        break;
    }
  }

  setStatusClass(){
    return {
      'card-status-text-todo': this.cardStatus === 'To Do',
      'card-status-text-doing': this.cardStatus === 'Doing',
      'card-status-text-done': this.cardStatus === 'Done',
    }
  }

  setArrowSource(){
    let color = '';

    if (this.cardStatus === 'To Do') color = 'gray';
    else if (this.cardStatus === 'Doing') color = 'blue';
    else color = 'green';

    let url = `/assets/img/${color}_arrow.svg`;
    return url;
  }

}
