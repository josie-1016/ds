<template>
  <div class="sign">
    <img class="bg" :src="imgHome('cargo.jpg')" />
    <div class="sign-container">
      <div class="login-form">
        <div class="login-title">登录</div>

        <el-form ref="loginForm" :model="login" :rules="loginRules" label-position="top">
          <el-form-item prop="name">
            <el-input class="sign-input" v-model="login.name" placeholder="请输入用户名" maxlength="11"></el-input>
          </el-form-item>

          <el-form-item prop="password" v-if="useCert === false">
            <el-input class="sign-input" v-model="login.password" placeholder="请输入密码" show-password
              @keyup.enter.native="onLoginSubmit"></el-input>
          </el-form-item>

          <el-form-item prop="cert" v-else>
            <el-input class="sign-input" v-model="login.cert" v-show="false"></el-input>
            <el-button class="custom-btn" type="text" @click="selectFile"> 上传证书文件 </el-button>
            <div class="text">
              {{ certFileName }}
            </div>
          </el-form-item>

          <el-form-item>
            或者
            <el-button class="custom-btn" v-if="useCert === false" type="text" @click="useCert = true">使用证书登录</el-button>
            <el-button class="custom-btn" v-else type="text" @click="useCert = false">使用密码登录</el-button>
          </el-form-item>

          <el-form-item>
            <el-button class="custom-btn login-btn" style="width: 100%" @click="onLoginSubmit" :loading="loading">
              登录
            </el-button>
          </el-form-item>
        </el-form>
        <div class="register-link">
          <router-link :to="{ name: 'signup' }">
            前往注册
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { actions } from "../store/actions";
import { DynamicImage } from "@/mixins/DynamicImage";

export default {
  name: "Login",
  mixins: [DynamicImage("home/")],
  components: {},

  data() {
    return {
      login: {
        name: "",
        password: "",
        cert: "",
      },
      loginRules: {
        name: [{ required: true, trigger: "blur", message: "用户名不能为空" }],
        password: [{ required: true, trigger: "blur", message: "密码不能为空" }],
        cert: [{ required: true, trigger: "blur", message: "证书不能为空" }],
      },
      certFileName: "",
      useCert: false, // 是否使用证书登录，默认是用密码登录
      loading: false,
    };
  },

  created() {
    const name = this.$route.query["name"];
    if (name) {
      this.login.name = name;
    }
  },

  methods: {
    onLoginSubmit() {
      this.$refs.loginForm.validate((valid) => {
        if (!valid) return;
        this.loading = true;
        actions
          .login(this.login, this.useCert)
          .then(() => {
            this.$message({
              message: "登录成功",
              type: "success",
            });
            this.jumpTo();
          })
          .catch((err) => {
            this.$message({
              message: err,
              type: "error",
            });
          })
          .finally(() => {
            this.loading = false;
          });
      });
    },

    selectFile() {
      var input = document.createElement("input");
      input.type = "file";

      input.onchange = (e) => {
        var file = e.target.files[0];
        this.certFileName = file.name;
        // setting up the reader
        var reader = new FileReader();
        reader.readAsText(file, "UTF-8");

        // here we tell the reader what to do when it's done reading...
        reader.onload = (readerEvent) => {
          var content = readerEvent.target.result; // this is the content!
          const cert = JSON.parse(content);
          if (cert.serialNumber) {
            this.login.cert = cert.serialNumber.split('-')[1];
          }
        };
      };

      input.click();
    },

    jumpTo() {
      const redirect = this.$route.query["redirect"];
      if (redirect) {
        // 登录成功后回到想看的页面
        this.$router.push({ path: redirect });
      } else this.$router.push({ path: "/" });
    },
  },
};
</script>

<style scoped>
.sign {
  position: relative;
  height: calc(100vh - 104px);
}

.bg {
  position: absolute;
  height: 100%;
  width: 100%;
  background-size: cover;
  background-position: center;
  object-fit: cover;
}

.sign-container {
  max-width: 600px;
  margin: 60px auto;
}

.text {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.login-form {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: auto;
  box-sizing: border-box;
  width: 400px;
  padding: 40px 60px;
  border-radius: 20px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(10px);
  background: radial-gradient(rgba(255, 255, 255, 0.8), rgba(255, 255, 255, 0.3));
}

.login-title {
  font-size: 28px;
  margin-bottom: 20px;
  font-weight: 600;
}

.el-form{
  width: 100%;
}

.el-input {
  box-sizing: border-box;
  border-radius: 30px;
  padding: 0 20px;
  background-color: #fff;
  border: none;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

.custom-btn {
  font-size: 16px;
  color: var(--ft-color-0,black);
  transition: color .1s ease-in-out, background-color .1s ease-in-out, border-color .1s ease-in-out;
}

.custom-btn:hover {
  color: var(--prime-color-0,#1e3799);
  background-color: inherit;
  text-decoration: underline;
}

.login-btn {
  height: 50px;
  margin-top: 10px;  
  border-width: 2px;
  border-radius: 30px;
  font-family: DM Sans;
  font-size: 19px;
  line-height: 19px;
  text-decoration: none !important;
  color: #fff;
  border-style: solid;
  border-color: transparent;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  background-color: var(--prime-color-0, #252592);
}

.login-btn:hover {
  border-color: var(--prime-color-0,#1e3799);
}

.register-link {
  margin-top: 20px;
  color: var(--ft-color-0, rgb(0, 0, 0));
}

.register-link a {
  color: var(--ft-color-0, rgb(0, 0, 0));
  font-size: 16px;
}

.el-input__inner {
  border: none;
}

.sign-input>>>.el-input__inner {
  border: none;
  border-radius: 0;
  background-color: transparent;
  /* border-bottom: 1px solid #ccc; */
}

.sign-input>>>.el-input__inner:-webkit-autofill {
  box-shadow: 0 0 0 1000px white inset !important;
}

/* 去除input自动填充时的背景色 https://blog.csdn.net/xxitcef/article/details/118146245 */
.sign-input>>>.el-input__inner:-internal-autofill-previewed,
.sign-input>>>.el-input__inner:-internal-autofill-selected {
  -webkit-text-fill-color: #333 !important;
  transition: background-color 5000s ease-in-out 0s !important;
}
</style>
