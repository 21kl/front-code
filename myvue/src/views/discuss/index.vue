<template>
  <div>
    <div>

      <!-- 发帖子的按钮 -->
      <div
        id="postDis"
        style="width:80%;display:inline;"
      >
        <el-input
          placeholder="请输入内容"
          prefix-icon="el-icon-search"
          v-model="searchItem"
          style="width:500px;float:left;margin-left:130px"
          @keyup.enter.native="fuzzyQuery()"
        >

        </el-input>
        <!-- 在这里跳转到写讨论贴的界面 -->
        <router-link
          target="_blank"
          :to="{path:'/discuss',query:{id:1}}"
        >
          <el-button
            type="primary"
            plain
            icon="el-icon-edit"
            style="margin-right:0px"
          >我要发布</el-button>
        </router-link>
      </div>

      <!-- 尝试展示讨论贴的所有内容 -->
      <!-- <div v-for="(item,index) in discussList" :key="index">
        <span>{{item.discussContent}}</span>
      </div> -->

      <div
        v-for="(item,index) in discussList"
        :key="index"
      >

        <div
          id="disOne"
          style="width:80%;height:60px;margin:auto;background: #e5e9f2;margin-top:20px"
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
  </div>
</template>
<script>
export default {
  data() {
    return {
      title: "",
      username: "",
      createTime: "",
      content: "",
      searchItem: "",
      discussList: []
    };
  },
  methods: {
    findAllDiscuss() {
      const url = "http://localhost:8003/discuss/all";
      this.axios.get(url).then(res => {
        console.log("list");
        console.log(res);
        console.log(res.data.data);
        this.discussList = res.data.data;
      });
    },
    fuzzyQuery() {
      const url = "http://localhost:8003/discuss/findDiscussFuzzy";
      this.axios
        .get(url, {
          params: {
            content: this.searchItem
          }
        })
        .then(res => {
          console.log("list");
          console.log(res);
          console.log(res.data.data);
          this.discussList = res.data.data
        });
    }
  },
  created: function() {
    this.findAllDiscuss();
  }
};
</script>
