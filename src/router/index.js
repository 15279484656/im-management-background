import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

export const constantRoutes = [
  {
    path: "/dashboard",
    name: "dashboard",
    component: () => import("@/components/DashboardPage"),
    children: [
      {
        path: "welcome",
        name: "welcome",
        component: () => import("@/components/WelcomePage"),
      },
      {
        path: "userInfo",
        name: "user_info",
        component: () => import("@/components/UserInfo/UserInfo"),
      },
      {
        path: "userInfo/add",
        name: "user_info_add",
        component: () => import("@/components/UserInfo/UserInfoAdd"),
      },
      {
        path: "roomInfo",
        name: "room_info",
        component: () => import("@/components/RoomInfo/RoomInfo"),
      },
      {
        path: "roomInfo/add",
        name: "room_info_add",
        component: () => import("@/components/RoomInfo/RoomInfoAdd"),
      },
      {
        path: "userFriendRelationship",
        name: "user_friend_relationship",
        component: () => import("@/components/UserFriendRelationship/UserFriendRelationship"),
      },
      {
        path: "userFriendRelationship/add",
        name: "user_friend_relationship_add",
        component: () => import("@/components/UserFriendRelationship/UserFriendRelationshipAdd"),
      },
      {
        path: "userRoomInfo",
        name: "user_room_info",
        component: () => import("@/components/UserRoomInfo/UserRoomInfo"),
      },
      {
        path: "userRoomInfo/add",
        name: "user_room_info_add",
        component: () => import("@/components/UserRoomInfo/UserRoomInfoAdd"),
      },
      {
        path: "singleChatLog",
        name: "single_chat_log",
        component: () => import("@/components/SingleChatLog/SingleChatLog"),
      },
      {
        path: "singleChatLog/add",
        name: "single_chat_log_add",
        component: () => import("@/components/SingleChatLog/SingleChatLogAdd"),
      },
      {
        path: "roomChatLog",
        name: "room_chat_log",
        component: () => import("@/components/RoomChatLog/RoomChatLog"),
      },
      {
        path: "roomChatLog/add",
        name: "room_chat_log_add",
        component: () => import("@/components/RoomChatLog/RoomChatLogAdd"),
      },
      {
        path: "loginLog",
        name: "login_log",
        component: () => import("@/components/LoginLog/LoginLog"),
      },
      {
        path: "loginLog/add",
        name: "login_log_add",
        component: () => import("@/components/LoginLog/LoginLogAdd"),
      },
      {
        path: "mailInfo",
        name: "mail_info",
        component: () => import("@/components/MailInfo/MailInfo"),
      },
      {
        path: "mailInfo/add",
        name: "mail_info_add",
        component: () => import("@/components/MailInfo/MailInfoAdd"),
      },
      {
        path: "sensitiveWords",
        name: "sensitive_words",
        component: () => import("@/components/SensitiveWords/SensitiveWords"),
      },
      {
        path: "sensitiveWords/add",
        name: "sensitive_words_add",
        component: () => import("@/components/SensitiveWords/SensitiveWordsAdd"),
      },
      {
        path: "rechargeInfo",
        name: "recharge_info",
        component: () => import("@/components/RechargeInfo/RechargeInfo"),
      },
      {
        path: "rechargeInfo/add",
        name: "recharge_info_add",
        component: () => import("@/components/RechargeInfo/RechargeInfoAdd"),
      },
      {
        path: "currencyInfo",
        name: "currency_info",
        component: () => import("@/components/CurrencyInfo/CurrencyInfo"),
      },
      {
        path: "currencyInfo/add",
        name: "currency_info_add",
        component: () => import("@/components/CurrencyInfo/CurrencyInfoAdd"),
      },
      {
        path: "configInfo",
        name: "config_info",
        component: () => import("@/components/ConfigInfo/ConfigInfo"),
      },
      {
        path: "configInfo/add",
        name: "config_info_add",
        component: () => import("@/components/ConfigInfo/ConfigInfoAdd"),
      },

      {
        path: "websiteInfo",
        name: "website_info",
        component: () => import("@/components/WebsiteInfo/WebsiteInfo"),
      },
      {
        path: "websiteInfo/add",
        name: "website_info_add",
        component: () => import("@/components/WebsiteInfo/WebsiteInfoAdd"),
      },

      {
        path: "upload",
        name: "upload",
        component: () => import("@/components/Upload/Upload"),
      },
      {
        path: "upload/add",
        name: "upload_add",
        component: () => import("@/components/Upload/UploadAdd"),
      },

      {
        path: "customizeUserImg",
        name: "customize_user_img",
        component: () => import("@/components/CustomizeUserImg/CustomizeUserImg"),
      },
      {
        path: "customizeUserImg/add",
        name: "customize_user_img_add",
        component: () => import("@/components/CustomizeUserImg/CustomizeUserImgAdd"),
      },


      {
        path: "languageInfo",
        name: "language_info",
        component: () => import("@/components/LanguageInfo/LanguageInfo"),
      },
      {
        path: "languageInfo/add",
        name: "language_info_add",
        component: () => import("@/components/LanguageInfo/LanguageInfoAdd"),
      },

      {
        path: "admin",
        name: "admin",
        component: () => import("@/components/Admin/AdminPage"),
      },
      {
        path: "admin/add",
        name: "admin_add",
        component: () => import("@/components/Admin/AdminAddPage"),
      },
    ],
  },
  {
    path: "/login",
    name: "login",
    component: () => import("@/components/LoginPage"),
  },
  {
    path: "*",
    redirect: "/dashboard/welcome",
  },
];

const createRouter = () =>
  new Router({
    // mode: 'history', // () =>import service support
    scrollBehavior: () => ({ y: 0 }),
    routes: constantRoutes,
  });

const router = createRouter();

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter();
  router.matcher = newRouter.matcher; // reset router
}

export default router;
