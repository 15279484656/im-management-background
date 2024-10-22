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
        path: "goods",
        name: "goods",
        component: () => import("@/components/Goods/GoodsPage"),
      },
      {
        path: "goods/add",
        name: "goods_add",
        component: () => import("@/components/Goods/GoodsAddPage"),
      },
      {
        path: "nature",
        name: "nature",
        component: () => import("@/components/Nature/NaturePage"),
      },
      {
        path: "specification/detail",
        name: "specification_detail",
        component: () =>
          import("@/components/Specification/SpecificationAddPage"),
      },
      {
        path: "order",
        name: "order",
        component: () => import("@/components/Order/OrderPage"),
      },
      {
        path: "order/detail",
        name: "order_detail",
        component: () => import("@/components/Order/OrderDetailPage"),
      },
      {
        path: "school",
        name: "school",
        component: () => import("@/components/School/School"),
      },
      {
        path: "school/add",  // 新增学校页面路径
        name: "school_add",
        component: () => import("@/components/School/SchoolAdd"),  // 确保 SchoolAdd.vue 文件在正确的目录下
      },
      {
        path: "agent",
        name: "agent",
        component: () => import("@/components/Agent/Agent"),
      },
      {
        path: "agent/add",  // 新增学校页面路径
        name: "agent_add",
        component: () => import("@/components/Agent/AgentAdd"),  // 确保 SchoolAdd.vue 文件在正确的目录下
      },
      {
        path: "activity",
        name: "activity",
        component: () => import("@/components/Activity/Activity"),
      },
      {
        path: "activity/add",  // 新增学校页面路径
        name: "activity_add",
        component: () => import("@/components/Activity/ActivityAdd"),  // 确保 SchoolAdd.vue 文件在正确的目录下
      },
      {
        path: "communityInfo",
        name: "community_info",
        component: () => import("@/components/CommunityInfo/CommunityInfo"),
      },
      {
        path: "communityInfo/add",  // 新增学校页面路径
        name: "community_info_add",
        component: () => import("@/components/CommunityInfo/CommunityInfoAdd"),  // 确保 SchoolAdd.vue 文件在正确的目录下
      },
      {
        path: "todo",
        name: "todo",
        component: () => import("@/components/Todo/Todo"),
      },
      {
        path: "todo/add",  // 新增学校页面路径
        name: "todo_add",
        component: () => import("@/components/Todo/TodoAdd"),  // 确保 SchoolAdd.vue 文件在正确的目录下
      },
      {
        path: "student",
        name: "student",
        component: () => import("@/components/Student/Student"),
      },
      {
        path: "student/add",
        name: "student_add",
        component: () => import("@/components/Student/StudentAdd"),
      },
      {
        path: "studentManual",
        name: "student_manual",
        component: () => import("@/components/StudentManual/StudentManual"),
      },
      {
        path: "studentManual/add",
        name: "student_manual_add",
        component: () => import("@/components/StudentManual/StudentManualAdd"),
      },
      {
        path: "adRotation",
        name: "ad_rotation",
        component: () => import("@/components/AdRotation/AdRotation"),
      },
      {
        path: "adRotation/add",
        name: "ad_rotation_add",
        component: () => import("@/components/AdRotation/AdRotationAdd"),
      },
      {
        path: "feedBack",
        name: "feed_back",
        component: () => import("@/components/FeedBack/FeedBack"),
      },
      {
        path: "feedBack/add",
        name: "feed_back_add",
        component: () => import("@/components/FeedBack/FeedBackAdd"),
      },
      {
        path: "schoolNews",
        name: "school_news",
        component: () => import("@/components/SchoolNews/SchoolNews"),
      },
      {
        path: "schoolNews/add",
        name: "school_news_add",
        component: () => import("@/components/SchoolNews/SchoolNewsAdd"),
      },
      {
        path: "consumptionBill",
        name: "consumption_bill",
        component: () => import("@/components/ConsumptionBill/ConsumptionBill"),
      },
      {
        path: "consumptionBill/add",
        name: "consumption_bill_add",
        component: () => import("@/components/ConsumptionBill/ConsumptionBillAdd"),
      },
      {
        path: "stationMessage",
        name: "station_message",
        component: () => import("@/components/StationMessage/StationMessage"),
      },
      {
        path: "stationMessage/add",
        name: "station_message_add",
        component: () => import("@/components/StationMessage/StationMessageAdd"),
      },
      {
        path: "answerInfo",
        name: "answer_info",
        component: () => import("@/components/AnswerInfo/AnswerInfo"),
      },
      {
        path: "answerInfo/add",
        name: "answer_info_add",
        component: () => import("@/components/AnswerInfo/AnswerInfoAdd"),
      },
      {
        path: "confessionWall",
        name: "confession_wall",
        component: () => import("@/components/ConfessionWall/ConfessionWall"),
      },
      {
        path: "confessionWall/add",
        name: "confession_wall_add",
        component: () => import("@/components/ConfessionWall/ConfessionWallAdd"),
      },
      {
        path: "regionInfo",
        name: "region_info",
        component: () => import("@/components/RegionInfo/RegionInfo"),
      },
      {
        path: "regionInfo/add",
        name: "region_info_add",
        component: () => import("@/components/RegionInfo/RegionInfoAdd"),
      },
      {
        path: "orderChat",
        name: "order_chat",
        component: () => import("@/components/OrderChat/OrderChat"),
      },
      {
        path: "orderChat/add",
        name: "order_chat_add",
        component: () => import("@/components/OrderChat/OrderChatAdd"),
      },
      {
        path: "purseInfo",
        name: "purse_info",
        component: () => import("@/components/PurseInfo/PurseInfo"),
      },
      {
        path: "purseInfo/add",
        name: "purse_info_add",
        component: () => import("@/components/PurseInfo/PurseInfoAdd"),
      },
      {
        path: "questionInfo",
        name: "question_info",
        component: () => import("@/components/QuestionInfo/QuestionInfo"),
      },
      {
        path: "questionInfo/add",
        name: "question_info_add",
        component: () => import("@/components/QuestionInfo/QuestionInfoAdd"),
      },
      {
        path: "departmentInfo",
        name: "department_info",
        component: () => import("@/components/DepartmentInfo/DepartmentInfo"),
      },
      {
        path: "departmentInfo/add",
        name: "department_info_add",
        component: () => import("@/components/DepartmentInfo/DepartmentInfoAdd"),
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
        path: "keywords",
        name: "keywords",
        component: () => import("@/components/Keywords/KeywordsPage"),
      },
      {
        path: "keywords/add",
        name: "keywords_add",
        component: () => import("@/components/Keywords/KeywordsAddPage"),
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
