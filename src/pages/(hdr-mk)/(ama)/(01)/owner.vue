<template>
  <div class="container">
    <!-- Grid for competency owners -->
    <div>
      <h2 class="text-2xl font-semibold mb-4">List of Selected Competency Owners</h2>
      <DataGrid
        :columns="columns"
        :records="agencyStore.competency"
        :add-new-button="false"
        :action-button="false"
      />
    </div>

    <!-- Check in/Check out competency grid -->
    <div class="mt-10">
      <h2 class="text-2xl font-semibold mb-4">List of Selected Competency Owners</h2>
      <DataGrid
        :columns="ownerColumns"
        :records="agencyStore.records"
        :add-new-button="true"
        :action-button="false"
        @addNewRecord="addNewRecord"
        @onEdit="onEdit"
      />
    </div>

    <!-- Popup -->
    <dxPopup
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
              data-field="number"
              editor-type="dxSelectBox"
              :label="{ text: $t('Emp Number') }"
              :editor-options="{
                items: agencyStore.competency.map((record) => record.number),
                stylingMode: 'outlined',
                width: '20em',
              }"
              :validation-rules="[{ type: 'required', message: 'Status is required' }]"
            />
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
    </dxPopup>
  </div>
</template>

<script lang="ts" setup>
useHead({
  title: "AMA - Officer",
});

import { useHead } from "nuxt/app";
import { onMounted, ref } from "vue";
import DataGrid from "./components/DataGrid.vue";
import { useAgencyStore } from "@/stores/ama/agency";
import type { IAgencyList, ICompetencyList, IForm } from "@/types/ama";
import { DxPopup } from "devextreme-vue/popup";
import { DxForm, DxGroupItem, DxItem, DxSimpleItem } from "devextreme-vue/form";
import notify from "devextreme/ui/notify";

const agencyStore = useAgencyStore();
const popupVisible = ref(false);
const operationType = ref("Add");
const formRef = ref(null);

onMounted(() => {
  agencyStore.loadCompetency(records.value);
  agencyStore.loadRecords(ownerRecords.value);
});

const columns: ICompetencyList[] = [
  {
    dataField: "id",
    caption: "Sl",
    dataType: "string",
    width: 60,
  },
  {
    dataField: "number",
    caption: "Number",
    dataType: "string",
  },
  {
    dataField: "division",
    caption: "division",
    dataType: "string",
  },
  {
    dataField: "identity",
    caption: "Identity Number",
    dataType: "string",
  },
  {
    dataField: "position",
    caption: "Position",
    dataType: "string",
  },
  {
    dataField: "grade",
    caption: "Grade",
    dataType: "string",
  },
  {
    dataField: "selfReportingDate",
    caption: "Self Reporting Date",
    dataType: "datetime",
    format: { type: "shortDateShortTime" },
  },
];

const records = ref([
  {
    id: 1,
    owner: "John Doe",
    number: "EMP-1001",
    identity: "987654321",
    position: "Software Engineer",
    grade: "G7",
    division: "Engineering",
    startDate: new Date("2023-01-15"),
    expirationDate: new Date("2025-01-15"),
    status: "Active",
    determinationStatus: "Verified",
    notes: "No issues reported.",
    documents: "contract.pdf",
    updateDateTime: new Date("2025-04-01T09:00:00Z"),
    selfReportingDate: new Date("2025-03-28"),
  },
  {
    id: 2,
    owner: "Jane Smith",
    number: "EMP-1002",
    identity: "123456789",
    position: "Project Manager",
    grade: "G9",
    division: "Management",
    startDate: new Date("2022-06-01"),
    expirationDate: new Date("2024-06-01"),
    status: "On Leave",
    determinationStatus: "Pending",
    notes: "On maternity leave.",
    documents: "leave_form.pdf",
    updateDateTime: new Date("2025-04-05T10:30:00Z"),
    selfReportingDate: new Date("2025-04-01"),
  },
  {
    id: 3,
    owner: "Ali Khan",
    number: "EMP-1003",
    identity: "556677889",
    position: "UX Designer",
    grade: "G6",
    division: "Design",
    startDate: new Date("2021-09-10"),
    expirationDate: new Date("2025-09-10"),
    status: "Active",
    determinationStatus: "Verified",
    notes: "Recently promoted.",
    documents: "promotion_letter.pdf",
    updateDateTime: new Date("2025-03-30T14:15:00Z"),
    selfReportingDate: new Date("2025-03-29"),
  },
  {
    id: 4,
    owner: "Maria Lopez",
    number: "EMP-1004",
    identity: "334455667",
    position: "QA Analyst",
    grade: "G5",
    division: "Quality Assurance",
    startDate: new Date("2020-11-20"),
    expirationDate: new Date("2024-11-20"),
    status: "Terminated",
    determinationStatus: "Rejected",
    notes: "Contract ended.",
    documents: "termination_notice.pdf",
    updateDateTime: new Date("2025-04-10T08:00:00Z"),
    selfReportingDate: new Date("2025-04-10"),
  },
  {
    id: 5,
    owner: "David Zhang",
    number: "EMP-1005",
    identity: "778899001",
    position: "DevOps Engineer",
    grade: "G8",
    division: "Infrastructure",
    startDate: new Date("2023-05-05"),
    expirationDate: new Date("2026-05-05"),
    status: "Active",
    determinationStatus: "Verified",
    notes: "Handles CI/CD pipelines.",
    documents: "id_card.pdf",
    updateDateTime: new Date("2025-04-12T16:45:00Z"),
    selfReportingDate: new Date("2025-04-12"),
  },
]);

const ownerColumns: IAgencyList[] = [
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

const ownerRecords = ref([
  {
    id: 1,
    name: "Start Date",
    value: "01/01/2012",
    status: "Active",
  },
  {
    id: 2,
    name: "End Date",
    value: "01/01/2026",
    status: "Active",
  },
  {
    id: 3,
    name: "Agency 3",
    value: "Value 3",
    status: "Active",
  },
]);

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
  number: "",
  name: "",
  value: new Date(),
  status: "",
});

const addNewRecord = () => {
  saveButtonOptions.value.text = "Save";
  form.value = {
    number: "",
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
  } else {
    message = "Setting information update successfully";
    agencyStore.updateRecord({ ...change, id: change.id });
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
