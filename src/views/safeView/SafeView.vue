<template>
  <div class="safe-view">
    <div class="button" @click="()=>{this.addDialogVisible = true}">

    </div>

    <div class="detail" @click="()=>{this.detailDialogVisible = true}">

    </div>

    <u-dialog :visible="addDialogVisible"
              title="儿童安全座椅"
              hidde-bottom
              show-close
              @closeHandler="()=>{this.addDialogVisible = false}"
    >
      <div class="content">
        <u-property-item>
          <template #leftContent>
            可用设备
          </template>
          <template #rightContent>
            ...
          </template>
        </u-property-item>
      </div>

    </u-dialog>

    <u-dialog :visible="detailDialogVisible"
              title="儿童安全座椅使用说明书"
              hidde-bottom
              show-close
              @closeHandler="()=>{this.detailDialogVisible = false}"
    >
      <div class="detail-content">
        本功能支持连接环球娃娃Globalkids Co5560型号座椅，请按照说明书正确安装。
        <p></p>
        可以在中控大屏“儿童安全座椅”应用内使用该功能。
        <p></p>
        儿童安全座椅连接电源后，在本应用内点击添加座椅
        即可。
        <p></p>
        请根据应用内的提示进行连接。连接成功后，应用内支持显示座椅入座状态、ISOFIX接口状态、支撑腿状
        态、儿童安全座椅方向状态、座椅电量状态，支持通过屏内点击对座椅进行通风、加热、椅背调节的操 作。
        <p></p>
        若儿童安全座椅与车辆已连接，但未正确安装，或遇到异常情况，如儿童安全座椅与车辆座椅的ISOFIX接
        口连接失败，或支撑腿未正常安装，或儿童安全座椅方向异常。车辆中控屏上会进行相应提示，并伴有报
        警音，应用内报警图示等，以提醒家长注意儿童安全座椅的安装情况。
        <p></p>
        若车机蓝牙关闭或儿童安全座椅断电，则车辆会与儿童安全座椅断开连接。
        </u-property-item>
      </div>

    </u-dialog>

  </div>
</template>

<script>


import UDialog from "@/components/basic/UDialog.vue";
import UPropertyItem from "@/components/basic/UPropertyItem.vue";

export default {
  name: 'SafeView',
  components: {UPropertyItem, UDialog},

  data() {
    return {
      addDialogVisible: false,
      detailDialogVisible: false,
    };
  },

  mounted() {

  },

  methods: {},
};
</script>

<style lang="scss" scoped>
.safe-view {
  position: relative;
  width: 100%;
  height: 100%;
  background-image: url("../../assets/images/safe/bg.png");
  background-size: 100% 100%;

  .button {
    position: absolute;
    left: 1026.91px;
    top: 860px;
    width: 502px;
    height: 94px;
  }

  .detail {
    position: absolute;
    left: 1463.91px;
    top: 1280px;
    width: 101px;
    height: 30px;
  }

  .content {
    width: 960px;
    height: 640px;
  }

  .detail-content {
    text-align: left;

  }
}

</style>
