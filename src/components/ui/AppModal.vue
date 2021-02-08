<template>
  <transition name="modal">
    <div class="modal" v-if="modalOpen">
      <div class="modal__overlay" @click="$emit('close')"></div>
      <div class="modal__container">
        <div class="modal__dialog">
          <div class="modal__dialog-close" @click="$emit('close')">×</div>
          <div class="modal__dialog-content">
            <h3 class="modal__dialog-title" v-if="title">{{ title }}</h3>
            <slot></slot>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  emits: ['close'],
  props: {
    title: {
      type: String
    },
    modalOpen: {
      type: Boolean,
      default: false,
      required: true
    }
  },
  setup (_, context) {
    function escCloseKeydown () {
      document.addEventListener('keyup', (evt) => {
        if (evt.keyCode === 27) {
          context.emit('close')
        }
      })
    }

    escCloseKeydown()
  }
}
</script>

<style lang="scss">
$timing: .25s;
$baseColor: #000;
$white: #fff;
$radius: 10px;

.modal {
  position: fixed;
  left: 0;
  top: 0;
  display: block;
  overflow-y: auto;
  height: 100%;
  width: 100%;
  justify-content: center;
  align-items: stretch;
  transition: $timing cubic-bezier(.25, .8, .25, 1);
  z-index: 201;
  outline: none;

  &__overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    transition: $timing cubic-bezier(.25, .8, .5, 1);
    z-index: 200;
    background-color: rgba($baseColor, .7);
  }

  &__container {
    position: relative;
    z-index: 202;
    display: flex;
    max-width: 638px;
    width: 100%;
    align-items: center;
    pointer-events: none;
    margin: 50px auto;
    min-height: calc(100% - 100px);
  }

  &__dialog {
    padding: 24px;
    position: relative;
    background-color: $white;
    pointer-events: auto;
    width: 100%;
    z-index: inherit;
    transition: $timing cubic-bezier(.25, .8, .25, 1);
    border-radius: $radius;

    &-title {
      margin: 0 0 20px;
    }

    &-close {
      font-size: 30px;
      line-height: 30px;
      width: 50px;
      height: 50px;
      display: flex;
      justify-content: center;
      align-items: center;
      top: 0;
      right: 0;
      cursor: pointer;
      position: absolute;
      transition: opacity $timing;

      &:hover {
        opacity: .7;
      }
    }

    &-content {
      width: 100%;
    }

    &-footer {
      margin-top: 32px;
    }
  }
}

// Modal animation
.modal-enter-active,
.modal-leave-active {
  opacity: 0;
}

.modal-enter-active .modal__dialog,
.modal-leave-active .modal__dialog {
  transform: scale(.5);
}
</style>
