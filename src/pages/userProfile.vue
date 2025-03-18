<template>
  <div class="p-8 grid grid-cols-1 gap-8 text-black">
    <div class="flex items-center justify-between">
      <UiIcon
        :icon="['fa', 'chevron-left']"
        class="text-black hover:text-blue-500 cursor-pointer"
        @click="$router.push('/')" />
      <span class="text-2xl font-semibold flex-1 pr-6">Edit Profile</span>
    </div>
    <div class="grid gap-2">
      <div class="w-full flex items-center justify-center">
        <div class="relative">
          <img
            src="https://api.dicebear.com/7.x/adventurer/svg?seed=random"
            alt="Random Cartoon Avatar"
            class="w-32 h-32 bg-blue-500 rounded-full" />
          <div
            v-if="Edit"
            class="absolute bottom-0 right-2 bg-white rounded-full">
            <UiIcon
              :icon="['fa', 'pen-to-square']"
              size="sm"
              class="text-black hover:text-blue-500 cursor-pointer"
              @click="$router.push('/profile')" />
          </div>
        </div>
      </div>
      <span class="text-md font-semibold">Jane Doe</span>
      <div class="flex gap-2 w-full justify-center">
        <span class="text-md">jane@gmail.com</span>|
        <span class="text-md">+01 234 567 89</span>
      </div>
    </div>
    <div class="grid grid-cols-1 gap-4">
      <UiInput
        v-model="fullName"
        label="Full name"
        type="text"
        :disabled="!Edit"
        placeholder="Enter your full name" />

      <UiInput
        v-model="email"
        label="Email"
        type="text"
        :disabled="!Edit"
        placeholder="Enter your email address" />

      <UiInput
        v-model="phoneNumber"
        label="Phone Number"
        type="text"
        :disabled="!Edit"
        placeholder="Enter your phone number" />
    </div>
    <div class="pt-24">
      <button
        v-if="!Edit"
        class="w-full text-white rounded-lg py-2 uppercase"
        @click="Edit = true">
        Edit
      </button>
      <button
        v-else
        class="w-full text-white rounded-lg py-2 uppercase"
        @click="Edit = false">
        Submit
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
const fullName = ref("");
const email = ref("");
const phoneNumber = ref("");
const Edit = ref(false);
</script>

<style scoped></style>
