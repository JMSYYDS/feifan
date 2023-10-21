<template>
  <!--关于设置设置界面-->
  <div class="CarAboutSet" v-if="CarAboutSetType == 1">
    <div class="operate">

      <u-property-group
          v-for="(group,key) in groupList" :key="key"
          :title="group.title"
          :group="group"
      >
      </u-property-group>
    </div>

    <u-dialog
      title="恢复出厂设置"
      confirm-context="恢复"
      :visible="recoverDialogVisible"
      @cancelHandler="()=>{recoverDialogVisible = false}"
    >
    <div class="CarAboutSet-dialog1">
      您的本地数据将会删除，设置将恢复到出厂状态
    </div>
    </u-dialog>

    <u-dialog
        title="【飞凡汽车】用户协议"
        :show-close=true
        :hidde-bottom="true"
        :visible="agreementDialogVisible"
        @closeHandler="()=>{agreementDialogVisible = false}"
    >
      尊敬的用户，欢迎使用[飞凡汽车] 服务!在您使用[飞凡汽车]服务前，您应当仔细阅读《[飞凡汽
      车用户协议》，充分理解本协议各条款内容，特别是免除或者限制本公司责任的条款、对用户权利进
      行限制的条款、争议解决条款和法律适用条款。免除或者限制本公司责任的条款将可能以加粗字体显
      示，您应重点阅读。如您对协议有任何疑问的，您可通过本协议第16条 “联系我们” 所列的反馈渠
      道咨询，我们会尽快为您做出解答。
      您一经勾选“阅读并同意 ([飞凡汽车] 用户协议了。，即表示您已充分阅读、理解并接受本协议
      全部内容，与我们达成协议;您与我们之间的权利义务关系，受本协议各条款约束。如您不同意《
      飞凡汽车用户协议》，您将可能无法正常使用 [飞凡汽车] 软件或服务。
      由于互联网快速发展，您与我们签署的本协议所列明的条款井不能完整罗列并覆盖您与我们的所有权
      利义务，现有约定也不能保证完全符合未来发展的需求。因此，[飞凡汽车] 的各项服务规则均为本
      协议的补充协议，与本协议不可分割且具有同等法律效力。如您使用[飞凡汽车] 服务，视为您同意
      上述补充协议。
      我们若修改本协议，协议条款修改后，请您仔细阅读井接受修改后的协议之后再继续使用[飞凡汽车)
      服务
    </u-dialog>

    <u-dialog
        title="隐私保护协议"
        :show-close=true
        :hidde-bottom="true"
        :visible="personalDialogVisible"
        @closeHandler="()=>{personalDialogVisible = false}"
    >
      <div style="text-align: left">
        最近更新日期:
        [2022年6月12日]<br/>
        木本政策仅适用于飞凡汽车科技有限公司 (以下简称“飞凡汽车。或“我们”，注册地址为: 上海
        市嘉定区安亭镇墨王南路 888号1308室) 通过飞凡汽车车联网服务平台提供的相关服务 (下称“飞
        凡汽车产品或服务”)。
        本政策将帮助您了解以下内容 :
        1.我们如何收集和使用您的个人信息
        2，我们如何委托处理、共享、转让、公开披露您的个人信息
        3.我们如何保护您的个人信息
        4.您的权利
        5.我们如何处理未成年人的个人信息
        6.您的个人信息如何在全球苑围转移
        7.我们如何存借您的个人信息
      </div>
    </u-dialog>

  </div>
  <div class="CarAboutSet2" v-else-if="CarAboutSetType == 2">
    <img src="../../assets/images/car/carAboutSet/carAboutSet_bg1.png" alt="">
    <div class="CarAboutSet2-back" @click="CarAboutSetType = 1"></div>
    <div class="CarAboutSet2-up" @click="upDialogVisible = true"></div>
    <u-dialog
        title="升级服务条款"
        :show-close=true
        :visible="upDialogVisible"
        @closeHandler="()=>{upDialogVisible = false}"
        @cancelHandler="upDialogVisible = false"
    >
      <div style="text-align: left">
        <p>系统更新服务条款</p>
        <p>2022年08月31日更新</p>
        <p>欢迎使用飞凡汽车系统软件在线升级功能 (以下简称 "OTA系统升级" ) !
          在使用OTA系统升级之前, 请您仔细阅读并理解本 《服务条款》、《用户手册》及相关OTA系统升级操 作指引,
           使用过程中应始终遵守相关的使用说明及注 意事项。
          您可以选择不使用OTA系统升级, 如您使用 此功能将被认为是对本服务条款全部内容的认可.针 对0TA系统升级事宣特此提示如下:
          1. OTA系统升级可以对车辆内部软件进行更新, 从而 休车内软件系练保持最新武合话的版木, 提升车辆性</p>
      </div>
    </u-dialog>
  </div>
  <div class="CarAboutSet3" v-else-if="CarAboutSetType == 3">
    <img src="../../assets/images/car/carAboutSet/carAboutSet_bg2.png" alt="">
    <div class="CarAboutSet3-back" @click="CarAboutSetType = 1"></div>
  </div>
</template>
<script>


import UPropertyItem from "@/components/basic/UPropertyItem.vue";
import UPropertyGroup from "@/components/basic/UPropertyGroup.vue";
import USelect from "@/components/basic/USelect.vue";
import UNav from "@/components/basic/UNav.vue";
import UCard from "@/components/basic/UCard.vue";
import UButtonCard from "@/components/basic/UButtonCard.vue";
import UDialog from "@/components/basic/UDialog.vue";

export default {
  name: "CarAboutSet",
  data() {
    return {
      CarAboutSetType: 1,
      recoverDialogVisible : false,
      agreementDialogVisible : false,
      personalDialogVisible : false,
      upDialogVisible: false,
      groupList: [
        {
          itemList: [
            {
              leftContent: "系统版本",
              rightIconName: 'ic_next',
              clickItem:()=>{
                this.CarAboutSetType = 2
              }
            },
          ]
        },
        {
          itemList: [
            {
              leftContent: "恢复出厂设置",
              rightIconName: 'ic_next',
              clickItem:()=>{
                this.recoverDialogVisible = true
              }
            },
            {
              leftContent: "开源代码许可",
              rightIconName: 'ic_next',
              clickItem:()=>{
                this.CarAboutSetType = 3
              }
            },
            {
              leftContent: "用户协议",
              rightIconName: 'ic_next',
              clickItem:()=>{
                this.agreementDialogVisible = true
              }
            },
            {
              leftContent: "隐私保护政策",
              rightIconName: 'ic_next',
              clickItem:()=>{
                this.personalDialogVisible = true
              }
            },
          ],
        },
      ],
    };
  },
  components: {
    UDialog,
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
      // console.log(1233213)
    }
  },
};
</script>
<style scoped lang="scss">
.CarAboutSet {
  width: 100%;
  height: 100%;
  padding: 100px 194px;
  box-sizing: border-box;
  backdrop-filter: blur(200px);

  .operate {
    width: 1473px;

    .scene {
      .header {
        display: flex;
        justify-content: space-between;
        align-items: center;

      }

      .body {
        display: flex;
        align-items: center;
        justify-content: space-between;
        // flex布局一行最多三列
        flex-wrap: wrap;
      }

    }

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
  .CarAboutSet-dialog1{
    height: 300px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
.CarAboutSet2{
  position: relative;
  width: 100%;
  height: 100%;
  padding: 100px 230px;
  box-sizing: border-box;
  backdrop-filter: blur(200px);
  img{
    width: 1540px;
    object-fit: contain;
  }
  &-back{
    position: absolute;
    left: 232px;
    top: 100px;
    width: 50px;
    height: 50px;
  }
  &-up{
    position: absolute;
    right: 284px;
    top: 110px;
    width: 234px;
    height: 50px;
  }
}
.CarAboutSet3{
  position: relative;
  width: 100%;
  height: 100%;
  backdrop-filter: blur(200px);
  img{
    height: 100%;
    object-fit: contain;
  }
  &-back{
    position: absolute;
    left: 232px;
    top: 100px;
    width: 50px;
    height: 50px;
  }
}
</style>
