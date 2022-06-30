import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
  ViewRef,
} from '@angular/core';
import { Graph } from '@antv/x6';

@Component({
  selector: 'app-alternative-public',
  templateUrl: './alternative-public.component.html',
  styleUrls: ['./alternative-public.component.scss'],
})
export class AlternativePublicComponent {
  @ViewChild('container', { read: ElementRef }) container!: ElementRef;

  graph: any;

  source: any;

  target: any;

  third: any;

  constructor() {}

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    const container = this.container.nativeElement;
    console.log(container);
    this.graph = new Graph({
      container: container,
    });

    this.source = this.graph.addNode({
      x: 300,
      y: 40,
      width: 80,
      height: 40,
      label: 'One',
    });

    this.third = this.graph.addNode({
      x: 500,
      y: 100,
      width: 80,
      height: 40,
      label: 'Three',
    });

    this.target = this.graph.addNode({
      x: 420,
      y: 180,
      width: 80,
      height: 40,
      label: 'Two',
    });

    this.graph.addEdge({
      source: this.source,
      target: this.target,
    });

    this.graph.addEdge({
      source: this.third,
      target: this.target,
    });
  }

  test(event: any) {
    console.log(event.target);
  }

  addBlock() {
    const test = this.graph.addNode({
      x: 0,
      y: 0,
      width: 80,
      height: 40,
      label: 'New',
    });

    this.graph.addEdge({
      source: test,
      target: this.target,
    });

    this.graph.addEdge({
      source: test,
      target: this.source,
    });
  }
}
