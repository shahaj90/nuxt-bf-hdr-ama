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
          items: agencyStore.agencyList.map((agency) => agency.name),
          stylingMode: 'outlined',
          width: '20em',
        }"
      />
      <DxItem
        :button-options="{ ...searchButtonOptions, onClick: search }"
        item-type="button"
        css-class="mt-6 ml-4"
        horizontal-alignment="right"
      />
      <DxItem
        :button-options="{ ...resetButtonOptions, onClick: reset }"
        item-type="button"
        css-class="mt-6 mr-[-10px]"
        horizontal-alignment="left"
      />
    </DxForm>
  </fieldset>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { DxForm, DxSimpleItem, DxItem } from "devextreme-vue/form";
import type { IAgencySearchForm } from "@/types/ama";
import { useAgencyStore } from "@/stores/ama/agency";

// Store
const agencyStore = useAgencyStore();

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
  (e: "search", form: IAgencySearchForm): void;
  (e: "reset"): void;
}>();

// Reactive form
const agencySearchForm = ref<IAgencySearchForm>({
  agency: "",
});

const search = () => {
  emit("search", agencySearchForm.value);
};

const reset = () => {
  emit("reset");
};
</script>
