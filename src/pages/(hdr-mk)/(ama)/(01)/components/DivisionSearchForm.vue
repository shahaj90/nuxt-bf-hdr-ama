<!-- components/AgencySearchForm.vue -->
<template>
  <fieldset
    class="border border-gray-300 rounded-lg p-4 mb-6 relative bg-white w-full max-w-3xl mx-auto"
  >
    <legend class="font-semibold text-lg px-2 ml-2">{{ $t("Search Setting") }}</legend>
    <DxForm
      :form-data="searchForm"
      label-location="top"
      :col-count="3"
      :min-col-width="200"
      :align-item-labels="true"
      :show-colon-after-label="true"
      class="search-form mb-4 ml-[10em]"
    >
      <DxSimpleItem
        data-field="division"
        editor-type="dxSelectBox"
        :label="{ text: $t('Division') }"
        :editor-options="{
          items: agencyStore.divisionList.map((item) => item.name),
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
import type { IDivisionSearchForm } from "@/types/ama";
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
  (e: "search", form: IDivisionSearchForm): void;
  (e: "reset"): void;
}>();

// Reactive form
const searchForm = ref<IDivisionSearchForm>({
  division: "",
});

const search = () => {
  emit("search", searchForm.value);
};

const reset = () => {
  emit("reset");
};
</script>
