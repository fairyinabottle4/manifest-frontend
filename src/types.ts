export interface Diagnosis {
  code: string;
  name: string;
  latin?: string;
}

export enum travelClass {
  First = "first",
  Business = "business",
  PremiumEconomy = "premium economy",
  Economy = "economy"
}

export interface Patient {
  id: string;
  name: string;
  seatNumber?: string;
  rowNumber: string;
  frequentFlyer?: FrequentFlyer;
  rowLetter: string;
  travelClass: travelClass;
  dietaryRequirements: string;
  confirmNumber?: string;
  entries: BaseEntry[];
  dateOfBirth?: string;
  rating?: number;
}


export interface BaseEntry {
  id: string;
  travelClass: travelClass;
  date: string;
  route: string;
}

export enum FrequentFlyer {
  Silver = "silver",
  Gold = "gold",
  Platinum = "platinum"
}



