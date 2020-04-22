<template>
  <div style="width:80%;text-align:center">
    <el-form ref="form" label-width="80px">
      <el-form-item label="标签" style="text-align: center;">
        <el-select v-model="tag" placeholder="类型">
          <el-option
            v-for="item in tags"
            :key="item.tagContent"
            :value="item.tagId"
            :label="item.tagContent"
          ></el-option>
        </el-select>

        <el-select v-model="score" placeholder="分值">
          <el-option v-for="item in scores" :key="item" :value="item" :label="item"></el-option>
        </el-select>

        <el-select v-model="deepth" placeholder="难度星级">
          <el-option v-for="item in deepths" :key="item" :value="item" :label="item"></el-option>
        </el-select>

        <el-select v-model="answer" placeholder="答案">
          <el-option v-for="item in answers" :key="item" :value="item" :label="item"></el-option>
        </el-select>
      </el-form-item>
      <!-- <div>tag:{{tag}}</div> -->
      <el-form-item label="问题">
        <el-input v-model="title"></el-input>
      </el-form-item>
      <el-form-item label="A：">
        <el-input v-model="optionOne"></el-input>
      </el-form-item>
      <el-form-item label="B：">
        <el-input v-model="optionTwo"></el-input>
      </el-form-item>
      <el-form-item label="C：">
        <el-input v-model="optionThree"></el-input>
      </el-form-item>
      <el-form-item label="D：">
        <el-input v-model="optionFour"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="addQuestion">立即添加</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
export default {
  data() {
    return {
      title: "",
      optionOne: "",
      optionTwo: "",
      optionThree: "",
      optionFour: "",
      tag: "",
      tags: [],
      score: "",
      scores: [1, 2, 3],
      answer: "",
      answers: ["A", "B", "C", "D"],
      deepth: "",
      deepths: [1, 2, 3, 4, 5]
    };
  },
  methods: {
    addQuestion() {
      this.axios
        .post(
          "http://localhost:8003/question/addQuestion",
          {
            params: {
              title: this.title,
              optionOne: this.optionOne,
              optionTwo: this.optionTwo,
              optionThree: this.optionThree,
              optionFour: this.optionFour,
              tag: this.tag,
              score: this.score,
              answer: this.answer,
              deepth: this.deepth,
              uid: localStorage.getItem("uid")
            }
          },
          {
            emulateJSON: false
          }
        )
        .then(result => {
          var result = result.data;
          if (result.code === 200) {
            this.title = "";
            this.optionOne = "";
            this.optionTwo = "";
            this.optionThree = "";
            this.optionFour = "";
            this.tag = "";
            this.score = "";
            this.answer = "";
            this.deepth = "";
          } else {
            // 失败了
            alert("添加失败！");
          }
        });
    },
    getBigObj() {
      this.axios.get("http://localhost:8003/tag/findAllTag").then(res => {
        console.log("res.data");
        console.log(res.data);
        console.log("res.data.data");
        console.log(res.data.data);
        this.tags = res.data.data;
      });
    }
  },
  created: function() {
    this.getBigObj();
  }
};
</script>

<style scoped>
</style>

