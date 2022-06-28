import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { fromEvent, Subscription } from 'rxjs';
import { ArrowCordinate } from 'src/app/public/components/arrow/arrow.interface';

interface Block {
  coordinates: {
    left: number;
    top: number;
  };

  arrows: BlockArrows;
}

interface BlockArrows {
  top: { arrowId: number; type: BlockArrowType } | null;
  right: { arrowId: number; type: BlockArrowType } | null;
  bottom: { arrowId: number; type: BlockArrowType } | null;
  left: { arrowId: number; type: BlockArrowType } | null;
}

type BlockArrowSide = 'top' | 'right' | 'bottom' | 'left';
type BlockArrowType = 'start' | 'end';

interface ArrowsList {
  [key: number]: ArrowCordinate;
}

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
    index: number;
  } | null = null;

  public currentChangingBlockIndex: number | null = null;

  public arrowList: ArrowsList = {};
  public blocksList: Block[] = [
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
    this.mainZoneLeft = this.mainZone.nativeElement.offsetLeft;
    this.mainZoneTop = this.mainZone.nativeElement.offsetTop;
  }

  public handleActivateArrowMaker(event: any) {
    console.log(event);
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

  public addArrow(side: BlockArrowSide, index: number, event: any) {
    event.stopPropagation();

    console.dir(event.target.parentElement.getBoundingClientRect());

    this.removeOldArrow(side, index);

    console.log(event.clientX, event.clientY);

    if (!this.isCreateArrowMode) {
      this.currentChangingBlockIndex = index;

      const startCoordinates = this.calculateMiddleBlockCoodrinates(
        side,
        event.target.parentElement.getBoundingClientRect()
      );

      this.currentNewArrow = {
        coordinates: {
          x1: startCoordinates.x,
          y1: startCoordinates.y,
          x2: startCoordinates.x,
          y2: startCoordinates.y,
        },
        position: side,
        index,
      };

      this.isCreateArrowMode = true;
      this.observeMouse();
    } else {
      this.saveArrow(index, side);
      this.cancelArrowCreate();
    }
  }

  public cancelArrowCreate() {
    this.mouseSubscribe.unsubscribe();
    this.isCreateArrowMode = false;
    this.currentChangingBlockIndex = null;
  }

  private saveArrow(endIndex: number, endSide: BlockArrowSide) {
    const newId = Object.keys(this.arrowList).length
      ? +Object.keys(this.arrowList)[Object.keys(this.arrowList).length - 1] + 1
      : 1;

    this.arrowList[+newId] = this.currentNewArrow!.coordinates;

    this.blocksList = this.blocksList.map((block, blockIndex: number) => {
      if (blockIndex == this.currentNewArrow!.index) {
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

  prevMoveArrowsList!: ArrowsList;

  public setPrevMoveArrowsList() {
    this.prevMoveArrowsList = JSON.parse(JSON.stringify(this.arrowList));
  }

  public test(event: any, index: number) {
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
