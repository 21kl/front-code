<template>
  <el-carousel :interval="2000" type="card" height="400px">
    <el-carousel-item
      v-for="item in showCard"
      :key="item.tagContent"
      @click.native="nativeTo(item.tagId)"
    >
      <h3 style="height:50px">{{ item.tagContent }}</h3>
      <h3 style="height:120px">我的贡献：{{item.number}}道</h3>
      <div style="margin-bottom:10px">
        
        <!-- 点击头像进行跳转 -->
        <router-link
                target="_blank"
                :to="{path:'/testbank/index',query:{tagId:item.tagId}}"
              >
               <el-avatar :size="120" :src="imgUrl" style="vertical-align:middle;"></el-avatar>
              </router-link>
      </div>
    </el-carousel-item>
  </el-carousel>
</template>

<style>
.el-carousel__item h3 {
  color: #475669;
  font-size: 14px;
  opacity: 0.75;
  line-height: 200px;
  margin: 0;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}
</style>
<script>
export default {
  data() {
    return {
      //轮播图数据
      showCard: [],
      imgUrl:
        "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1584530296947&di=ecde0f600a7f69832385f1d44364bb69&imgtype=0&src=http%3A%2F%2Fimg.zcool.cn%2Fcommunity%2F01e5fd58d3c8bfa801219c77d7d1c7.jpg%402o.jpg",
      num: 0
    };
  },
  methods: {
    getBigObj() {
      this.axios
        .get("http://localhost:8003/question/findUserContributeNumber", {
          params:{
            uid: localStorage.getItem("uid")
          }
        })
        .then(res => {
          console.log("uid" + localStorage.getItem("uid"));
          console.log("res.data.data");
          console.log(res.data.data);
          this.showCard = res.data.data;
        });
    },
    nativeTo(tagId) {
      console.log("tagId");
      console.log(tagId);
    }
  },
  created: function() {
    this.getBigObj();
  }
};
</script>
