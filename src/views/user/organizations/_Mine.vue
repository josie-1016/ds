<template>
  <div>
    <Card title="我的组织">
      <template v-slot:op>
        <el-button size="small" @click="joinDialogFormVisible = true"> 加入组织 </el-button>
        <el-button size="small" type="primary" @click="applyDialogFormVisible = true">
          申请创建组织
        </el-button>
      </template>
      <div v-if="OPKMap">
        <el-table :data="formatOrganization(OPKMap)" style="width: 100%">
          <el-table-column show-overflow-tooltip prop="name" label="组织名称" width="180"> </el-table-column>
          <el-table-column show-overflow-tooltip prop="value" label="组织公钥">
            <template slot-scope="scope">
              {{ scope.row.value || "暂无" }}
            </template>
          </el-table-column>

          <el-table-column label="操作" width="160" align="right">
            <template slot-scope="scope">
<<<<<<< HEAD
              <el-button size="mini" @click="submitPartPK(scope.row)"> 提交组织秘密 </el-button>
=======
              <el-button v-loading.fullscreen.lock="fullscreenLoading" size="mini" @click="submitPartPK(scope.row)"> 提交组织秘密 </el-button>
>>>>>>> dabe
            </template>
          </el-table-column>
        </el-table>
      </div>
      <el-empty v-else :image-size="100" description="没有正在申请的属性"></el-empty>
    </Card>

    <el-dialog title="申请成立新组织" :visible.sync="applyDialogFormVisible">
      <el-form ref="applyForm" :rules="applyRules" :model="form" label-width="80px">
        <el-form-item prop="orgName" label="组织名称">
          <el-input v-model="form.orgName" placeholder="请输入组织名称"></el-input>
        </el-form-item>

        <el-form-item prop="threshold" label="阈值">
          <el-input v-model="form.threshold" placeholder="请输入阈值"></el-input>
        </el-form-item>

        <el-form-item prop="userStr" label="其它成员">
<<<<<<< HEAD
          <el-input v-model="form.userStr" placeholder="请输入除您之外包含的其它成员"></el-input>
=======
          <el-input v-model="form.userStr" placeholder="请输入除您之外包含的其它成员 以空格区分成员名"></el-input>
>>>>>>> dabe
        </el-form-item>
      </el-form>
      <div slot="footer">
        <el-button @click="applyDialogFormVisible = false">取 消</el-button>
<<<<<<< HEAD
        <el-button type="primary" @click="applyForOrg">确 定</el-button>
=======
        <el-button v-loading.fullscreen.lock="fullscreenLoading" type="primary" @click="applyForOrg">确 定</el-button>
>>>>>>> dabe
      </div>
    </el-dialog>

    <el-dialog title="加入组织" :visible.sync="joinDialogFormVisible">
      <el-form ref="joinForm" :rules="joinRules" :model="joinForm" label-width="80px">
        <el-form-item prop="orgName" label="组织名称">
          <el-input v-model="joinForm.orgName" placeholder="请输入组织名称"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer">
        <el-button @click="joinDialogFormVisible = false">取 消</el-button>
<<<<<<< HEAD
        <el-button type="primary" @click="joinOrg">确 定</el-button>
=======
        <el-button v-loading.fullscreen.lock="fullscreenLoading" type="primary" @click="joinOrg">确 定</el-button>
>>>>>>> dabe
      </div>
    </el-dialog>
  </div>
</template>

<script>
// @ is an alias to /src
import Card from "@/components/Card.vue";
import { orgApi } from "@/api/organizations";
import { getters } from "@/store/store";

