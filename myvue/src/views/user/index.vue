<template>
  <div>
    <div>
      <el-container style="width:80%;margin:auto">
        <!-- 头部打算放头像，昵称，排名和签到之类的信息 -->
        <el-header style="background: #e5e9f2">
          <!-- 头像和昵称需要偏左来显示 -->
          <div style="float:left;margin-top:10px">
            <el-avatar style="vertical-align:middle;"> user </el-avatar>
            <span style="vertical-align:middle;margin-left:20px;">{{username}}</span>
          </div>
          <!-- 签到和排名需要靠右显示 -->
          <div style="float:right;margin-top:10px">
            <span style="margin-right:20px">
              第{{rank}}名
            </span>
            <span>
              <el-button
                type="success"
                round
                @click="sign()"
              >签到</el-button>
            </span>
          </div>
        </el-header>
        <!-- aside是一个显示个人信息的卡片 -->

        <!-- 主体是一个tab切换的内容，包括了讨论，刷题和收藏，最后如果有时间还可以加一个图表的分析 -->
        <el-main>
          <el-tabs
            v-model="activeName"
            @tab-click="handleClick"
          >
            <el-tab-pane
              label="讨论贴"
              name="first"
            >

              <!-- 在这里显示有出现过的帖子 -->
              <div v-if="discussList.length==0">
                你还没有发布帖子，快去发布帖子吧~~~
              </div>
              <div v-else>
                <div
                  v-for="(item,index) in discussList"
                  :key="index"
                >

                  <div
                    id="disOne"
                    style="width:100%;height:60px;margin:auto;background: #e5e9f2;margin-top:20px"
                  >
                    <div style="float:left;margin-top:10px">
                      <el-avatar style="vertical-align:middle;"> user </el-avatar>
                      <!-- //用户名 -->
                      <span style="vertical-align:middle;margin-left:10px;">{{item.userUsername}}</span>
                      <!-- 标题 -->
                      <el-link type="info">
                        <!-- 跳转到显示帖子的界面 -->
                        <router-link
                          target="_blank"
                          :to="{path:'/discussRender',query:{str:item.discussContent}}"
                        >
                          {{item.discussTitle}}
                        </router-link>
                      </el-link>

                    </div>

                    <div style="float:right;margin-top:20px">
                      <span style="margin-right:20px;vertical-align:middle;">
                        {{item.stringDate}}
                      </span>
                    </div>
                    <!-- </div> -->
                  </div>
                </div>

              </div>
            </el-tab-pane>
            <el-tab-pane
              label="历史刷题"
              name="second"
            >
              <!-- 先展示表格再使用分页插件 -->
              <el-table
                v-loading="listLoading"
                :data="tableData"
                fit
                highlight-current-row
                style="width: 100%"
              >
                <el-table-column
                  prop="id"
                  label="序号"
                  width="90px"
                />
                <el-table-column
                  prop="questionTitle"
                  label="题目标题"
                />
                <el-table-column
                  label="我的选择"
                  prop="selfOption"
                ></el-table-column>
                <el-table-column
                  label="正确选项"
                  prop="correctOption"
                ></el-table-column>
                <el-table-column
                  label="提交时间"
                  prop="createTime"
                ></el-table-column>
              </el-table>
              <pagination
                v-show="total>0"
                :total="total"
                :background="false"
                :page.sync="queryParam.pageIndex"
                :limit.sync="queryParam.pageSize"
                @pagination="search(0)"
                style="margin-top: 20px"
              />

            </el-tab-pane>
            <el-tab-pane
              label="收藏"
              name="third"
            >

              <!-- 收藏的展示跟已刷题目是一样的 -->
              <div v-if="total>0">
                <el-table
                  v-loading="listLoading"
                  :data="tableData"
                  fit
                  highlight-current-row
                  style="width: 100%"
                >
                  <el-table-column
                    prop="id"
                    label="序号"
                    width="90px"
                  />
                  <el-table-column
                    prop="questionTitle"
                    label="题目标题"
                  />
                  <el-table-column
                    label="我的选择"
                    prop="selfOption"
                  ></el-table-column>
                  <el-table-column
                    label="正确选项"
                    prop="correctOption"
                  ></el-table-column>
                  <el-table-column
                    label="提交时间"
                    prop="createTime"
                  ></el-table-column>
                </el-table>
                <pagination
                  v-show="total>0"
                  :total="total"
                  :background="false"
                  :page.sync="queryParam.pageIndex"
                  :limit.sync="queryParam.pageSize"
                  @pagination="search(1)"
                  style="margin-top: 20px"
                />
              </div>
              <div v-else>
                {{notifyStr}}
              </div>

            </el-tab-pane>
            <el-tab-pane
              label="个人信息"
              name="fourth"
            >

              <!-- 个人信息的表单界面 -->
              <div>
                <el-form label-width="80px">
                  <el-form-item label="用户名">
                    <el-input
                      v-model="username"
                      :disabled="true"
                    ></el-input>
                  </el-form-item>
                  <el-form-item label="已完成">
                    <el-input
                      v-model="totalCompleted"
                      :disabled="true"
                    ></el-input>
                  </el-form-item>
                  <el-form-item label="旧密码">
                    <el-input
                      v-model="oldPass"
                      show-password
                    ></el-input>
                  </el-form-item>
                  <el-form-item label="新密码">
                    <el-input
                      v-model="newPass"
                      show-password
                    ></el-input>
                  </el-form-item>

                  <el-form-item>
                    <el-button
                      type="primary"
                      @click="onSubmit"
                    >提交修改</el-button>
                  </el-form-item>
                </el-form>
              </div>
            </el-tab-pane>
          </el-tabs>
        </el-main>
      </el-container>

    </div>
  </div>
