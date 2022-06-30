import { ArrowCordinate } from 'src/app/public/components/arrow/arrow.interface';

export interface Block {
  translate3d: string;
  arrows: BlockArrows;
  id: string;
}

export interface BlockArrows {
  top: { arrowId: number | string; type: BlockArrowType } | null;
  right: { arrowId: number | string; type: BlockArrowType } | null;
  bottom: { arrowId: number | string; type: BlockArrowType } | null;
  left: { arrowId: number | string; type: BlockArrowType } | null;
}

export type BlockArrowSide = 'top' | 'right' | 'bottom' | 'left';
export type BlockArrowType = 'start' | 'end';

export interface ArrowsList {
  [key: number]: ArrowCordinate;
}
