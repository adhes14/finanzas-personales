<template>
  <div class="about">
    <h1>This is an about page</h1>
  </div>
  <div>
    <button @click="showToast('Info message', 'info')">Show Info Toast</button>
    <button @click="showToast('Success message', 'success')">Show Success Toast</button>
    <button @click="showToast('Warning message', 'warning')">Show Warning Toast</button>
    <button @click="showToast('Danger message', 'danger')">Show Danger Toast</button>
  </div>
</template>

<script>
export default {
  methods: {
    showToast(message, type) {
      this.$toast.show(message, type);
    }
  }
};
</script>