</template>

<script>
import Pagination from "@/components/Pagination/index";
import { Message } from "element-ui";
export default {
  components: { Pagination },
  data() {
    return {
      activeName: "first",
      queryParam: {
        pageIndex: 1,
        pageSize: 10
      },
      listLoading: true,
      tableData: [],
      total: 0,
      username: "",
      notifyStr: "空空如也",
      totalCompleted: 0,
      oldPass: "",
      newPass: "",
      discussList: [],
      rank: 3
    };
  },
  methods: {
    handleClick(tab, event) {
      if (tab.index == 0) {
        console.log("讨论贴");
        this.findAllDiscuss();
      } else if (tab.index == 1) {
        //已经刷完的题目
        this.search(0);
      } else if (tab.index == 2) {
        //收藏的题目
        this.search(1);
      } else {
        this.getUsername();
        this.getCompletedTotal();
      }
    },
    //用户进行签到
    sign() {
      const url = "http://localhost:8003/sign/add";
      this.axios.post(url, { uid: localStorage.getItem("uid") }).then(res => {
        console.log("list");
        console.log(res);
        console.log(res.data.data);
        //签到成功
        if (res.data.code == 200) {
          this.$message({
            showClose: true,
            message: "恭喜你，签到成功",
            type: "success"
          });
        } else {
          this.$message({
            showClose: true,
            message: "已签到，不可重复签到",
            type: "error"
          });
        }
      });
    },
    //找通过uid到所有的讨论贴
    findAllDiscuss() {
      const url = "http://localhost:8003/discuss/findAllDiscussByUid";
      this.axios
        .get(url,{params: { uid: localStorage.getItem("uid") }}, { emulateJSON: true })
        .then(res => {
          console.log("list");
          console.log(res);
          console.log(res.data.data);
          this.discussList = res.data.data;
        });
    },
    onSubmit() {
      this.listLoading = true;
      const url = "http://localhost:8004/auth/updatePass";
      this.axios
        .post(
          url,
          {
            uid: localStorage.getItem("uid"),
            oldPass: this.oldPass,
            newPass: this.newPass
          },
          {
            emulateJSON: true
          }
        )
        .then(res => {
          if (res.data.code == 200) console.log("修改密码成功");
          console.log(res);
        });
    },
    getCompletedTotal() {
      this.rank = Math.ceil(Math.random() * 10) + 1;
      const url = "http://localhost:8003/complete/getCompletedTotal";
      this.axios
        .get(url, {
          params: {
            uid: localStorage.getItem("uid"),
            voteStatus: 0
          }
        })
        .then(res => {
          console.log("tatalCompleted");
          console.log(res.data);
          this.totalCompleted = res.data;
        });
    },
    getUsername() {
      const url = "http://localhost:8004/user/findUsernameByUid";
      this.axios
        .get(url, {
          params: {
            uid: localStorage.getItem("uid")
          }
        })
        .then(res => {
          this.username = res.data;
        });
    },
    search(status) {
      console.log("status")
      console.log(status)
      this.listLoading = true;
      this.getUsername();
      const url = "http://localhost:8003/complete/findAllCompleteByUid";
      this.axios
        .get(
          url,
          {
            params: {
              uid: localStorage.getItem("uid"),
              indexPage: this.queryParam.pageIndex,
              limitSize: this.queryParam.pageSize,
              //是否收藏的标志
              voteStatus: status
            }
          },
          {
            emulateJSON: true
          }
        )
        .then(res => {
          this.listLoading = false;
          this.tableData = res.data.data;
          this.total = res.data.total;
        });
    },
    created: function() {
      this.username = this.$route.query.username;
      console.log("created");
      this.getUsername();
      this.search(1);
    },
    mounted: function() {
      console.log("mouted");
    }
  }
};
</script>