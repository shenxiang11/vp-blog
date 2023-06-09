<script setup lang="ts">
import { computed, ref } from "vue";

let posX = ref(0);
let posY = ref(0);
let width = ref(100);
let height = ref(60);
let rotate = ref(0);
let top = ref(0);
let left = ref(0);

let style = computed(() => {
  return `left:${left.value}px; top:${top.value}px;transform: translate3D(${posX.value}px, ${posY.value}px, 0) rotateZ(${rotate.value}deg); height:${height.value}px; width:${width.value}px;`;
});

function handleDragStart(e) {
  let startX = e.pageX;
  let startY = e.pageY;

  const move = (e) => {
    const x = e.pageX;
    const y = e.pageY;

    let disX = x - startX;
    let disY = y - startY;

    posX.value += disX;
    posY.value += disY;

    startX = x;
    startY = y;
  };

  const up = () => {
    document.removeEventListener("mousemove", move);
    document.removeEventListener("mouseup", up);
    this.context.recordCanvasChangeHistory();
  };
  document.addEventListener("mousemove", move);
  document.addEventListener("mouseup", up);
}

function handleRotate(e) {
  const trans = 0;
  const r = height.value / 2;
  const ang = ((trans + 90) * Math.PI) / 180;
  const [offsetX, offsetY] = [-Math.cos(ang) * r, -Math.sin(ang) * r];
  let startX = e.pageX + offsetX;
  let startY = e.pageY + offsetY;

  const move = (e) => {
    let x = e.pageX;
    let y = e.pageY;

    let disX = x - startX;
    let disY = y - startY;

    let deg = (360 * Math.atan2(disY, disX)) / (2 * Math.PI) - 90;
    rotate.value = deg;
  }

  const up = () => {
    document.removeEventListener("mousemove", move);
    document.removeEventListener("mouseup", up);
  };

  document.addEventListener("mousemove", move);
  document.addEventListener("mouseup", up);
}

function changeSize(e) {
  const direction = e.target.dataset.direction;
  if (!direction) {
    return;
  }
  e.stopPropagation();
  e.preventDefault();

  let startX = e.pageX;
  let startY = e.pageY;

  const move = (e) => {
    const x = e.pageX;
    const y = e.pageY;

    let disX = x - startX;
    let disY = y - startY;

    if (direction) {
      if (direction.indexOf("top") >= 0) {
        disY = 0 - disY;
        top.value -= disY;
      }

      if (direction.indexOf("left") >= 0) {
        disX = 0 - disX;
        left.value -= disX;
      }
    }

    width.value += disX;
    height.value += disY;

    if (width.value < 10) {
      width.value = 10;
    }
    if (height.value < 10) {
      height.value = 10;
    }

    startX = x;
    startY = y;
  };

  const up = () => {
    document.removeEventListener("mousemove", move);
    document.removeEventListener("mouseup", up);

    this.context.recordCanvasChangeHistory();
  };
  document.addEventListener("mousemove", move);
  document.addEventListener("mouseup", up);
}
</script>

