export interface Vessel {
  id: string;
  imo: number;
  name: string;
  length: number;
  width: number;
  draft: number;
  grossTonnage: number;
  passengerCap: number;
  year: number;
  imagePath?: string[];
  crew?: number;
  cabins?: number;
  cruiseline?: string;
  description?: string;
  speed?: number;
  references?: string[];
}
