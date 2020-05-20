<template>
  <div>
    <!-- 首页的题目卡片 -->
    <div
      id="questionCard"
      style="width:80%;margin:auto;"
    >
      <div style="text-align:left;margin-bottom:20px;font-size:17px">
        <i
          class="el-icon-s-marketing"
          style="color:red"
        ></i>
        <span style="font-wight:bold">专项练习</span>
      </div>

      <el-row :gutter="10">
        <el-col
          :span="6"
          v-for="item in tags"
          :key=item.tagId
          :value=item.tagContent
        >
          <el-card :body-style="{ padding: '20px' }">
            <img
              :src="item.img"
              class="image"
            >
            <div style="padding: 14px;font-size:12px;text-align: left;">
              <span>{{ item.tagContent }}</span>
              <div class="bottom clearfix">

                <time class="time">{{ currentDate }}</time>
                <router-link
                  target="_blank"
                  :to="{path:'/paper/list',query:{id:1}}"
                >
                  <el-button
                    type="text"
                    class="button"
                  >开始答题</el-button>
                </router-link>
              </div>
            </div>
          </el-card>
        </el-col>
      </el-row>
    </div>

    <!-- 讨论区的页面展示 -->
    <div id="discussPage" style="width:80%;margin:auto;">
      <div style="text-align:left;margin-bottom:20px;margin-top:20px;font-size:17px">
        <i
          class="el-icon-s-marketing"
          style="color:red"
        ></i>
        <span style="font-wight:bold">热门讨论</span>
      </div>

    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tag: "",
      tags: [],
      images: [],
      currentDate: ""
    };
  },
  methods: {
    getTags() {
      this.axios.get("http://localhost:8003/tag/findAllTag").then(res => {
        console.log("res.data");
        console.log(res.data);
        console.log("res.data.data");
        console.log(res.data.data);
        this.tags = res.data.data;
        console.log("tags");
        for (var i = 0; i < this.tags.length; i++) {
          this.tags[i].img = "http://www.cchbbo.cn/image/" + (i + 1) + ".jpg";
          console.log(this.tags[i].img);
        }
      });
    }
  },
  created: function() {
    var time = new Date();
    this.currentDate =
      time.getFullYear() + "-" + (time.getMonth() + 1) + "-" + time.getDate();
    this.getTags();
  }
};
</script>

<style>
.time {
  font-size: 13px;
  color: #999;
  float: left;
}

.bottom {
  margin-top: 13px;
  line-height: 12px;
}

.button {
  padding: 0;
  float: right;
  font-size: 12px;
}

.image {
  width: 200px;
  height: 150px;
  display: block;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}

.clearfix:after {
  clear: both;
}
</style>