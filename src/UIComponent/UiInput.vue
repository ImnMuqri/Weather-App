<template>
  <div
    class="w-full text-left bg-slate-100 rounded-lg px-3 py-2 focus-within:ring focus-within:ring-blue-300 focus-within:outline-none">
    <label
      v-if="label"
      :for="id"
      class="block text-[12px] font-medium text-gray-700">
      {{ label }}
    </label>
    <input
      :id="id"
      :type="type"
      :value="modelValue"
      :placeholder="placeholder"
      :disabled="disabled ? 'true' : undefined"
      :class="[
        'block w-full bg-transparent focus:outline-none text-[12px]',
        disabled
          ? 'text-gray-500 cursor-not-allowed'
          : 'text-black cursor-text',
      ]"
      @input="updateValue($event)" />
  </div>
</template>

<script setup lang="ts">
import { defineProps, defineEmits } from "vue";

defineProps<{
  modelValue: string;
  label?: string;
  type?: string;
  placeholder?: string;
  id?: string;
  disabled: Boolean;
}>();

const emit = defineEmits(["update:modelValue"]);

const updateValue = (event: Event) => {
  const target = event.target as HTMLInputElement;
  emit("update:modelValue", target.value);
};
</script>
