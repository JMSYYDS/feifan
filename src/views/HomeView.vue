<template>
  <div class="home">
    <TopHeader></TopHeader>
    <div class="view_class">
      <transition :name="isViewTransition?'view':''" :leave-class="isLeave?'leave':''"
                  :leave-active-class="isLeave?'leave-active':''" :leave-to-class="isLeave?'leave-to':''">
        <router-view></router-view>
      </transition>
    </div>
    <Bottom></Bottom>
  </div>
</template>

<script>
import TopHeader from '@/components/TopHeader.vue'
import Bottom from '@/components/Bottom.vue'
// @ is an alias to /src

export default {
  name: 'HomeView',
  components: {
    TopHeader,
    Bottom
  },
  data() {
    return {
      isViewTransition: false,
      isLeave: false
    };
  },
  watch: {
    $route(to, from) {
      if (to.name == "user") {
        this.isViewTransition = false
        this.isLeave = false
        return
      }
      if (to.name == "homePage") {
        this.isViewTransition = false
        this.isLeave = true
      } else {
        if (from.name == "homePage") {
          this.isViewTransition = true
          this.isLeave = false
        } else {
          this.isViewTransition = false
          this.isLeave = false
        }

      }
    }
  }
}
</script>
<style lang="scss" scoped>
.home {
  width: 100%;
  height: 100%;
  position: relative;

  .view_class {
    width: 100%;
    height: calc(100% - 168px);
    background-image: url("../../src/assets/images/bg2.png");
    background-repeat: no-repeat;
    background-size: 100% 100%;

    .view-enter {
      transform: scale(0);
    }

    .view-enter-active {
      transition: all .3s;
    }

    .view-enter-to {
      transform: scale(1);
    }

    .leave {
      transform: scale(1);
      opacity: 1;
    }

    .leave-active {
      transition: all .3s;
    }

    .leave-to {
      transform: scale(0.5);
      opacity: 0;
    }

    .v-enter {
      display: none;
    }
  }
}
</style>
