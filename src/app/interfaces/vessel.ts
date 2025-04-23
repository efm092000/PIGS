export interface Vessel {
  id: number;
  cabins: number;
  crew: number;
  cruiseline: string;
  description: string;
  draft: number;
  grossTonnage: number;
  imagePath: string[];
  imo: number;
  length: number;
  name: string;
  passengerCap: number;
  references: string[];
  speed: number;
  width: number;
  year: number;
}
