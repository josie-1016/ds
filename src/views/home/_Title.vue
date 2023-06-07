<template>
  <section class="section">
    <div class="section-wrapper">
      <h1 class="title wrap">
        <span style="color:var(--prime-color-0,#0C0A6C);">Innovation.</span><br>Security.<br>Effect.
      </h1>


      <div class="wrap">
        <router-link v-if="login" to="/user" class="fuck-underline">
          <div class="button-wrapper">
            <div class="button-custom">
              <span class="button-label">进入我的面板 </span>
              <span class="button-icon"><i class="el-icon-right"></i></span>
            </div>
          </div>
        </router-link>
        <router-link v-else to="/signup" class="fuck-underline">
          <div class="button-wrapper">
            <div class="button-custom">
              <span class="button-label">去注册 </span>
              <span class="button-icon"><i class="el-icon-right"></i></span>
            </div>
          </div>
        </router-link>
      </div>
      <!-- <div class="wrap">
        <div class="button-wrapper">
          <a class="button-custom">
            <span class="button-label">去注册 </span>
            <span class="button-icon"><i class="el-icon-right"></i></span>
          </a>
        </div>
      </div> -->
    </div>
  </section>
</template>

<script>
import { getters } from "@/store/store";
import { DynamicImage } from "@/mixins/DynamicImage";

export default {
  name: "Title",
  mixins: [DynamicImage("home/")],
  methods: {},
  computed: {
    login: getters.isLogin,
  },
  data() {
    return {
    };
  },
};
</script>


<style scoped>
.wrap {
  width: 50%;
}

h1 {
  font-size: 86px;
  line-height: 86px;
  font-weight: 500;
  letter-spacing: -3px
}

.section-wrapper {
  display: flex;
  flex-wrap: wrap;
  align-items: flex-end;
}

.fuck-underline {
  text-decoration: none !important;
}

.button-wrapper {
  display: flex;
  position: relative;
  margin: 0 10px 50px;
  justify-content: flex-end;
}

.button-custom {
  display: inline-block;
  color: #ffffff;
  background-color: #252436;
  border-color: #252436;
  box-shadow: unset;
  font-family: DM Sans;
  font-size: 19px;
  line-height: 19px;
  font-weight: 500;
  letter-spacing: 0px;
  padding: 24px 40px 24px 40px;
  border-width: 2px;
  border-radius: 94px;
  vertical-align: middle;
  position: relative;
  overflow: hidden;
  cursor: pointer;
  border-style: solid;
  transition: color .1s ease-in-out, background-color .1s ease-in-out, border-color .1s ease-in-out;
}

.button-custom:hover {
  color: var(--bg-color-dark, #252436);
  background-color: inherit;
  border-color: var(--bg-color-dark, #252436);
}

.button-label {
  margin: 0 20px 0 10px;
}
</style>