<!-- eslint-disable @typescript-eslint/no-explicit-any -->
<template>
  <DxDataGrid
    ref="dataGridRef"
    :data-source="records"
    :show-borders="true"
    :key-expr="'id'"
    :height="550"
  >
    <DxToolbar>
      <DxItem
        v-if="addNewButton"
        location="before"
        widget="dxButton"
        :options="{
          icon: 'add',
          text: 'Add New',
          onClick: addNewRecord,
        }"
      />
      <DxItem name="searchPanel" />
      <DxItem
        location="after"
        widget="dxButton"
        :options="{
          icon: 'export',
          onClick: onExportToExcel,
        }"
      />
      <DxItem
        location="after"
        widget="dxButton"
        :options="{
          icon: 'print',
          onClick: onPrintGrid,
        }"
      />
    </DxToolbar>
    <DxColumn
      v-for="(column, index) in columns"
      :key="index"
      :data-field="column.dataField"
      :caption="column.caption"
      :data-type="column.dataType"
      :format="column.format"
      v-bind="column.width ? { width: column.width } : {}"
    />
    <DxColumn v-if="actionButton" caption="Action" width="80" :cell-template="actionCellTemplate" />
    <DxSelection mode="multiple" show-check-boxes-mode="always" />
    <DxSearchPanel :visible="true" :width="240" />
    <DxPaging :page-size="10" />
    <DxPager :show-page-size-selector="true" :allowed-page-sizes="[10, 20, 50]" :show-info="true" />
    <DxFilterRow :visible="true" />
  </DxDataGrid>
</template>

<script lang="ts" setup>
import { defineProps, defineEmits, ref } from "vue";
import ExcelJS from "exceljs";
import { saveAs } from "file-saver";

import {
  DxDataGrid,
  DxToolbar,
  DxItem,
  DxSelection,
  DxSearchPanel,
  DxPaging,
  DxPager,
  DxColumn,
  DxFilterRow,
} from "devextreme-vue/data-grid";
import type { IForm } from "@/types/ama";

defineProps({
  columns: {
    type: Object,
    required: true,
  },
  records: {
    type: Object,
    required: true,
  },
  addNewButton: {
    type: Boolean,
    required: true,
  },
  actionButton: {
    type: Boolean,
    required: true,
  },
});

// Define event emitter
const emit = defineEmits<{
  (e: "addNewRecord"): void;
  (e: "onEdit", record: IForm): void;
}>();

const dataGridRef = ref<DxDataGrid | null>(null);

const actionCellTemplate = (cellElement: HTMLElement, cellInfo: { data: any }): void => {
  const button = document.createElement("div");
  button.className = "dx-button dx-button-normal dx-button-mode-contained dx-button-has-icon";
  button.innerHTML = '<i class="dx-icon dx-icon-edit"></i>';
  button.style.cursor = "pointer";
  button.onclick = () => edit(cellInfo.data);
  cellElement.appendChild(button);
};

const edit = (record: IForm): void => {
  emit("onEdit", record);
};

const addNewRecord = (): void => {
  emit("addNew");
};

const onPrintGrid = () => {
  const gridInstance = dataGridRef.value?.instance;
  const gridElement = gridInstance?.element();
  if (gridElement) {
    const printWindow = window.open("", "", "width=800,height=600");
    if (printWindow) {
      printWindow.document.write("<html><head><title>Print</title>");
      printWindow.document.write(
        '<link rel="stylesheet" type="text/css" href="https://cdn3.devexpress.com/jslib/23.2.3/css/dx.light.css" />'
      );
      printWindow.document.write("</head><body>");
      printWindow.document.write(gridElement.outerHTML);
      printWindow.document.write("</body></html>");
      printWindow.document.close();
      printWindow.focus();
      setTimeout(() => printWindow.print(), 1000);
    }
  }
};

const onExportToExcel = () => {
  const gridInstance = dataGridRef.value?.instance;
  if (gridInstance) {
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet("Attendance Records");

    const data = gridInstance.getDataSource();
    if (!data || data.length === 0 || !Array.isArray(data._items)) {
      return;
    }

    const items = data._items;

    // Extract column headers from keys of first item
    const headers = Object.keys(items[0]);
    worksheet.addRow(headers); // Add column headers

    // Add rows with values
    const formattedData = items.map((item) => headers.map((key) => item[key]));
    worksheet.addRows(formattedData);

    workbook.xlsx
      .writeBuffer()
      .then((data) => {
        const blob = new Blob([data], {
          type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        });
        saveAs(blob, "AttendanceRecords.xlsx");
      })
      .catch((error) => {
        console.error("Error generating Excel file:", error);
      });
  }
};
</script>
