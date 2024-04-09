<template>
  <div class="h-100 d-flex align-center justify-space-between">
   
    <span class="d-flex align-center">
      &copy;
      {{ new Date().getFullYear() }}
      API Fatec
      <VIcon
        icon="mdi-cat"
        color="error"
        size="1.25rem"
        class="mx-1"
      />
      By <a
        href=""
        target="_blank"
        rel="noopener noreferrer"
        class="text-primary ms-1"
      >Code Cats</a>
    </span>
    <!-- 👉 Footer: right content -->
    <span class="d-md-flex gap-x-4 text-primary d-none">
      <a
        href=""
        target="noopener noreferrer"
      >License</a>

      <a
        href=""
        target="noopener noreferrer"
      >Documentation</a>
    </span>
  </div>
</template>
