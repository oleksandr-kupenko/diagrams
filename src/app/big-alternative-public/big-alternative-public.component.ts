import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  Renderer2,
  ViewChild,
} from '@angular/core';
import { Addon, Graph, Shape } from '@antv/x6';

@Component({
  selector: 'app-big-alternative-public',
  templateUrl: './big-alternative-public.component.html',
  styleUrls: ['./big-alternative-public.component.scss'],
})
export class BigAlternativePublicComponent implements OnInit, AfterViewInit {
  constructor(private renderer: Renderer2) {}
  @ViewChild('container', { read: ElementRef }) container!: ElementRef;
  @ViewChild('graphContainer', { read: ElementRef })
  graphContainer!: ElementRef;
  @ViewChild('stencil', { read: ElementRef }) stencil!: ElementRef;

  data: any = {
    nodes: [
      {
        id: 'node1',
        shape: 'custom-node',
        x: 100,
        y: 200,
        width: 120,
        height: 60,
        label: 'hello',
      },
      {
        id: 'node2',
        shape: 'ellipse',
        x: 300,
        y: 200,
        width: 80,
        height: 40,
        label: 'world',
      },
    ],
    edges: [
      {
        source: 'node1',
        target: 'node2',
      },
    ],
  };

  graph: any;

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    Graph.registerNode(
      'custom-node',
      {
        markup: [
          {
            tagName: 'rect',
            selector: 'body',
          },
          {
            tagName: 'text',
            selector: 'label',
          },
          {
            tagName: 'g',
            children: [
              {
                tagName: 'text',
                selector: 'btnText',
              },
              {
                tagName: 'rect',
                selector: 'btn',
              },
            ],
          },
        ],
        attrs: {
          btn: {
            refX: '100%',
            refX2: -28,
            y: 4,
            width: 24,
            height: 18,
            rx: 10,
            ry: 10,
            fill: 'rgba(255,255,0,0.01)',
            stroke: 'red',
            cursor: 'pointer',
            event: 'node:delete',
          },
          btnText: {
            fontSize: 14,
            fill: 'red',
            text: 'x',
            refX: '100%',
            refX2: -19,
            y: 17,
            cursor: 'pointer',
            pointerEvent: 'none',
          },
          body: {
            fill: '#ffffff',
            stroke: '#333333',
            strokeWidth: 2,
            refWidth: '100%',
            refHeight: '100%',
          },
          label: {
            fontSize: 14,
            fill: '#333333',
            refX: '50%',
            refY: '50%',
            textAnchor: 'middle',
            textVerticalAnchor: 'middle',
          },
        },
      },
      true
    );

    this.graph = new Graph({
      container: this.container.nativeElement,
      width: 800,
      height: 600,
      resizing: true,
      rotating: true,
      selecting: {
        enabled: true,
        rubberband: true,
        showNodeSelectionBox: true,
      },
      snapline: true,
      keyboard: true,
      clipboard: true,
    });

    this.graph.on('node:delete', ({ view, e }: any) => {
      e.stopPropagation();
      view.cell.remove();
    });

    this.graph.fromJSON(this.data);
  }

  addBlock() {
    this.data.nodes = [
      ...this.data.nodes,
      {
        x: 60,
        y: 50,
        width: 180,
        height: 100,
        label: 'Port Style',
        ports: [
          {
            id: 'port1',
            attrs: {
              circle: {
                r: 6,
                magnet: true,
                stroke: '#31d0c6',
                strokeWidth: 2,
                fill: '#fff',
              },
            },
          },
          {
            id: 'port2',
            attrs: {
              circle: {
                r: 6,
                magnet: true,
                stroke: '#31d0c6',
                strokeWidth: 2,
                fill: '#fff',
              },
            },
          },
          {
            id: 'port3',
            attrs: {
              circle: {
                r: 6,
                magnet: true,
                stroke: '#31d0c6',
                strokeWidth: 2,
                fill: '#fff',
              },
            },
          },
        ],
      },
    ];
    this.graph.fromJSON(this.data);
  }
}
