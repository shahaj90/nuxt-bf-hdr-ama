<template>
  <div class="container">
    <!-- Search Form -->
    <AgencySearchForm
      :search-button-options="searchButtonOptions"
      :reset-button-options="resetButtonOptions"
    />

    <!-- Grid -->
    <div>
      <h2 class="text-2xl font-semibold mb-4">Check-in/Check-out for Agencies</h2>
      <DataGrid
        :key="datagridKey"
        :columns="columns"
        :records="records"
        :add-new-button="true"
        :action-button="true"
        @addNew="addNewRecord"
        @onEdit="onEdit"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
useHead({
  title: "AMA - Administrator",
});

import { useHead } from "nuxt/app";
import { useI18n } from "vue-i18n";
import DataGrid from "./components/DataGrid.vue";
import { useAgencyStore } from "@/stores/ama/agency";
import { ref } from "vue";
import { storeToRefs } from "pinia";
import type { AgencyList } from "@/types/ama";
import AgencySearchForm from "./components/AgencySearchForm.vue";

const { t } = useI18n();
const agencyStore = useAgencyStore();
const { agencies } = storeToRefs(agencyStore);
const records = agencies;
const datagridKey = ref(0);

const searchButtonOptions = {
  text: t("Search"),
  useSubmitBehavior: true,
  type: "default",
  stylingMode: "contained",
  icon: "search",
  class: "mt-4 ml-4",
  onClick: () => {},
};

const resetButtonOptions = {
  text: t("Reset"),
  useSubmitBehavior: true,
  type: "danger",
  stylingMode: "contained",
  icon: "home",
  class: "mt-4",
  onClick: () => {},
};

const columns: AgencyList[] = [
  {
    dataField: "id",
    caption: "Sl",
    dataType: "string",
    width: 60,
  },
  {
    dataField: "name",
    caption: "Name of Determination",
    dataType: "string",
  },
  {
    dataField: "value",
    caption: "Determination Value",
    dataType: "datetime",
    format: { type: "shortDateShortTime" },
  },
  {
    dataField: "status",
    caption: "Determination Status",
    dataType: "string",
  },
];

const onSearch = (param: AgencySearchForm) => {
  if (!param) {
    agencyStore.getAgency();
    gridReload();
    return;
  }

  const filtered = attendanceRecords.value.filter((record) => {
    if (status && type) {
      return (
        record.status.toLowerCase() === status.toLowerCase() &&
        record.type.toLowerCase() === type.toLowerCase()
      );
    } else if (status) {
      return record.status.toLowerCase() === status.toLowerCase();
    } else if (type) {
      return record.type.toLowerCase() === type.toLowerCase();
    } else {
      return false;
    }
  });

  attendanceStore.records = filtered;
};

const addNewRecord = () => {
  agencyStore.setAgency([
    {
      id: 4,
      name: "Agency 4",
      value: "Value 4",
      status: "Active",
    },
  ]);

  gridReload();
};

const gridReload = () => {
  datagridKey.value++;
};

const onEdit = (record): void => {};
</script>
