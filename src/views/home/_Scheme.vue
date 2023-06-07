<template>
  <section class="section">
    <div class="section-title">方案</div>
    <div class="flex-cols">
        <a v-for="(attr, index) in attrs" :key="index" class="flex-entry">
          <div class="entry-title" style="margin:0 auto;">{{ attr.title }}</div>
          <!-- <div class="entry-desc">{{ attr.desc }}</div> -->
        </a>
    </div>
  </section>
</template>

<script>
import { DynamicImage } from "@/mixins/DynamicImage";

export default {
  name: "Scheme",
  mixins: [DynamicImage("home/")],
  methods: {},
  data() {
    return {
      attrs: [
        { title: "属性加密", desc: "" },
        { title: "门限加密", desc: "" },
        { title: "非对称密钥", desc: "" },
        { title: "环签名", desc: "" },
        { title: "零知识证明", desc: "" },
      ]
    };
  },
};
</script>

<style scoped>
.flex-cols {
  display: flex;
  padding-bottom: 48px
}

.flex-entry {
  display: flex;
  flex: 1;
  padding: 16px;
  margin: 0 16px;
  border-radius: 4px;
  box-sizing: border-box;
  border: 2px solid #fff;
  background-color: #f9f9f9;
  transition: 0.5s;
  cursor: pointer;
}

.flex-entry:hover {
  background-color: #e2e2e2;
  transition: 0.3s;
}

</style>