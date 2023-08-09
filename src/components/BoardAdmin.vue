<template>
  <div class="container">
    <header class="jumbotron">
      <h3>{{ content }}</h3>
    </header>
    <div style="margin-top: 50px;"></div>
    <span> 계정 선택 : </span>
    <select
      class="form-select form-select-sm"
      style="width:200px; margin-top: 10px;"
      v-model="selected2"
      @change="changeSelect"
    >
      <option value="">- 선택 -</option>
      <option v-for="item in selectList" :key="item.id" :value="item.id">{{
        item.username
      }}</option>
    </select>

    <div style="margin-top: 50px;">
      <div style="margin-bottom: 10px;">권한 :</div>
      <!-- input id와 label for 맞추기 -->
      <!-- checked된 value로 양방향 데이터 바인딩 -->
      <input
        class="form-check-input"
        type="checkbox"
        id="html"
        value="3"
        v-model="favoriteLang"
      />
      <label class="form-check-label" for="html">&nbsp;&nbsp;관리자</label>
    </div>
    <div>
      <input
        class="form-check-input"
        type="checkbox"
        id="css"
        value="2"
        v-model="favoriteLang"
      />
      <label class="form-check-label" for="css">&nbsp;&nbsp;중간담당자</label>
    </div>
    <div>
      <input
        class="form-check-input"
        type="checkbox"
        id="js"
        value="1"
        v-model="favoriteLang"
      />
      <label class="form-check-label" for="js">&nbsp;&nbsp;유저</label>
    </div>

    <button
      style="margin-top:50px;"
      class="btn btn-outline-success"
      @click="fnRoleSave()"
    >
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
      roleVal: [],
      requestParam: {}, //리스트 페이지 데이터전송
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
        this.roleVal = [];
      } else {
        this.requestBody = {
          // 데이터 전송
          id: this.selected2,
        };

        UserService.getUserRole(this.requestBody).then(
          (response) => {
            this.roles = response.data.roles;

            this.favoriteLang = [];
            this.roleVal = [];

            for (var i in response.data.roles) {
              this.favoriteLang.push(response.data.roles[i].id);
              this.roleVal.push(response.data.roles[i].id);
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
        roles: this.roleVal.join(","),
      };

      // 권한 삭제
      UserService.removeUserRole(this.requestBody).then(
        (response) => {
          if (response.data) {
            // 권한 추가
            this.form = {
              user_id: this.selected2,
              roles: this.favoriteLang.join(","),
            };

            UserService.saveUserRole(this.form).then(
              (response) => {
                if (response.data) {
                  this.$swal
                    .fire({
                      icon: "success",
                      title: "성공",
                      text: "권한이 수정되었습니다.",
                      confirmButtonText: "확인",
                    })
                    .then((result) => {});
                }
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

<style scoped></style>
