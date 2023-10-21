<template>
  <!--辅助驾驶设置界面-->
  <div class="CarAssistantSet">
    <div class="main" v-show="mainVisible">
      <div class="buttonCard"
           v-for="(item,index) in cardList"
           :key="index"
      >
        <u-property-group
            @click="goToPage(index)"
            :style="{
              backgroundImage : `url(${require('../../assets/images/car/assistant/bg' + index + '.png')})`
            }"
            class="buttonGroup"
            type="empty"
        >
          <u-property-item
              :is-info="true"
              :is-disabled="item.isDisabled"
              :right-icon-name='item.rightIconName'
              :info-content="item.infoContent"
              :tip-type="item.tipType"
              @clickItem="goToPage(index)"
          >
            <template #leftContent>{{ item.text }}</template>
            <template #body>
              <u-switch v-model="item.isSwitchOn"
                        class="switch"
                        :is-disabled="item.isDisabled"
                        :is-changeable="item.isChangeable"
                        @input="item.switchData ? item.switchData() : ()=>{}"
              ></u-switch>
            </template>
          </u-property-item>
        </u-property-group>
      </div>
    </div>

    <div class="page" v-show="!mainVisible">
      <div class="page-container">
        <div class="front" v-show="activeIndex === 0">
          <div class="header">
            <svg-icon icon-class="ic_return" class="icon" @click="()=>{mainVisible = true}"></svg-icon>
            前方安全辅助
          </div>
          <div class="body">
            <u-property-group
                v-for="(group,key) in frontGroupList" :key="key"
                :group="group"
            >
              <template #time>
                <u-select :select-list="timeSelectList" class="select-list"></u-select>
              </template>
            </u-property-group>
          </div>
        </div>

        <div class="back" v-show="activeIndex === 1">
          <div class="header">
            <svg-icon icon-class="ic_return" class="icon" @click="()=>{mainVisible = true}"></svg-icon>

            后方安全辅助
          </div>
          <div class="body">
            <u-property-group
                v-for="(group,key) in backGroupList" :key="key"
                :group="group"
            >
              <template #back>
                <u-select :select-list="backSelectList" class="select-list"></u-select>
              </template>
            </u-property-group>
          </div>
        </div>

        <div class="assistant" v-show="activeIndex === 2">
          <div class="header">
            <svg-icon icon-class="ic_return" class="icon" @click="()=>{mainVisible = true}"></svg-icon>
            车道辅助控制
          </div>
          <div class="body">
            <u-property-group
                v-for="(group,key) in assistantGroupList" :key="key"
                :group="group"
            >
              <template #assistant>
                <u-select :select-list="assistantSelectList" class="select-list"></u-select>
              </template>
              <template #deviate>
                <u-select :select-list="deviateSelectList" class="select-list"></u-select>
              </template>
            </u-property-group>
          </div>
        </div>

        <div class="auto" v-show="activeIndex === 3">
          <div class="header">
            <svg-icon icon-class="ic_return" class="icon" @click="()=>{mainVisible = true}"></svg-icon>
            智能巡航辅助
          </div>
          <div class="body">
            <u-property-group
                v-for="(group,key) in intelligenceGroupList" :key="key"
                :group="group"
            >
              <template #limit>
                <div class="limit-container">
                  <u-progress class="process" :width="1400"></u-progress>
                </div>
                <div class="desc">
                  0km/h
                </div>
              </template>
              <template #comfort>
                <u-select :select-list="comfortSelectList"
                          class="select-list"
                          :show-bg="showBg"
                ></u-select>
              </template>
            </u-property-group>
          </div>
        </div>
      </div>

    </div>

    <u-dialog :visible="autoVisible"
              title="自动紧急制动"
              class="autoDialog"
              is-danger
              @cancelHandler="()=>{
                autoVisible = false
                frontGroupList[2].itemList[0].isSwitchOn =true
              }"
    >
      <template #default>
        <div style="text-align: left">
          <p>
            自动紧急制动可在行车时帮您监测自车前方车辆、摩
            托车、行人等目标，并在可能发生碰撞危险时警示并
            启动车辆制动系统使车辆减速，以避免碰撞或减轻碰
            撞。
          </p>
          <p>
            注意，关闭功能会极大降低您的行驶安全，您确定关闭吗?
          </p>
        </div>
      </template>
    </u-dialog>

    <u-dialog :visible="safeVisible"
              title="前方安全辅助"
              class="autoDialog"
              is-danger
              @cancelHandler="()=>{
                safeVisible = false
              }"
    >
      <template #default>
        <div style="text-align: left">
          <p>
            前方安全辅助可在行车时帮您监测自车前方车辆、摩托车、行人等目标，并在可能发生碰撞危险时警示并启动车辆制动系统使车辆减速，以避免碰撞或减轻碰 撞。
          </p>
          <p>
            注意，关闭功能会极大降低您的行驶安全，您确定关 闭吗?
          </p>
        </div>
      </template>
    </u-dialog>

    <u-dialog :visible="controlVisible"
              title="车道控制辅助"
              class="autoDialog"
              is-danger
              ban-confirm
              close-context="关闭（4s）"
              @cancelHandler="()=>{
                controlVisible = false
              }"
    >
      <template #default>
        <div style="text-align: left">
          <p>
            车道控制辅助可在车道线清晰的前提下帮您监测本车
            行驶时是否偏离所在车道，并会在车辆偏离车道时辅
            助驾驶员将车辆保持在原车道内行驶，如果持续偏离
            则会通过图像或声音提醒驾驶员，以避免侧向碰撞的
            危险。
          </p>
          <p>
            注意，关闭功能会极大降低您的行驶安全，您确定关闭吗?
          </p>
        </div>
      </template>
    </u-dialog>
    <u-dialog :visible="cruiseVisible"
              title="车道控制辅助"
              class="autoDialog"
              ban-confirm
              confirm-context="开启（4s）"
              @cancelHandler="()=>{
                cruiseVisible = false
              }"
    >
      <template #default>
        <div style="text-align: left">
          <p>
            智能巡航辅助功能必须在车道线清晰的结构化道路上
            使用，系统将自动控制车速以及行驶方向，并在打灯
            变道功能开启后，仅通过拨转向灯实现发出指令控制
            车辆变道。
          </p>
          <p>
            智能巡航辅助作为一项驾驶辅助功能，并不能应付所
            有道路、交通和天气情况。功能激活时您必须时刻手
            扶方向盘并注意路况，准备随时接管车辆。
            注意，您始终承担着安全驾驶和现行交通法律法规的
            最终责任，您确定开启吗?
          </p>
        </div>
      </template>
    </u-dialog>

  </div>
