export interface IAgencySearchForm {
  agency: string;
}

export interface IDivisionSearchForm {
  division: string;
}

export interface IAgency {
  id: string;
  name: string;
}

export interface IDivision {
  id: number;
  name: string;
}

export interface IAgencyList {
  dataField: string;
  caption: string;
  dataType: string;
  format?: { type: string };
  width?: number;
}

export interface ICompetencyList {
  dataField: string;
  caption: string;
  dataType: string;
  format?: { type: string };
  width?: number;
}

export interface ICompetency {
  id: number;
  owner: string;
  number: string;
  identity: string;
  position: string;
  grade: string;
  division: string;
  startDate: Date;
  expirationDate: Date;
  status: string;
  determinationStatus: string;
  notes: string;
  documents: string;
  updateDateTime: Date;
  selfReportingDate: Date;
}

export interface IForm {
  id: number;
  name: string;
  value: Date;
  status: string;
}
