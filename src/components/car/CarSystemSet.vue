<template>
  <!--系统设置设置界面-->
  <div class="CarSystemSet">
    <div class="main" v-show="mainVisible">
      <u-nav :items=navList
             :active-index="activeNavIndex"
             @item-selected="handleSelected"
             margin-right="12px"
      ></u-nav>

      <div class="scroll-wrapper" ref="scroll">
        <!--智能伙伴-->
        <div class="partner" v-if="activeNavIndex === 0">
          <div class="partnerCenter">
            <div class="title">
              伙伴中心
            </div>
            <div class="partner_center_container">
              <div class="box" @click="()=>{
                mainVisible = false
                this.$refs.voice.show()
              }">

              </div>
            </div>

          </div>
          <u-property-group
              v-for="(group,key) in partnerGroupList" :key="key"
              :title="group.title"
              :group="group"
              class="group"
          >
            <template #partner_center>
              <div class="partner_center">
                <!--                <img src="../../assets/images/car/system/center.png" alt="" class="center">-->
              </div>
            </template>

            <template #partner_skill>
              <div class="partner_skill">
              </div>
            </template>

            <template #wake_word>
              <div class="wake_word">
                <div @click="()=>{addVisible = true}">

                </div>
              </div>
            </template>

            <template #greeting>
              <div class="greeting-container">
                <img src="../../assets/images/car/system/greeting.png" class="greeting" alt="">
                <div class="box" @click="()=>{greetingVisible = true}">

                </div>
              </div>
            </template>

            <template #listen>
              <div class="listen">
                <u-select :select-list="[
                    {itemContent: '0s', isIcon: false},
                    {itemContent: '15s', isIcon: false,isRecommend : true},
                    {itemContent: '30s', isIcon: false},
                    {itemContent: '60s', isIcon: false},
                ]"
                          class="selectList"
                ></u-select>
              </div>
            </template>

            <template #right>
              <div class="right">
                <div class="row">
                  <u-button class="button" :is-clickable="true">
                    主驾
                  </u-button>
                  <u-button class="button" :is-clickable="true">
                    副驾
                  </u-button>
                </div>
                <div class="row">
                  <u-button class="button" :is-clickable="true">
                    主驾后排
                  </u-button>
                  <u-button class="button" :is-clickable="true">
                    副驾后排
                  </u-button>
                </div>

                <img src="../../assets/images/car/system/right_bg.png" alt="" class="bg
