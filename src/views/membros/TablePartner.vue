<script setup>
import { VDataTable } from 'vuetify/labs/VDataTable'

const recentDevicesHeaders = [
  {
    title: 'Nome do Parceiro',
    key: 'browser',
  },
  {
    title: 'Estado',
    key: 'location',
  },
  {
    title: 'OPN Track',
    key: 'track',
  },
  {
    title: 'Expertise',
    key: 'expertise',
  },
  {
    title: 'Progresso',
    key: 'percentage',
  },
  {
    title: 'Deadline',
    key: 'deadline',
  },
]

const recentDevices = [
  {
    browser: 'Chrome on Windows',
    track: 'Cloud Service',
    expertise: 'Oracle Cloud Platform Integration',
    location: 'New York, NY',
    percentage: 10,
    deadline: '10 Dias',
    deviceIcon: {
      icon: 'bxl-windows',
      color: 'primary',
    },
  },
  {
    browser: 'Chrome on iPhone',
    track: 'Cloud Sell',
    expertise: 'CSSE: AI / Machine Learning',
    location: 'Los Angeles, CA',
    percentage: 30,
    deadline: '15 Dias',
    deviceIcon: {
      icon: 'bx-mobile',
      color: 'error',
    },
  },
  {
    browser: 'Chrome on Android',
    track: 'Cloud Build & Service',
    expertise: 'Dev Ops on Oracle Cloud',
    location: 'San Francisco, CA',
    percentage: 50,
    deadline: '20 Dias',
    deviceIcon: {
      icon: 'bxl-android',
      color: 'success',
    },
  },
  {
    browser: 'Chrome on MacOS',
    track: 'License and Hardware',
    expertise: 'Oracle Database to Oracle Cloud',
    location: 'New York, NY',
    percentage: 70,
    deadline: '25 Dias',
    deviceIcon: {
      icon: 'bxl-apple',
      color: 'secondary',
    },
  },
  {
    browser: 'Chrome on Windows',
    track: 'Cloud Service',
    expertise: 'Oracle Cloud Platform Business Analytics',
    location: 'Los Angeles, CA',
    percentage: 90,
    deadline: '30 Dias',
    deviceIcon: {
      icon: 'bxl-windows',
      color: 'primary',
    },
  },
  {
    browser: 'Chrome on Android',
    track: 'Cloud Sell',
    expertise: 'Oracle Cloud Platform Data Management',
    location: 'San Francisco, CA',
    percentage: 20,
    deadline: '35 Dias',
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
  background-color: #bcbcbc;
  margin-left: 10px;
  border-radius: 5px;
}

.progress-bar {
  height: 100%;
  background-color: #ff3939;
  border-radius: 5px;
}
</style>
