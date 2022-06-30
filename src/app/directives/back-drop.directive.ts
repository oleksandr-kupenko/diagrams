import {
  Directive,
  ElementRef,
  HostListener,
  Output,
  EventEmitter,
} from '@angular/core';

@Directive({
  selector: '[appBackDrop]',
})
export class BackdropDirective {
  constructor(private _elementRef: ElementRef) {}
  @Output() public clickOutside = new EventEmitter();

  @HostListener('document:mousedown', ['$event.target']) public onClick(
    targetElement: EventTarget
  ) {
    const clickedInside =
      this._elementRef.nativeElement.contains(targetElement);
    if (!clickedInside) {
      this.clickOutside.emit(null);
    }
  }
}
