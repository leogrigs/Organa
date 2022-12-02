import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-accordion',
  templateUrl: './accordion.component.html',
  styleUrls: ['./accordion.component.scss'],
})
export class AccordionComponent implements OnInit {
  @Input() accordionTitle!: string;

  toggle: boolean = false;

  constructor() {}

  onToggle() {
    this.toggle = !this.toggle;
  }

  ngOnInit(): void {}
}
