<template>
  <Card title="我的定向传输文件">
    <SM2FilesTable :files="files" />
  </Card>
</template>

<script>
// @ is an alias to /src
import Card from "@/components/Card.vue";
import SM2FilesTable from "@/components/SM2FilesTable.vue";
import { SM2fileApi } from "@/api/SM2files";
import { getters } from "@/store/store";
import { FileDownloader } from "@/mixins/Download";
import { FilterEmpty } from "@/mixins/FilterEmpty";

export default {
  name: "Mine",
  mixins: [FileDownloader, FilterEmpty],
  components: {
    Card,
    SM2FilesTable,
  },
  data() {
    return {
      files: [],
      bookmark: "",
    };
  },

  mounted() {
    const toName = getters.userName();
    const userName = getters.userName();
    const { bookmark } = this;

    SM2fileApi
      .files({ userName, toName, bookmark })
      .then((_) => {
        this.files = _.contents;
        this.bookmark = _.bookmark;
      })
      .catch(console.log);
  },
};
</script>

<style scoped>
.el-tag {
  margin-right: 6px;
}
</style>