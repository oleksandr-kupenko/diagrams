import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { ArrowCordinate } from 'src/app/public/components/arrow/arrow.interface';

@Component({
  selector: 'app-arrow',
  templateUrl: './arrow.component.html',
  styleUrls: ['./arrow.component.scss'],
})
export class ArrowComponent implements OnInit {
  @Input() coordinates!: ArrowCordinate;

  constructor() {}

  ngOnInit(): void {}
}
