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
  rowLetter: string;
  travelClass: travelClass;
  dietaryRequirements: string;
  confirmNumber?: string;
  entries: Entry[];
  dateOfBirth?: string;
  rating?: number;
}


interface BaseEntry {
  id: string;
  description: string;
  date: string;
  specialist: string;
  diagnosisCodes?: Array<Diagnosis["code"]>;
}

export enum HealthCheckRating {
  "Healthy" = 0,
  "LowRisk" = 1,
  "HighRisk" = 2,
  "CriticalRisk" = 3,
}

export enum EntryType {
  Hospital = "Hospital",
  OccupationalHealthcare = "OccupationalHealthcare",
  HealthCheck = "HealthCheck",
}

// interface SickLeave {
//   startDate: string;
//   endDate: string;
// }

// interface Discharge {
//   date: string;
//   criteria: string;
// }

export interface HealthCheckEntry extends BaseEntry {
  type: "HealthCheck";
  healthCheckRating: HealthCheckRating;
}

export interface HospitalEntry extends BaseEntry {
  type: "Hospital";
  discharge: {
    date: string;
    criteria: string;
  };
}

export interface OccupationalHealthcareEntry extends BaseEntry {
  type: "OccupationalHealthcare";
  employerName: string;
  sickLeave?: {
    startDate: string;
    endDate: string;
  };
}

export type Entry =
  | HospitalEntry
  | OccupationalHealthcareEntry
  | HealthCheckEntry;

export type NewBaseEntry = Omit<BaseEntry, "id">;

export type NewEntry =
  | Omit<HospitalEntry, "id">
  | Omit<OccupationalHealthcareEntry, "id">
  | Omit<HealthCheckEntry, "id">;

export interface EntryFormValues {
  type: EntryType;
  date: string;
  description: string;
  specialist: string;
  diagnosisCodes: Array<Diagnosis["code"]>;
  healthCheckRating: HealthCheckRating;
  employerName: string;
  sickLeaveStartDate: string;
  sickLeaveEndDate: string;
  dischargeDate: string;
  dischargeCriteria: string;
}
  

export interface EntryForm extends BaseEntry {
  type: string;
  healthCheckRating?: HealthCheckRating;
  dischargeDate?: string;
  dischargeCriteria?: string;
  employerName?: string;
  sickLeaveStartDate?: string;
  sickLeaveEndDate?: string;
} 
