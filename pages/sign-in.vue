<template>
  <div>
    {{ form_data }}
    <form>
      <DaisyInput v-model="form_data.email" :label="'Email'" />

      <label for="password">Password:</label>
      <input
        type="password"
        id="password"
        name="password"
        placeholder="Enter your password"
      />

      <button class="bg-primary" type="submit">Sign In</button>
    </form>
  </div>
</template>
<script setup lang="ts">
import { ref } from "vue";

const form_data = ref({ email: "" });
</script>

