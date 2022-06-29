import { ArrowCordinate } from 'src/app/public/components/arrow/arrow.interface';

export interface Block {
  translate3d: string;
  arrows: BlockArrows;
  id: string;
}

export interface BlockArrows {
  top: { arrowId: number; type: BlockArrowType } | null;
  right: { arrowId: number; type: BlockArrowType } | null;
  bottom: { arrowId: number; type: BlockArrowType } | null;
  left: { arrowId: number; type: BlockArrowType } | null;
}

export type BlockArrowSide = 'top' | 'right' | 'bottom' | 'left';
export type BlockArrowType = 'start' | 'end';

export interface ArrowsList {
  [key: number]: ArrowCordinate;
}
