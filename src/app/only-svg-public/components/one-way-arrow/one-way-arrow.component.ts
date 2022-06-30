import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { ArrowCordinate } from 'src/app/public/components/arrow/arrow.interface';

@Component({
  selector: '[one-way-arrow]',
  templateUrl: './one-way-arrow.component.html',
  styleUrls: ['./one-way-arrow.component.scss'],
})
export class OneWayArrowComponent implements OnInit, OnChanges {
  @Input() coordinates!: ArrowCordinate;
  @Input() isTemproraryArrow = false;
  @Output() onDeleteArrow = new EventEmitter();

  public isEditMode = false;

  public deleteBtnTranslate = '';

  constructor() {}

  ngOnInit(): void {}

  ngOnChanges(changes: SimpleChanges): void {
    //this.getAngle();
    /* if (changes['coordinates']) {
      this.deleteBtnTranslate = `translate(${
        (this.coordinates!.x1 + this.coordinates!.x2) / 2
      },${(this.coordinates!.y1 + this.coordinates!.y2) / 2})`;
    } */
  }

  public getAngle() {
    const c = this.coordinates;
    var dy = c.y2 - c.x1;
    var dx = c.x2 - c.x1;
    var theta = Math.atan2(dy, dx);
    theta *= 180 / Math.PI;
    console.log(theta);
    return theta;
  }

  public handleEdit() {
    this.isEditMode = true;
  }

  public handleDeleteArrow() {
    this.onDeleteArrow.emit();
  }
}
