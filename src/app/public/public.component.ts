import {
  AfterViewInit,
  Component,
  ElementRef,
  QueryList,
  ViewChild,
  ViewChildren,
} from '@angular/core';
import { fromEvent, Subscription, take } from 'rxjs';
import { ArrowCordinate } from 'src/app/public/components/arrow/arrow.interface';
import {
  ArrowsList,
  Block,
  BlockArrowSide,
  BlockArrowType,
} from 'src/app/public/public.interface';
import { v4 as uuid } from 'uuid';

@Component({
  selector: 'app-public',
  templateUrl: './public.component.html',
  styleUrls: ['./public.component.scss'],
})
export class PublicComponent implements AfterViewInit {
  public isCreateArrowMode = false;

  public currentNewArrow: {
    coordinates: ArrowCordinate;
    position: BlockArrowSide;
    startBlockIndex: number;
  } | null = null;

  public currentChangingBlockIndex: number | null = null;

  public arrowList: ArrowsList = {};
  public blocksList: Block[] = [
    {
      id: uuid(),
      translate3d: 'translate3d(100px, 35px, 0px)',
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
  private prevMoveArrowsList!: ArrowsList;

  @ViewChild('mainZone', { static: true, read: ElementRef })
  mainZone!: ElementRef;

  @ViewChildren('block', { read: ElementRef })
  blocksDomElements!: QueryList<ElementRef>;

  constructor() {}

  ngAfterViewInit(): void {
    this.arrangeBlocksInPlace();
    this.mainZoneLeft = this.mainZone.nativeElement.offsetLeft;
    this.mainZoneTop = this.mainZone.nativeElement.offsetTop;
  }

  public cancelArrowCreate() {
    this.mouseSubscribe.unsubscribe();
    this.isCreateArrowMode = false;
    this.currentChangingBlockIndex = null;
  }

  public identify(index: number, item: Block) {
    return item.id;
  }

  public handleAddBlock() {
    this.blocksList = [
      ...this.blocksList,
      {
        id: uuid(),
        translate3d: 'translate3d(198px, 325px, 0px)',
        arrows: {
          top: null,
          right: null,
          bottom: null,
          left: null,
        },
      },
    ];

    this.blocksDomElements.changes.pipe(take(1)).subscribe(() => {
      this.arrangeBlocksInPlace();
    });
  }

  private arrangeBlocksInPlace() {
    this.blocksDomElements.forEach((item, index) => {
      item.nativeElement.setAttribute(
        'style',
        `transform: ${this.blocksList[index].translate3d}`
      );
    });
  }

  private removeArrowInBlocks(arrowId: number) {
    this.blocksList.forEach((block) => {
      Object.keys(block.arrows).forEach((arrow) => {
        let currentArrow = block.arrows[arrow as keyof typeof block.arrows];
        if (currentArrow && currentArrow.arrowId == arrowId) {
          block.arrows[arrow as keyof typeof block.arrows] = null;
        }
      });
    });
  }

  private removeOldArrow(side: BlockArrowSide, index: number) {
    const arowId = this.blocksList[index].arrows[side]?.arrowId;

    if (arowId) {
      delete this.arrowList[arowId];
      this.removeArrowInBlocks(arowId);
    }
  }

  private calculateMiddleBlockCoodrinates(
    side: BlockArrowSide,
    BoundingClientRect: DOMRect
  ): { x: number; y: number } {
    switch (side) {
      case 'top':
        return {
          x:
            BoundingClientRect.left +
            BoundingClientRect.width / 2 -
            this.mainZoneLeft,
          y: BoundingClientRect.top - this.mainZoneTop,
        };
      case 'right':
        return {
          x:
            BoundingClientRect.left +
            BoundingClientRect.width -
            this.mainZoneLeft,
          y:
            BoundingClientRect.top +
            BoundingClientRect.height / 2 -
            this.mainZoneTop,
        };
      case 'bottom':
        return {
          x:
            BoundingClientRect.left +
            BoundingClientRect.width / 2 -
            this.mainZoneLeft,
          y:
            BoundingClientRect.top -
            this.mainZoneTop +
            BoundingClientRect.height,
        };
      case 'left':
        return {
          x: BoundingClientRect.left - this.mainZoneLeft,
          y:
            BoundingClientRect.top +
            BoundingClientRect.height / 2 -
            this.mainZoneTop,
        };
    }
  }

  private setCurrentNewArrowCoordinates(
    side: BlockArrowSide,
    index: number,
    event: any,
    type: BlockArrowType
  ) {
    const startCoordinates = this.calculateMiddleBlockCoodrinates(
      side,
      event.target.parentElement.getBoundingClientRect()
    );

    this.currentNewArrow = {
      coordinates: {
        x1:
          type == 'start'
            ? startCoordinates.x
            : this.currentNewArrow!.coordinates.x1,
        y1:
          type == 'start'
            ? startCoordinates.y
            : this.currentNewArrow!.coordinates.y1,
        x2: startCoordinates.x,
        y2: startCoordinates.y,
      },
      position: type == 'start' ? side : this.currentNewArrow!.position,
      startBlockIndex:
        type == 'start' ? index : this.currentNewArrow!.startBlockIndex,
    };
  }

  public addArrow(side: BlockArrowSide, index: number, event: any) {
    event.stopPropagation();

    console.dir(event.target.parentElement.getBoundingClientRect());

    this.removeOldArrow(side, index);

    console.log(event.clientX, event.clientY);

    if (!this.isCreateArrowMode) {
      this.currentChangingBlockIndex = index;

      this.setCurrentNewArrowCoordinates(side, index, event, 'start');

      this.isCreateArrowMode = true;
      this.observeMouse();
    } else {
      console.log(22, event);
      this.cancelArrowCreate();
      this.setCurrentNewArrowCoordinates(side, index, event, 'end');
      this.saveArrow(index, side);
    }
  }

  private saveArrow(endIndex: number, endSide: BlockArrowSide) {
    const newId = Object.keys(this.arrowList).length
      ? +Object.keys(this.arrowList)[Object.keys(this.arrowList).length - 1] + 1
      : 1;

    this.arrowList[+newId] = this.currentNewArrow!.coordinates;
    //start block
    this.blocksList = this.blocksList.map((block, blockIndex: number) => {
      if (blockIndex == this.currentNewArrow!.startBlockIndex) {
        return {
          ...block,
          arrows: {
            ...block.arrows,
            [this.currentNewArrow!.position]: {
              arrowId: newId,
              type: 'start',
            },
          },
        };
      }
      //endBlock
      if (blockIndex == endIndex) {
        return {
          ...block,

          arrows: {
            ...block.arrows,
            [endSide]: {
              ...block.arrows[endSide],
              arrowId: newId,
              type: 'end',
              side: endSide,
            },
          },
        };
      }

      return { ...block };
    });
    console.log(this.blocksList);
    this.currentNewArrow = null;
  }

  private observeMouse() {
    this.mouseSubscribe = fromEvent(document.body, 'mousemove').subscribe(
      (event: any) => {
        if (this.currentNewArrow!.coordinates.x1) {
        }
        this.currentNewArrow = {
          ...this.currentNewArrow!,
          coordinates: {
            ...this.currentNewArrow!.coordinates,
            x2: event.pageX - this.mainZoneLeft,
            y2: event.pageY - this.mainZoneTop,
          },
        };
      }
    );
  }

  public handleSaveBlcokNewCoordinates(index: number) {
    const translate3d = (
      this.blocksDomElements.toArray()[index].nativeElement as HTMLDivElement
    ).style.transform;
    this.blocksList[index].translate3d = translate3d;

    console.log(this.blocksList);
  }

  public handleSetPrevMoveArrowsList() {
    this.prevMoveArrowsList = JSON.parse(JSON.stringify(this.arrowList));
  }

  public handleMoveBlock(event: any, index: number) {
    let blockArrows = this.blocksList[index].arrows;

    Object.keys(blockArrows).map((arrowSide) => {
      let arrow = blockArrows[arrowSide as keyof typeof blockArrows];

      if (arrow) {
        //start coordinates
        if (arrow.type === 'start') {
          this.arrowList[arrow.arrowId].x1 =
            this.prevMoveArrowsList[arrow.arrowId].x1 + event.distance.x;

          this.arrowList[arrow.arrowId].y1 =
            this.prevMoveArrowsList[arrow.arrowId].y1 + event.distance.y;
        }
        //end coordinates
        else if (arrow.type === 'end') {
          this.arrowList[arrow.arrowId].x2 =
            this.prevMoveArrowsList[arrow.arrowId].x2 + event.distance.x;

          this.arrowList[arrow.arrowId].y2 =
            this.prevMoveArrowsList[arrow.arrowId].y2 + event.distance.y;
        }
      }
    });
  }
}
