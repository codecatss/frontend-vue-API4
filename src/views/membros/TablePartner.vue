<script setup>
import { VDataTable } from 'vuetify/labs/VDataTable'

const recentDevicesHeaders = [
  {
    title: 'BROWSER',
    key: 'browser',
  },
  {
    title: 'DEVICE',
    key: 'device',
  },
  {
    title: 'LOCATION',
    key: 'location',
  },
  {
    title: 'RECENT ACTIVITY',
    key: 'recentActivity',
  },
  {
    title: 'PORCENTAGEM',
    key: 'percentage',
  },
]

const recentDevices = [
  {
    browser: 'Chrome on Windows',
    device: 'HP Spectre 360',
    location: 'New York, NY',
    recentActivity: '28 Apr 2022, 18:20',
    percentage: 10,
    deviceIcon: {
      icon: 'bxl-windows',
      color: 'primary',
    },
  },
  {
    browser: 'Chrome on iPhone',
    device: 'iPhone 12x',
    location: 'Los Angeles, CA',
    recentActivity: '20 Apr 2022, 10:20',
    percentage: 30,
    deviceIcon: {
      icon: 'bx-mobile',
      color: 'error',
    },
  },
  {
    browser: 'Chrome on Android',
    device: 'Oneplus 9 Pro',
    location: 'San Francisco, CA',
    recentActivity: '16 Apr 2022, 04:20',
    percentage: 50,
    deviceIcon: {
      icon: 'bxl-android',
      color: 'success',
    },
  },
  {
    browser: 'Chrome on MacOS',
    device: 'Apple iMac',
    location: 'New York, NY',
    recentActivity: '28 Apr 2022, 18:20',
    percentage: 70,
    deviceIcon: {
      icon: 'bxl-apple',
      color: 'secondary',
    },
  },
  {
    browser: 'Chrome on Windows',
    device: 'HP Spectre 360',
    location: 'Los Angeles, CA',
    recentActivity: '20 Apr 2022, 10:20',
    percentage: 90,
    deviceIcon: {
      icon: 'bxl-windows',
      color: 'primary',
    },
  },
  {
    browser: 'Chrome on Android',
    device: 'Oneplus 9 Pro',
    location: 'San Francisco, CA',
    recentActivity: '16 Apr 2022, 04:20',
    percentage: 20,
    deviceIcon: {
      icon: 'bxl-android',
      color: 'success',
    },
  },
]

</script>

<template>
  <VRow>
    <VCol cols="12">
      <VCard title="Recent Devices">
        <VDataTable
          :headers="recentDevicesHeaders"
          :items="recentDevices"
          class="text-no-wrap rounded-0 text-sm"
        >
          <template #item.browser="{ item }">
            <div class="d-flex">
              <VIcon
                start
                :icon="item.raw.deviceIcon.icon"
                :color="item.raw.deviceIcon.color"
              />
              <span class="text-high-emphasis text-base">
                {{ item.raw.browser }}
              </span>
            </div>
          </template>
          <template #item.percentage="{ item }">
            <div class="progress-bar-wrapper">
              <div class="progress-bar" :style="{ width: item.raw.percentage + '%' }"></div>
            </div>
          </template>
          <template #bottom />
        </VDataTable>
      </VCard>
    </VCol>
  </VRow>
</template>

<style scoped>
.progress-bar-wrapper {
  width: 100px;
  height: 10px;
  background-color: #f0f0f0;
  margin-left: 10px;
}

.progress-bar {
  height: 100%;
  background-color: #007bff;
}
</style>
