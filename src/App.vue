<template>
  <div id="app">
    <div class="bg-contenter"></div>
    <!-- <div
      class="contenter"
      :style="{ width: $px2vw(1920), height: $px2vw(1080) }"
    ></div> -->
    <div class="contenter">
      <transition
      :name="isView?'view1':''"
      :leave-class="isLeave ? 'leave' : ''"
      :leave-active-class="isLeave ? 'leave-active' : ''"
      :leave-to-class="isLeave ? 'leave-to' : ''"
      :enter-class="isEnter ? 'enter' : ''"
      :enter-active-class="isEnter? 'enter-active' : ''"
      :enter-to-class="isEnter? 'enter-to' : ''"
      >
        <router-view></router-view>
      </transition>
    </div>
  </div>
</template>

<script>
export default {
  created() {
    //苹果禁止双击和缩放
    window.onload = function () {
      document.addEventListener("touchstart", function (event) {
        if (event.touches.length > 1) {
          event.preventDefault();
        }
      });
      document.addEventListener("gesturestart", function (event) {
        event.preventDefault();
      });
      if (typeof WeixinJSBridge == "undefined") {
        //禁止手机放大
        document.addEventListener("WeixinJSBridgeReady", function (e) {
          setTimeout(function () {
            WeixinJSBridge.invoke(
              "setFontSizeCallback",
              { fontSize: 0 },
              function (res) {
                // console.log(JSON.stringify(res));
              }
            );
          }, 0);
        });
      } else {
        setTimeout(function () {
          WeixinJSBridge.invoke(
            "setFontSizeCallback",
            { fontSize: 0 },
            function (res) {
              // console.log(JSON.stringify(res));
            }
          );
        }, 0);
      }
    };
  },
  data () {
    return {
      isView: true,
      isLeave: false,
      isEnter: false
    };
  },
  watch: {
    $route(to, from) {
      if (to.name == 'dropdown') {
        this.isView = false
        this.isEnter = true
        this.isLeave = false
      } else {
        this.isView = true
        if (from.name == 'dropdown') {
          this.isEnter = false
          this.isLeave = true
          this.isView = false
        } else {
          this.isEnter = false
          this.isLeave = false
        }
      }
    }
  }
};
</script>

<style lang="scss">
#app {
  height: 100vh;
  width: 100vw;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #000;
  background-image: url("../src/assets/images/BG@2x.png");
  background-repeat: no-repeat;
  // background-size: cover;
  background-size: 100% 100%;
  z-index: -2;
  @media screen and (orientation: portrait) {
    position: absolute;
    width: 100vh;
    height: 100vw;
    top: 0;
    left: 100vw;
    -webkit-transform: rotate(90deg);
    -moz-transform: rotate(90deg);
    -ms-transform: rotate(90deg);
    transform: rotate(90deg);
    transform-origin: 0% 0%;
  }

  @media screen and (orientation: landscape) {
    position: absolute;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
  }
}
.bg-contenter {
  width: 2560px;
  height: 1600px;
  border-radius: 54px;
  background-image: url("../src/assets/images/PB.png");
  background-repeat: no-repeat;
  background-size: cover;
  position: absolute;
  z-index: -1;
}
.contenter {
  position: relative;
  width: 2560px;
  height: 1600px;
  background-image: url("../src/assets/images/bg2.png");
  background-repeat: no-repeat;
  background-size: 100% calc(100% - 168px);
  background-color: black;
  overflow: hidden;

  .view1-enter{
      opacity: 0;
  }
  .view1-enter-active{
      transition: all .2s;
  }
  .view1-enter-to{
      opacity: 1;
  }
  .view1-leave{
      opacity: 1;
  }
  .view1-leave-active{
      transition: all .2s;
  }
  .view1-leave-to{
      opacity: 0;
  }
  .leave {
    transform: translateY(0);
  }
  .leave-active {
    transition: all 0.3s;
  }
  .leave-to {
    transform: translateY(-100%);
  }
  .enter {
    transform: translateY(-100%);
  }
  .enter-active {
    transition: all 0.3s;
  }
  .enter-to {
    transform: translateY(0);
  }
}
/* .contenter {
  width: 1920px;
  height: 1080px;
  background: saddlebrown;
} */
</style>
