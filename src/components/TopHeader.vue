<template>
    <div class="topHeader_container">
      <div class="topHeader_icon_box">
        <svg-icon v-for="item in headerIconList" :key="item.iconName" :iconClass="item.iconName" :class="item.iconName"
                  @click="handleIcon(item.iconName)"></svg-icon>
      </div>

      <UDialog :visible="blueToothDialogVisible"
               :hidde-bottom="true"
               :show-close="true"
               dialog-height=1216
               dialog-width=1705
               title="蓝牙"
               class="blueToothDialog"
               @closeHandler="()=>{this.blueToothDialogVisible = false}"
      >
        <u-property-group>
          <u-property-item model="select" :is-switch-on="true">
            <template #leftContent>蓝牙</template>
            <template #leftContentDetail>本机名称：非凡F7</template>
          </u-property-item>
        </u-property-group>
        <div class="leftContent left-align">
          已配对设备
        </div>

        <u-property-group :group="{
          showIndex:true,
          itemList :[
              {
                leftContent : 'IPhone',
                rightContent : '...',
                model:'select',
                isSwitchOn : true
              }
          ]
        }">
        </u-property-group>
        <div class="bottom left-align">
          <div class="left">
            可用设备
          </div>
          <div class="right">
            ...
          </div>
        </div>
      </UDialog>

      <UDialog :visible="wifiDialogVisible"
               :hidde-bottom="true"
               :show-close="true"
               dialog-height=1216
               dialog-width=1705
               title="无线网络"
               class="blueToothDialog"
               @closeHandler="()=>{this.wifiDialogVisible = false}"
      >
        <u-property-group :group="{
          itemList :[
              {
                leftContent : '无线网络',
                model:'select',
                isSwitchOn : true
              }
          ]
        }">
        </u-property-group>

        <div class="bottom left-align">
          <div class="left">
            可用设备
          </div>
          <div class="right">
            ...
          </div>
        </div>

        <u-property-group :group="{
          showIndex:true,
          itemList :[
              {
                leftContent : 'QQXXau',
                rightIconName : 'ic_suo',
                leftIconName : 'ic_wifi',
                isSwitchOn : true
              },
              {
                leftContent : 'QXXau_5G',
                 rightIconName : 'ic_suo',
                leftIconName : 'ic_wifi',
                isSwitchOn : true
              },
              {
                leftContent : 'ATFndus-hue5',
                rightIconName : 'ic_suo',
                leftIconName : 'ic_wifi',
                isSwitchOn : true
              },
              {
                leftContent : 'HPT',
                rightIconName : 'ic_suo',
                leftIconName : 'ic_wifi',
                isSwitchOn : true
              },
              {
                leftContent : 'FLYfang_5G',
                rightIconName : 'ic_suo',
                leftIconName : 'ic_wifi',
                isSwitchOn : true
              },

          ]
        }">
        </u-property-group>
      </UDialog>

    </div>
</template>

<script>
import UDialog from "@/components/basic/UDialog.vue";
import UPropertyItem from "@/components/basic/UPropertyItem.vue";
import UPropertyGroup from "@/components/basic/UPropertyGroup.vue";

export default {
  name: 'QicheCliTopHeader',
  components: {UPropertyGroup, UPropertyItem, UDialog},

  data() {
    return {
      blueToothDialogVisible:false,
      wifiDialogVisible:false,
      headerIconList: [
        {
          iconName: "ic_camera"
        },
        {
          iconName: "ic_lanya"
        },
        {
          iconName: "ic_wifi"
        },
        {
          iconName: "ic_signal"
        },
        {
          iconName: "ic_4G"
        },
        {
          iconName: "ic_clock"
        },
        {
          iconName: "ic_avatar"
        },
        {
          iconName: "ic_QXXau"
        },
      ]
    };
  },

  mounted() {

  },

  methods: {
    handleIcon(iconName) {
      if (iconName == "ic_QXXau" || iconName == "ic_avatar") {
        this.$router.push("/home/user")
      }
      if (iconName == "ic_wifi") {
        this.wifiDialogVisible = true
        // this.$router.push("/wifi")
      }
      if (iconName == "ic_lanya") {
        this.blueToothDialogVisible = true
        // this.$router.push("/lanya")
      }
      if (iconName == "ic_camera") {
        this.$router.push("/home/camera")
      }
    }
  },
};
</script>

<style lang="scss" scoped>
.topHeader_container{
    z-index: 99999;
    width: 100%;
    height: 80px;
    position: absolute;
    top: 0;
    display: flex;
    justify-content: flex-end;
    background-color: rgba(0,0,0,0);

    .topHeader_icon_box{
        width: 800px;
        padding: 19px 133px 0 0;
        display: flex;
        justify-content: space-around;
        align-items: center;

        .ic_camera{
            width: 42.82px;
            height: 28.31px;
        }
        .ic_lanya{
            width: 30px;
            height: 30px;
        }
        .ic_wifi{
            width: 40px;
            height: 40px;
        }
        .ic_signal{
            width: 40px;
            height: 40px;
        }
        .ic_4G{
            width: 73.24px;
            height: 42px;
        }
        .ic_clock{
            width: 102.85px;
            height: 48px;
        }
        .ic_avatar{
            width: 56px;
            height: 56px;
        }
        .ic_QXXau{
            width: 126px;
            height: 48px;
        }
    }
}

.blueToothDialog {

  ::v-deep.dialog-box {
    height: 1216px;
    width: 1705px;
  }
  .bottom{
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    padding-right: 36px;
    box-sizing: border-box;
  }

  .left-align {
    text-align: left;
    margin-left: 24px;
    margin-bottom: 24px;
  }
}
</style>
