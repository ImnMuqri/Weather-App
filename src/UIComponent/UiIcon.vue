<template>
  <div :class="['flex items-center justify-center', customClass]">
    <font-awesome-icon
      :icon="icon"
      :class="[sizeClass, colorClass]"
      :style="iconStyle" />
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import type { PropType } from "vue";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";

import {
  IconDefinition,
  faUser,
  faMagnifyingGlass,
  faPenToSquare,
  faChevronLeft,
  faCloudSunRain,
  faChevronRight,
  faCloudSun,
  faTrashCan,
} from "@fortawesome/free-solid-svg-icons";

// Adding icons to the library
library.add(
  faUser,
  faMagnifyingGlass,
  faPenToSquare,
  faChevronLeft,
  faChevronRight,
  faCloudSunRain,
  faCloudSun,
  faTrashCan
);

const props = defineProps({
  icon: {
    type: [String, Object] as PropType<string[] | IconDefinition>, // Allow both string and IconDefinition
    required: true,
  },
  size: {
    type: String,
    default: "",
  },
  color: {
    type: String,
    default: "",
  },
  customClass: {
    type: String,
    default: "",
  },
});

const sizeClass = computed(() => (props.size ? `fa-${props.size}` : ""));
const colorClass = computed(() => props.color);
const iconStyle = { margin: "0.5rem" };
</script>