">
              </div>
            </template>

          </u-property-group>
        </div>
        <!--蓝牙-->
        <div class="blueTooth" v-if="activeNavIndex === 1">
          <u-property-group
              v-for="(group,key) in blueToothGroupList" :key="key"
              :group="group"
          >
          </u-property-group>

          <div class="blueToothVisible" v-show="blueToothVisible">
            <u-property-group :group="{
            title: '已配对设备',
            showIndex : true,
            itemList: [
                {
                  leftContent: 'iPhone 姜姜',
                  leftIconName : 'ic_mobile',
                  rightIconName: 'ic_more',
                  clickItem :()=>{
                    this.phoneVisible = true
                  }
                },
            ]
          }">
            </u-property-group>
            <u-property-item>
              <template #leftContent>
                可用设备
              </template>
              <template #rightContent>
                <svg-icon icon-class="ic_more2" class="ic_more2"></svg-icon>
              </template>
            </u-property-item>
            <u-property-group
                v-for="(group,key) in subBlueToothGroupList" :key="key"
                :group="group"
            >
            </u-property-group>
          </div>

        </div>
        <!--无线网络-->
        <div class="wifi" v-if="activeNavIndex === 2">
          <u-property-group>
            <u-property-item model="select"
                             :is-switch-on="wifiVisible"
                             @input="toggleWifiVisible"
            >
              <template #leftContent>
                无限网络
              </template>
            </u-property-item>
          </u-property-group>

          <div class="device" v-if="wifiVisible">
            <u-property-item>
              <template #leftContent>
                可用设备
              </template>
              <template #rightContent>
                <svg-icon icon-class="ic_more2" class="ic_more2"></svg-icon>
              </template>
            </u-property-item>
            <u-property-group
                v-for="(group,key) in wifiGroupList" :key="key"
                :group="group"
            >
            </u-property-group>
          </div>


        </div>
        <!--车辆热点-->
        <div class="hotSpot" v-if="activeNavIndex === 3">
          <u-property-group
              v-for="(group,key) in hotSpotGroupLIst" :key="key"
              :group="group"
          >
            <template #linked>
              c2:3b:ea:75:8a:1c
            </template>
            <template #hot>
              <div class="hotSelect">
                <u-select :select-list="[
                    {itemContent: '2.4Ghz', isIcon: false},
                    {itemContent: '5Ghz', isIcon: false},
              ]">

                </u-select>
              </div>
            </template>
          </u-property-group>
        </div>
        <!--声音-->
        <div class="sound" v-if="activeNavIndex === 4">
          <u-property-group
              v-for="(group,key) in soundGroupLIst" :key="key"
              :group="group"
          >
            <template #sound_media>
              <div class="process">
                <u-process :width=1440></u-process>
              </div>
            </template>
            <template #sound_nav>
              <div class="process">
                <u-process :width=1440></u-process>
              </div>
            </template>
            <template #sound_voice>
              <div class="process">
                <u-process :width=1440></u-process>
              </div>
            </template>
            <template #sound_call>
              <div class="process">
                <u-process :width=1440></u-process>
              </div>
            </template>
            <template #sound_ring>
              <div class="process">
                <u-process :width=1440></u-process>
              </div>
            </template>
            <template #status_tip>
              <div class="status_tip">
                <u-select :select-list="[
                    {itemContent: '关', isIcon: false},
                    {itemContent: '音效', isIcon: false},
                    {itemContent: '语音播报', isIcon: false},
              ]"
                >
                </u-select>
              </div>
            </template>
            <template #door_tips>
              <div class="door_tips">
                <u-select :select-list="[
                    {itemContent: '音效', isIcon: false},
                    {itemContent: '语音播报', isIcon: false},
              ]">

                </u-select>
              </div>
            </template>
            <template #walker_tip>
              <div class="walker_tip">
                <u-select :select-list="[
                    {itemContent: '关', isIcon: false},
                    {itemContent: '空谷幽兰', isIcon: false},
                    {itemContent: '燃擎动力', isIcon: false},
              ]"
                          :current-index="statusTipIndex"
                          @choose="chooseStatus"
                >

                </u-select>
              </div>
            </template>
            <template #environment>
              <u-select :select-list="[
                    {itemContent: '关', isIcon: false},
                    {itemContent: '低', isIcon: false},
                    {itemContent: '中', isIcon: false},
                    {itemContent: '高', isIcon: false},
              ]" class="selectList">
              </u-select>

              <div class="line">
              </div>
            </template>
          </u-property-group>

        </div>
        <!--音效-->
        <div class="effect" v-if="activeNavIndex === 5">
          <div class="sound-model">
            <img src="../../assets/images/car/system/effect_bg1.png"
                 alt=""
                 class="effect_bg"
                 v-show="soundModelIndex === 0"
            >
            <img src="../../assets/images/car/system/effect_bg2.png"
                 alt=""
                 class="effect_bg"
                 v-show="soundModelIndex === 1"
            >
            <img src="../../assets/images/car/system/effect_bg3.png"
                 alt=""
                 class="effect_bg"
                 v-show="soundModelIndex === 2"
            >
            <img src="../../assets/images/car/system/effect_bg4.png"
                 alt=""
                 class="effect_bg"
                 v-show="soundModelIndex === 3"
            >

            <div class="sound-model-container">
              <u-property-item>
                <template #leftContent>
                  声场模式
                </template>
                <template #body>
                  <u-select :select-list="[
                                  {itemContent: '整车共享', isIcon: false},
                                  {itemContent: '驾乘分区', isIcon: false},
                                  {itemContent: '主驾专享', isIcon: false},
                                  {itemContent: '自动', isIcon: false},
                            ]"
                            class="selectList"
                            :current-index="soundModelIndex"
                            @choose="chooseSoundModel"
                  >
                  </u-select>
                </template>
              </u-property-item>
              <u-property-item
                  class="tip-container"
                  v-show="this.soundModelIndex === 0"
              >
                <template #leftContent>
                  <div>
                    <svg-icon icon-class="ic_lingdang" class="ic_lingdang">

                    </svg-icon>
                    声音从整车播放
                  </div>
                </template>

              </u-property-item>
              <u-property-item
                  class="tip-container"
                  v-show="this.soundModelIndex === 1"
              >
                <template #leftContent>
                  <div>
                    <svg-icon icon-class="ic_lingdang" class="ic_lingdang">

                    </svg-icon>
                    导航和通话从头枕播放
                  </div>
                </template>

              </u-property-item>

              <u-property-item
                  class="tip-container"
                  v-show="this.soundModelIndex === 2"
              >
                <template #leftContent>
                  <div>
                    <svg-icon icon-class="ic_lingdang" class="ic_lingdang">

                    </svg-icon>
                    声音从头枕播放
                  </div>
                </template>

              </u-property-item>

              <u-property-item
                  class="tip-container"
                  v-show="this.soundModelIndex === 3"
                  is-info
                  info-content="仅当主驾有人时，设置为整车共享:当副驾或后排有人时，设置为驾乘分区"
              >
                <template #leftContent>
                  <div>
                    <svg-icon icon-class="ic_lingdang" class="ic_lingdang">

                    </svg-icon>
                    根据驾乘位置自动设置
                  </div>
                </template>

              </u-property-item>
              <u-property-item
                  class="quiet-container"
                  is-info
                  info-content="开启后可共享流量给外部设备"
                  model="select"
              >
                <template #leftContent>
                  后排安静
                </template>

              </u-property-item>
            </div>


          </div>

          <div class="scene-effect">
            <img src="../../assets/images/car/system/sound_bg1.png"
                 alt=""
                 class="sound_bg"
                 v-show="soundBgIndex === 1"
            >
            <img src="../../assets/images/car/system/sound_bg2.png"
                 alt=""
                 class="sound_bg"
                 v-show="soundBgIndex === 2"
            >
            <u-property-item class="effect-item">
              <template #leftContent>
                场景音效
              </template>
            </u-property-item>
            <div class="box1" @click="()=>{soundBgIndex = 1}">

            </div>
            <div class="box2" @click="()=>{soundBgIndex = 2}">

            </div>
          </div>

          <div class="equalizer">
            <img src="../../assets/images/car/system/equalizer.png"
                 alt=""
                 class="equalizerBg"
            >
            <u-property-item class="equalizer-item">
              <template #leftContent>
                均衡器
              </template>
            </u-property-item>
          </div>

        </div>
        <!--显示-->
        <div class="show" v-if="activeNavIndex === 6">
          <u-property-group
              v-for="(group,key) in showGroupLIst" :key="key"
              :group="group"
          >
            <template #stopStyle>
              <div class="stopContainer">
                <div class="top">
                  <div class="card"
                       :class="{active : stopIndex === 0}"
                       @click="()=>{stopIndex = 0}"
                  >

                  </div>
                  <div class="card bg1"
                       :class="{active : stopIndex === 1}"
                       @click="()=>{stopIndex = 1}"
                  >

                  </div>
                  <div class="card bg2"
                       :class="{active : stopIndex === 2}"
                       @click="()=>{stopIndex = 2}"
                  >

                  </div>
                </div>
                <div class="line">

                </div>
                <div class="bottom" @click="$router.push('/home/screenClear')">
                  屏幕清洁模式
                </div>
              </div>
            </template>
            <template #yibiao>
              <div class="process">
                <u-process :width=1440></u-process>
              </div>
            </template>
            <template #zhongkong>
              <div class="process">
                <u-process :width=1440></u-process>
              </div>
            </template>
            <template #fujia>
              <div class="process">
                <u-process :width=1440></u-process>
              </div>
            </template>
            <template #format>
              <div class="format">
                <u-select :select-list="[
                    {itemContent: '24h', isIcon: false},
                    {itemContent: '12h', isIcon: false},
              ]">
                </u-select>
              </div>
            </template>
          </u-property-group>

          <div class="mask" v-if="maskVisible">

          </div>
        </div>
      </div>
    </div>


    <u-page
        ref="skillPage"
        title="技能库"
        class="skillPage"
        @close="closePage"
    >
      <div class="skillContainer">
        <div class="scroll-wrapper2" ref="scroll2">
          <div class="groupBody">
            <div class="group cover1">
              <div class="rightContainer">
                <!-- <div class="row">

                </div> -->
                <img style="width: 100%;height: 100%;" src="../../assets/images/car/system/skill_text1.png" alt="">
              </div>
            </div>
            <div class="group cover2">
              <div class="rightContainer">
                <img style="width: 100%;height: 100%;" src="../../assets/images/car/system/skill_text2.png" alt="">
              </div>
            </div>
            <div class="group cover3">
              <div class="rightContainer">
                <img style="width: 100%;height: 100%;" src="../../assets/images/car/system/skill_text3.png" alt="">
              </div>
            </div>
            <div class="group cover4">
              <div class="rightContainer">
                <img style="width: 100%;height: 100%;" src="../../assets/images/car/system/skill_text4.png" alt="">
              </div>
            </div>
            <div class="group cover5">
              <div class="rightContainer">
                <img style="width: 100%;height: 100%;" src="../../assets/images/car/system/skill_text5.png" alt="">
              </div>
            </div>
            <div class="group cover6">
              <div class="rightContainer">
                <img style="width: 100%;height: 100%;" src="../../assets/images/car/system/skill_text6.png" alt="">
              </div>
            </div>
            <div class="group cover7">
              <div class="rightContainer">
                <img style="width: 100%;height: 100%;" src="../../assets/images/car/system/skill_text7.png" alt="">
              </div>
            </div>
          </div>
        </div>
      </div>

    </u-page>
    <u-page
        ref="voice"
        title="TA的声音"
        @close="closePage"
    >
      <div class="voice-page">
        <div class="box" @click="()=>{
          voiceVisible = true
        }">

        </div>
      </div>
      <img src="">
    </u-page>

    <u-dialog :visible="addVisible"
              title="编辑唤醒词"
              confirm-context="保存"
              class="addDialog"
              @cancelHandler="()=>{
                this.addVisible = false
              }"
              :ban-confirm="true"

    >
      <img src="../../assets/images/car/system/input_wake_word.png" alt="" class="input">
    </u-dialog>
    <u-dialog :visible="voiceVisible"
              hidde-bottom
    >
      <div class="voiceDialog">
        <div class="voiceDialogContent">
          请前往[飞凡汽车APP-远程车控-声音复刻]进行声音复刻语音包录制
        </div>

        <u-button class="button"
                  @clickHandler="()=>{
                    mainVisible = true
                    voiceVisible = false
                    this.$refs.voice.hide()
                          setTimeout(() => {
                              this.bs.refresh()
                            }, 200)
                  }"
        >好
        </u-button>
      </div>

    </u-dialog>

    <u-dialog :visible="greetingVisible"
              title="编辑唤主驾问候词"
              confirm-context="保存"
              class="addDialog"
              @cancelHandler="()=>{
                greetingVisible = false
              }"
              :ban-confirm="true"
    >
      <img src="../../assets/images/car/system/input_greeting_word.png" alt="" class="input">
    </u-dialog>
    <u-dialog :visible="phoneVisible"
              title="iphone姜姜"
              show-close
              @closeHandler="()=>{phoneVisible = false}"
              hidde-bottom
              class="addDialog"
    >
      <u-property-group class="phoneDialogGroup">
        <u-property-item
            model="select"
        >
          <template #leftContent>
            优先设备
          </template>
          <template #leftContentDetail>
            优先使用该设备蓝牙电话
          </template>
        </u-property-item>

        <div class="line"></div>
        <u-property-item
            model="select"
        >
          <template #leftContent>
            同步联系人与通话记录
          </template>

        </u-property-item>

        <div class="line"></div>

        <u-property-item>
          <template #leftContent>
            <div style="color: #1D92EA;" @click="()=>{phoneVisible = false}">忽略此设备</div>
          </template>
        </u-property-item>

      </u-property-group>
    </u-dialog>

    <u-dialog :visible="blueToothDialogVisible"
              confirm-context="保存"
              class="blueToothDialog"
              @confirmHandler="()=>{blueToothDialogVisible = false}"
              @cancelHandler="()=>{blueToothDialogVisible = false}"
    >
      <img src="../../assets/images/car/system/input_blue.png" alt="" class="input_blue">
    </u-dialog>

    <u-dialog :visible="passwordDialogVisible"
              confirm-context="连接"
              ban-confirm
              class="blueToothDialog"
              @cancelHandler="()=>{passwordDialogVisible = false}"
    >
      <img src="../../assets/images/car/system/password.png" alt="" class="input_blue">
    </u-dialog>

    <u-dialog :visible="hotPasswordDialogVisible"
              confirm-context="保存"
              ban-confirm
              class="blueToothDialog"
              @cancelHandler="()=>{hotPasswordDialogVisible = false}"
    >
      <img src="../../assets/images/car/system/hot_password.png" alt="" class="hot_password">
    </u-dialog>


    <u-dialog :visible="addWifiDialogVisible"
              confirm-context="连接"
              ban-confirm
              class="addWifiDialog"
              @cancelHandler="()=>{addWifiDialogVisible = false}"
    >
      <img src="../../assets/images/car/system/input_wifi.png" alt="" class="input_wifi">
      <div class="type-container">
        <div class="title">安全类型</div>
        <u-select :select-list="[
                    {itemContent: '无', isIcon: false},
                    {itemContent: 'WEP', isIcon: false},
                    {itemContent: 'WPA', isIcon: false},
                    {itemContent: 'WPA2', isIcon: false},
                    {itemContent: 'WPA3', isIcon: false},
          ]"
                  class="saveList"
        >
        </u-select>
      </div>
    </u-dialog>
    <u-dialog :visible="tipDialogVisible"
              title="车外行人警示音"
              class="tipDialog"
              @cancelHandler="cancelHandler"
    >
      <div class="text">
        若关闭该功能，当车辆低速行驶时，车外行人可能注意不到本车辆靠近，存在安全风险。根据法规要求，下次启动车辆会百动打并该功能。确认关闭吗?
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
import BScroll from "better-scroll";
import UButton from "@/components/basic/UButton.vue";
import UProcess from "@/components/basic/UProcess.vue";
import UDialog from "@/components/basic/UDialog.vue";
import UPage from "@/components/basic/UPage.vue";

