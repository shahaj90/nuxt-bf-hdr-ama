export interface AgencySearchForm {
  agency: string;
}

export interface Agency {
  id: number;
  name: string;
}

export interface AgencyList {
  dataField: string;
  caption: string;
  dataType: string;
  format?: { type: string };
  width?: number;
}
