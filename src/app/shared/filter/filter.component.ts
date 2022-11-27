import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss'],
})
export class FilterComponent implements OnInit {
  @Input() groups!: string[];
  @Output() OnNewGroup = new EventEmitter<string>();
  @Output() OnDeleteGroup = new EventEmitter<string>();
  @Output() OnFilterByGroup = new EventEmitter<{
    status: boolean;
    value: string;
  }>();
  @Output() OnFilterByStatus = new EventEmitter<{
    status: boolean;
    value: 'To Do' | 'Doing' | 'Done';
  }>();

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

  validateGroup() {
    let state = false;
    this.groups.forEach((group) => {
      if (group.toLowerCase() === this.innerValue.toLowerCase()) {
        state = true;
      }
    });
    return state;
  }

  deleteGroup(group: string) {
    this.OnDeleteGroup.emit(group);
  }

  valueChanges(event: any) {
    this.OnFilterByStatus.emit({
      status: event.target.checked,
      value: event.target.value,
    });
  }

  valueChangesGroup(event: any) {
    this.OnFilterByGroup.emit({
      status: event.target.checked,
      value: event.target.value,
    });
  }
}
