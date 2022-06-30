import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { BlockArrowSide } from 'src/app/public/public.interface';

@Component({
  selector: '[reactangle]',
  templateUrl: './rectangle.component.html',
  styleUrls: ['./rectangle.component.scss'],
})
export class RectangleComponent implements OnInit {
  @Input() id!: string;
  @Output() onDeleteBlock = new EventEmitter();

  public isReadyToConnect = false;
  public isEditMode = false;

  public portsList = [
    {
      side: 'top',
      transform: 'matrix(1,0,0,1,60,0)',
    },
    {
      side: 'right',
      transform: 'matrix(1,0,0,1,120,30)',
    },
    {
      side: 'bottom',
      transform: 'matrix(1,0,0,1,60,60)',
    },
    {
      side: 'left',
      transform: 'matrix(1,0,0,1,0,30)',
    },
  ];

  @Output() onCreateArrow = new EventEmitter<BlockArrowSide>();

  constructor() {}

  ngOnInit(): void {}

  handleEditMode() {}

  public onComeToBlockPort(side: string) {
    this.isReadyToConnect = true;
  }

  public onOutputToBlockPort(side: string) {
    this.isReadyToConnect = false;
  }

  public handleEnableEditMode(event: any) {
    console.dir(event);
    this.isEditMode = true;
    //document.body.contentEditable = 'true';
  }
}