</template>
<script>


import UPropertyItem from "@/components/basic/UPropertyItem.vue";
import UPropertyGroup from "@/components/basic/UPropertyGroup.vue";
import USelect from "@/components/basic/USelect.vue";
import USwitch from "@/components/basic/USwitch.vue";
import UDialog from "@/components/basic/UDialog.vue";
import UProgress from "@/components/basic/UProcess.vue";

export default {
  name: "CarAssistantSet",
  data() {
    return {
      cruiseVisible : false,
      safeVisible : false,
      controlVisible : false,
      mainVisible: true,
      autoVisible: false,
      showBg : true,
      activeIndex: 0,
      cardList: [
        {
          text: '前方安全辅助',
          isSwitchOn: true,
          rightIconName: "ic_next",
          infoContent: '该功能可在行车时，监测前方和侧前方的潜在碰撞风险: 如有碰撞风险，将警示并启动车辆制动系统使车辆减速，以提高驾驶安全性',
          tipType: 'bottom',
          isChangeable : false,
          switchData: () =>{
            this.safeVisible = true
          }
        },
        {
          text: '后方安全辅助',
          isSwitchOn: true,
          infoContent: '该功能可在行车或停车时，监测后方和侧后方的潜在\n' +
              '碰撞风险，如有碰撞风险，将以视觉、听觉等方式提\n' +
              '醒驾驶员，以提高驾驶安全性',
          rightIconName: "ic_next",
          tipType: 'bottom'

        },
        {
          text: '车道控制辅助',
          isSwitchOn: true,
          infoContent: '该功能可在行车时，监测本车是否偏离所在车道;如\n' +
              '若偏离，系统将辅助驾驶员将车辆保持在原车道内。\n' +
              '如若持续偏离，将以视觉、听觉等方式提醒驾驶员\n' +
              '以提高驾驶安全性',
          rightIconName: "ic_next",
          tipType: 'bottom',
          isChangeable : false,
          switchData: () =>{
            this.controlVisible = true
          }
        },
        {
          text: '智能巡航辅助',
          isSwitchOn: false,
          infoContent: '该功能可根据道路情况帮助您控制车速及方向，使车\n' +
              '辆以合适的速度和车距在本车道内行驶，如果有异常\n' +
              '情况，会通过屏幕显示和声音来提醒您接管并退出功\n' +
              '能，\n' +
              '注意，您需要在功能使用过程中时刻手扶方向盘并注\n' +
              '意路况，不可完全依赖此功能，您始终承担着安全驾\n' +
              '驶和现行交通法律法规的最终责任',
          rightIconName: "ic_next",
          isChangeable : false,
          switchData: () =>{
            this.cruiseVisible = true
          }
        },
        {
          text: '语音控制',
          isSwitchOn: true,
          infoContent: '该功能可让您通过呼唤智能伙伴帮您控制智能驾驶辅\n' +
              '助功能;\n' +
              '注意，您需要在功能使用过程中时刻手扶方向盘并注\n' +
              '意路况，不可完全依赖此功能，您始终承担着安全驾\n' +
              '驶和现行交通法律法规的最终责任',
        },
        {
          text: '智能巡航辅助',
          isSwitchOn: false,
          isDisabled: true,
          rightIconName: "ic_next",
          showMask: true,
        },
      ],
      frontGroupList: [
        {
          itemList: [
            {
              leftContent: "智能阅读灯",
              infoContent: '该功能可在行车时帮您监测自车前方车辆、摩托车、\n' +
                  '行人等目标，并在可能发生碰撞危险时通过图像和声\n' +
                  '音进行警示，以避免碰撞',
              tipType: 'bottom',
              model: 'select',
              isInfo: true,
            }
          ],
        },
        {
          itemList: [
            {
              id: "time",
              leftContent: "碰撞预警时机",
            }
          ],
        },
        {
          itemList: [
            {
              leftContent: "自动紧急制动",
              model: 'select',
              isInfo: true,
              isChangeable : false,
              isSwitchOn: true,
              infoContent: '该功能可在行车时帮您监测自车前方车辆、摩托车\n' +
                  '行人等目标，并在可能发生碰撞危险时警示并启动车\n' +
                  '辆制动系统使车辆减速，以避免碰撞或减轻碰撞',
              switchData:(data) => {
                if (!data) this.autoVisible = true
              }
            }
          ],
        },
        {
          itemList: [
            {
              leftContent: "前方来车预警",
              model: 'select',
              isInfo: true,
              isSwitchOn: true,
              infoContent: '该功能可在行车时帮您监测自车前方横向来车情况\n' +
                  '并在可能发生碰撞危险时发出预警'
            }
          ],
        },
      ],
      timeSelectList: [
        {itemContent: "较早", isIcon: false},
        {itemContent: "适中", isIcon: false},
        {itemContent: "较晚", isIcon: false},
      ],
      backGroupList: [
        {
          itemList: [
            {
              leftContent: "后方碰撞预警",
              model: 'select',
              isInfo: true,
              infoContent: "该功能可在行车时帮您监测后方来车情况:如果有碰\n" +
                  "撞风险，会通过图像和声音来提醒您;如果前方道路\n" +
                  "允许，触发提醒的时候建议您适当增大与后车距离",
              tipType: 'bottom'
            }
          ],
        },
        {
          itemList: [
            {
              id: "back",
              leftContent: "后方横向危险预警和紧急制动",
              isInfo: true,
              infoContent: '该功能可在行车时帮您监测后方言区行车情况，如果\n' +
                  '有碰撞风险，会通过图像和声音来提醒您留意侧后方\n' +
                  '来车情况'
            }
          ],
        },
        {
          itemList: [
            {
              leftContent: "盲区监测预警",
              model: 'select',
              isInfo: true,
              isSwitchOn: true,
              infoContent: '该功能可在行车时帮您监测后方言区行车情况，如果\n' +
                  '有碰撞风险，会通过图像和声音来提醒您留意侧后方\n' +
                  '来车情况'
            },
            {
              leftContent: "变道时危险预警",
              model: 'select',
              isInfo: true,
              isSwitchOn: true,
              infoContent: '该功能可在行车并有发出变道指令后帮您监测后方盲\n' +
                  '区的行车情况，如果有碰撞风险，会通过图像和声音\n' +
                  '来提醒您留意侧后方来车情况'
            },
            {
              leftContent: "车门开启预警",
              model: 'select',
              isInfo: true,
              isSwitchOn: true,
              infoContent: '该功能可在车辆静止时帮您监测打开车门可能存在的\n' +
                  '碰撞风险，如果有碰撞风险，会通过图像和声音来提\n' +
                  '示您，触发提示的时候请确认开门安全后再打开车门'
            },
          ],
        },
      ],
      backSelectList: [
        {itemContent: "关闭", isIcon: false},
        {itemContent: "预警", isIcon: false},
        {itemContent: "预警和紧急制动", isIcon: false},
      ],
      assistantGroupList: [
        {
          itemList: [
            {
              id: "assistant",
              leftContent: "车道控制辅助",
              isInfo: true,
              infoContent: "该功能可在车道线清晰的前提下帮您监测本车行驶时\n" +
                  "是否偏离所在车道，并会在车辆偏离车道时辅助驾驶\n" +
                  "员将车辆保持在原车道内行驶，如果持续偏离则会通\n" +
                  "过因像或声音提醒驾驶员，以避免侧向碰撞的危险;\n" +
                  "洼意，您需要在功能使用过程中时刻手扶方向盘并注\n" +
                  "意路况，不可完全依赖此功能，您始终承担著安全驾\n" +
                  "驶和现行交通法律法规的最终责任",
              tipType: 'bottom'
            }
          ],
        },
        {
          itemList: [
            {
              id: "deviate",
              leftContent: "车道偏离预警时机",
            }
          ],
        },
        {
          itemList: [
            {
              leftContent: "车道偏离声音提醒",
              model: 'select',
              isSwitchOn: true,
            },
            {
              leftContent: "车道偏离方向盘震动",
              model: 'select',
              isSwitchOn: true,
            },
          ],
        },
      ],
      intelligenceGroupList: [
        {
          itemList: [
            {
              leftContent: "智慧巡航辅助",
              isInfo: true,
              model: "select",
              isSwitchOn: true,
              infoContent: '该功能可根据道路情况帮助您控制车速及方向，使车\n' +
                  '辆以合适的速度保持在居中行驶; 如果有异常情况，\n' +
                  '会通过屏幕显示和声音来提醒您接管并退出功能，\n' +
                  '注意，您需要在功能使用过程中时刻手扶方向盘并注\n' +
                  '意路况，不可完全依赖此功能，您始终承担着安全驾\n' +
                  '驶和现行交通法律法规的最终责任',
              tipType: 'bottom'
            },
            {
              leftContent: "智慧闪躲控制",
              isInfo: true,
              model: "select",
              isSwitchOn: true,
              infoContent: '该功能可在智能巡航辅助激活后，遇到一侧有车辆接\n' +
                  '近时，为您在本车道内适当编移车辆行驶轨迹，以保\n' +
                  '证安全距离:\n' +
                  '注意，您需要在功能使用过程中时刻手扶方向盘并注\n' +
                  '意路况，不可完全依赖此功能，您始终承担着安全驾\n' +
                  '驶和现行交通法律法规的最终责任'
            },
            {
              leftContent: "智能避障辅助 Beta",
              isInfo: true,
              model: "select",
              isSwitchOn: false,
              isDisabled: true,
            },
            {
              id: "limit",
              leftContent: "限速偏差设置",
              isInfo: true,
              infoContent: '该功能可在开启自动设定巡航车速功能后，设置智能\n' +
                  '巡航辅助中实际车速和车辆识别的道路限速之间的最\n' +
                  '大差;设定成功后，系统将会根据行驶情况。选择各\n' +
                  '适的车速',
              isSwitchOn: true,
            },
          ],
        },
        {
          itemList: [
            {
              leftContent: "打灯变道",
              isInfo: true,
              model: "select",
              isSwitchOn: true,
              infoContent: '该功能可在智能巡航辅助激活后，通过拨转向灯发出\n' +
                  '变道指令，系统将控制车辆实现自动变道;\n' +
                  '注意，您需要在功能使用过程中时刻手扶方向盘并注\n' +
                  '意路况，不可完全依赖此功能，您始终承担着安全驾\n' +
                  '驶和现行交通法律法规的最终责任',
              switchData : (data)=>{
                this.showBg = !this.showBg
              }
            },
            {
              id: "comfort",
              leftContent: "变道舒适性",
            },
          ],
        },
      ],
      assistantSelectList: [
        {itemContent: "关闭", isIcon: false},
        {itemContent: "车道偏离预警", isIcon: false},
        {itemContent: "车道偏离预警", isIcon: false},
      ],
      deviateSelectList: [
        {itemContent: "较早", isIcon: false},
        {itemContent: "适中", isIcon: false},
        {itemContent: "稍晚", isIcon: false},
      ],
      comfortSelectList: [
        {itemContent: "舒适", isIcon: false},
        {itemContent: "标准", isIcon: false},
        {itemContent: "运动", isIcon: false},
      ]
    };
  },
  components: {
    UProgress,
    UDialog,
    USwitch,

    USelect,
    UPropertyItem,
    UPropertyGroup,
  },
  methods: {
    goToPage(index) {
      console.log(index)
      if (index != 4 && index != 5) {
        this.activeIndex = index
        this.mainVisible = false
      }
    }
  },
};
</script>
<style scoped lang="scss">
.CarAssistantSet {
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  backdrop-filter: blur(200px);
  padding: 96px 84px 0 84px;;

  .main {
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-wrap: wrap;
    //margin: 96px 84px 0 84px;

    .buttonCard {
      flex: 1 0 calc(33.33% - 82px); /* 设置每个子元素的宽度为1/3，考虑间隔 */
      /* 添加间隔，这里设置为5px */
      border-radius: 24px;
      margin: 24px 41px 10px;
    }

    .switch {
      margin-top: 96px;
    }
  }

  .page {
    color: #fff;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    position: absolute;

    .page-container {
      position: relative;
      width: 100%;
      height: 100%;
    }

    .front, .back, .assistant, .auto {
      padding: 96px 84px 0 84px;
      box-sizing: border-box;
      width: 100%;
      height: 100%;
      background-size: cover;
      background-repeat: no-repeat;
      background-position: center;
    }

    .front {
      background-image: url("../../assets/images/car/assistant/front.png");
    }

    .back {
      background-image: url("../../assets/images/car/assistant/back.png");
    }

    .assistant {
      background-image: url("../../assets/images/car/assistant/assistant.png");
    }

    .auto {
      background-image: url("../../assets/images/car/assistant/auto.png");
    }


    .header {
      display: flex;
      align-items: center;
      margin-bottom: 72px;
      font-size: 40px;
      font-weight: 500;
      line-height: 32px;

      .icon {
        width: 17.38px;
        height: 35.44px;
        margin-right: 46px;
      }
    }

    .body {
      width: 55%;
    }
  }

}

.select-list {
  margin-top: 12px;
}

.autoDialog {
  .bottom {
    width: 100%;
    display: flex;
  }
}

.limit-container {
  .process {
    margin-top: 32px;
  }
}

.desc {
  width: 100%;
  display: flex;
  justify-content: center;
  text-align: center;
  color: #FFFFFF;
  margin-top: 12px;
}

.buttonGroup {
  background-position: center;
  background-repeat: no-repeat;
  background-size: 100% 100%;
}
</style>
