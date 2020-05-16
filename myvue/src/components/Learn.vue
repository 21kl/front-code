<template>
  <div>
    <div style="position: fixed;width:80%;height:100%;left:10%;">
      <el-row :gutter="20">
        <el-col :span="12">
          <div class="grid-content bg-purple">标签名称</div>
        </el-col>
        <el-col :span="12">
          <!-- <div class="grid-content bg-purple">
          计时器-->
          <span class="do-exam-time">
            <label>剩余时间：</label>
            <label>{{formatSeconds(remainTime)}}</label>
          </span>
          <!-- </div> -->
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <div class="grid-content bg-purple">题目</div>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <div class="grid-content bg-purple">A</div>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <div class="grid-content bg-purple">B</div>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <div class="grid-content bg-purple">C</div>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <div class="grid-content bg-purple">D</div>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="16">
          <div class="grid-content bg-purple"></div>
        </el-col>
        <el-col :span="4">
          <div class="grid-content bg-purple">交卷</div>
        </el-col>
        <el-col :span="4">
          <div class="grid-content bg-purple">下一题</div>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <div class="grid-content bg-purple">答题卡</div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      timer: null,
      remainTime: 0
    };
  },
  beforeDestroy() {
    window.clearInterval(this.timer);
  },
  methods: {
    formatSeconds(theTime) {
      console.log("remainTime")
      console.log(this.remainTime)
      let theTime1 = 0;
      let theTime2 = 0;
      if (theTime > 60) {
        theTime1 = parseInt(theTime / 60);
        theTime = parseInt(theTime % 60);
        if (theTime1 > 60) {
          theTime2 = parseInt(theTime1 / 60);
          theTime1 = parseInt(theTime1 % 60);
        }
      }
      let result = "" + parseInt(theTime) + "秒";
      if (theTime1 > 0) {
        result = "" + parseInt(theTime1) + "分" + result;
      }
      if (theTime2 > 0) {
        result = "" + parseInt(theTime2) + "小时" + result;
      }
      return result;
    },
    timeReduce() {
      let _this = this
      console.log("remainTime")
      console.log(this.remainTime)
      this.timer = setInterval(function() {
        if (_this.remainTime <= 0) {
          // _this.submitForm()
          _this.timer = null
          console.log("时间到");
        } else {
          // ++_this.answer.doTime
          console.log("计时减少")
          console.log(this.remainTime)
          --_this.remainTime;
        }
      }, 1000);
    }
  },
  created() {
    this.remainTime = 5 * 60;
    this.timeReduce();
  }
};
</script>

<style>
.el-row {
  margin-bottom: 20px;
  &:last-child {
    margin-bottom: 0;
  }
}
.el-col {
  border-radius: 4px;
}
.bg-purple-dark {
  /* background: #99a9bf; */
  background: #d3dce6;
}
.bg-purple {
  background: #d3dce6;
}
.bg-purple-light {
  background: #e5e9f2;
}
.grid-content {
  border-radius: 4px;
  min-height: 36px;
}
.row-bg {
  padding: 10px 0;
  background-color: #f9fafc;
}

.align-center {
  text-align: center;
}

.question-title-padding {
  padding-left: 25px;
  padding-right: 25px;
}

.do-exam-time {
  float: right;
  line-height: 2;
  /* font-size: 14px; */
  padding-right: 45px;
}

.do-exam-title {
  position: fixed;
  width: 100%;
  background: #fff6f6;
  z-index: 999;
  padding: 5px 0px;
}

.do-exam-title-hidden {
  width: 100%;
  visibility: hidden;
  padding: 5px 0px;
}

.do-exam-title-tag {
  margin-left: 5px;
  cursor: pointer;
}
.do-align-center {
  text-align: center;
  margin-top: 40px;

  .el-form-item__content {
    margin-left: 0px !important;
  }
}
</style>