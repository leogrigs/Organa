import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss'],
})
export class FilterComponent implements OnInit {
  @Input() groups!: string[];
  @Output() OnNewGroup = new EventEmitter<string>();

  statuses = ['To Do', 'Doing', 'Done'];
  innerValue!: string;

  constructor() {}

  ngOnInit(): void {}

  get group() {
    return this.innerValue;
  }

  set group(value: string) {
    this.innerValue = value;
  }

  newGroup() {
    if (this.group) {
      this.OnNewGroup.emit(this.group);
      this.group = '';
    }
  }
}
