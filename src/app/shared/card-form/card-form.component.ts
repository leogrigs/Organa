import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Card } from 'src/app/core/models/card.model';

@Component({
  selector: 'app-card-form',
  templateUrl: './card-form.component.html',
  styleUrls: ['./card-form.component.scss'],
})
export class CardFormComponent implements OnInit {
  formCard!: FormGroup;
  @Input() formTitle!: string;
  @Input() buttonTitle!: string;
  @Input() groups!: string[];
  @Input() card: Card = {
    card_title: '',
    card_description: '',
    card_group: '',
    card_status: '',
  };

  @Output() OnSubmit = new EventEmitter();

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.formCard = this.fb.group({
      card_title: [this.card.card_title, [Validators.required]],
      card_description: [this.card.card_description, [Validators.required]],
      card_group: [this.card.card_group],
      card_status: [this.card.card_status, [Validators.required]],
    });
  }

  onSubmit() {
    this.OnSubmit.emit(this.formCard.value);
    this.formCard.reset();
  }
}
