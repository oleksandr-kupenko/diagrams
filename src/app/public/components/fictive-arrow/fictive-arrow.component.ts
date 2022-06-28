import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  OnChanges,
  OnInit,
  Renderer2,
  SimpleChanges,
  ViewChild,
} from '@angular/core';

@Component({
  selector: 'app-fictive-arrow',
  templateUrl: './fictive-arrow.component.html',
  styleUrls: ['./fictive-arrow.component.scss'],
})
export class FictiveArrowComponent implements OnInit, OnChanges, AfterViewInit {
  //@Input() mouseCoordinates!: { x: number; y: number };
  @Input() startCoordinates!: { top: number; left: number } | null;
  @Input() endCoordinates!: { top: number; left: number } | null;

  @ViewChild('start', { read: ElementRef }) start!: ElementRef;
  @ViewChild('end', { read: ElementRef }) end!: ElementRef;
  @ViewChild('line', { read: ElementRef }) line!: ElementRef;

  constructor(private renderer: Renderer2) {}

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    this.renderer.setStyle(
      this.start.nativeElement,
      'left',
      this.startCoordinates!.left + 'px'
    );

    this.renderer.setStyle(
      this.start.nativeElement,
      'top',
      this.startCoordinates!.top + 'px'
    );
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['endCoordinates'] && this.endCoordinates) {
      this.renderer.setStyle(
        this.end.nativeElement,
        'left',
        this.endCoordinates.left + 'px'
      );

      this.renderer.setStyle(
        this.end.nativeElement,
        'top',
        this.endCoordinates.top + 'px'
      );

      var posax = this.start.nativeElement.offsetLeft;
      var posay = this.start.nativeElement.offsetTop;

      //last dot
      var posbx = this.end.nativeElement.offsetLeft;
      var posby = this.end.nativeElement.offsetTop;

      //temp calculation variables
      let centerx;
      let centery;
      let distance;
      let angle;

      //find center points;
      centerx = (posax + posbx) / 2;
      centery = (posay + posby) / 2;

      //angle
      angle = (Math.atan2(posay - posby, posax - posbx) * 180) / Math.PI;

      //distance
      distance = Math.sqrt(
        Math.pow(posbx - posax, 2) + Math.pow(posby - posay, 2)
      );

      this.renderer.setStyle(this.line.nativeElement, 'width', distance + 'px');
      this.renderer.setStyle(
        this.line.nativeElement,
        'transform',
        'rotate(' + angle + 'deg'
      );

      this.renderer.setStyle(
        this.line.nativeElement,
        'top',
        centery -
          this.line.nativeElement.offsetHeight / 2 +
          this.start.nativeElement.offsetHeight / 2 +
          'px'
      );
      this.renderer.setStyle(
        this.line.nativeElement,
        'left',
        centerx -
          this.line.nativeElement.offsetHeight / 2 +
          this.start.nativeElement.offsetHeight / 2 +
          'px'
      );
    }
  }
}
