<template>
  <div class="UPropertyGroup">
    <div class="header"
         v-if="group.title"
    >
      <div class="left">
        <div class="title" :style="{
        color : group.isDisabled ? '#3E3E3E' : '#d9d9d9'
      }">
          {{ group.title }}
        </div>
        <svg-icon iconClass="ic_lightControl"
                  class="ic-lightControl"
                  :color="group.isDisabled ? '#3E3E3E' : '#fff'"
                  v-if="group.isInfo"
        ></svg-icon>
      </div>
      <div class="right">
        {{ group.rightText }}
      </div>
    </div>

    <div class="content" :class="[bgTypeClass]">
      <slot name="default">

        <slot :name=group.id></slot>

        <div class="items" v-for="(item,index) in group.itemList" :key="index">
          <div class="index" v-if="group.showIndex">
            {{ index + 1 }}
          </div>
          <u-property-item
              :right-icon-name=item.rightIconName
              :left-icon-name="item.leftIconName"
              :is-disabled=item.isDisabled
              :is-info=item.isInfo
              :model=item.model
              :is-test=item.isTest
              :is-changeable=item.isChangeable

              @clickItem="item.clickItem ? item.clickItem() : ()=>{}"
              @input="item.switchData ? item.switchData() : ()=>{}"
              :is-switch-on="item.isSwitchOn !== undefined ? item.isSwitchOn : false"
              :show-mask="item.showMask"
              :info-content="item.infoContent"
              :tip-type="item.tipType"
          >
            <template #leftContent>
              {{ item.leftContent }}
            </template>
            <template #rightContent>
              {{ item.rightContent }}
              <slot :name="item.rightId"></slot>
            </template>

            <template #leftContentDetail>
              {{ item.leftContentDetail }}
            </template>

            <template #body>
              <slot :name=item.id></slot>
            </template>
          </u-property-item>
          <div :class="[lineTypeClass]" v-if="!group.hiddeLine && index !== group.itemList.length - 1">

          </div>
        </div>

        <u-property-item v-if="group.selectList">
          <template #body>
            <u-select :navList="group.selectList" :showBg="!group.isActive"></u-select>
          </template>
        </u-property-item>

      </slot>
    </div>
  </div>
</template>
<script>

import UButton from "@/components/basic/UButton.vue";
import UPropertyItem from "@/components/basic/UPropertyItem.vue";
import USelect from "@/components/basic/USelect.vue";

export default {
  name: "UPropertyGroup",
  data() {
    return {};
  },
  props: {
    title: {
      type: String,
      default: '',
    }, // 属性标题
    isInfo: {
      type: Boolean,
      default: false
    }, // 是否显示信息图标
    group: {
      type: Object,
      default: () => {
        return {
          id: String, // 分组ID
          title: "",
          itemList: () => [{
            id: String, // 功能选项ID
            leftContent: String, // 左侧内容
            leftContentDetail: String, // 左侧详细内容
            rightContent: String, // 右侧内容
            rightIconName: String, // 右侧图标名称
            leftIconName: String, // 右侧图标名称
            isDisabled: Boolean, //  是否禁用
            isInfo: Boolean, //  是否显示详细内容标签
            isTest: Boolean, //  是否为测试功能
            model: String,// 模式
            methods : ()=>{},
            clickItem : ()=>{},
          }], // 功能列表
          isDisabled: Boolean, // 是否激活
        }
      }
    },
    type: {
      type: String,
      default: 'default'
    }, // 分组类：default/map
  },
  components: {USelect, UButton, UPropertyItem},
  methods: {
    switchData(data) {
      this.$emit("zInput", data);
    },
  },
  computed: {
    bgTypeClass() {
      if (this.group.hiddeBg) return 'hidde-bg'
      return `group-bg-${this.type}`;
    }, // 背景类型样式
    lineTypeClass() {
      return `group-line-${this.type}`;
    }, // 背景类型样式
  }

};
</script>
<style scoped lang="scss">
.UPropertyGroup {
  width: 100%;
  margin-bottom: 35px;
  color: #FFFFFF;
  font-size: 32px;
  font-weight: 500;

  .header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 34px;
    color: #FFFFFF;
    white-space: nowrap;
    padding: 12px 0;

    .title {
      margin-right: 12px;
      margin-bottom: 36px;
    }

    .left {
      display: flex;
      align-items: center;
    }
  }

  .content {
    border-radius: 30px;
    box-sizing: border-box;

    .items {
      position: relative;

      .index {
        position: absolute;
        width: 40px;
        height: 40px;
        border-radius: 13px;
        opacity: 1;
        background: #B4B6C3;
        display: flex;
        justify-content: center;
        align-items: center;
        top: 50%;
        transform: translate(0, -50%);
        left: -50px;
        font-size: 26px;
      }
    }
  }
}

.buttonsBox {
  display: flex;
  width: 100%;
  // 设置最多两列
  flex-wrap: wrap;
  justify-content: start;

  .button {
    flex-basis: 50%;
    margin: 4px 0;
  }
}

.hidde-bg {
  background: transparent;
  padding: 0;
}

.group-bg-default {
  background: rgba($color: #FFFFFF, $alpha: 0.15);
  padding: 0 40px 0 40px;
}
.group-bg-empty {
  padding: 0 40px 0 40px;

}
.group-bg-map {
  background: #728FCF;
  padding: 0 60px 0 60px;
}


.group-line-default {
  height: 1px;
  opacity: 1;
  background: #8FA1B1;
}

</style>
