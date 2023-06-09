<template>
  <div class="sign">
    <img class="bg" :src="imgHome('cargo.jpg')" />
    <div class="sign-container">
      <div class="login-form">
        <div class="login-title">注册</div>

        <el-form ref="signupForm" :model="signup" :rules="signupRules">
          <el-form-item label="所在通道" prop="channel" placeholder ="myc">
            <el-input v-model="signup.channel" placeholder="请输入用户所在通道"></el-input>
          </el-form-item>

          <el-form-item prop="name">
            <el-input class="sign-input" v-model="signup.name" placeholder="请输入用户名"></el-input>
          </el-form-item>

          <el-form-item prop="password">
            <el-input class="sign-input" v-model="signup.password" placeholder="请输入密码" show-password></el-input>
          </el-form-item>

          <el-form-item label="用户角色" prop="role" style="text-align: right">
            <el-radio-group v-model="signup.role">
              <el-radio v-for="role in userRoles" :key="role.name" :label="role.name">
                {{ role.label }}
              </el-radio>
            </el-radio-group>
          </el-form-item>

          <el-form-item>
            <el-button class="custom-btn login-btn" :disabled="!agree" style="width: 100%" type="primary"
              @click="onSignupSubmit" :loading="loading">
              注册
            </el-button>
          </el-form-item>
        </el-form>
        <el-checkbox class="check" v-model="agree">我自愿承担使用本系统过程中可能出现的风险</el-checkbox>
        <div class="register-link">
          <router-link :to="{ name: 'login' }">
            前往登录
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { DynamicImage } from "@/mixins/DynamicImage";
import { userApi } from "@/api/user.js";

export default {
  name: "SignUp",
  mixins: [DynamicImage("home/")],
  components: {},

  data() {
    return {
      signup: {
        name: "",
        password: "",
        role: "user", // 用户默认角色
        channel: "", // 请输入用户所在通道
      },
      signupRules: {
        name: [{ required: true, trigger: "blur", message: "用户名不能为空" }],
        password: [{ required: true, trigger: "blur", message: "密码不能为空" }],
        role: [{ required: true, trigger: "blur", message: "请勾选用户角色" }],
        channel: [{ required: true, trigger: "blur", message: "请输入用户所在通道" }],
      },
      userRoles: [
        {
          label: "普通用户",
          name: "user",
        },
        {
          label: "机构用户",
          name: "org",
        },
      ],
      agree: false,
      loading: false,
    };
  },

  methods: {
    onSignupSubmit() {
      this.$refs.signupForm.validate((valid) => {
        if (!valid) return;
        // 开始加载
        this.loading = true;
        userApi
          .signup(this.signup)
          .then((data) => {
            this.$message({
              message: "注册成功",
              type: "success",
            });
            // 下载证书内容
            data.certificate && this.download(JSON.stringify(data.certificate));
            this.$router.push({
              name: "login",
              query: { name: this.signup.name },
            });
          })
          .catch((err) => {
            this.$message({
              message: err,
              type: "error",
            });
          })
          .finally(() => {
            // 结束加载
            this.loading = false;
          });
      });
    },

    download(content) {
      console.log(content);
      const fileName = 'certificate.cert'
      var a = document.createElement("a");
      var file = new Blob([content], { type: 'text/plain' });
      a.href = URL.createObjectURL(file);
      a.download = fileName;
      a.click();
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
  background-color: transparent;
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

.el-form {
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
  color: var(--ft-color-0, black);
  transition: color .1s ease-in-out, background-color .1s ease-in-out, border-color .1s ease-in-out;
}

.custom-btn:hover {
  color: var(--prime-color-0, #1e3799);
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
  border-color: var(--prime-color-0, #1e3799);
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

.tips {
  line-height: 19px;
  font-size: 14px;
  color: #606266;
  font-weight: 500;
}
</style>
