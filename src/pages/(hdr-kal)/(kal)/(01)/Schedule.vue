<template>
  <div class="container">
    <DxDataGrid
      :data-source="data"
      key-expr="id"
      :show-borders="true"
      :column-auto-width="true"
      :editing="{
        mode: 'cell',
        allowUpdating: true,
      }"
      :selected-row-keys="selectedItemKeys"
      @selection-changed="onSelectionChanged"
      @row-updated="onRowUpdated"
    >
      <!-- Name Column -->
      <DxColumn data-field="name" caption="Name/Day" :allow-editing="false" />

      <!-- Week Columns -->
      <template v-for="weekRow in weekRows">
        <DxColumn v-for="week in weekRow" :key="`W${week}`" :caption="`Week ${week}`">
          <!-- Day Columns with Day + Date -->
          <DxColumn
            v-for="(dateObj, i) in getWeekDates(week)"
            :key="dateObj.key"
            :data-field="dateObj.key"
            :caption="dateObj.label"
            data-type="number"
          />
          <!-- Weekly SUM -->
          <DxColumn
            :key="`W${week}_SUM`"
            caption="SUM"
            :allow-editing="false"
            :calculate-cell-value="(row) => calculateWeekSum(row, week)"
          />
        </DxColumn>
      </template>
    </DxDataGrid>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { DxDataGrid, DxColumn, type DxDataGridTypes } from "devextreme-vue/data-grid";
import { format, addDays } from "date-fns";

const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
const startDate = new Date(2025, 3, 1); // April 1, 2025

const selectedItemKeys = ref<number[]>([]);

const onSelectionChanged = (e: DxDataGridTypes.SelectionChangedEvent<any, number>) => {
  selectedItemKeys.value = e.selectedRowKeys;
  console.log("Selected Row Keys:", e.selectedRowKeys);
};

// Grid Data
const data = ref(
  Array.from({ length: 10 }, (_, i) => {
    const id = i + 1;
    const row: any = {
      id,
      name: `PK ${id}`,
    };
    for (let week = 1; week <= 4; week++) {
      for (let day = 0; day < 7; day++) {
        const date = addDays(startDate, (week - 1) * 7 + day);
        const key = `W${week}_${format(date, "EEE")}`;
        row[key] = Math.floor(Math.random() * 10);
      }
    }
    return row;
  })
);

// Calculate weekly sum
function calculateWeekSum(row: any, week: number): number {
  return getWeekDates(week).reduce((sum, d) => sum + (row[d.key] || 0), 0);
}

// Generate day+date columns
function getWeekDates(week: number) {
  return Array.from({ length: 7 }, (_, i) => {
    const date = addDays(startDate, (week - 1) * 7 + i);
    return {
      key: `W${week}_${format(date, "EEE")}`,
      label: `${format(date, "EEE")} (${format(date, "MMM d")})`,
    };
  });
}

// Week layout
const weekRows = ref([
  [1, 2],
  [3, 4],
]);

// Cell value changed handler (no Axios, just logging)
function onRowUpdated(event: any) {
  const updatedData = event.data;
  const updatedField = event.column.dataField;
  const updatedValue = event.value;

  console.log("✅ Cell Updated:");
  console.log("Row ID:", updatedData.id);
  console.log("Field:", updatedField);
  console.log("New Value:", updatedValue);

  // You can add your fetch/axios/fetch API here later
}
</script>
