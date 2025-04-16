export interface IAgencySearchForm {
  agency: string;
}

export interface IAgency {
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

export interface IForm {
  id: number;
  name: string;
  value: Date;
  status: string;
}
