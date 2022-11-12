import { Component, ElementRef, EventEmitter, HostListener, Input, OnInit, Output, ViewChild } from '@angular/core';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
})
export class ModalComponent implements OnInit {
  @Input() toggle: boolean = false;
  @Output() OnToggle = new EventEmitter<boolean>();

  @ViewChild('overlay') overlay!: ElementRef;

  constructor() {}

  ngOnInit(): void {}

  close(){
    this.toggle = false;
    this.OnToggle.emit(this.toggle);
  }

  @HostListener('document:keydown.escape', ['$event']) 

  onKeydownHandler(event: KeyboardEvent) {
    this.close();
  }

  @HostListener('document:click', ['$event']) 
  
  onClickdownHandler(event: KeyboardEvent) {
    if (event.target === document.getElementById('overlay')) {
      this.close();
    }
  }
} 
