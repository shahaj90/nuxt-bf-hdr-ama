<template>
  <fieldset
    class="border border-gray-300 rounded-lg p-4 mb-6 relative bg-white w-full max-w-3xl mx-auto"
  >
    <legend class="font-semibold text-lg px-2 ml-2">{{ $t("Search Setting") }}</legend>
    <DxForm
      :form-data="searchForm"
      label-location="top"
      :col-count="2"
      :min-col-width="300"
      :align-item-labels="true"
      :show-colon-after-label="true"
      class="search-form mb-4 ml-[1em] mr-[1em]"
    >
      <DxSimpleItem
        data-field="name"
        editor-type="dxTextBox"
        :label="{ text: $t('Name') }"
        :editor-options="{ stylingMode: 'outlined' }"
      />
      <DxSimpleItem
        data-field="cardPangenalan"
        editor-type="dxTextBox"
        :label="{ text: $t('No. Card Pangenalan') }"
        :editor-options="{ stylingMode: 'outlined' }"
      />
      <DxSimpleItem
        data-field="jobTitle"
        editor-type="dxTextBox"
        :label="{ text: $t('Job Title') }"
        :editor-options="{ stylingMode: 'outlined' }"
      />
      <DxSimpleItem
        data-field="division"
        editor-type="dxSelectBox"
        :label="{ text: $t('Division') }"
        :editor-options="{
          items: kalStore.divisions.map((item) => item),
          stylingMode: 'outlined',
        }"
      />
      <DxSimpleItem
        data-field="serviceSchema"
        editor-type="dxSelectBox"
        :label="{ text: $t('Search Schema') }"
        :editor-options="{
          items: kalStore.services.map((item: string) => item),
          stylingMode: 'outlined',
        }"
      />
      <!-- Add search and reset buttons -->
      <DxGroupItem :col-span="4" :col-count="2" />
      <DxItem
        :button-options="{ ...searchButtonOptions, onClick: search }"
        item-type="button"
        horizontal-alignment="right"
        css-class="ml-2 mt-4"
      />
      <DxItem
        :button-options="{ ...resetButtonOptions, onClick: reset }"
        item-type="button"
        horizontal-alignment="left"
        css-class="ml-2 mt-4"
      />
    </DxForm>
  </fieldset>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { DxForm, DxSimpleItem, DxItem, DxGroupItem } from "devextreme-vue/form";
import type { ISearchCompetencyOwner } from "@/types/kal";
import { useAgencyStore } from "@/stores/ama/agency";
import { useKalStore } from "@/stores/kal/kal";

// Store
const agencyStore = useAgencyStore();
const kalStore = useKalStore();

// Props
defineProps({
  searchButtonOptions: {
    type: Object,
    required: true,
  },
  resetButtonOptions: {
    type: Object,
    required: true,
  },
});

// Emits
const emit = defineEmits<{
  (e: "onSearch", form: ISearchCompetencyOwner): void;
  (e: "onSearchReset"): void;
}>();

// Reactive form
const searchForm = ref<ISearchCompetencyOwner>({
  name: "",
  cardPangenalan: "",
  jobTitle: "",
  division: "",
  serviceSchema: "",
});

const search = () => {
  emit("onSearch", searchForm.value);
};

const reset = () => {
  emit("onSearchReset");
};
</script>
