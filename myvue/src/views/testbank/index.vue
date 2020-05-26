<template>
  <div>
    <div>
      <!-- 将获取到的数据进行计算 -->
      <el-table
    :data="tableData.slice((currentPage-1)*PageSize,currentPage*PageSize)"
    tooltip-effect="dark"
    style="width: 100%"
    header-align="center">
    <!-- 折叠起来，需要修改再搞一个弹窗 -->
    <el-table-column type="expand">
      <template slot-scope="props">
        <el-form label-position="left" inline class="demo-table-expand">
          <el-form-item label="题目标签">
            <span>{{ props.row.tagContent }}</span>
          </el-form-item>
          <el-form-item label="题目分值">
            <span>{{ props.row.questionScore }}</span>
          </el-form-item>
          <el-form-item label="题目难度">
            <span>{{ props.row.questionDeepth }}</span>
          </el-form-item>
          <el-form-item label="题目答案">
            <span>{{ props.row.questionAnswer }}</span>
          </el-form-item>
          <!-- <el-form-item label="题目标题">
            <span>{{ props.row.questionTitle }}</span>
          </el-form-item> -->
          <el-form-item label="选项A">
            <span>{{ props.row.options[0].optionContent }}</span>
          </el-form-item>
          <el-form-item label="选项B">
            <span>{{ props.row.options[1].optionContent }}</span>
          </el-form-item>
          <el-form-item label="选项C">
            <span>{{ props.row.options[2].optionContent }}</span>
          </el-form-item>
          <el-form-item label="选项D">
            <span>{{ props.row.options[3].optionContent }}</span>
          </el-form-item>
        </el-form>
      </template>
    </el-table-column>
    <el-table-column  width="50" header-align="center" label="序号">
        <template slot-scope="{row,$index}">
            <span>{{$index + 1}}</span>
        </template>
    </el-table-column>
    <el-table-column label="题目标题"  prop="questionTitle">
        <template slot-scope="{row,$index}">
            <input class="edit-cell" v-if="showEdit[$index]"    v-model="row.questionTitle">
            <span v-if="!showEdit[$index]">{{row.questionTitle}}</span>
        </template>
    </el-table-column>

    <el-table-column label="上传时间"  prop="createTime" width="300"  header-align="center">
        <template slot-scope="{row,$index}">
            <input class="edit-cell" v-if="showEdit[$index]"    v-model="row.createTime">
            <span v-if="!showEdit[$index]">{{row.createTime}}</span>
        </template>
    </el-table-column>
    <el-table-column
        fixed="right"
        label="操作"
        width="100"
        header-align="center">
        <template slot-scope="{row,$index}">
            <el-button type="text" size="small"     @click.native="handleUpdate($index, row)"     v-if="showBtn[$index]">更新</el-button>
            <el-button type="text" size="small"     @click.native="handleCancel($index, row)"     v-if="showBtn[$index]">取消</el-button>
            <el-button type="text" size="small"     @click.native="handleEdit($index, row)"     v-if="!showBtn[$index]">编辑</el-button>
            <el-button type="text" size="small"     @click.native="handleDelete($index, row)"     v-if="!showBtn[$index]">删除</el-button>
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
      tagId : 0,
      showEdit: [], //显示编辑框
        showBtn: [],
        showBtnOrdinary: true
    };
  },
  methods: {
    getData() {
      // 这里使用axios，使用时请提前引入
      const url = "http://localhost:8003/question/getQuestionByUserUidAndTagId"
      this.axios
        .get(url, {
          params: {
            uid: localStorage.getItem("uid"),
            tagId: this.tagId
          }
        })
        .then(res => {
          console.log("tatalCompleted");
          console.log(res.data.data[0]);
          this.tableData = res.data.data
          this.totalCount = this.tableData.length
          for(var i = 0; i < this.tableData.length; i ++) {
    this.showEdit[i] = false;
    this.showBtn[i] = false;
    // this.$set(this.showEdit[i], false);
    // this.$set(this.showBtn[i], false);
}

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
  console.log("修改表格")
  console.log(index)
    console.log(row)
    this.showEdit[index] = true;
    this.showBtn[index] = true;
    this.$set(this.showEdit,index,true)
    this.$set(this.showBtn,index,true)
},
//取消编辑
handleCancel(index, row) {
    // this.getContentList();
    console.log("取消修改")
    console.log(index)
    console.log(row)
    this.showEdit[index] = false;
    this.showBtn[index] = false;
            },
            
//点击更新
handleUpdate(formName) {
                
},
//点击删除
handleDelete(index, row) {
                
},

  },
  created: function() {
    this.tagId = this.$route.query.tagId
    console.log("tagId")
    console.log(this.tagId)
    
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