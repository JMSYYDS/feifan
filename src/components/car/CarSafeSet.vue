<template>
  <!--安全设置设置界面-->
  <div class="CarSafeSet">
    <div class="operate">
      <u-button class="card-button" @clickHandler="()=>{closeVisible = true}">
        <svg-icon icon-class="ic_on_off" class="ic_on_off">

        </svg-icon>
        <div class="name">
          关闭电源
        </div>
      </u-button>
      <u-property-group
          v-for="(group,key) in groupList" :key="key"
          :title="group.title"
          :group="group"
      >
      </u-property-group>
    </div>

    <img src="../../assets/images/car/safe/img.png" class="bg"
         alt="">

    <u-dialog :visible="closeVisible"
              title="确认关闭电源"
              is-danger
              confirm-context="关闭电源"
              @cancelHandler="()=>{closeVisible = false}"
    >
      <div class="dialog-content">

        踩制动踏板可以再次启动
      </div>
    </u-dialog>

    <u-dialog :visible="videoVisible"
              title="允许行车播放视频？"
              is-danger
              confirm-context="允许"
              @cancelHandler="()=>{
                videoVisible = false
                groupList[1].itemList[0].isSwitchOn =data
              }"
    >
      <div class="dialog-content">
        驾驶过程中观看视频存在安全隐患，请谨慎操作
      </div>
    </u-dialog>

    <u-dialog :visible="restartVisible"
              title="是否重启通信模块?"
              is-danger
              confirm-context="重启"
              @cancelHandler="()=>{restartVisible = false}"
    >
      <div class="dialog-content">
        重启过程中网络和定位功能将不可用
      </div>
    </u-dialog>

  </div>
</template>
<script>


import UPropertyItem from "@/components/basic/UPropertyItem.vue";
import UPropertyGroup from "@/components/basic/UPropertyGroup.vue";
import USelect from "@/components/basic/USelect.vue";
import UNav from "@/components/basic/UNav.vue";
import UCard from "@/components/basic/UCard.vue";
import UButtonCard from "@/components/basic/UButtonCard.vue";
import UButton from "@/components/basic/UButton.vue";
import UDialog from "@/components/basic/UDialog.vue";

export default {
  name: "CarSafeSet",
  data() {
    return {
      closeVisible :false,
      videoVisible : false,
      restartVisible : false,
      groupList: [
        {
          itemList: [
            {
              leftContent: "手机遗忘提醒",
              model: 'select',
              isSwitchOn:true
            },
          ]
        },
        {
          itemList: [
            {
              leftContent: "允许行车播放视屏",
              model: 'select',
              isSwitchOn : false,
              isChangeable : false,
              switchData : (data) => {
                this.videoVisible = true
                this.groupList[1].itemList[0].isSwitchOn =data
              }
            },
          ]
        },
        {
          itemList: [
            {
              leftContent: "通信模块重启",
              rightIconName :"ic_next",
              clickItem:()=>{
                this.restartVisible = true
              }
            },
          ]
        },
      ],
    };
  },
  components: {
    UDialog,
    UButton,
    UButtonCard,
    UCard,
    UNav,
    USelect,
    UPropertyItem,
    UPropertyGroup,
  },
  methods: {
    handleSelected(index) {
      this.activeNavIndex = index
    }
  },
};
</script>
<style scoped lang="scss">
.CarSafeSet {
  width: 100%;
  height: 100%;
  padding: 20px 40px;
  box-sizing: border-box;
  backdrop-filter: blur(200px);

  .bg {
    position: absolute;
    left: 1142px;
    top: 529px;
    width: 775px;
    height: 319px;
    z-index: -1;
  }

  .operate {
    width: 50%;
    .card-button {
      width: 233px;
      height: 233px;
      border-radius: 31px;
      display: flex;
      flex-direction: column;
      margin-bottom: 41px;
      margin-top: 213px;

      .ic_on_off {
        width: 48px;
        height: 51.79px;
        margin-top: 32px;
      }

      .name {
        margin-top: 23px;
      }
    }


  }


  .dialog-content {
    margin: 128px 0;
    width: 1024px;
  }

  .modelList {
    display: flex;

    .model-item {
      width: 33%;
      padding: 0 4px;

      .cover {
        width: 100%;
      }
    }
  }
}
</style>
