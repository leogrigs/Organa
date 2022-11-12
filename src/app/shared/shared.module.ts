import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardModule } from './card/card.module';
import { ModalComponent } from './modal/modal.component';



@NgModule({
  declarations: [
    ModalComponent
  ],
  imports: [
    CommonModule,
    CardModule
  ],
  exports: [CardModule, ModalComponent]
})
export class SharedModule { }