<template>
  <div class="wrapper">
    <div :style="style" class="select-wrapper" @mousedown="handleDragStart">
      <div class="rectangle" :style="{width: width + 'px', height: height + 'px'}"></div>

      <div class="control-point" data-direction="top,left" @mousedown="changeSize"></div>
      <div class="control-point" data-direction="top,center" @mousedown="changeSize"></div>
      <div class="control-point" data-direction="top,right" @mousedown="changeSize"></div>

      <div class="control-point" data-direction="center,left" @mousedown="changeSize"></div>
      <div class="control-point" data-direction="center,right" @mousedown="changeSize"></div>

      <div class="control-point" data-direction="bottom,left" @mousedown="changeSize"></div>
      <div class="control-point" data-direction="bottom,center" @mousedown="changeSize"></div>
      <div class="control-point" data-direction="bottom,right" @mousedown="changeSize"></div>

      <svg @mousedown.prevent.stop="handleRotate" class="direction-control" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="19.9219" height="19.9316">
        <g>
          <rect height="19.9316" opacity="0" width="19.9219" x="0" y="0"/>
          <path d="M9.96094 19.9219Q12.002 19.9219 13.8037 19.1406Q15.6055 18.3594 16.9824 16.9824Q18.3594 15.6055 19.1406 13.8037Q19.9219 12.002 19.9219 9.96094Q19.9219 7.91992 19.1406 6.11816Q18.3594 4.31641 16.9824 2.93945Q15.6055 1.5625 13.7988 0.78125Q11.9922 0 9.95117 0Q7.91016 0 6.1084 0.78125Q4.30664 1.5625 2.93457 2.93945Q1.5625 4.31641 0.78125 6.11816Q0 7.91992 0 9.96094Q0 12.002 0.78125 13.8037Q1.5625 15.6055 2.93945 16.9824Q4.31641 18.3594 6.11816 19.1406Q7.91992 19.9219 9.96094 19.9219ZM9.96094 18.2617Q8.23242 18.2617 6.72852 17.6172Q5.22461 16.9727 4.08691 15.835Q2.94922 14.6973 2.30957 13.1934Q1.66992 11.6895 1.66992 9.96094Q1.66992 8.23242 2.30957 6.72852Q2.94922 5.22461 4.08203 4.08203Q5.21484 2.93945 6.71875 2.2998Q8.22266 1.66016 9.95117 1.66016Q11.6797 1.66016 13.1836 2.2998Q14.6875 2.93945 15.8301 4.08203Q16.9727 5.22461 17.6172 6.72852Q18.2617 8.23242 18.2617 9.96094Q18.2617 11.6895 17.6221 13.1934Q16.9824 14.6973 15.8447 15.835Q14.707 16.9727 13.1982 17.6172Q11.6895 18.2617 9.96094 18.2617ZM10 15.4004Q10.9082 15.4004 11.7773 15.1025Q12.6465 14.8047 13.2812 14.2773Q13.6328 13.9941 13.7061 13.6523Q13.7793 13.3105 13.5254 13.0371Q13.2715 12.7637 12.9541 12.7832Q12.6367 12.8027 12.3535 13.0176Q11.8262 13.4277 11.2646 13.6475Q10.7031 13.8672 10 13.8672Q9.02344 13.8672 8.19824 13.4668Q7.37305 13.0664 6.79688 12.3779Q6.2207 11.6895 6.00586 10.8203L7.03125 10.8203Q7.37305 10.8203 7.45117 10.5615Q7.5293 10.3027 7.34375 10.0391L5.75195 7.8418Q5.55664 7.56836 5.26367 7.55859Q4.9707 7.54883 4.76562 7.8418L3.20312 10.0391Q3.01758 10.3027 3.09082 10.5615Q3.16406 10.8203 3.50586 10.8203L4.54102 10.8203Q4.77539 12.1777 5.53711 13.208Q6.29883 14.2383 7.45117 14.8193Q8.60352 15.4004 10 15.4004ZM9.98047 4.46289Q9.0625 4.46289 8.19336 4.76562Q7.32422 5.06836 6.68945 5.5957Q6.33789 5.86914 6.26953 6.21582Q6.20117 6.5625 6.44531 6.82617Q6.70898 7.10938 7.02148 7.08496Q7.33398 7.06055 7.62695 6.8457Q8.1543 6.43555 8.71094 6.2207Q9.26758 6.00586 9.98047 6.00586Q10.9473 6.00586 11.7725 6.40137Q12.5977 6.79688 13.1738 7.48535Q13.75 8.17383 13.9648 9.04297L12.8809 9.04297Q12.5391 9.04297 12.4658 9.30176Q12.3926 9.56055 12.5781 9.82422L14.1602 12.0312Q14.3555 12.2949 14.6484 12.3096Q14.9414 12.3242 15.1465 12.0312L16.709 9.82422Q16.9043 9.56055 16.8311 9.30176Q16.7578 9.04297 16.416 9.04297L15.4395 9.04297Q15.1953 7.68555 14.4336 6.65527Q13.6719 5.625 12.5195 5.04395Q11.3672 4.46289 9.98047 4.46289Z" fill="#59adc4"/>
        </g>
      </svg>
    </div>
  </div>
</template>

<style scoped>
.wrapper {
    width: 100%;
    height: 500px;
    background-color: #f7f7f7;
}

.select-wrapper {
    border: 1px solid #000;
    display: inline-block;
    position: relative;
}

.rectangle {
    border-radius: 10px;
    background-color: red;
}

.control-point {
    cursor: grabbing;
    position: absolute;
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background-color: #41d1ff;
}

.control-point[data-direction="top,left"] {
    top: -4px;
    left: -4px;
}

.control-point[data-direction="top,center"] {
    top: -4px;
    left: calc(50% - 4px);
}

.control-point[data-direction="top,right"] {
    top: -4px;
    right: -4px;
}

.control-point[data-direction="center,left"] {
    top:  calc(50% - 4px);
    left: -4px;
}

.control-point[data-direction="center,right"] {
    top:  calc(50% - 4px);
    right: -4px;
}

.control-point[data-direction="bottom,left"] {
    bottom: -4px;
    left: -4px;
}

.control-point[data-direction="bottom,center"] {
    bottom: -4px;
    left: calc(50% - 4px);
}

.control-point[data-direction="bottom,right"] {
    bottom: -4px;
    right: -4px;
}

.direction-control {
    cursor: grabbing;
    position: absolute;
    bottom: -30px;
    left: 50%;
    transform: translateX(-50%);
}
</style>


