<template>
  <div class="container">
    <!-- Search Form -->
    <AgencySearchForm
      :search-button-options="searchButtonOptions"
      :reset-button-options="resetButtonOptions"
      @search="onSearch"
      @reset="onReset"
    />

    <!-- Grid -->
    <div>
      <h2 class="text-2xl font-semibold mb-4">Check-in/Check-out for Agencies</h2>
      <DataGrid
        :columns="columns"
        :records="agencyStore.records"
        :add-new-button="true"
        :action-button="true"
        @addNewRecord="addNewRecord"
        @onEdit="onEdit"
      />
    </div>

    <!-- Popup -->
    <DxPopup
      v-model:visible="popupVisible"
      :width="700"
      :height="380"
      :show-title="true"
      :drag-enabled="true"
      :close-on-outside-click="false"
    >
      <template #default>
        <fieldset
          class="border border-gray-300 rounded-lg p-4 mb-6 relative bg-white w-full max-w-7xl mx-auto"
        >
          <legend class="font-semibold text-lg px-2 ml-2"></legend>
          <DxForm
            ref="formRef"
            :form-data="form"
            label-location="top"
            :col-count="2"
            :min-col-width="150"
            :align-item-labels="true"
            :show-colon-after-label="true"
            class="search-form mb-4"
          >
            <DxSimpleItem
              data-field="name"
              editor-type="dxTextBox"
              :label="{ text: 'Name' }"
              :editor-options="{ stylingMode: 'outlined' }"
              :validation-rules="[{ type: 'required', message: 'Name is required' }]"
            />
            <DxSimpleItem
              data-field="value"
              editor-type="dxDateBox"
              :label="{ text: 'Value' }"
              :editor-options="{
                type: 'datetime',
                displayFormat: 'dd/MM/yyyy HH:mm',
                stylingMode: 'outlined',
              }"
              :validation-rules="[{ type: 'required', message: 'Value is required' }]"
            />
            <DxSimpleItem
              data-field="status"
              editor-type="dxSelectBox"
              :label="{ text: $t('Status') }"
              :editor-options="{
                items: ['Active', 'Inactive'],
                stylingMode: 'outlined',
                width: '20em',
              }"
              :validation-rules="[{ type: 'required', message: 'Status is required' }]"
            />
            <DxGroupItem :col-span="2" :col-count="5" />
            <DxItem
              :button-options="saveButtonOptions"
              item-type="button"
              css-class="mt-6"
              horizontal-alignment="right"
            />
            <DxItem
              :button-options="closeButtonOptions"
              item-type="button"
              css-class="mt-6"
              horizontal-alignment="left"
            />
          </DxForm>
        </fieldset>
      </template>
    </DxPopup>
  </div>
</template>

<script lang="ts" setup>
useHead({
  title: "AMA - Administrator",
});

import { useHead } from "nuxt/app";
import { useI18n } from "vue-i18n";
import { onMounted, ref } from "vue";
import DataGrid from "./components/DataGrid.vue";
import AgencySearchForm from "./components/AgencySearchForm.vue";
import { useAgencyStore } from "@/stores/ama/agency";
import type { IAgencyList, IAgencySearchForm, IForm } from "@/types/ama";
import { DxPopup } from "devextreme-vue/popup";
import { DxForm, DxGroupItem, DxItem, DxSimpleItem } from "devextreme-vue/form";
import notify from "devextreme/ui/notify";

const { t } = useI18n();
const agencyStore = useAgencyStore();
const popupVisible = ref(false);
const operationType = ref("Add");
const formRef = ref(null);

onMounted(() => {
  agencyStore.loadRecords(records.value);
});

const records = ref([
  {
    id: 1,
    name: "Agency 1",
    value: "Value 1",
    status: "Active",
  },
  {
    id: 2,
    name: "Agency 2",
    value: "Value 2",
    status: "Active",
  },
  {
    id: 3,
    name: "Agency 3",
    value: "Value 3",
    status: "Active",
  },
]);

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

const columns: IAgencyList[] = [
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

const onSearch = (agencySearchForm: IAgencySearchForm) => {
  const { agency } = agencySearchForm;

  if (!agency) {
    agencyStore.loadRecords(records.value);
    return;
  }

  const filtered = records.value.filter((record) => {
    return record.name.toLowerCase() === agency.toLowerCase();
  });

  agencyStore.records = filtered;
};

const onReset = () => {
  agencyStore.loadRecords(records.value);
};

const saveButtonOptions = ref({
  text: "Save",
  useSubmitBehavior: true,
  type: "default",
  stylingMode: "contained",
  icon: "save",
  class: "mt-4",
  onClick: () => {
    addRecord(operationType.value);
  },
});

const closeButtonOptions = {
  text: "Cancel",
  useSubmitBehavior: true,
  type: "danger",
  stylingMode: "contained",
  icon: "close",
  class: "mt-4",
  onClick: () => {
    popupVisible.value = false;
  },
};

const form = ref<IForm>({
  id: 0,
  name: "",
  value: new Date(),
  status: "",
});

const addNewRecord = () => {
  saveButtonOptions.value.text = "Save";
  form.value = {
    name: "",
    value: new Date(),
    status: "",
  };

  operationType.value = "Add";
  popupVisible.value = true;
};

const addRecord = (type: string) => {
  const result = formRef.value?.instance?.validate();
  if (!result?.isValid) {
    return;
  }

  const lastId =
    agencyStore.records.length > 0 ? agencyStore.records[agencyStore.records.length - 1].id : 0;

  const params: IForm = {
    id: type === "Add" ? lastId + 1 : form.value.id,
    name: form.value.name,
    value: form.value.value,
    status: form.value.status,
  };

  const change: IForm = {
    ...form.value,
    ...params,
  };

  let message = "Setting information save successfully";
  if (type === "Add") {
    agencyStore.addRecord(change);
    agencyStore.setAgencyList({ id: change.id, name: change.name });
  } else {
    message = "Setting information update successfully";
    agencyStore.updateRecord({ ...change, id: change.id });
    agencyStore.setUpdateAgencyList({ id: change.id, name: change.name });
  }

  agencyStore.records = [...agencyStore.records];
  popupVisible.value = false;
  notify({
    message: message,
    type: "success",
    displayTime: 3000,
    width: 350,
    position: {
      my: "top center",
      at: "top center",
      of: window,
    },
  });
};

const onEdit = (record: IForm) => {
  operationType.value = "Update";
  saveButtonOptions.value.text = "Update";
  form.value = {
    id: record.id,
    name: record.name,
    value: record.value,
    status: record.status,
  };

  popupVisible.value = true;
};
</script>