export default {
  name: "CarSystemSet",
  data() {
    return {
      navList: [
        {text: '智能伙伴'},
        {text: '蓝牙'},
        {text: '无线网络'},
        {text: '车辆热点'},
        {text: '声音'},
        {text: '音效'},
        {text: '显示'},
      ],
      activeNavIndex: 0,
      mainVisible: true,
      addVisible: false,
      greetingVisible: false,
      phoneVisible: false,
      blueToothDialogVisible: false,
      passwordDialogVisible: false,
      hotPasswordDialogVisible: false,
      addWifiDialogVisible: false,
      tipDialogVisible: false,
      voiceVisible: false,
      maskVisible: true,

      blueToothVisible: true,
      subVisible: false,
      wifiVisible: true,
      statusTipIndex: 2,
      preIndex: 0,
      soundModelIndex: 0,
      stopIndex: 0,
      soundBgIndex: 1,
      partnerGroupList: [

        {
          title: '伙伴技能',
          isInfo: true,
          itemList: [
            {
              id: 'partner_skill',
              leftContent: "技能库",
              rightIconName: 'ic_next',
              clickItem: () => {
                this.openSkillPage()
              }
            },
          ]
        },
        {
          title: '对话设置',
          itemList: [
            {
              leftContent: "语音唤醒",
              leftContentDetail: '开启后，可以通过发起语音指令来使用语音功能。若未授权，则无法成功唤醒语音哦',
              model: 'select',
              isSwitchOn: true,
            },
            {
              id: 'wake_word',
              leftContent: "唤醒词",
              isInfo: true,
              infoContent: 'Hi飞凡，为必选默认唤醒词，还可同时使用另一个\n' +
                  '自定义唤醒词，最多可设置3个自定义唤醒词'
            },
            {
              leftContent: "Hi飞凡一语即达",
              isInfo: true,
              model: 'select',
              infoContent: '开启后支持“Hi飞凡+指令”连说，例如“HI飞凡\n' +
                  '打开地图”'
            },
            {
              id: 'greeting',
              leftContent: "主驾问候词",
              isInfo: true,
              infoContent: '谁唤醒与谁对话\n' +
                  '开启后，该区城用户可以唤超语音，主驾始终开启'
            },
            {
              id: 'listen',
              leftContent: "延时聆听时长",
            },
            {
              id: 'right',
              leftContent: "音区唤醒权限",
              isInfo: true,
              infoContent: '谁唤醒与谁对话\n' +
                  '开启后，该区城用户可以唤醒语音，主驾始终开启'
            },
          ]
        },
        {
          title: '其他设置',
          itemList: [
            {
              leftContent: "语音问候语",
              model: "select"
            },
          ]
        },
      ],
      blueToothGroupList: [
        {
          itemList: [
            {
              leftContent: '蓝牙',
              leftContentDetail: '本机名称飞凡F7',
              model: 'select',
              isSwitchOn: true,
              switchData: () => {
                this.blueToothVisible = !this.blueToothVisible
              }
            },
          ]
        },
      ],
      subBlueToothGroupList: [
        {
          title: '设置',
          itemList: [
            {
              leftContent: "蓝牙名称",
              rightContent: '飞凡F7',
              rightIconName: 'ic_next',
              clickItem: () => {
                this.blueToothDialogVisible = true
              }
            },
            {
              leftContent: "可被发现",
              isInfo: true,
              infoContent: '对附近所有蓝牙设备可见',
              model: 'select'
            },
          ]
        },
      ],
      wifiGroupList: [
        {
          showIndex: true,
          itemList: [
            {
              leftContent: "WZXync",
              leftIconName: 'space',
              rightIconName: 'ic_lock',
              clickItem: () => {
                this.passwordDialogVisible = true
              }
            },
            {
              leftContent: "WZXync._5G",
              leftIconName: 'space',
              rightIconName: 'ic_lock',
              clickItem: () => {
                this.passwordDialogVisible = true
              }
            },
            {
              leftContent: "WB-2.4G",
              leftIconName: 'space',
              rightIconName: 'ic_lock',
              clickItem: () => {
                this.passwordDialogVisible = true
              }
            },
            {
              leftContent: "ZXCVB-sdf2",
              leftIconName: 'space',
              rightIconName: 'ic_lock',
              clickItem: () => {
                this.passwordDialogVisible = true
              }
            },
            {
              leftContent: "ASDFGet",
              leftIconName: 'space',
              rightIconName: 'ic_lock',
              clickItem: () => {
                this.passwordDialogVisible = true
              }
            },
            {
              leftContent: "YB-5G",
              leftIconName: 'space',
              rightIconName: 'ic_lock',
              clickItem: () => {
                this.passwordDialogVisible = true
              }
            },
            {
              leftContent: "WZXync",
              leftIconName: 'space',
              rightIconName: 'ic_lock',
              clickItem: () => {
                this.passwordDialogVisible = true
              }
            },
            {
              leftContent: "WZXync._5G",
              leftIconName: 'space',
              rightIconName: 'ic_lock',
              clickItem: () => {
                this.passwordDialogVisible = true
              }
            },
            {
              leftContent: "WB-2.4G",
              leftIconName: 'space',
              rightIconName: 'ic_lock',
              clickItem: () => {
                this.passwordDialogVisible = true
              }
            },
            {
              leftContent: "ZXCVB-sdf2",
              leftIconName: 'space',
              rightIconName: 'ic_lock',
              clickItem: () => {
                this.passwordDialogVisible = true
              }
            },
            {
              leftContent: "YB-5G",
              leftIconName: 'space',
              rightIconName: 'ic_lock',
              clickItem: () => {
                this.passwordDialogVisible = true
              }
            },
          ]
        },
        {
          itemList: [
            {
              leftContent: '添加网络',
              rightIconName: 'ic_next',
              clickItem: () => {
                this.addWifiDialogVisible = true
              }
            }
          ]
        }
      ],
      hotSpotGroupLIst: [
        {
          itemList: [
            {
              leftContent: '车辆热点',
              isInfo: true,
              model: 'select',
              isSwitchOn: true,
              tipType: 'bottom',
              infoContent: '开启后可共享流量给外部设备'
            },
          ]
        },
        {
          title: '已连设备',
          itemList: [
            {
              id: 'linked',
              leftContent: '*',
            },
          ]
        },
        {
          title: '设置',
          itemList: [
            {
              leftContent: '车辆热点名称',
              rightContent: '飞凡F7',
              rightIconName: 'ic_next',
              clickItem: () => {
                this.blueToothDialogVisible = true
              }
            },
            {
              leftContent: '热点密码',
              rightContent: '12345678',
              rightIconName: 'ic_next',
              clickItem: () => {
                this.hotPasswordDialogVisible = true
              }
            },
            {
              rightId: 'hot',
              leftContent: '热点频段',
            },
          ]
        },
      ],
      soundGroupLIst: [
        {
          title: '车内',
          hiddeLine: true,
          itemList: [
            {
              leftContent: '多媒体',
              rightId: 'sound_media',
            },
            {
              leftContent: '导航',
              rightId: 'sound_nav',
            },
            {
              leftContent: '语音',
              rightId: 'sound_voice',
            },
            {
              leftContent: '通话',
              rightId: 'sound_call',
            },
            {
              leftContent: '来电铃声',
              rightId: 'sound_ring',
            },
            {
              id: 'environment',
              leftContent: '环境音量补偿',
              isInfo: true,
              infoContent: '音量会随车辆状态进行智能调节，确保听感舒适性',
            },
            {
              leftContent: '系统提示音',
              isInfo: true,
              infoContent: '包括按键音，通知提示音',
              model: 'select',
              isSwitchOn: true,
            },
            {
              leftContent: '开门多媒体降音',
              isInfo: true,
              infoContent: '打开车门时，多媒体自动降音',
              model: 'select',
              isSwitchOn: true,
            },
            {
              leftContent: '导航多媒体降音',
              isInfo: true,
              infoContent: '盗号播报时，多媒体自动降音',
              model: 'select',
              isSwitchOn: true,
            },
          ]
        },
        {
          title: '车外',
          itemList: [
            {
              leftContent: '充电状态提示',
              isInfo: true,
              infoContent: '充电时，若未到达预约时间或充电枪连接异常，提供车外提示',
              rightId: 'status_tip',
            },
            {
              leftContent: '车门未关提示',
              isInfo: true,
              infoContent: '锁车时，若车门和舱盖未关闭，提供车外提示',
              rightId: 'door_tips',
            },
            {
              leftContent: '行人警示音',
              rightId: 'walker_tip',
            },
            {
              leftContent: '迎宾欢送音',
              isInfo: true,
              infoContent: '解闭锁时，车外播放音效',
              rightId: 'door_tips',
              model: 'select'
            },
          ]
        },
      ],
      showGroupLIst: [
        {
          title: '亮度',
          hiddeLine: true,
          itemList: [
            {
              leftContent: '自动调节',
              model: 'select',
              isSwitchOn: true,
              switchData:(data) => {
                this.maskVisible = !this.maskVisible
                this.showGroupLIst[0].itemList[0].isSwitchOn = data
              }
            },
            {
              leftContent: '仪表盘',
              rightId: 'yibiao'
            },
            {
              leftContent: '中控屏',
              rightId: 'zhongkong'
            },
            {
              leftContent: '副驾屏',
              rightId: 'fujia'
            },
          ]
        },
        {
          title: '屏幕',
          itemList: [
            {
              id: "stopStyle",
              leftContent: '息屏样式',
            },
          ]
        },
        {
          title: '时间',
          itemList: [
            {
              leftContent: '时间格式',
              rightId: 'format'
            },
          ]
        },
      ],
    };
  },
  components: {
    UPage,
    UDialog,
    UProcess,
    UPropertyItem,
    UButton,
    USelect,

    UNav,

    UPropertyGroup,
  },
  methods: {
    handleSelected(index) {
      this.activeNavIndex = index
      setTimeout(() => {
        this.bs.refresh()
      }, 200)
    },
    closePage() {
      this.mainVisible = true
      setTimeout(() => {
        this.bs.refresh()
      }, 200)
    },
    openSkillPage() {
      this.$refs.skillPage.show()
      setTimeout(() => {
        this.init1()
      }, 200)
      this.mainVisible = false
    },
    cancelHandler() {
      this.tipDialogVisible = false
      this.statusTipIndex = this.preIndex
    },
    chooseStatus(index) {
      this.preIndex = this.statusTipIndex
      if (index === 0) {
        this.tipDialogVisible = true
      }
      this.statusTipIndex = index
    },
    chooseSoundModel(index) {
      this.soundModelIndex = index
    },
    toggleWifiVisible(data) {
      this.wifiVisible = data
    },
    init() {
      this.bs = new BScroll(this.$refs.scroll, {
        quadrant: 2,
        click: true
      })
    },
    init1() {
      this.bs2 = new BScroll(this.$refs.scroll2, {
        quadrant: 2,
        click: true
      })
    },
  },
  mounted() {
    setTimeout(() => {
      this.init()
    }, 200)
    setTimeout(() => {
      this.init1()
    }, 200)
    // this.openSkillPage()
  },
};
</script>
<style scoped lang="scss">
.CarSystemSet {
  width: 100%;
  height: 100%;
  padding: 65px 84px;
  box-sizing: border-box;
  backdrop-filter: blur(200px);
  color: #FFFFFF;
  font-size: 32px;
  font-weight: 500;

  .main {
    height: 100%;
  }

  .group {
    background-size: contain;
    background-position: top;
    background-repeat: no-repeat;
  }

  .partner {
    width: 1555px;

    .partner_center_container {
      width: 100%;
      height: 623px;
      background: url("../../assets/images/car/system/center.png") no-repeat center;
      background-size: cover;
      margin: 36px 0 58px;
      border-radius: 34px;
      position: relative;

      .box {
        position: absolute;
        width: 203px;
        height: 57px;
        top: 200px;
        left: 945px;
      }
    }

    .partner_skill {
      width: 100%;
      height: 602px;
      background: url("../../assets/images/car/system/skill.png") no-repeat center;
      background-size: cover;
      margin-top: 51px;
    }

    .wake_word {
      width: 100%;
      height: 140px;
      background: url("../../assets/images/car/system/word.png") no-repeat center;
      background-size: cover;
      margin-top: 32px;
      position: relative;

      div {
        //background: #FFFFFF;
        position: absolute;
        width: 432.99px;
        height: 140.6px;
        right: 0;
        top: 0;
      }
    }

    .right {
      position: relative;
      width: 100%;
      height: 900px;

      .row {
        display: flex;
        margin-bottom: 12px;
        margin-top: 32px;

        .button {
          width: 240px;
          margin-right: 12px;
        }
      }

      .bg {
        position: absolute;
        right: 118px;
        top: 138px;
        width: 575px;
        height: 746px;
      }
    }

    .greeting-container {
      margin-top: 40px;
      position: relative;
      width: 432.99px;
      height: 139.37px;

      .greeting {
        width: 432.99px;
        height: 139.37px;
      }

      .box {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
      }
    }

  }

  .blueTooth {
    width: 1555px;

    .ic_more2 {
      width: 72.81px;
      height: 20px;
      margin-right: 64px;
    }

  }

  .wifi {
    width: 1555px;

    .ic_more2 {
      width: 72.81px;
      height: 20px;
      margin-right: 64px;
    }
  }

  .hotSpot {
    width: 1555px;

    .hotSelect {
      width: 960px;
    }
  }

  .sound {
    width: 1555px;

    .status_tip {
      width: 1020px;
    }

    .door_tips, .walker_tip {
      width: 683px;
    }

    .line {
      height: 1px;
      width: 100%;
      background: rgba($color: #586A8C, $alpha: 0.2);
      margin-top: 12px;
    }
  }

  .show {
    width: 1555px;
    position: relative;

    .mask {
      position: absolute;
      width: 100%;
      height: 320px;
      background: rgba($color: #51668D, $alpha: 0.5);
      border-radius: 30px;
      top: 240px;
      z-index: 10;
    }

    .format {
      width: 960px;
    }

    .stopContainer {
      width: 100%;
      margin-top: 22px;

      .top {
        display: flex;
        align-items: center;
        justify-content: space-between;

        .card {
          width: 433px;
          height: 266px;
          border-radius: 30px;
          box-sizing: border-box;
          background: #000000;
        }

        .bg1 {
          background: url("../../assets/images/car/system/stop_bg1.png") center no-repeat;
          background-size: cover;
        }

        .bg2 {
          background: url("../../assets/images/car/system/stop_bg2.png") center no-repeat;
          background-size: cover;
        }

        .active {
          border: 4px solid #019CFF;
        }
      }

      .line {
        height: 1px;
        background: #6C80A2;
        margin: 52px 0 39px;
      }

      .bottom {
        font-size: 40px;
        font-weight: 500;
        line-height: 54px;
        letter-spacing: -0.02em;

        font-feature-settings: "kern" on;
        color: #019CFF;
      }
    }


  }

  .effect {
    width: 1555px;

    .sound-model {
      position: relative;
      width: auto;
      height: 946px;
      margin-bottom: 96px;

      .effect_bg {
        position: absolute;
        width: 100%;
        top: 0;
        left: 0;
        border-radius: 36px;
      }

      .sound-model-container {
        position: absolute;
        width: 100%;
        height: 100%;
        box-sizing: border-box;
        padding: 35px 55px;
        top: 0;
        left: 0;
        border-radius: 36px;

        .tip-container {
          margin-top: -24px;

          .ic_lingdang {
            width: 29.12px;
            height: 36.55px;
          }
        }

        .quiet-container {
          margin-top: 548px;
        }
      }


    }

    .scene-effect {
      position: relative;
      height: 800px;
      border-radius: 30px;
      margin-bottom: 96px;

      .sound_bg {
        width: 100%;
        border-radius: 30px;
      }

      .effect-item {
        position: absolute;
        width: 100%;
        top: 36px;
        margin-left: 55px;
      }

      .box1 {
        position: absolute;
        top: 160px;
        left: 240px;
        width: 400px;
        height: 175px;
      }

      .box2 {
        position: absolute;
        top: 355px;
        left: 240px;
        width: 400px;
        height: 175px;
      }
    }

    .equalizer {
      position: relative;
      width: 100%;

      .equalizerBg {
        width: 100%;
      }

      .equalizer-item {
        position: absolute;
        width: 100%;
        top: 36px;
        margin-left: 55px;
      }
    }
  }

  .skillPage {
    .skillContainer {
      width: 100%;
      height: 100%;
      margin-top: 64px;

      .scroll-wrapper2 {
        display: flex;
        flex-direction: column;
        align-items: center;
      }
    }

    .group {
      background-size: cover;
      background-repeat: no-repeat;
      background-position: center;
      width: 1718px;
      margin-bottom: 36px;
      position: relative;
      border-radius: 30px;

      .rightContainer {
        position: absolute;
        right: 0;
        top: 0;
        bottom: 0;
        width: 1371px;
        // background: #FFFFFF;
        padding: 16px;
        box-sizing: border-box;
      }
    }

    .cover1 {
      background-image: url("../../assets/images/car/system/skill_bg1.png");
      height: 519px;
    }

    .cover2 {
      background-image: url("../../assets/images/car/system/skill_bg2.png");
      height: 318px;
    }

    .cover3 {
      background-image: url("../../assets/images/car/system/skill_bg3.png");
      height: 370px;
    }

    .cover4 {
      background-image: url("../../assets/images/car/system/skill_bg4.png");
      height: 318px;
    }

    .cover5 {
      background-image: url("../../assets/images/car/system/skill_bg5.png");
      height: 365px;
    }

    .cover6 {
      background-image: url("../../assets/images/car/system/skill_bg6.png");
      height: 318px;
    }

    .cover7 {
      background-image: url("../../assets/images/car/system/skill_bg7.png");
      height: 519px;
    }
  }


  .phoneDialogGroup {
    width: 900px;
    margin-top: 80px;

    .line {
      height: 0px;
      opacity: 0.2;
      border: 2.2px solid #FFFFFF;
    }
  }

  .blueToothDialog {
    .input_blue {
      width: 833px;
      height: 116px;
      margin-bottom: 164px;
    }

    .hot_password {
      width: 833px;
      margin-bottom: 132px;
    }
  }

  .addWifiDialog {
    .input_wifi {
      width: 833px;
      height: 116px;
      margin-bottom: 24px;
    }

    .type-container {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 188px;

      .saveList {
        width: 610px;
        display: flex;
        align-items: center;
        justify-content: space-between;
      }
    }

  }

  .tipDialog {
    .text {
      text-align: left;
      margin: 32px 0 85px;
    }
  }
}

.process {
  margin-right: 120px;
}

.scroll-wrapper {
  height: 95%;
  overflow: hidden;
  margin-top: 40px;
  width: 100%;
  display: flex;
  justify-content: center;

  .partner {
    height: 390%;
  }

  .blueTooth {
    height: 100%;
  }

  .sound {
    height: 180%;
  }

  .wifi {
    height: 160%;
  }

  .effect {
    height: 250%;
  }

  .show {
    height: 145%;
  }
}

.scroll-wrapper2 {
  height: 100%;
  overflow: hidden;

  .groupBody {
    height: 300%;
  }
}

.selectList {
  margin-top: 12px;
}

.addDialog {
  .input {
    width: 833px;
    height: 168px;
    margin: 32px 0;
  }
}

.voice-page {
  background: url("../../assets/images/car/system/voice.png") no-repeat center;
  background-size: cover;
  width: 818px;
  height: 628px;
  margin-left: 80px;
  margin-top: 64px;
  position: relative;

  .box {
    position: absolute;
    bottom: 0;
    width: 100%;
    height: 200px;
  }
}

.voiceDialog {
  .voiceDialogContent {
    text-align: left;
    margin-bottom: 131px;

  }

  .button {
    background: rgba($color: #fff, $alpha: 0.3);
  }
}

</style>
