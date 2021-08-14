import {
  DanceDto,
  EquipmentDto,
  InstrumentDto,
  PictureDto,
  SongDto
} from 'src/services/rest-api';
export type SearchContent =
  | DanceDto
  | InstrumentDto
  | PictureDto
  | SongDto
  | EquipmentDto;
export interface ISearchResult {
  category: 'dance' | 'instrucment' | 'picture' | 'song' | 'equipment';
  content: SearchContent;
}
export interface ISearchState {
  keywords: string;
  result: ISearchResult[];
}
function state(): ISearchState {
  return {
    keywords: '',
    result: []
  };
}

export default state;
