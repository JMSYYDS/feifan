<template>
  <div class="park-view">
    <div class="park-container">
      <div class="header">
        <div class="left">
          <svg-icon icon-class="dialog_close"
                    class="close"
                    @click="backHome"
          ></svg-icon>
          <svg-icon icon-class="ic_pdown" class="ic_pdown"></svg-icon>
        </div>

        <div class="right">
          <svg-icon icon-class="ic_car_sound"
                    class="ic_car_sound"
                    @click="isClickCar = !isClickCar"
                    :style="{
                      color: isClickCar ? '#009DFF' : '',
                    }"
          ></svg-icon>
          <svg-icon icon-class="ic_xitongshezhi"
                    class="ic_xitongshezhi"
                    @click="visible = true"
          ></svg-icon>
        </div>
      </div>
    </div>

    <s-dialog :visible="visible"
              title="设置"
              show-close
              hidde-bottom
              @closeHandler="()=>{ this.$router.push('/home/around') }"
              is-light
    >
      <u-property-group>
        <u-property-item model="select">
          <template #leftContent>
            低速打转向灯启动全景影像
          </template>
        </u-property-item>
        <u-property-item>
          <template #leftContent>
            自动泊车播报模式
          </template>
          <template #body>
            <u-select :select-list="selectList" class="list">

            </u-select>
          </template>
        </u-property-item>
      </u-property-group>
    </s-dialog>
  </div>
</template>

<script>
import UNav from "@/components/basic/UNav.vue";
import UPropertyItem from "@/components/basic/UPropertyItem.vue";
import UPropertyGroup from "@/components/basic/UPropertyGroup.vue";
import USelect from "@/components/basic/USelect.vue";
import UButton from "@/components/basic/UButton.vue";
import SDialog from "@/components/basic/SDialog.vue";

export default {
  name: 'SceneView',
  components: {SDialog, UButton, USelect, UPropertyGroup, UPropertyItem, UNav},

  data() {
    return {
      isClickCar : false,
      visible : false,
      selectList: [
        {itemContent: "简洁", isIcon: false},
        {itemContent: "标准", isIcon: false},
      ],
    };
  },

  mounted() {

  },

  methods: {
    backHome () {
      this.$router.push('/')
    }
  },
};
</script>

<style lang="scss" scoped>
.park-view {
  position: relative;
  width: 100%;
  height: 100%;
  background: black;
  box-sizing: border-box;
  padding-top:80px;

  .park-container {
    background-image: url("../../assets/images/park/park_bg.png");
    background-size: contain;
    background-repeat: no-repeat;
    background-position: top;
    width: 100%;
    height: 100%;
    padding:  0 196px;
    box-sizing: border-box;
  }

  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;

    .left,.right{
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .close {
      width: 34.9px;
      height: 34.9px;
      margin-right: 180px;
    }

    .ic_pdown {
      width: 70px;
      height: 70px;
    }

    .ic_car_sound {
      width: 52px;
      height: 72px;
      color: #FFFFFF;
    }

    .ic_xitongshezhi {
      width: 47px;
      height: 50px;
      margin-left: 120px;
    }
  }

  .list {
    margin-top: 12px;
  }

}
</style>
