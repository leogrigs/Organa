import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardModule } from './card/card.module';
import { ModalComponent } from './modal/modal.component';
import { FilterComponent } from './filter/filter.component';
import { AccordionComponent } from './accordion/accordion.component';

@NgModule({
  declarations: [ModalComponent, FilterComponent, AccordionComponent],
  imports: [CommonModule, CardModule],
  exports: [CardModule, ModalComponent, FilterComponent],
})
export class SharedModule {}
