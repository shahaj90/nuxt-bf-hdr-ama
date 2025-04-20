<template>
  <div class="container">
    <search-competency-owner
      :search-button-options="searchButtonOptions"
      :reset-button-options="searchResetButtonOptions"
      @onSearch="onSearch"
      @onSearchReset="onSearchReset"
    />

    <!-- Grid -->
    <div class="mt-15">
      <h2 class="text-2xl font-semibold mb-4 text-center">List of Competency Owners</h2>
      <DataGrid
        :columns="columns"
        :records="kalStore.records"
        :add-new-button="true"
        :action-button="true"
        @addNewRecord="addNewRecord"
        @onEdit="onEdit"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
useHead({
  title: "KAL-MWB",
});

import type { ISearchCompetencyOwner } from "@/types/kal";
import { useHead } from "nuxt/app";
import { useI18n } from "vue-i18n";
import SearchCompetencyOwner from "./components/SearchCompetencyOwner.vue";
import { onMounted, ref } from "vue";
import { useKalStore } from "@/stores/kal/kal";
import DataGrid from "./components/DataGrid.vue";

const { t } = useI18n();
const kalStore = useKalStore();

const searchButtonOptions = {
  text: t("Search"),
  useSubmitBehavior: true,
  type: "default",
  stylingMode: "contained",
  icon: "search",
  class: "mt-4 ml-4",
  onClick: () => {},
};

const searchResetButtonOptions = {
  text: t("Reset"),
  useSubmitBehavior: true,
  type: "danger",
  stylingMode: "contained",
  icon: "home",
  class: "mt-4",
  onClick: () => {},
};

const onSearch = (params: ISearchCompetencyOwner) => {};
const onSearchReset = () => {};

const columns = [
  {
    dataField: "id",
    caption: "ID",
    width: 50,
  },
  {
    dataField: "number",
    caption: "Number",
  },
  {
    dataField: "identityCardNo",
    caption: "Identity Card No.",
  },
  {
    dataField: "position",
    caption: "Position",
  },
  {
    dataField: "department",
    caption: "Department",
  },
  {
    dataField: "serviceScheme",
    caption: "Service Scheme",
  },
];

const competencyOwnerList = ref([
  {
    id: 1,
    number: 1001,
    identityCardNo: "1234567890123",
    position: "Manager",
    department: "HR",
    serviceScheme: "Executive",
  },
  {
    id: 2,
    number: 1002,
    identityCardNo: "2345678901234",
    position: "Senior Analyst",
    department: "Finance",
    serviceScheme: "Technical",
  },
  {
    id: 3,
    number: 1003,
    identityCardNo: "3456789012345",
    position: "Administrative Clerk",
    department: "Admin",
    serviceScheme: "General",
  },
  {
    id: 4,
    number: 1004,
    identityCardNo: "4567890123456",
    position: "Director",
    department: "Operations",
    serviceScheme: "Management",
  },
  {
    id: 5,
    number: 1005,
    identityCardNo: "5678901234567",
    position: "Software Engineer",
    department: "IT",
    serviceScheme: "Technical",
  },
  {
    id: 6,
    number: 1006,
    identityCardNo: "6789012345678",
    position: "Accountant",
    department: "Finance",
    serviceScheme: "Executive",
  },
  {
    id: 7,
    number: 1007,
    identityCardNo: "7890123456789",
    position: "HR Officer",
    department: "HR",
    serviceScheme: "General",
  },
  {
    id: 8,
    number: 1008,
    identityCardNo: "8901234567890",
    position: "System Administrator",
    department: "IT",
    serviceScheme: "Technical",
  },
  {
    id: 9,
    number: 1009,
    identityCardNo: "9012345678901",
    position: "Operations Manager",
    department: "Operations",
    serviceScheme: "Management",
  },
  {
    id: 10,
    number: 1010,
    identityCardNo: "0123456789012",
    position: "Receptionist",
    department: "Admin",
    serviceScheme: "General",
  },
  {
    id: 11,
    number: 1011,
    identityCardNo: "1122334455667",
    position: "Network Engineer",
    department: "IT",
    serviceScheme: "Technical",
  },
  {
    id: 12,
    number: 1012,
    identityCardNo: "2233445566778",
    position: "Finance Manager",
    department: "Finance",
    serviceScheme: "Executive",
  },
  {
    id: 13,
    number: 1013,
    identityCardNo: "3344556677889",
    position: "Training Coordinator",
    department: "HR",
    serviceScheme: "General",
  },
  {
    id: 14,
    number: 1014,
    identityCardNo: "4455667788990",
    position: "Logistics Supervisor",
    department: "Operations",
    serviceScheme: "Management",
  },
  {
    id: 15,
    number: 1015,
    identityCardNo: "5566778899001",
    position: "Database Administrator",
    department: "IT",
    serviceScheme: "Technical",
  },
]);

const addNewRecord = () => {
  console.log("addNewRecord");
};

const onEdit = () => {
  console.log("onEdit");
};

onMounted(() => {
  kalStore.loadRecords(competencyOwnerList?.value);
});
</script>
