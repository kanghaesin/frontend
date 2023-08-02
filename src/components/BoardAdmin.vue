<template>
  <div class="container">
    <header class="jumbotron">
      <h3>{{ content }}</h3>
    </header>
    <select v-model="selected2" @change="changeSelect">
      <option value="">- 선택 -</option>
      <option v-for="item in selectList" :key="item.id" :value="item.id">{{
        item.username
      }}</option>
    </select>

    <div>
      <!-- input id와 label for 맞추기 -->
      <!-- checked된 value로 양방향 데이터 바인딩 -->
      <input
        type="checkbox"
        id="html"
        value="ROLE_ADMIN"
        v-model="favoriteLang"
      />
      <label for="html">관리자</label>
    </div>
    <div>
      <input
        type="checkbox"
        id="css"
        value="ROLE_MODERATOR"
        v-model="favoriteLang"
      />
      <label for="css">중간담당자</label>
    </div>
    <div>
      <input type="checkbox" id="js" value="ROLE_USER" v-model="favoriteLang" />
      <label for="js">유저</label>
    </div>
    <div>선택한 언어: {{ favoriteLang }}</div>

    <button class="w3-button w3-round w3-blue-gray" @click="fnRoleSave()">
      저장
    </button>
  </div>
</template>

<script>
import UserService from "../services/user.service";

export default {
  name: "Admin",
  data() {
    return {
      requestBody: {}, //리스트 페이지 데이터전송
      content: "",
      selected2: "",
      selectList: {},
      roles: {},
      favoriteLang: [],
    };
  },
  mounted() {
    UserService.getAdminBoard().then(
      (response) => {
        this.content = response.data;
      },
      (error) => {
        this.content =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();
      }
    );

    UserService.getUserList().then(
      (response) => {
        this.selectList = response.data;
      },
      (error) => {
        this.content =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();
      }
    );
  },
  methods: {
    changeSelect() {
      if (this.selected2 === "") {
        this.favoriteLang = [];
      } else {
        this.requestBody = {
          // 데이터 전송
          id: this.selected2,
        };

        UserService.getUserRole(this.requestBody).then(
          (response) => {
            console.log("response.data : ", response.data);
            this.roles = response.data.roles;

            this.favoriteLang = [];

            for (var i in response.data.roles) {
              this.favoriteLang.push(response.data.roles[i].name);
            }

            // checked
          },
          (error) => {
            this.content =
              (error.response &&
                error.response.data &&
                error.response.data.message) ||
              error.message ||
              error.toString();
          }
        );
      }
    },
    fnRoleSave() {
      this.requestBody = {
        // 데이터 전송
        user_id: this.selected2,
        roles: this.favoriteLang,
      };

      // 권한 삭제
      UserService.removeUserRole(this.requestBody).then(
        (response) => {
          console.log("response.data : ", response.data);

          // 권한 추가
          UserService.saveUserRole(this.requestBody).then(
            (response) => {
              console.log("response.data : ", response.data);
            },
            (error) => {
              this.content =
                (error.response &&
                  error.response.data &&
                  error.response.data.message) ||
                error.message ||
                error.toString();
            }
          );
        },
        (error) => {
          this.content =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();
        }
      );
    },
  },
};
</script>
