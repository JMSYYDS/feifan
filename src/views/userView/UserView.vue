<template>
  <div class="user-view">
    <div class="header">
      <div class="userAvatar"></div>
      <div class="info">
        <div class="name">
          QXXau
        </div>
        <div class="tag">
          车主
        </div>
      </div>
    </div>
    <div class="button-car-list">
      <u-property-group :group="{
          itemList :[
              {
                leftContent : '账号服务',
                leftIconName: 'user_account',
                isInfo:true,
                infoContent : '个性化数据将跟随当前账号自动定时同步云端，每次登录即可适配您的专展设定',
                rightIconName: 'ic_next',
                clickItem:()=>{
                  this.serviceDialogVisible = true
                }
              },
              {
                leftContent : '第三方账号管理',
                leftIconName: 'user_link',
                rightIconName: 'ic_next',
                clickItem:()=>{
                  this.$refs.bind.show()
                }
              }
          ]
        }">
      </u-property-group>
    </div>

    <div class="buttons">
      <u-button type="primary" class="button"
                @clickHandler="()=>{toggleDialogVisible = true}"
      >切换账号
      </u-button>
      <u-button class="button" @clickHandler="()=>{logoutDialogVisible = true}">退出登录</u-button>
    </div>

    <s-dialog
        :visible="logoutDialogVisible"
        title="退出登录"
        confirm-context="退出"
        @confirmHandler="()=>{logoutDialogVisible=false}"
        @cancelHandler="()=>{logoutDialogVisible=false}"
    >
      <div style="text-align: left;margin: 30px 0">
        退出登录后将切换为游客账号，您将不能使用车机<br/>
        个性化功能，确定退出登录？
      </div>

    </s-dialog>

    <s-dialog
        :visible="toggleDialogVisible"
        title='请使用"飞凡汽车"App扫码登录'
        class="login"
    >
      <template #default>
        <div class="code">

        </div>
      </template>

      <template #bottom>
        <u-button style="width: 100%" @clickHandler="()=>{toggleDialogVisible=false}">取消</u-button>
      </template>
    </s-dialog>

    <s-dialog :visible="serviceDialogVisible"
              :hidde-bottom="true"
              :show-close="true"
              title="账号服务"
              class="serviceDialog"
              @closeHandler="()=>{serviceDialogVisible = false}"
    >
      <div class="serviceContainer">
        <div class="service">

        </div>
      </div>

    </s-dialog>

    <u-page class="bindView" title="第三方账号管理" ref="bind">
      <div class="body">
        <img src="../../assets/images/user/bind.png" alt="">
      </div>
    </u-page>
  </div>
</template>

<script>
import UButton from "@/components/basic/UButton.vue";
import UPropertyGroup from "@/components/basic/UPropertyGroup.vue";
import UCard from "@/components/basic/UCard.vue";
import SDialog from "@/components/basic/SDialog.vue";
import UPage from "@/components/basic/UPage.vue";

export default {
  name: 'QicheCliUserView',
  components: {UPage, SDialog, UCard, UPropertyGroup, UButton},

  data() {
    return {
      logoutDialogVisible: false,
      toggleDialogVisible: false,
      serviceDialogVisible: false,
    };
  },

  mounted() {

  },

  methods: {},
};
</script>

<style lang="scss" scoped>
.user-view {
  position: relative;
  width: 100%;
  height: 100%;
  background-image: url("../../assets/images/common_bg.png");
  background-size: 100% 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  .header {
    display: flex;
    align-items: center;
    justify-content: start;
    width: 1550px;
    height: auto;
    box-sizing: border-box;

    .userAvatar {
      height: 200px;
      width: 200px;
      background: url("../../assets/images/user/header.png") center no-repeat;
      background-size: cover;
      margin-right: 65px;
    }

    .info {
      font-size: 45.69px;
      font-weight: bold;
      font-feature-settings: "kern" on;
      color: #FFFFFF;
    }

    .tag {
      margin-top: 21px;
      width: 87.32px;
      height: 36.29px;
      border-radius: 8.06px;
      opacity: 1;
      background: #459BF8;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 21.5px;
      font-weight: 500;
      font-feature-settings: "kern" on;
      color: #FDFEFF;
    }
  }

  .button-car-list {
    width: 1550px;
    margin-top: 30px;
  }

  img {
    position: absolute;
    top: 226px;
    width: 1553px;
    height: 848px;
  }

  .login {
    .code {
      width: 266.27px;
      height: 266.49px;
      background: url("../../assets/images/user/code.png") center no-repeat;
      background-size: cover;
      margin: 68px auto;
    }
  }

  .serviceDialog {

    .serviceContainer {
      width: 1600px;
      height: 600px;
      box-sizing: border-box;
      padding: 60px;

      .service {
        background: url("../../assets/images/user/service.png") center no-repeat;
        background-size: contain;
        width: 100%;
        height: 100%;
      }

    }
  }
}

.buttons {
  margin-top: 267px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;

  .button {
    width: 330px;
    height: 80px;
    margin-left: 83px;
  }
}

.bindView {
  background-image: url("../../assets/images/common_bg.png");
  background-size: 100% 100%;


  .body {
    width: 100%;
    display: flex;
    justify-content: center;

    img {
      width: 2282px;
      margin-top: 60px;
    }
  }
}
</style>