export default {
  name: "Mine",
  components: {
    Card,
  },

  computed: {
    ...getters.mapUser(["OPKMap"]),
  },

  data() {
    return {
<<<<<<< HEAD
=======
      fullscreenLoading:false,
>>>>>>> dabe
      applyDialogFormVisible: false,
      form: {
        threshold: "",
        userStr: "",
        orgName: "",
      },
      applyRules: {
        orgName: [{ required: true, trigger: "blur", message: "组织名不能为空" }],
        threshold: [{ required: true, trigger: "blur", message: "阈值不能为空" }],
        userStr: [{ required: true, trigger: "blur", message: "成员不能为空" }],
      },
      joinDialogFormVisible: false,
      joinForm: {
        orgName: "",
      },
      joinRules: {
        orgName: [{ required: true, trigger: "blur", message: "组织名不能为空" }],
      },
    };
  },

  methods: {
    formatOrganization(OPKMap) {
      let attributes = [];
      for (let key of Object.keys(OPKMap)) {
        attributes.push({
          name: key,
          value: OPKMap[key].OPK,
        });
      }
      return attributes;
    },

    applyForOrg() {
      const userName = getters.userName();
      if (!userName) return;

      this.$refs.applyForm.validate((valid) => {
        if (!valid) return;

        const { threshold, userStr, orgName } = this.form;
        const users = userStr.split(" ");
        users.push(userName);
<<<<<<< HEAD
=======
        this.fullscreenLoading = true;
>>>>>>> dabe

        orgApi
          .create({
            userName,
            threshold,
            users,
            orgName,
            usersNum: users.length,
          })
          .then(() => {
<<<<<<< HEAD
            this.$message({
              message: "申请成功",
              duration: 2 * 1000,
              type: "success",
            });
          })
          .catch((e) => {
=======
            this.fullscreenLoading = false;
            this.$message({
              message: "申请组织创建成功",
              duration: 2 * 1000,
              type: "success",
            });
            orgApi
            .join({ userName, orgName })
            .then(() => {
              this.$message({
                message: "加入组织成功",
                duration: 2 * 1000,
                type: "success",
              });
            })
            .catch((e) => {
              this.$message({
                message: e.message,
                type: "error",
              });
            })
          })
          .catch((e) => {
            this.fullscreenLoading = false;
>>>>>>> dabe
            this.$message({
              message: e.message,
              type: "error",
            });
          })
          .finally(() => {
            this.applyDialogFormVisible = false;
          });
      });
    },

    joinOrg() {
      const userName = getters.userName();
      if (!userName) return;

      this.$refs.joinForm.validate((valid) => {
        if (!valid) return;

        const { orgName } = this.joinForm;
<<<<<<< HEAD
=======
        this.fullscreenLoading = true;
>>>>>>> dabe

        orgApi
          .join({ userName, orgName })
          .then(() => {
<<<<<<< HEAD
=======
            this.fullscreenLoading = false;
>>>>>>> dabe
            this.$message({
              message: "加入成功",
              duration: 2 * 1000,
              type: "success",
            });
          })
          .catch((e) => {
<<<<<<< HEAD
=======
            this.fullscreenLoading = false;
>>>>>>> dabe
            this.$message({
              message: e.message,
              type: "error",
            });
          })
          .finally(() => {
<<<<<<< HEAD
            this.applyDialogFormVisible = false;
=======
            this.joinDialogFormVisible = false;
            location.reload();
>>>>>>> dabe
          });
      });
    },

    submitPartPK(org) {
      const userName = getters.userName();
<<<<<<< HEAD

      orgApi
        .submitppk({ userName, orgName: org.name })
        .then(() => {
=======
      this.fullscreenLoading = true;
      orgApi
        .submitppk({ userName, orgName: org.name })
        .then(() => {
          this.fullscreenLoading = false;
>>>>>>> dabe
          this.$message({
            message: "提交成功",
            duration: 2 * 1000,
            type: "success",
          });
          // 尝试最终确认
          this.trycompleteOrgPK(userName, org.name);
        })
        .catch((e) => {
<<<<<<< HEAD
=======
          this.fullscreenLoading = false;
>>>>>>> dabe
          this.$message({
            message: e.message,
            type: "error",
          });
        });
    },

    trycompleteOrgPK(userName, orgName) {
      orgApi
        .completeOrg({ userName, orgName })
        .then(() => {
          this.$message({
            message: "组织已确认创建",
            duration: 2 * 1000,
            type: "success",
          });
<<<<<<< HEAD
=======
          location.reload();
>>>>>>> dabe
        })
        .catch(console.log);
    },
  },
};
</script>