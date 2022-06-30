import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  ElementRef,
  HostListener,
  OnInit,
  QueryList,
  ViewChild,
  ViewChildren,
} from '@angular/core';
import { fromEvent, Subscription } from 'rxjs';
import { ArrowCordinate } from 'src/app/public/components/arrow/arrow.interface';
import {
  Block,
  BlockArrowSide,
  BlockArrowType,
} from 'src/app/public/public.interface';

import { v4 as uuid } from 'uuid';

interface Rectangle extends Block {
  position: { x: number; y: number };
  arrowsList: Array<string | number>;
}

interface SvgArrowsList {
  [key: number]: {
    coordinates: ArrowCordinate;
    startBlockId: string | number;
    endBlockId: string | number;
  };
}

@Component({
  selector: 'app-only-svg-public',
  templateUrl: './only-svg-public.component.html',
  styleUrls: ['./only-svg-public.component.scss'],
})
export class OnlySvgPublicComponent implements OnInit, AfterViewInit {
  @HostListener('window:mouseup', ['$event'])
  mouseUp(event: any) {
    if (event?.target?.attributes?.side?.value) {
      const side = event.target.attributes.side.value;
      const blockId = event.target.attributes.blockId.value;
      this.saveArrow(blockId, side);
    }
    this.cancelArrowCreate();
  }

  @HostListener('window:mousedown', ['$event'])
  mouseDown(event: any) {
    if (event?.target.attributes?.side?.value) {
      this.isCreateArrowMode = true;
      const side = event.target.attributes.side.value;
      const blockId = event.target.attributes.blockId.value;
      this.addArrow(side, blockId, event);
    }
  }

  public prevMoveArrowsList!: SvgArrowsList;
  public arrowList: SvgArrowsList = {};

  public isCreateArrowMode = false;
  public currentChangingBlockIndex: number | null = null;

  public isMouseInTheEndPort = false;

  public currentNewArrow: {
    coordinates: ArrowCordinate;
    position: BlockArrowSide;
    startBlockId: string;
  } | null = null;

  public blocksList: Rectangle[] = [
    {
      id: uuid(),
      position: {
        x: 50,
        y: 50,
      },
      translate3d: '',
      arrows: {
        top: null,
        right: null,
        bottom: null,
        left: null,
      },
      arrowsList: [],
    },
    {
      id: uuid(),
      position: { x: 210, y: 110 },
      translate3d: '',
      arrows: {
        top: null,
        right: null,
        bottom: null,
        left: null,
      },
      arrowsList: [],
    },
  ];

  private mouseSubscribe = new Subscription();

  private svgContainerOffsetLeft = 0;
  private svgContainerOffsetTop = 0;

  @ViewChild('svgContainer', { read: ElementRef })
  svgContainer!: ElementRef;

  @ViewChildren('blockRef', { read: ElementRef })
  blockRefs!: QueryList<ElementRef>;

  constructor(private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    this.svgContainerOffsetLeft = this.svgContainer.nativeElement.offsetLeft;
    this.svgContainerOffsetTop = this.svgContainer.nativeElement.offsetTop;

    console.log(this.svgContainerOffsetLeft, this.svgContainerOffsetTop);
  }

  public handleComeToPort() {
    if (this.isCreateArrowMode) {
      this.isMouseInTheEndPort = true;
    }
  }
  public handleLeaveThePort() {
    this.isMouseInTheEndPort = true;
  }

  public handleSaveBlcokNewCoordinates(index: number, event: any) {
    /*     let transform = (
      this.blockRefs.toArray()[index].nativeElement as HTMLDivElement
    ).style.transform;
    transform = transform.replace(/[()translate3dpx ]/g, '');
    this.blocksList[index].position = {
      x: Number(transform.split(',')[0]),
      y: Number(transform.split(',')[1]),
    }; */
  }

  public handleAddRectangle() {
    this.blocksList = [
      ...this.blocksList,
      {
        id: uuid(),
        position: {
          x: 210,
          y: 210,
        },
        translate3d: 'translate3d(100px, 35px, 0px)',
        arrows: {
          top: null,
          right: null,
          bottom: null,
          left: null,
        },
        arrowsList: [],
      },
    ];
  }

  public handleSetPrevMoveArrowsList() {
    this.prevMoveArrowsList = JSON.parse(JSON.stringify(this.arrowList));
  }

  public handleMoveBlock(event: any, index: number) {
    let movedStartArrows = this.blocksList[index].arrowsList.filter((arrow) => {
      return (
        this.arrowList[arrow as number].startBlockId ==
        this.blocksList[index].id
      );
    });
    let movedEndArrows = this.blocksList[index].arrowsList.filter((arrow) => {
      return (
        this.arrowList[arrow as number].endBlockId == this.blocksList[index].id
      );
    });

    movedStartArrows.forEach((arrowId: any) => {
      const newX =
        this.prevMoveArrowsList[arrowId].coordinates.x1 + event.distance.x;
      const newY =
        this.prevMoveArrowsList[arrowId].coordinates.y1 + event.distance.y;

      this.arrowList = {
        ...this.arrowList,
        [arrowId]: {
          ...this.arrowList[arrowId],
          coordinates: {
            ...this.arrowList[arrowId].coordinates,
            x1: newX,
            y1: newY,
          },
        },
      };
    });

    movedEndArrows.forEach((arrowId: any) => {
      const newX =
        this.prevMoveArrowsList[arrowId].coordinates.x2 + event.distance.x;
      const newY =
        this.prevMoveArrowsList[arrowId].coordinates.y2 + event.distance.y;

      this.arrowList = {
        ...this.arrowList,
        [arrowId]: {
          ...this.arrowList[arrowId],
          coordinates: {
            ...this.arrowList[arrowId].coordinates,
            x2: newX,
            y2: newY,
          },
        },
      };
    });
  }

