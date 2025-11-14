export interface Cat {
  id: string;
  url: string;
  tags?: string[];
}

export interface SwipeAction {
  direction: 'left' | 'right';
  cat: Cat;
}
