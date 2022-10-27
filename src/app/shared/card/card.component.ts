import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {
  @Input('cardStatus') cardStatus: string = 'To Do';

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

}