  public handleDeleteArrow(arrowId: string) {
    console.log(22, this.blocksList);
    const startBlockId = this.arrowList[arrowId as any].startBlockId;
    const endBlockId = this.arrowList[arrowId as any].endBlockId;

    this.blocksList.forEach((block, index) => {
      if (block.id == startBlockId || block.id == endBlockId) {
        block.arrowsList = block.arrowsList.filter((id) => id != arrowId);
        console.log(block);
      }
    });
    console.log(33, this.blocksList);

    delete this.arrowList[arrowId as any];
  }

  private deleteArrowInBlockById(blockId: string, idArrow: number) {
    const blockIndex = this.blocksList.findIndex(
      (block) => block.id == blockId
    );

    this.blocksList[blockIndex].arrowsList = this.blocksList[
      blockIndex
    ].arrowsList.filter((arrowId) => arrowId != idArrow);
  }

  public handleDeleteBlock(index: number) {
    this.blocksList[index].arrowsList.forEach((arrowId) => {
      const startBlockId = this.arrowList[arrowId as number].endBlockId;
      const endBlockId = this.arrowList[arrowId as number].startBlockId;

      const blockForDeletingOnlyArrow =
        this.blocksList[index].id == startBlockId ? endBlockId : startBlockId;

      this.deleteArrowInBlockById(
        blockForDeletingOnlyArrow as string,
        arrowId as number
      );

      delete this.arrowList[arrowId as number];
    });

    this.blocksList = this.blocksList.filter(
      (block) => block.id != this.blocksList[index].id
    );
  }

  private saveArrow(endBlockId: string, endSide: BlockArrowSide) {
    if (endBlockId == this.currentNewArrow!.startBlockId) {
      this.cancelArrowCreate();
      return;
    }

    //todo add checking side
    /*     const isDublicate = Object.values(this.arrowList).some((arrow) => {
      const result =
        arrow.startBlockId == this.currentNewArrow?.startBlockId &&
        arrow.endBlockId == endBlockId;
      return result;
    });

    if (isDublicate) {
      debugger;
      this.cancelArrowCreate();
      return;
    } */

    const newArrowId = Object.keys(this.arrowList).length
      ? +Object.keys(this.arrowList)[Object.keys(this.arrowList).length - 1] + 1
      : 1;

    this.arrowList[+newArrowId] = {
      coordinates: this.currentNewArrow!.coordinates,
      startBlockId: this.currentNewArrow!.startBlockId,
      endBlockId: endBlockId,
    };

    this.blocksList
      .find((block) => block.id == this.currentNewArrow!.startBlockId)
      ?.arrowsList.push(newArrowId);

    this.blocksList
      .find((block) => block.id == endBlockId)
      ?.arrowsList.push(newArrowId);
  }

  private addArrow(side: BlockArrowSide, startBlockId: string, event: any) {
    event.stopPropagation();
    //this.removeOldArrow(side, index);

    this.currentChangingBlockIndex = this.blocksList.findIndex(
      (block) => block.id == startBlockId
    );
    this.setCurrentNewArrowCoordinates(side, startBlockId, event, 'start');
    this.observeMouse();
  }

  private cancelArrowCreate() {
    this.mouseSubscribe.unsubscribe();
    this.isCreateArrowMode = false;
    this.currentChangingBlockIndex = null;
    this.currentNewArrow = null;
  }

  private setCurrentNewArrowCoordinates(
    side: BlockArrowSide,
    startBlockId: string,
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
      startBlockId:
        type == 'start' ? startBlockId : this.currentNewArrow!.position,
    };
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
            this.svgContainerOffsetLeft,
          y: BoundingClientRect.top - this.svgContainerOffsetTop,
        };
      case 'right':
        return {
          x:
            BoundingClientRect.left +
            BoundingClientRect.width -
            this.svgContainerOffsetLeft -
            7,
          y:
            BoundingClientRect.top +
            BoundingClientRect.height / 2 -
            this.svgContainerOffsetTop -
            4,
        };
      case 'bottom':
        return {
          x:
            BoundingClientRect.left +
            BoundingClientRect.width / 2 -
            this.svgContainerOffsetLeft -
            3,
          y:
            BoundingClientRect.top -
            this.svgContainerOffsetTop +
            BoundingClientRect.height -
            5,
        };
      case 'left':
        return {
          x: BoundingClientRect.left - this.svgContainerOffsetLeft,
          y:
            BoundingClientRect.top +
            BoundingClientRect.height / 2 -
            this.svgContainerOffsetTop,
        };
    }
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
            x2: event.pageX - this.svgContainerOffsetLeft,
            y2: event.pageY - this.svgContainerOffsetTop,
          },
        };
      }
    );
  }
}
