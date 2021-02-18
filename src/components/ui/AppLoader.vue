<template>
  <div class="loader">
    <div class="dot"></div>
    <div class="dot"></div>
    <div class="dot"></div>
    <div class="dot"></div>
    <div class="dot"></div>
  </div>
</template>

<style lang="scss">
.loader {
  $colors: #3eaf7c, #3eaf7c, #3eaf7c, #3eaf7c, #3eaf7c;
  display: flex;
  width: 100%;
  justify-content: center;

  .dot {
    position: relative;
    width: .6em;
    height: .6em;
    margin: .4em;
    border-radius: 50%;

    &::before {
      position: absolute;
      content: "";
      width: 100%;
      height: 100%;
      background: inherit;
      border-radius: inherit;
      animation: wave 2s ease-out infinite;
    }

    @for $i from 1 through 5 {
      &:nth-child(#{$i}) {
        background: nth($colors, $i);

        &::before {
          animation-delay: $i * 0.2s;
        }
      }
    }
  }
}

@keyframes wave {
  50%,
  75% {
    transform: scale(2.5);
  }

  80%,
  100% {
    opacity: 0;
  }
}
</style>
