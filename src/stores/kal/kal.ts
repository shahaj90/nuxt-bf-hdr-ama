import type { ICompetencyOwnerList } from "@/types/kal";
import { defineStore } from "pinia";
import { ref } from "vue";

export const useKalStore = defineStore("kal", () => {
  const records = ref<ICompetencyOwnerList[]>([]);
  const services = ref<string[]>([
    "Executive",
    "Technical",
    "General",
    "Management",
    "Executive",
    "General",
    "Technical",
    "Management",
    "General",
    "Technical",
    "Executive",
    "General",
    "Management",
    "Technical",
  ]);

  const divisions = ref<string[]>(["HR", "Finance", "Admin", "Operations", "IT"]);

  function loadRecords(data: ICompetencyOwnerList[]) {
    records.value = data;
  }

  function addRecord(record: ICompetencyOwnerList) {
    records.value.push({ ...record, id: records.value.length + 1 });
  }

  function updateRecord(updated: ICompetencyOwnerList) {
    const index = records.value.findIndex((r) => r.id === updated.id);
    if (index !== -1) records.value[index] = updated;
  }

  function deleteRecord(id: number) {
    records.value = records.value.filter((r) => r.id !== id);
  }

  return { records, services, divisions, loadRecords, addRecord, updateRecord, deleteRecord };
});
