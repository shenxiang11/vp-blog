<script setup lang="ts">
const props = defineProps<{
  url: string
}>()
</script>

<template>
  <div class="wrapper">
    <div class="avatar">
      <div class="pic">
        <img :src="props.url" alt="">
      </div>
      <div class="pic1">
        <img :src="props.url" alt="">
      </div>
    </div>
  </div>
</template>

<style scoped>
.wrapper {
    margin: auto;
    width: 400px;
    height: 400px;
    background-color: rgb(222,221,218);
    display: flex;
    align-items: center;
    justify-content: center;
}

.avatar {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: transform 0.5s;
}

.avatar:hover .pic > img,
.avatar:hover .pic1 > img {
    transform: scale(1.5);
}

.avatar:hover {
    transform: scale(0.8);
}

.pic, .pic1 {
    box-sizing: content-box;
    width: 200px;
    height: 200px;
    transition: transform 0.5s;
}

.pic > img, .pic1 > img {
    width: 200px;
    height: 200px;
    object-fit: cover;
    transform-origin: bottom center;
    transition: transform 0.5s;
}

.pic {
    border-radius: 50%;
    border: 2px solid #0f0f0f;
    overflow: hidden;
}

.pic1 {
    position: absolute;
    top: -50%;
    border: 2px solid transparent;
    overflow: hidden;
}

.pic1 > img {
    position: absolute;
    border-radius: 50%;
    top: calc(50% + 2px);
}
</style>
