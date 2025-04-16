import type { IAgency } from "@/types/ama";
import { defineStore } from "pinia";
import { ref } from "vue";

export const useAgencyStore = defineStore("agency", () => {
  const records = ref<IAgency[]>([]);
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

  function loadRecords(data: IAgency[]) {
    records.value = data;
  }

  function addRecord(record: IAgency) {
    records.value.push({ ...record, id: records.value.length + 1 });
  }

  function updateRecord(updated: IAgency) {
    const index = records.value.findIndex((r) => r.id === updated.id);
    if (index !== -1) records.value[index] = updated;
  }

  function deleteRecord(id: number) {
    records.value = records.value.filter((r) => r.id !== id);
  }

  return { records, agencyList, loadRecords, addRecord, updateRecord, deleteRecord };
});
