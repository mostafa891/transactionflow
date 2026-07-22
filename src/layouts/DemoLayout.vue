<script setup lang="ts">
import { ref, onMounted } from 'vue'
import DemoSidebar from '@features/demo/components/DemoSidebar.vue'
import DemoTopbar from '@features/demo/components/DemoTopbar.vue'
import DemoGuideBar from '@features/demo/components/DemoGuideBar.vue'
import DemoWelcomeModal from '@features/demo/components/DemoWelcomeModal.vue'

const showWelcomeModal = ref(false)

onMounted(() => {
  const hasSeenModal = sessionStorage.getItem('tf_demo_welcome')
  if (!hasSeenModal) {
    showWelcomeModal.value = true
  }
})

function closeWelcomeModal() {
  showWelcomeModal.value = false
  sessionStorage.setItem('tf_demo_welcome', 'true')
}
</script>

<template>
  <div class="demo-layout">
    <DemoSidebar />
    <div class="demo-layout__main">
      <DemoTopbar />
      <DemoGuideBar />
      <main class="demo-layout__content">
        <router-view />
      </main>
    </div>

    <!-- Welcome Modal -->
    <DemoWelcomeModal
      :show="showWelcomeModal"
      @close="closeWelcomeModal"
      @start-tour="closeWelcomeModal"
    />
  </div>
</template>

<style scoped>
.demo-layout {
  display: flex;
  min-height: 100vh;
  background-color: var(--tf-bg);
}

.demo-layout__main {
  flex: 1;
  display: flex;
  flex-direction: column;
  min-width: 0;
}

.demo-layout__content {
  flex: 1;
  padding: var(--tf-space-6);
  overflow-y: auto;
}
</style>
