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
        :records="agencies"
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
import AgencySearchForm from "./components/AgencySearchForm.vue";
import DataGrid from "./components/DataGrid.vue";
import { useAgencyStore } from "@/stores/ama/agency";
import { ref } from "vue";
import { storeToRefs } from "pinia";

const { t } = useI18n();
const agencyStore = useAgencyStore();
const { agencies } = storeToRefs(agencyStore);
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

const columns = [
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
    filter: {
      allowSearch: true,
      searchEditorOptions: {
        mode: "contains",
      },
    },
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

const addNewRecord = () => {
  agencyStore.setAgency([
    {
      id: 4,
      name: "Agency 4",
      value: "Value 4",
      status: "Active",
    },
  ]);

  datagridKey.value++;
};

const onEdit = (record): void => {};
</script>
