<template>
  <div class="container">
    <search-competency-owner
      :search-button-options="searchButtonOptions"
      :reset-button-options="searchResetButtonOptions"
      @onSearch="onSearch"
      @onSearchReset="onSearchReset"
    />
  </div>
</template>

<script setup lang="ts">
useHead({
  title: "KAL - List",
});

import type { ISearchCompetencyOwner } from "@/types/kal";
import { useHead } from "nuxt/app";
import { useI18n } from "vue-i18n";
import SearchCompetencyOwner from "./components/SearchCompetencyOwner.vue";

const { t } = useI18n();

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
</script>
