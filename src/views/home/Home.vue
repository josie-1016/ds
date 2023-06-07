<template>
  <div class="home">
<<<<<<< HEAD
    <!-- 标题 -->
    <Title />
    <!-- 方案 -->
=======
    <Banner />
    <!-- 属性管理-->
    <Attributes />
    <!-- 小节内容 -->
    <Organizations />
    <!-- 小节内容 -->
    <Files />
    <Title />
    <!-- 方案-->
>>>>>>> dabe
    <Scheme />
    <!-- 底部 -->
    <Footer />
  </div>
</template>

<script>
// @ is an alias to /src
<<<<<<< HEAD
// import Banner from "./_Banner.vue";
import Scheme from "./_Scheme.vue";
import Footer from "@/components/Footer.vue";
import Title from "./_Title.vue";
=======
import Banner from "./_Banner.vue";
import Files from "./_Files.vue";
import Attributes from "./_Attributes.vue";
import Organizations from "./_Organizations.vue";
import Footer from "@/components/Footer.vue";
import Title from "@/views/home/_Title";
import Scheme from "./_Scheme"
>>>>>>> dabe
import { throttle } from "@/utils/helpers";

export default {
  name: "Home",
<<<<<<< HEAD
  components: { Scheme, Footer, Title },
=======
  components: { Banner, Footer, Attributes, Organizations, Files, Title, Scheme},
>>>>>>> dabe
  data() {
    return {};
  },
  methods: {
    handleScroll: throttle(function () {}, 300),
  },
  created() {
    // 创建该组件时，监听滚动函数
    window.addEventListener("scroll", this.handleScroll);
  },
  destroyed() {
    // 切换到其它页面时，移除滚动监听
    window.removeEventListener("scroll", this.handleScroll);
  },
};
</script>

<style scoped>
section:nth-child(even) {
  background-color: var(--bg-color-0, white);
}

section:nth-child(odd) {
  background-color: var(--bg-color-2, #f1f1f2);
}
</style>

<style>
/* shared by child components */
.section-title {
  text-align: center;
  font-size: 1.8em;
  padding: 0.5em 0 1em 0;
}

.section {
<<<<<<< HEAD
  padding: 60px var(--body-margin, 32px);
=======
  padding: 36px var(--body-margin, 32px);
>>>>>>> dabe
}

.entry-title {
  margin-bottom: 8px;
  font-size: 18px;
  font-weight: 500;
  color: #000;
  line-height: 24px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.entry-desc {
  font-size: 14px;
  color: #98a3b7;
  line-height: 20px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>