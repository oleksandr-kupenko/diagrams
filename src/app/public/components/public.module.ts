import { NgModule } from '@angular/core';
import { DirectivesModule } from 'src/app/directives/directives.module';
import { ArrowComponent } from 'src/app/public/components/arrow/arrow.component';
import { RectangularBlockComponent } from 'src/app/public/components/rectangular-block/rectangular-block.component';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { CommonModule } from '@angular/common';
import { PublicComponent } from 'src/app/public/public.component';

@NgModule({
  declarations: [RectangularBlockComponent, ArrowComponent, PublicComponent],
  imports: [CommonModule, DirectivesModule, DragDropModule],
  exports: [PublicComponent],
})
export class PublicModule {}
