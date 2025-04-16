import type { IAgency, ICompetency, IForm } from "@/types/ama";
import { defineStore } from "pinia";
import { ref } from "vue";

export const useAgencyStore = defineStore("agency", () => {
  const records = ref<IAgency[]>([]);
  const competency = ref<ICompetency[]>([]);
  const agencyList = ref<IAgency[]>([
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
  ]);
  const divisionList = ref<IAgency[]>([
    {
      id: 1,
      name: "Engineering",
    },
    {
      id: 2,
      name: "Management",
    },
    {
      id: 3,
      name: "Design",
    },
    {
      id: 4,
      name: "Quality Assurance",
    },
    {
      id: 5,
      name: "Infrastructure",
    },
    {
      id: 6,
      name: "Sales",
    },
  ]);

  function setAgencyList(data: IAgency[]) {
    agencyList.value.push(data);
  }

  function setUpdateAgencyList(data: IAgency[]) {
    // agencyList.value.push(data);
    const index = agencyList.value.findIndex((r) => r.id === data.id);
    if (index !== -1) agencyList.value[index] = data;
  }

  function loadRecords(data: IAgency[]) {
    records.value = data;
  }

  function loadCompetency(data: ICompetency[]) {
    competency.value = data;
  }

  function addRecord(record: IAgency) {
    records.value.push({ ...record, id: records.value.length + 1 });
  }

  function addCompetencyRecord(record: ICompetency) {
    competency.value.push({ ...record, id: competency.value.length + 1 });
  }

  function updateRecord(updated: IAgency) {
    const index = records.value.findIndex((r) => r.id === updated.id);
    if (index !== -1) records.value[index] = updated;
  }

  function updateCompetencyRecord(updated: ICompetency) {
    const index = competency.value.findIndex((r) => r.id === updated.id);
    if (index !== -1) competency.value[index] = updated;
  }

  function deleteRecord(id: number) {
    records.value = records.value.filter((r) => r.id !== id);
  }

  return {
    records,
    competency,
    agencyList,
    divisionList,
    setAgencyList,
    setUpdateAgencyList,
    loadRecords,
    loadCompetency,
    addRecord,
    addCompetencyRecord,
    updateRecord,
    updateCompetencyRecord,
    deleteRecord,
  };
});
