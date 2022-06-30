import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  Renderer2,
} from '@angular/core';
import { BlockArrowSide } from 'src/app/public/public.interface';

@Component({
  selector: '[reactangle]',
  templateUrl: './rectangle.component.html',
  styleUrls: ['./rectangle.component.scss'],
})
export class RectangleComponent implements OnInit {
  @Input() id!: string;
  @Input() blockPosition!: { x: number; y: number };
  @Output() onDeleteBlock = new EventEmitter();
  @Output() dragStarted = new EventEmitter();
  @Output() dragEnded = new EventEmitter();
  @Output() dragMoved = new EventEmitter<any>();

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

  constructor(private renderer: Renderer2) {}

  ngOnInit(): void {}

  handleEditMode() {}

  public onComeToBlockPort(side: string) {
    this.isReadyToConnect = true;
  }

  public onOutputToBlockPort(side: string) {
    this.isReadyToConnect = false;
  }

  public handleEnableEditMode(event: any) {
    console.dir(event.previousElementSibling.getBoundingClientRect());
    console.dir(event.previousElementSibling.width);
    this.isEditMode = true;
    //document.body.contentEditable = 'true';
  }
}
