/* eslint-disable @typescript-eslint/no-explicit-any */
import { defineStore } from "pinia";

export const useAgencyStore = defineStore("agency", {
  state: () => ({
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
    setAgency(records: any) {
      this.agencies.push(...records);
    },

    getAgency() {
      return this.agencies;
    },
    resetAgency() {
      this.agencies = [];
    },
  },
  persist: true,
});
