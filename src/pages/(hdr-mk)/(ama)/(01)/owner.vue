<template>
  <div class="container">
    <!-- Grid -->
    <div>
      <h2 class="text-2xl font-semibold mb-4">List of Selected Competency Owners</h2>
      <DataGrid
        :columns="columns"
        :records="agencyStore.competency"
        :add-new-button="false"
        :action-button="false"
        @addNew="addNewRecord"
        @onEdit="onEdit"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
useHead({
  title: "AMA - Officer",
});

import { useHead } from "nuxt/app";
import { useI18n } from "vue-i18n";
import { onMounted, ref } from "vue";
import DataGrid from "./components/DataGrid.vue";
import { useAgencyStore } from "@/stores/ama/agency";
import type { ICompetency, ICompetencyList, IDivisionSearchForm, IForm } from "@/types/ama";
import notify from "devextreme/ui/notify";

const { t } = useI18n();
const agencyStore = useAgencyStore();
const popupVisible = ref(false);
const operationType = ref("Add");
const formRef = ref(null);

onMounted(() => {
  agencyStore.loadCompetency(records.value);
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

const onSearch = (divisionSearchForm: IDivisionSearchForm) => {
  const { division } = divisionSearchForm;

  if (!division) {
    agencyStore.loadCompetency(records.value);
    return;
  }

  const filtered = records.value.filter((record) => {
    return record.division.toLowerCase() === division.toLowerCase();
  });

  agencyStore.competency = filtered;
};

const onReset = () => {
  agencyStore.loadCompetency(records.value);
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

const form = ref<ICompetency>({
  id: 0,
  owner: "",
  number: "",
  identity: "",
  position: "",
  grade: "",
  division: "",
  startDate: new Date(),
  expirationDate: new Date(),
  status: "",
  determinationStatus: "",
  notes: "",
  documents: "",
  updateDateTime: new Date(),
  selfReportingDate: new Date(),
});

const addNewRecord = () => {
  saveButtonOptions.value.text = "Save";
  form.value = {
    id: 0,
    owner: "",
    number: "",
    identity: "",
    position: "",
    grade: "",
    division: "",
    startDate: new Date(),
    expirationDate: new Date(),
    status: "",
    determinationStatus: "",
    notes: "",
    documents: "",
    updateDateTime: new Date(),
    selfReportingDate: new Date(),
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
    owner: form.value.owner,
    number: form.value.number,
    identity: form.value.identity,
    position: form.value.position,
    grade: form.value.grade,
    division: form.value.division,
    startDate: form.value.startDate,
    expirationDate: form.value.expirationDate,
    status: form.value.status,
    determinationStatus: form.value.determinationStatus,
    notes: form.value.notes,
    documents: form.value.documents,
    updateDateTime: form.value.updateDateTime,
    selfReportingDate: form.value.selfReportingDate,
  };

  const change: ICompetency = {
    ...form.value,
    ...params,
  };

  let message = "Setting information save successfully";
  if (type === "Add") {
    agencyStore.addCompetencyRecord(change);
  } else {
    message = "Setting information update successfully";
    agencyStore.updateCompetencyRecord({ ...change, id: change.id });
  }

  agencyStore.competency = [...agencyStore.competency];
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
    owner: record.owner,
    number: record.number,
    identity: record.identity,
    position: record.position,
    grade: record.grade,
    division: record.division,
    startDate: new Date(record.startDate),
    expirationDate: new Date(record.expirationDate),
    status: record.status,
    determinationStatus: record.determinationStatus,
    notes: record.notes,
    documents: record.documents,
    updateDateTime: new Date(record.updateDateTime),
    selfReportingDate: new Date(record.selfReportingDate),
  };

  popupVisible.value = true;
};
</script>
