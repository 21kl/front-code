<template>
  <div>

    <div
      id="postDis"
      style="float:left;"
    >
      <el-input
        placeholder="请输入查询内容"
        prefix-icon="el-icon-search"
        v-model="searchItem"
        style="width:500px;float:left;"
        @keyup.enter.native="fuzzyQuery()"
      >

      </el-input>
    </div>

    <div>
      <!-- 将获取到的数据进行计算 -->
      <el-table
        :data="tableData.slice((currentPage-1)*PageSize,currentPage*PageSize)"
        tooltip-effect="dark"
        style="width: 100%"
        header-align="center"
        v-loading="loading"
      >
        <!-- 折叠起来，需要修改再搞一个弹窗 -->
        <el-table-column type="expand">
          <template slot-scope="props">
            <el-form
              label-position="left"
              inline
              class="demo-table-expand"
            >
              <el-form-item label="题目分值">
                <el-input
                  v-model="props.row.questionScore"
                  suffix-icon="el-icon-edit"
                  type="textarea"
                  autosize
                ></el-input>
              </el-form-item>
              <el-form-item label="题目难度">
                <el-input
                  v-model="props.row.questionDeepth"
                  suffix-icon="el-icon-edit"
                  type="textarea"
                  autosize
                ></el-input>
              </el-form-item>
              <el-form-item label="题目答案">
                <el-input
                  v-model="props.row.questionAnswer"
                  suffix-icon="el-icon-edit"
                  type="textarea"
                  autosize
                ></el-input>
              </el-form-item>
              <el-form-item label="选项A">
                <el-input
                  v-model="props.row.options[0].optionContent"
                  suffix-icon="el-icon-edit"
                  type="textarea"
                  autosize
                ></el-input>
              </el-form-item>
              <el-form-item label="选项B">
                <el-input
                  v-model="props.row.options[1].optionContent"
                  suffix-icon="el-icon-edit"
                  type="textarea"
                  autosize
                ></el-input>
              </el-form-item>
              <el-form-item label="选项C">
                <el-input
                  v-model="props.row.options[2].optionContent"
                  suffix-icon="el-icon-edit"
                  type="textarea"
                  autosize
                ></el-input>
              </el-form-item>
              <el-form-item label="选项D">
                <el-input
                  v-model="props.row.options[3].optionContent"
                  suffix-icon="el-icon-edit"
                  type="textarea"
                  autosize
                ></el-input>
              </el-form-item>
              <el-form-item>
                <el-button
                  type="success"
                  size="mini"
                  round
                  plain
                  @click="onSubmitToUpdate(props)"
                >修改题目</el-button>
                <el-button
                  type="danger"
                  size="mini"
                  plain
                  round
                  @click="onSubmitToDelete(props)"
                >删除题目</el-button>
              </el-form-item>
            </el-form>
          </template>
        </el-table-column>
        <el-table-column
          width="50"
          header-align="center"
          label="序号"
        >
          <template slot-scope="{row,$index}">
            <span>{{$index + 1}}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="题目标题"
          prop="questionTitle"
        >
          <template slot-scope="{row,$index}">
            <input
              class="edit-cell"
              v-if="showEdit[$index]"
              v-model="row.questionTitle"
            >
            <span v-if="!showEdit[$index]">{{row.questionTitle}}</span>
          </template>
        </el-table-column>

        <el-table-column
          label="上传时间"
          prop="createTime"
          width="300"
          header-align="center"
        >
          <template slot-scope="{row,$index}">
            <input
              class="edit-cell"
              v-if="showEdit[$index]"
              v-model="row.createTime"
            >
            <span v-if="!showEdit[$index]">{{row.createTime}}</span>
          </template>
        </el-table-column>
        <el-table-column
          fixed="right"
          label="操作"
          width="100"
          header-align="center"
        >
          <template slot-scope="{row,$index}">
            <el-button
              type="text"
              size="small"
              @click.native="handleUpdate($index, row)"
              v-if="showBtn[$index]"
            >更新</el-button>
            <el-button
              type="text"
              size="small"
              @click.native="handleCancel($index, row)"
              v-if="showBtn[$index]"
            >取消</el-button>
            <el-button
              type="text"
              size="small"
              @click.native="handleEdit($index, row)"
              v-if="!showBtn[$index]"
            >编辑</el-button>
            <el-button
              type="text"
              size="small"
              @click.native="handleDelete($index, row)"
              v-if="!showBtn[$index]"
            >删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="tabListPage">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage"
          :page-sizes="pageSizes"
          :page-size="PageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="totalCount"
        >
        </el-pagination>
      </div>
    </div>

  </div>

</template>
<script>
export default {
  data() {
    return {
      // 总数据
      tableData: [],
      // 默认显示第几页
      currentPage: 1,
      // 总条数，根据接口获取数据长度(注意：这里不能为空)
      totalCount: 1,
      // 个数选择器（可修改）
      pageSizes: [5, 10, 15, 20],
      // 默认每页显示的条数（可修改）
      PageSize: 5,
      tagId: 0,
      showEdit: [], //显示编辑框
      showBtn: [],
      showBtnOrdinary: true,
      loading: false,
      searchItem: ""
    };
  },
  methods: {
    fuzzyQuery() {},
    getData() {
      // 这里使用axios，使用时请提前引入
      this.loading = true;
      const url = "http://localhost:8003/question/findAllQuestions";
      this.axios.get(url).then(res => {
        console.log("tatalCompleted");
        console.log(res.data.data[0]);
        this.tableData = res.data.data;
        this.totalCount = this.tableData.length;
        this.loading = false;
      });
    },
    // 分页
    // 每页显示的条数
    handleSizeChange(val) {
      // 改变每页显示的条数
      this.PageSize = val;
      // 注意：在改变每页显示的条数时，要将页码显示到第一页
      this.currentPage = 1;
    },
    // 显示第几页
    handleCurrentChange(val) {
      // 改变默认的页数
      this.currentPage = val;
    },

    //表格的方法
    //点击编辑
    handleEdit(index, row) {
      console.log("修改表格");
      console.log(index);
      console.log(row);
      this.showEdit[index] = true;
      this.showBtn[index] = true;
      this.$set(this.showEdit, index, true);
      this.$set(this.showBtn, index, true);
    },
    //取消编辑
    handleCancel(index, row) {
      // this.getContentList();
      console.log("取消修改");
      console.log(index);
      console.log(row);
      this.showEdit[index] = false;
      this.showBtn[index] = false;
    },

    //点击更新
    handleUpdate(formName) {},
    //点击删除
    handleDelete(index, row) {},
    //删除题目
    onSubmitToUpdate(row) {
      console.log("onSubmitToUpdate");
      console.log(row);
    },
    //修改题目
    onSubmitToDelete(row) {
      console.log("onSubmitToUpdate");
      console.log(row.row.questionUid);
      const url = "http://localhost:8003/question/deleteByQuestionUid";
      this.axios
        .post(
          url,
          {
            uid: row.row.questionUid
          },
          {
            emulateJSON: true
          }
        )
        .then(result => {
          var result = result.data;
          console.log("删除成功");
          this.getData();
        });
    }
  },
  created: function() {
    this.tagId = this.$route.query.tagId;
    console.log("tagId");
    console.log(this.tagId);

    this.getData();
  }
};
</script>

<style>
.demo-table-expand {
  font-size: 0;
}
.demo-table-expand label {
  width: 90px;
  color: #99a9bf;
}
.demo-table-expand .el-form-item {
  margin-right: 0;
  margin-bottom: 0;
  width: 100%;
}
</style>