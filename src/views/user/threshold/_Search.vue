<template>
    <Card title="门限文件搜索">
      <div style="margin-bottom: 15px">
        <el-row :gutter="10">
          <el-col :span="7">
            <el-input placeholder="请输入要搜索的上传者的组织" v-model="filter.orgName"></el-input>
          </el-col>
          <el-col :span="7">
          <el-input placeholder="请输入要搜索的文件名" v-model="filter.fileName"></el-input>
          </el-col>
          <el-col :span="2">
            <el-button style="float: right" type="primary" @click="search">筛选</el-button>
          </el-col>
        </el-row>
      </div>
      <ThresholdTable :files="files" />
    </Card>
  </template>
  
  <script>
  // @ is an alias to /src
  import Card from "@/components/Card.vue";
  import { TimeFormat } from "@/mixins/TimeFormat";
  
  import ThresholdTable from "@/components/ThresholdTable.vue";
import { thresholdApi } from "@/api/threshold";
  
  export default {
    name: "Search",
    mixins: [TimeFormat],
    components: {
    Card,
    ThresholdTable
},
  
    data() {
      return {
        filter: {},
        files: [],
        bookmark: "",
      };
    },
  
    methods: {
      search() {
        this.bookmark = "";
        const {  orgName , fileName } = this.filter;
        if(orgName == null){
          alert("没有填写机构名");
        }
        else{
          const { bookmark } = this;
          thresholdApi.searchThreshold({orgName, fileName})
          .then(res => 
          {this.files = res.contents,
          console.log(this.files)
          console.log(res),
          console.log("111111111111111111111111")}
          )
          .catch(console.log);
          console.log(fileName ,orgName , bookmark);
        }
        
      },
    },
  };
  </script>
  