import { Water } from './water.model';

export class Station {

  uuid: string;
  'number': number;
  shortname: string;
  longname: string;
  km: number;
  agency: string;
  longitude: number;
  latitude: number;
  water: Water;
}
