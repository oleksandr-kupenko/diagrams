import { DragDropModule } from '@angular/cdk/drag-drop';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';
import { DirectivesModule } from 'src/app/directives/directives.module';
import { OneWayArrowComponent } from 'src/app/only-svg-public/components/one-way-arrow/one-way-arrow.component';

import { OnlySvgPublicComponent } from 'src/app/only-svg-public/only-svg-public.component';
import { RectangleComponent } from './components/rectangle/rectangle.component';

const routes: Route[] = [{ path: '', component: OnlySvgPublicComponent }];

@NgModule({
  declarations: [
    OnlySvgPublicComponent,
    RectangleComponent,
    OneWayArrowComponent,
  ],
  imports: [
    CommonModule,
    DragDropModule,
    RouterModule.forChild(routes),
    DirectivesModule,
  ],
})
export class OnlySvgPunlicModule {}
