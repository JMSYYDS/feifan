<template>
  <div class="UPropertyItem">
    <!--选项行-->
    <div class="select" v-if="model === 'select'">

      <div class="header">

        <div class="left">

          <div class="content" :style="{
            color : isDisabled ? '#919FB8' : ''
          }">
            <div class="intro">
              <slot name="leftContent"></slot>
              <u-tip :content="infoContent" :type="tipType" v-if="isInfo" :is-disabled="isDisabled" class="tip">
                <svg-icon :iconClass="isDisabled ? 'user_info_dark' : 'user_info'"
                          class="icon-detail"
                ></svg-icon>
              </u-tip>
            </div>
            <div class="desc">
              <slot name="leftContentDetail"></slot>
            </div>
          </div>
        </div>

        <div class="right">
          <div class="switchBox">
<!--            <u-switch-->
<!--                class="switch"-->
<!--                v-model="isSwitchOn"-->
<!--                :is-disabled="isDisabled"-->
<!--                @input="switchData"-->
<!--            ></u-switch>-->
            <u-switch
                class="switch"
                v-model="localSwitchOn"
                :is-disabled="isDisabled"
                :is-changeable="isChangeable"
                @input="switchData"
            ></u-switch>
          </div>

          <svg-icon :iconClass="rightIconName"
                    class="rightIcon"
                    :color="isDisabled ? '#3E3E3E' : '#fff'"
                    v-if="rightIconName !== ''"
          ></svg-icon>
        </div>
      </div>

        <slot name="body" class="body"></slot>
    </div>

    <!--默认属性行-->
    <div class="default" v-if="model === 'default'"
         :style="{
        borderBottom : isBottom ? '1px solid #1A2125' : 'none',
        color : isDisabled ? '#3E3E3E' : '#fff'
      }"
         @click="clickItem"
    >
      <div class="header">
        <div class="left">
          <svg-icon :iconClass="leftIconName"
                    class="icon-left"
                    :color="isDisabled ? '#3E3E3E' : '#fff'"
                    v-if="leftIconName !== ''"
          ></svg-icon>

          <div class="content" :style="{
            color : isDisabled ? '#919FB8' : ''
          }">
            <slot name="leftContent"></slot>
          </div>

          <u-tip :content="infoContent" :type="tipType" v-if="isInfo" :is-disabled="isDisabled" class="tip">
            <svg-icon :iconClass="isDisabled ? 'user_info_dark' : 'user_info'"
                      class="icon-detail"
            ></svg-icon>
          </u-tip>

        </div>

        <div class="right">
          <div class="content"
               :style="{
              color : isReset ? '#00C9C5' : ''
            }"
          >
            <slot name="rightContent"></slot>
          </div>
          <svg-icon :iconClass="rightIconName"
                    class="rightIcon"
                    :color="isDisabled ? '#919FB8' : '#fff'"
                    v-if="rightIconName !== ''"
          ></svg-icon>
        </div>
      </div>

      <slot name="body" class="body"></slot>
    </div>

    <div class="mask" v-show="showMask">

    </div>
  </div>
</template>
<script>

import USwitch from "@/components/basic/USwitch.vue";
import UTip from "@/components/basic/UToolTip.vue";

export default {
  name: "UPropertyItem",
  data() {
    return {
      localSwitchOn: this.isSwitchOn
    };
  },
  props: {
    isDisabled: {
      type: Boolean,
      default: false
    }, // 是否禁用
    isRightIcon: {
      type: Boolean,
      default: false
    }, //  是否显示右侧icon
    isInfo: {
      type: Boolean,
      default: false
    }, //  是否显示详情标志
    infoContent : {
      type : String,
    }, // 详情内容
    tipType : {
      type : String,
    }, // tip的种类
    isTrue: {
      type: Boolean,
      default: false
    }, //  是否显示对钩标志
    isTest: {
      type: Boolean,
      default: false
    }, //  是否为测试功能
    model: {
      type: String,
      default: 'default'
    }, //  属性行类型
    leftIconName: {
      type: String,
      default: ''
    }, // 左侧icon的名称
    rightIconName: {
      type: String,
      default: ''
    },// 右侧icon的名称
    isBottom: {
      type: Boolean,
      default: false
    }, // 是否显示下边线
    isSwitchOn: {
      type: Boolean,
      // default: false
    }, //  是否为开关状态
    isReset: {
      type: Boolean,
      default: false
    },//  是否重置属性
    showMask: {
      type: Boolean,
      default: false
    }, // 是否显示遮罩层
    isChangeable : {
      type: Boolean,
      default: true
    }
  },
  components: {UTip, USwitch},
  methods: {
    switchData(data) {
      // console.log("itemData : " + data);
      this.$emit("input", data);
    },
    clickItem() {
      // console.log("item")
      this.$emit("clickItem")
    }
  },
};
</script>
<style scoped lang="scss">
.UPropertyItem {
  width: 100%;
  position: relative;
  padding-left: 2px;
  font-size: 38px;
  color: #FFFFFF;

  .default, .select {
    background: transparent;
    color: #FFFFFF;
    padding: 30px 0;
    box-sizing: border-box;

    .header {
      display: flex;
      justify-content: space-between;
      align-items: center;

      .right {
        display: flex;
        align-items: center;
        justify-content: space-between;

        .content {
          font-size: 30px;
          color: #FFFFFF;
        }
      }

      .left {
        display: flex;
        align-items: center;
        justify-content: space-between;

        //.svg-icon {
        //  margin-right: 32px;
        //}

        .icon-left {
          height: 32px;
          width: 32px;
          margin-right: 32px;
        }
      }

      .rightIcon {
        height: 39px;
        width: 40px;
        margin-left: 48px;
      }
    }

    .body {
      margin-top: 12px;
    }
  }

  .select {
    .left {
      display: flex;
      align-items: center;
    }
  }

  .tip {

    margin-left: 12px;
    .icon-detail {
      width: 35px;
      height: 35px;
    }
  }



  .switch {
  }

  .switchBox {
    height: auto;
    display: flex;
    align-items: center;
  }

  .mask {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: #99A5BB;
    z-index: 99;
  }
}

.desc {
  font-size: 28px;
  color: #A9AEB9;
}

.intro {
  display: flex;
  align-items: center;
}

.testLogo {
  background: #00E2DE;
  color: #000;
  font-size: .16rem;
  padding: 2px 8px;
  border-radius: 4px;
  margin: 0 0 0 12px;
}

.ic-lightControl {
  margin-left: 12px;
}

.icon-true {
  margin-left: 24px;
}

</style>
