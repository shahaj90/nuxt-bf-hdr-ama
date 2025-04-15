<!-- components/AgencySearchForm.vue -->
<template>
  <fieldset
    class="border border-gray-300 rounded-lg p-4 mb-6 relative bg-white w-full max-w-3xl mx-auto"
  >
    <legend class="font-semibold text-lg px-2 ml-2">{{ $t("Search Setting") }}</legend>
    <DxForm
      :form-data="agencySearchForm"
      label-location="top"
      :col-count="3"
      :min-col-width="200"
      :align-item-labels="true"
      :show-colon-after-label="true"
      class="search-form mb-4 ml-[10em]"
    >
      <DxSimpleItem
        data-field="agency"
        editor-type="dxSelectBox"
        :label="{ text: $t('Agency') }"
        :editor-options="{
          items: ['', 'Agency1', 'Agency2'],
          stylingMode: 'outlined',
          width: '20em',
        }"
      />
      <DxItem
        :button-options="searchButtonOptions"
        item-type="button"
        css-class="mt-6 ml-4"
        horizontal-alignment="right"
      />
      <DxItem
        :button-options="resetButtonOptions"
        item-type="button"
        css-class="mt-6 mr-[-10px]"
        horizontal-alignment="left"
      />
    </DxForm>
  </fieldset>
</template>

<script setup lang="ts">
import { ref, defineProps } from "vue";
import { DxForm, DxSimpleItem, DxItem } from "devextreme-vue/form";
import type { AgencySearchForm } from "@/types/ama";

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

const agencySearchForm = ref<AgencySearchForm>({
  agency: "",
});
</script>
