<template>
  <div
    style="margin-top: 10px"
    class="app-contain"
  >
    <el-tabs
      tab-position="left"
      v-model="tabId"
      @tab-click="subjectChange"
    >
      <el-tab-pane
        :label="item.tagContent"
        :key="item.tagId"
        :name="item.tagId"
        v-for="item in subjectList"
        style="margin-left: 20px;"
      >

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
            prop="name"
            label="名称"
          />
          <el-table-column align="right">
            <template slot-scope="{row}">
              <router-link
                target="_blank"
                :to="{path:'/paper/index',query:{id:row.id,tagId:tabId}}"
              >
                <el-button
                  type="text"
                  size="small"
                >开始答题</el-button>
              </router-link>
            </template>
          </el-table-column>
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
    </el-tabs>

  </div>
</template>

<script>
import Pagination from "@/components/Pagination";
export default {
  components: { Pagination },
  data() {
    return {
      queryParam: {
        paperType: 1,
        subjectId: 0,
        pageIndex: 1,
        pageSize: 10
      },
      tabId: "",
      listLoading: true,
      subjectList: [],
      tableData: [
            {
              id: 1,
              name: "随机十题",
              questionCount: 10,
              score: 360,
              createTime: "2020-05-13 17:21:15",
              createUser: 2,
              subjectId: 1,
              subjectName: "数据库",
              paperType: 1,
              frameTextContentId: 5750
            },
            {
              id: 2,
              name: "随机二十题",
              questionCount: 20,
              score: 130,
              createTime: "2020-04-01 12:36:58",
              createUser: 2,
              subjectId: 1,
              subjectName: "数据库",
              paperType: 1,
              frameTextContentId: 4381
            },
            {
              id: 3,
              name: "随机三十题",
              questionCount: 30,
              score: 130,
              createTime: "2020-04-01 12:36:58",
              createUser: 2,
              subjectId: 1,
              subjectName: "数据库",
              paperType: 1,
              frameTextContentId: 4383
            }
          ],
      total: 0
    };
  },
  created() {
    this.initSubject();
  },
  methods: {
    initSubject() {
      let _this = this;
      //   subjectApi.list().then(re => {
      //     _this.subjectList = re.response
      //     let subjectId = _this.subjectList[0].id
      //     _this.queryParam.subjectId = subjectId
      //     _this.tabId = subjectId.toString()
      //     _this.search()
      //   })
      this.axios.get("http://localhost:8003/tag/findAllTag").then(res => {
        console.log("res.data.data");
        console.log(res.data.data);
        _this.subjectList = res.data.data;
        //由于name属性需要字符串类型，所以将tagId进行转化
        for (var i = 0; i < _this.subjectList.length; i++)
          _this.subjectList[i].tagId = "" + _this.subjectList[i].tagId;


        let subjectId = this.subjectList[0].tagId;
        console.log(subjectId);
        _this.queryParam.subjectId = _this.subjectList[0].tagId;
        _this.tabId = _this.subjectList[0].tagId.toString();
        _this.search();
      });
    },
    search() {
        let _this = this
      this.listLoading = true;
      //   examPaperApi.pageList(this.queryParam).then(data => {
      //     const re = data.response
      //     this.tableData = re.list
      //     this.total = re.total
      //     this.queryParam.pageIndex = re.pageNum
      //     this.listLoading = false
      //   })
      
      _this.listLoading = false;
    },
    paperTypeChange(val) {
      this.search();
    },
    subjectChange(tab, event) {
        console.log("tabId")
        console.log(this.tabId)
      this.queryParam.subjectId = Number(this.tabId);
      this.search();
    }
  },
  computed: {}
};
</script>