import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'

Vue.use(VueRouter)
const originPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
    return originPush.call(this, location).catch(err => err)
}

const routes = [
    {
        path: "/",
        redirect: '/home'
    },
    {
        path: '/home',
        component: HomeView,
        children: [
            {
                path: "",
                redirect: 'homePage'
            },
            {
                path: 'homePage',
                name: 'homePage',
                component: () => import("@/views/homePageView/HomePageView.vue"),
            },
            {
                path: 'temperature',
                name: 'temperature',
                component: () => import("@/views/temperatureView/TemperatureView.vue"),
            },
            {
                path: 'user',
                name: 'user',
                component: () => import("@/views/userView/UserView.vue"),
                children: [
                    {
                        path: 'bind',
                        name: 'bind',
                        component: () => import("@/views/userView/BindAccountView.vue"),
                    }
                ]
            },
            {
                path: 'camera',
                name: 'camera',
                component: () => import("@/views/cameraView/CameraView.vue"),
            },
            {
                path: 'map',
                name: 'map',
                component: () => import("@/views/mapView/MapView.vue"),
            },
            {
                path: 'scene',
                name: 'scene',
                component: () => import("@/views/appView/SceneView.vue"),
            },
            {
                path: 'charging',
                name: 'charging',
                component: () => import("@/views/chargingView/ChargingView.vue"),
            },
            {
                path: 'car',
                name: 'car',
                component: () => import("@/views/carView/CarView.vue"),
            },
            {
                path: 'seat',
                name: 'seat',
                component: () => import("@/views/seatView/SeatView.vue"),
            },
            {
                path: 'safe',
                name: 'safe',
                component: () => import("@/views/safeView/SafeView.vue"),
            },
            {
                path: 'music',
                name: 'music',
                component: () => import("@/views/musicView/MusicView.vue"),
            },
            {
                path: 'aqy',
                name: 'aqy',
                component: () => import("@/views/appView/aqyView.vue"),
            },
            {
                path: 'huoshan',
                name: 'huoshan',
                component: () => import("@/views/appView/huoshanView.vue"),
            },
            {
                path: 'kuaiyou',
                name: 'kuaiyou',
                component: () => import("@/views/appView/kuaiyouView.vue"),
            },
            {
                path: 'park',
                name: 'park',
                component: () => import("@/views/parkView/ParkView.vue"),
            },
            {
                path: 'around',
                name: 'around',
                component: () => import("@/views/parkView/AroundView.vue"),
            },
            {
                path: 'phone',
                name: 'phone',
                component: () => import("@/views/lanyaPhoneView/LanyaPhoneView.vue"),
            },
            {
                path: 'screenClear',
                name: 'screenClear',
                component: () => import("@/views/carView/ScreenClear.vue"),
            },
        ]
    },
    {
        path: '/wifi',
        name: 'wifi',
        component: () => import("@/views/wifiView/WifiView.vue"),
    },
    {
        path: '/lanya',
        name: 'lanya',
        component: () => import("@/views/lanyaView/LanyaView.vue"),
    },
    {
        path: '/dropdown',
        name: 'dropdown',
        component: () => import("@/views/dropdownView/dropDownView.vue"),
    },
    {
        path: '/xiping',
        name: 'xiping',
        component: () => import("@/views/dropdownView/xiPing.vue"),
    },
]

const router = new VueRouter({
    routes
})

export default router
