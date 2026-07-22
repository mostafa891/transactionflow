<script setup lang="ts">
import LandingNavbar from '../components/LandingNavbar.vue'
import HeroSection from '../components/HeroSection.vue'
import ComparisonSection from '../components/ComparisonSection.vue'
import FeatureGrid from '../components/FeatureGrid.vue'
import HowItWorks from '../components/HowItWorks.vue'
import FaqSection from '../components/FaqSection.vue'
import CtaSection from '../components/CtaSection.vue'
import LandingFooter from '../components/LandingFooter.vue'
</script>

<template>
  <div class="home-page">
    <LandingNavbar />
    <HeroSection />
    <ComparisonSection />
    <FeatureGrid />
    <HowItWorks />
    <FaqSection />
    <CtaSection />
    <LandingFooter />
  </div>
</template>
