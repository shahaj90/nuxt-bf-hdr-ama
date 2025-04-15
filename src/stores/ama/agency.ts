/* eslint-disable @typescript-eslint/no-explicit-any */
import { defineStore } from "pinia";

export const useAgencyStore = defineStore("agency", {
  state: () => ({
    agencyList: [
      {
        id: 1,
        name: "Agency 1",
      },
      {
        id: 2,
        name: "Agency 2",
      },
      {
        id: 3,
        name: "Agency 3",
      },
    ],
    agencies: [
      {
        id: 1,
        name: "Agency 1",
        value: "Value 1",
        status: "Active",
      },
      {
        id: 2,
        name: "Agency 2",
        value: "Value 2",
        status: "Inactive",
      },
      {
        id: 3,
        name: "Agency 3",
        value: "Value 3",
        status: "Active",
      },
    ],
  }),
  actions: {
    getAgency() {
      return this.agencies;
    },
    setAgency(records: any) {
      this.agencies.push(...records);
    },
    resetAgency() {
      this.agencies = [];
    },
  },
  persist: true,
});
