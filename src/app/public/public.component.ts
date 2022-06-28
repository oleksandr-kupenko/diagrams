import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';
import { fromEvent, Subscription } from 'rxjs';
import { ArrowCordinate } from 'src/app/public/components/arrow/arrow.interface';

interface block {
  coordinates: {
    left: number;
    top: number;
  };

  arrows: BlockArrow;
}

interface BlockArrow {
  top: ArrowCordinate | null;
  right: ArrowCordinate | null;
  bottom: ArrowCordinate | null;
  left: ArrowCordinate | null;
}

type BlockArrowSide = 'top' | 'right' | 'bottom' | 'left';

@Component({
  selector: 'app-public',
  templateUrl: './public.component.html',
  styleUrls: ['./public.component.scss'],
})
export class PublicComponent implements AfterViewInit {
  public isCreateArrowMode = false;

  public currentNewArrow!: {
    coordinates: ArrowCordinate;
    position: BlockArrowSide;
    index: number;
  };

  public blocksList: block[] = [
    {
      coordinates: {
        left: 10,
        top: 10,
      },
      arrows: {
        top: null,
        right: null,
        bottom: null,
        left: null,
      },
    },
    {
      coordinates: { left: 10, top: 10 },
      arrows: {
        top: null,
        right: null,
        bottom: null,
        left: null,
      },
    },
  ];

  private mouseSubscribe = new Subscription();

  private mainZoneLeft = 0;
  private mainZoneTop = 0;

  @ViewChild('mainZone', { static: true, read: ElementRef })
  mainZone!: ElementRef;

  constructor() {}

  ngAfterViewInit(): void {
    console.log(this.mainZone.nativeElement);
    this.mainZoneLeft = this.mainZone.nativeElement.offsetLeft;
    this.mainZoneTop = this.mainZone.nativeElement.offsetTop;
  }

  public identify(index: number, item: any) {
    return index;
  }

  public handleAddBlock() {
    this.blocksList = [
      ...this.blocksList,
      {
        coordinates: { left: 10, top: 10 },
        arrows: {
          top: null,
          right: null,
          bottom: null,
          left: null,
        },
      },
    ];
  }

  public addArrow(side: BlockArrowSide, index: number, event: any) {
    event.stopPropagation();

    if (!this.isCreateArrowMode) {
      this.currentNewArrow = {
        coordinates: {
          x1: event.clientX - this.mainZoneLeft,
          y1: event.clientY - this.mainZoneTop,
          x2: 0,
          y2: 0,
        },
        position: side,
        index,
      };

      console.log(this.currentNewArrow);
      this.observeMouse();
    } else {
      this.mouseSubscribe.unsubscribe();
    }

    if (this.isCreateArrowMode) {
      this.saveArrow();
    }

    this.isCreateArrowMode = !this.isCreateArrowMode;
  }

  public cancelArrowCreate() {
    this.mouseSubscribe.unsubscribe();
    this.isCreateArrowMode = false;
  }

  private saveArrow() {
    console.log(this.currentNewArrow.coordinates);
    this.blocksList = this.blocksList.map((block, blockIndex: number) => {
      return blockIndex == this.currentNewArrow.index
        ? {
            ...block,
            coordinates: {
              ...block.coordinates,
            },
            arrows: {
              ...block.arrows,
              [this.currentNewArrow.position]: this.currentNewArrow.coordinates,
            },
          }
        : { ...block };
    });

    console.log(this.blocksList);
  }

  private observeMouse() {
    this.mouseSubscribe = fromEvent(document.body, 'mousemove').subscribe(
      (event: any) => {
        if (this.currentNewArrow.coordinates.x1) {
        }
        this.currentNewArrow = {
          ...this.currentNewArrow,
          coordinates: {
            ...this.currentNewArrow.coordinates,
            x2: event.pageX - this.mainZoneLeft,
            y2: event.pageY - this.mainZoneTop,
          },
        };
      }
    );
  }

  public test(event: any) {
    alert(333);
    console.log(22222, event);
  }
}
