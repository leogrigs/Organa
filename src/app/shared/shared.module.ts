import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardModule } from './card/card.module';
import { ModalComponent } from './modal/modal.component';
import { FilterComponent } from './filter/filter.component';
import { AccordionComponent } from './accordion/accordion.component';
import { CardFormComponent } from './card-form/card-form.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    ModalComponent,
    FilterComponent,
    AccordionComponent,
    CardFormComponent,
  ],
  imports: [CommonModule, CardModule, ReactiveFormsModule, FormsModule],
  exports: [CardModule, ModalComponent, FilterComponent, CardFormComponent],
})
export class SharedModule {}
