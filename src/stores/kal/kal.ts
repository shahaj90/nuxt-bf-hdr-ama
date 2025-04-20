import { defineStore } from "pinia";
import { ref } from "vue";

export const useKalStore = defineStore("kal", () => {
  const services = ref<string[]>([
    "Federal Public Service(PAP)",
    "State Public Service(PAN)",
    "Federal Statutory Body Authority(BBP)",
    "State Statutory Body Authority(BBN)",
    "Local Authorities(PBT)",
  ]);

  return { services };
});
