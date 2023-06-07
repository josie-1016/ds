<template>
  <Card title="上传文件">
    <div class="grid-cols">
      <el-form
        label-position="left"
        ref="uploadForm"
        :rules="uploadRules"
        :model="form"
        label-width="100px"
      >
        <el-form-item prop="file" label="* 选择文件">
          <!-- <label for="input-file">Browse...</label> -->
          <input type="file" id="input-file" />
        </el-form-item>
        <el-form-item prop="toName" label="定向用户">
          <el-input v-model="form.toName" placeholder="zhuhaitest"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="upload">上传到服务器</el-button>
        </el-form-item>
      </el-form>
    </div>
  </Card>
</template>

<script>
// @ is an alias to /src
import Card from "@/components/Card.vue";
import { Message, Notification } from "element-ui";
import { SM2fileApi } from "@/api/SM2files";
import { getters } from "@/store/store";

export default {
  name: "Upload",
  components: {
    Card,
  },
  data() {
    return {
      form: {
        toName: "",
      },
      uploadRules: {
        toName: [{ required: true, trigger: "blur", message: "请填写文件传输对象" }],
      },
    };
  },

  watch: {},

  async mounted() {},

  methods: {
    selecedFile(param) {
      this.file = param.file;
    },
    handleRemove(file) {
      this.$refs.upload.abort(file);
    },
    upload() {
      const file = document.querySelector("input[type=file]").files[0];
      console.log(file);

      if (!file) {
        Notification.error({
          title: "拒绝",
          message: "请添加文件",
          duration: 2000,
        });
        return;
      }

      this.$refs.uploadForm.validate((valid) => {
        if (!valid) return;

        const userName = getters.userName();
        const toName = this.form.toName;

        SM2fileApi
          .encrypt({userName, toName ,file})
          .then((res) => {
            Message({
              message: "上传成功",
              duration: 5000,
              type: "success",
            });
            console.log(res);
          })
          .catch((e) => {
            Message({
              message: e.message,
              duration: 5000,
              type: "error",
            });
          });
      });
    },
  },
};
</script>
<style scoped>
label {
   cursor: pointer;
   /* Style as you please, it will become the visible UI component. */
}

#input-file {
   /* opacity: 0; */
   /* position: absolute; */
   z-index: 1;
}
</style>