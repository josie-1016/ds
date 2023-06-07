<template>
  <el-table :data="files">
<<<<<<< HEAD
    <el-table-column show-overflow-tooltip label="文件名" prop="fileName" />
    <el-table-column show-overflow-tooltip label="密文哈希" prop="cipher" />
    <el-table-column show-overflow-tooltip label="上传者" prop="sharedUser" />
    <el-table-column show-overflow-tooltip label="上传时间" prop="timeStamp" width="250">
=======
    <el-table-column show-overflow-tooltip label="文件名" prop="fileName"/>
    <el-table-column show-overflow-tooltip label="密文哈希" prop="cipher"/>
    <el-table-column show-overflow-tooltip label="上传者" prop="sharedUser" />
    <el-table-column show-overflow-tooltip label="上传时间" prop="timeStamp" width="200">
>>>>>>> dev
      <template slot-scope="scope">
        {{ scope.row.timeStamp }}
      </template>
    </el-table-column>
<<<<<<< HEAD
    <el-table-column show-overflow-tooltip label="IP" prop="ip" width="130"></el-table-column>
=======
>>>>>>> dev
    <el-table-column show-overflow-tooltip label="加密策略" prop="policy" />
    <el-table-column show-overflow-tooltip label="标签" prop="tags">
      <template slot-scope="scope">
        <el-tag
          v-for="(tag, i) in filterEmpty(scope.row.tags)"
          :key="i"
          size="small"
          effect="plain"
        >
          {{ tag }}
        </el-tag>
      </template>
    </el-table-column>

<<<<<<< HEAD
    <el-table-column label="操作" align="right" width="200">
      <template slot-scope="scope">
=======
    <el-table-column label="操作" align="right" width="300">
      <template slot-scope="scope">
        <el-button size="mini" type="success" @click="verifySignature(scope.row)"> 验签 </el-button>
>>>>>>> dev
        <el-button size="mini" type="success" @click="decryDownload(scope.row)">
          解密下载
        </el-button>
        <el-button size="mini" @click="cipherDownload(scope.row)"> 下载密文 </el-button>
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
// @ is an alias to /src
import { fileApi } from "@/api/files";
import { getters } from "@/store/store";
import { FileDownloader } from "@/mixins/Download";
import { FilterEmpty } from "@/mixins/FilterEmpty";
import { TimeFormat } from "@/mixins/TimeFormat";

<<<<<<< HEAD
=======
import { Message } from "element-ui";

>>>>>>> dev
export default {
  name: "FilesTable",
  mixins: [FileDownloader, FilterEmpty, TimeFormat],

  props: {
    files: {
      type: Array,
      default: undefined,
    },
  },

  methods: {
    decryDownload(scope) {
      const user = getters.userName();
      const { cipher, sharedUser, fileName, tags } = scope;
      fileApi
        .decrypt({ user, cipher, sharedUser, fileName, tags })
        .then(() => {
          return fileApi
            .download({ fileName, sharedUser })
            .then((_) => {
              this.saveFile(fileName, _);
            })
<<<<<<< HEAD
            .catch((message) => {
              this.$message({
                message,
=======
            .catch((e) => {
              this.$message({
                message: e.message,
>>>>>>> dev
                duration: 5000,
                type: "error",
              });
            });
        })
        .catch((e) => {
          this.$message({
<<<<<<< HEAD
            message: e,
=======
            message: e.message,
>>>>>>> dev
            duration: 5000,
            type: "error",
          });
        });
    },

    cipherDownload(scope) {
      const userName = getters.userName();
      const { sharedUser, fileName } = scope;

      fileApi
        .downloadCipher({ userName, fileName, sharedUser })
        .then((_) => {
          this.saveFile("cipher_hash_" + fileName, _);
        })
        .catch((e) => {
          this.$message({
<<<<<<< HEAD
            message: e,
=======
            message: e.message,
>>>>>>> dev
            duration: 5000,
            type: "error",
          });
        });
    },
<<<<<<< HEAD
=======
    verifySignature(scope){
      const userName = getters.userName();
      const { sharedUser, fileName } = scope;
      
      fileApi
        .verifySignature({userName, fileName, sharedUser})
        .then((res) => {
          Message({
              message: "验签通过",
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
    },
>>>>>>> dev
  },
};
</script>

<style scoped>
.el-tag {
  margin-right: 6px;
}
</style>