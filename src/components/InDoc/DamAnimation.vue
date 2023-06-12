<script setup lang="ts">

</script>

<template>
  <div class="wrapper">
    <div class="circle"></div>
  </div>
</template>

<style scoped>
.wrapper {
    height: 300px;
}

.circle {
    width: 20px;
    height: 20px;
    background-color: red;
    border-radius: 50%;

    offset-path: path('M1,10 C124.478963,264.492025 226.386169,319.875549 306.721619,176.150574 C387.057068,32.4255981 514.425822,-22.9579264 688.827881,10');
    animation: move 3s linear infinite;
}

@keyframes move {
  to {
    offset-distance: 100%;
  }
}
</style>
