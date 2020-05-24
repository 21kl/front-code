<template>
  <div>
    <div>
      <div
        id="disOne"
        style="width:80%;height:60px;margin:auto;background: #e5e9f2"
      >
        <div style="float:left;margin-top:10px">
          <el-avatar style="vertical-align:middle;"> user </el-avatar>
          <!-- //用户名 -->
          <span style="vertical-align:middle;margin-left:10px;">{{username}}</span>
          <!-- 标题 -->
          <el-link type="info">
            <router-link
              target="_blank"
              :to="{path:'/discussRender',query:{str:content}}"
            >
              {{title}}
            </router-link>
          </el-link>

        </div>

        <div style="float:right;margin-top:20px">
          <span style="margin-right:20px;vertical-align:middle;">
            {{createTime}}
          </span>
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
      content:""
    };
  },
  methods: {
    findAllDiscuss() {
      const url = "http://localhost:8003/discuss/all";
      this.axios.get(url).then(res => {
        console.log("list");
        console.log(res);
        console.log(res.data.data);
        var discuss = res.data.data[1];
        this.title = discuss.discussTitle;
        this.username = discuss.userUsername;
        this.createTime = discuss.stringDate;
        this.content = discuss.discussContent
      });
    }
  },
  created: function() {
    this.findAllDiscuss();
  }
};
</script>
