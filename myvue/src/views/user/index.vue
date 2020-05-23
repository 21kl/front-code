<template>
  <div>
    <div>
      <el-container style="width:80%;margin:auto">
        <!-- 头部打算放头像，昵称，排名和签到之类的信息 -->
        <el-header style="background: #e5e9f2">
          <!-- 头像和昵称需要偏左来显示 -->
          <div style="float:left;margin-top:10px">
            <el-avatar style="vertical-align:middle;"> user </el-avatar>
            <span style="vertical-align:middle;margin-left:20px;">chenbo</span>
          </div>
          <!-- 签到和排名需要靠右显示 -->
          <div style="float:right;margin-top:10px">
            <span style="margin-right:20px">
              第1名
            </span>
            <span>
              <el-button
                type="success"
                round
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

              讨论贴

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
                  label="题目序号"
                  width="90px"
                />
                <el-table-column
                  prop="questionTitle"
                  label="题目标题"
                />
                <el-table-column label="我的选择" prop="selfOption"></el-table-column>
                <el-table-column label="正确选项" prop="correctOption"></el-table-column>
                <el-table-column label="提交时间" prop="createTime"></el-table-column>
              </el-table>
              <pagination
                v-show="total>0"
                :total="total"
                :background="false"
                :page.sync="queryParam.pageIndex"
                :limit.sync="queryParam.pageSize"
                @pagination="search"
                style="margin-top: 20px"
              />

            </el-tab-pane>
            <el-tab-pane
              label="收藏"
              name="third"
            >

              收藏

            </el-tab-pane>
            <el-tab-pane
              label="个人信息"
              name="fourth"
            >

              个人信息

            </el-tab-pane>
          </el-tabs>
        </el-main>
      </el-container>

    </div>
  </div>
</template>

<script>
import Pagination from "@/components/Pagination";
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
      total: 0
    };
  },
  methods: {
    handleClick(tab, event) {
      console.log(tab, event);
      console.log(tab.index);
      console.log(tab.label);
      console.log(tab.name);
      this.search()
    },
    search() {

        console.log("search")
        console.log("index")
        console.log(this.queryParam.pageIndex)
        const url = "http://localhost:8003/complete/findAllCompleteByUid";

        this.axios
        .get(url, {
          params:{
            uid: localStorage.getItem("uid"),
            indexPage:this.queryParam.pageIndex,
            limitSize:this.queryParam.pageSize
          }
        })
        .then(res => {
            this.listLoading = false;
          console.log("uid:" + localStorage.getItem("uid"));
          console.log("res.data.data");
          console.log(res);
          this.tableData = res.data.data
          this.total = res.data.total
        });
        
    },
    created:function(){
        console.log("created")
        this.search()
    }
  }
};
</script>