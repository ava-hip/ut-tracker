export interface Player {
  id: number
  imgLink: string;
  goal: number;
  assist: number;
  position: string;
  team: {
    id: number;
  }
}
