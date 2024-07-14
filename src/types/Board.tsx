type Position = {
    name: string;
    x: number;
    y: number;
  };
  
  type BoardPosition = {
    name: string;
    x: number;
    y: number;
  };
  
  type SelectedPosition = {
    player: string;
    name: string;
    x: number;
    y: number;
  };

  export type { Position, BoardPosition, SelectedPosition };