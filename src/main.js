import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "./assets/common/common.css";
import axios from "axios";
import "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { FontAwesomeIcon } from "./plugins/font-awesome";
import VueSweetalert2 from "vue-sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";

const app = createApp(App);

app.config.globalProperties.$axios = axios; //전역변수로 설정 컴포넌트에서 this.$axios 호출할 수 있음
app.config.globalProperties.$serverUrl = "//localhost:8080"; //api server

app
  .use(VueSweetalert2)
  .use(router)
  .use(store)
  .component("font-awesome-icon", FontAwesomeIcon)
  .mount("#app");
