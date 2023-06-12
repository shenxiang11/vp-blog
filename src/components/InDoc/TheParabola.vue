<script setup lang="ts">
import { nextTick, onMounted, ref } from "vue";

const cart = ref<HTMLDivElement | null>(null);
const ball = ref<HTMLDivElement | null>(null);
const ballInner = ref<HTMLDivElement | null>(null);

function handleClick(e) {
  const boundBtn = e.target.getBoundingClientRect();
  const boundCart = cart.value!.getBoundingClientRect();
  const ballDom = ball.value;
  const ballInnerDom = ballInner.value;

  const offsetX = boundCart.left + boundCart.width / 2 - (boundBtn.left + boundBtn.width / 2);
  const offsetY = boundCart.top + boundCart.height / 2 - (boundBtn.top + boundBtn.height / 2);

  ballDom!.style.display = 'block';
  ballDom!.style.transform = `translate3d(0, -240px, 0)`;
  ballInnerDom!.style.transform = `translate3d(${-offsetX}px, ${-(offsetY-240)}px, 0)`;
  let rt = ballDom!.offsetHeight;

  nextTick(() => {
    ballDom!.style.transform = `translate3d(0, 0, 0)`;
    ballInnerDom!.style.transform = `translate3d(0, 0, 0)`;
  });
}

onMounted(() => {
  ball.value!.addEventListener('transitionend', function() {
    ball.value!.style.display = 'none';
  });
});
</script>

<template>
  <div class="wrapper">
    <div class="product">
      <span>商品1</span>
      <button @click="handleClick">+</button>
    </div>
    <div class="product">
      <span>商品2</span>
      <button @click="handleClick">+</button>
    </div>
    <div class="cart" ref="cart">
      购物车
      <span class="ball" ref="ball">
        <span class="inner" ref="ballInner"></span>
      </span>
    </div>
  </div>
</template>

<style scoped>
.wrapper {
    position: relative;
    padding-top: 100px;
    height: 600px;
    background-color: #f7f7f7;
}

.product {
    display: flex;
    margin-bottom: 5px;
}

.product > span {
    flex-grow: 1;
}

.product > button {
    width: 40px;
    height: 40px;
    background-color: #47caff;
}

.cart {
    position: absolute;
    bottom: 0;
    background-color: #73bc83;
}

.ball {
    position: absolute;
    display: none;
    width: 20px;
    height: 20px;
    transition: all 0.4s;
    top: 50%;
    left: 50%;
    margin-left: -10px;
    margin-top: -10px;
    transition-timing-function: cubic-bezier(.49, -3,.75,.41);
    /*可以调节这个 -3 这个数值控制*/
}

.inner {
    display: inline-block;
    width: 100%;
    height: 100%;
    background-color: #a175ff;
    border-radius: 50%;
    transition: all 0.4s;
    transition-timing-function: linear;
}
</style>
