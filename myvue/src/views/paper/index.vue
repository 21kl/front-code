<template>
  <div>
    <div class="col-md-1"></div>
    <div class="col-md-10">
      <div class="content">
        <div class="row">
          <div class="btn-group"></div>
        </div>

        <div style="width: 100%;height:auto;display: inline-block;border: 1px solid white;position: relative;margin-top:10px;">
          <div style="width: 100%;">
            <div style="width: 80%;margin: 0px auto">
              <div style="width: 100%;height:100px;border: 1px solid #CCC;border-bottom:none;background:#FFF;">
                <div
                  class="middle-top"
                  style="width: 100%;height: 50px;border-bottom: 1px solid #CCC;background:#2D3339; position:relative;"
                >
                  <div
                    class="middle-top-left pull-left"
                    style="height: 100%;padding-left: 20px;;background:#232C31;color:#FFF;"
                  >
                    <div
                      class="text-center pull-left progress-left"
                      style="border: 1px solid #A2C69A;background:#FFF;border-radius:10px;line-height:20px;height:20px;margin:15px 0px 15px 0px;font-size: 11px;position:relative;"
                    >
                      <div
                        class="progress pull-left"
                        style="background: #609E53;width: 0px;height:18px;position:absolute;left: 0px;"
                      ></div>
                      <div
                        class="pro-text"
                        style="left: 0px;color: #609E53;position:absolute;top:0px;width:100%;"
                      >
                        已完成
                        <span class="progres"></span>
                      </div>
                    </div>
                    <div
                      class="pull-left"
                      style=" width:135px;line-height:20px;height:20px;margin:15px;font-size:15px;"
                    >
                      <!--已做答的数量和考题总数-->
                      当前第
                      <span class="questioned"></span>题/共
                      <span class="question_sum"></span>题
                    </div>
                  </div>
                  <div
                    class="middle-top-right text-center pull-left"
                    style="width:160px; height: 100%;border-left: 1px solid red;position: absolute;right: 0px;"
                  >
                    <div
                      class="stop pull-left"
                      style="width: 50px; height: 100%;padding: 10px;"
                    >
                      <a
                        href="javascript:void(0);"
                        class="text-center"
                        style="color: #FE6547;"
                      >
                        <div
                          class="time-stop glyphicon glyphicon-pause"
                          title="暂停"
                          style="width:30px;height: 30px;line-height:30px; border-radius:15px;border: 1px solid #FE6547;"
                        ></div>
                        <div
                          class="time-start glyphicon glyphicon-play"
                          title="开始"
                          style="width:30px;height: 30px;line-height:30px;border-radius:15px;border: 1px solid #FE6547;display:none;"
                        ></div>
                      </a>
                    </div>
                    <div
                      class="pull-left"
                      style="width: 100px; height: 100%;padding: 10px 0px 10px 0px;"
                    >
                      <div
                        class="time"
                        style="width:100px;height: 30px;line-height:30px; border-radius:15px;font-size:20px;color:#FFF;"
                      ></div>
                    </div>
                  </div>
                </div>
                <div style="width: 100%;height: 50px;font-size:15px;color: #000;line-height: 50px;padding-left: 20px;text-align:left">
                  <div
                    style="color:#FFF;background: red;width: 22px;height: 22px;border-radius:11px;line-height:22px;font-size:13px; text-align: center;"
                    class="glyphicon glyphicon-map-marker"
                  ></div>[单选题]
                </div>
              </div>
              <div style="width: 100%;height:auto;display: inline-block;border: 1px solid #CCC;border-bottom:1px dashed #CCC;background:#FFF;">
                <div style="width: 100%;height: 90%;padding:20px 20px 0px 20px;">
                  <!--试题区域-->
                  <ul
                    class="list-unstyled question"
                    id=""
                    name=""
                  >
                    <li class="question_title"></li>
                  </ul>
                  <!--考题的操作区域-->
                  <div
                    class="operation"
                    style="margin-top: 20px;"
                  >
                    <div
                      class="text-left"
                      style="margin-left:20px;font-size: 15px;float: left;line-height: 30px;"
                    >
                      <div
                        id="unHeart"
                        style="color:#999999;"
                      >
                        <span class="glyphicon glyphicon-heart-empty"></span>
                        <span>收藏本题</span>
                      </div>
                      <div
                        id="heart"
                        style="color:#C40000;display: none;"
                      >
                        <span class="glyphicon glyphicon-heart"></span>
                        <span>已收藏</span>
                      </div>
                    </div>
                    <div
                      class="text-right"
                      style="margin-right: 20px;"
                    >
                      <div
                        class="form-group"
                        style="color: #FFF;"
                      >
                        <button
                          class="btn btn-success"
                          id="submitQuestions"
                          @click="submitQuestions"
                        >提交试卷</button>
                        <button
                          class="btn btn-info"
                          id="nextQuestion"
                          @click="xxx()"
                          :disabled="ddd"
                        >下一题</button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div style="width: 100%;height:auto;display: inline-block;border: 1px solid #CCC;border-top:none;background:#FFF;">
                <div style="width: 100%;padding:20px;">
                  <div class="panel-default">
                    <div
                      class="panel-heading"
                      id="closeCard"
                      style="color: #DCE4EC;font-size: 15px;display: none;background: none;"
                    >
                      <span>收起答题卡</span>
                      <span class="glyphicon glyphicon-chevron-up"></span>
                    </div>
                    <div
                      class="panel-heading"
                      id="openCard"
                      style="font-size: 15px;background: none;"
                    >
                      <span>展开答题卡</span>
                      <span class="glyphicon glyphicon-chevron-down"></span>
                    </div>
                    <div
                      id="answerCard"
                      style="display: none;"
                    >
                      <div
                        class="panel-body form-horizontal"
                        style="padding: 0px;"
                      >
                        <ul class="list-unstyled"></ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      HH: 0,
      mm: 0,
      ss: 0,
      ddd: false,
      timeState: true,
      QuestionJosn: [],
      questions: [],
      itemList: ["A", "B", "C", "D", "E", "F"],
      activeQuestion: 0,
      Question: 0,
      questioned: 0,
      checkQues: [],
      questionNumber: 0,
      temp: 32
    };
  },

  methods: {
    xxx() {
      if (this.activeQuestion + 1 != this.questions.length)
        this.showQuestion(this.activeQuestion + 1);
      this.showQuestion(this.activeQuestion);
      if (this.activeQuestion == this.questions.length) this.ddd = true;
      else this.ddd = false;
    },
    submitQuestions() {
      const url = "http://localhost:8003/complete/addCompleteQuestion";
      //这是一个很蠢的方法，通过循环将数据全部提交到后台
      for (var i = 0; i < this.checkQues.length; i++) {
        //题目
        var title = this.questions[this.checkQues[i].id].questionTitle;
        //题目的uid
        var questionUid = this.questions[this.checkQues[i].id].questionUid;
        //题目的分数
        var questionScore = this.questions[this.checkQues[i].id].questionScore;
        //用户选项内容
        var selfSelect = this.checkQues[i].answer;
        //答案选项的内容
        var answerSelect = this.questions[this.checkQues[i].id].questionAnswer;
        var array = ["A", "B", "C", "D"];
        var selfSelectIndex = 0;
        var answerSelectIndex = 0;
        for (var j = 0; j < array.length; j++) {
          if (array[j] == selfSelect) selfSelectIndex = j;
          if (array[j] == answerSelect) answerSelectIndex = j;
        }

        console.log("self：" + selfSelect + "  answerSelect:" + answerSelect);
        var selfOption = this.questions[this.checkQues[i].id].listOption[
          selfSelectIndex
        ].optionContent;
        var correctOption = this.questions[this.checkQues[i].id].listOption[
          answerSelectIndex
        ].optionContent;

        //在这里提交请求
        this.axios
          .post(
            url,
            {
              questionTitle: title,
              selfOption: selfOption,
              correctOption: correctOption,
              uid: localStorage.getItem("uid"),
              questionUid:questionUid,
              questionScore:questionScore
            },
            {
              emulateJSON: true
            }
          )
          .then(result => {
            console.log("result")
            console.log(result)
          });

        console.log("question");
        console.log(this.questions[this.checkQues[i].id].questionTitle);
        if (
          this.questions[this.checkQues[i].id].questionAnswer ==
          this.checkQues[i].answer
        ) {
          console.log("答案正确");
        } else {
          console.log("答案错误");
        }
      }

      //打印看是否我们需要的属性都添加进去了
      console.log("checkQues");
      console.log(this.checkQues);
      //在这里我们将用户的所有选项都提交上去
      // const url = "http://localhost:8003/complete/addCompleteQuestion";

      alert(
        "已做答:" +
          $(".clickQue").length +
          "道题,还有" +
          (this.questions.length - $(".clickQue").length) +
          "道题未完成"
      );
    },
    showQuestion(id) {
      $(".questioned").text(id + 1);
      this.questioned = (id + 1) / this.questions.length;
      if (this.activeQuestion != undefined) {
        $("#ques" + this.activeQuestion)
          .removeClass("question_id")
          .addClass("active_question_id");
      }
      let _this = this;
      this.activeQuestion = id;
      $(".question")
        .find(".question_info")
        .remove();
      var question = this.questions[id];
      console.log("this.questions[id].questionTitle");
      console.log(_this.questions[1].questionTitle);
      console.log(_this.activeQuestion);
      //改变按钮的状态
      if (_this.activeQuestion != _this.questions.length) _this.ddd = false;
      else _this.ddd = true;
      $(".question_title").html(
        // "<strong>第 " + (id + 1) + " 题 、</strong>" + question.questionTitle
        "<strong>第 " +
          (id + 1) +
          " 题 、</strong>" +
          this.questions[id].questionTitle
      );
      var items = question.questionItems.split(";");
      var item = "";
      for (var i = 0; i < items.length; i++) {
        item =
          "<li class='question_info' onclick='clickTrim(this)' id='item" +
          i +
          "'><input type='radio' name='item' value='" +
          this.itemList[i] +
          "'>&nbsp;" +
          this.itemList[i] +
          "." +
          items[i] +
          "</li>";
        $(".question").append(item);
      }
      $(".question").attr("id", "question" + id);
      $("#ques" + id)
        .removeClass("active_question_id")
        .addClass("question_id");
      for (var i = 0; i < this.checkQues.length; i++) {
        if (this.checkQues[i].id == id) {
          $("#" + this.checkQues[i].item)
            .find("input")
            .prop("checked", "checked");
          $("#" + this.checkQues[i].item).addClass("clickTrim");
          $("#ques" + this.activeQuestion)
            .removeClass("question_id")
            .addClass("clickQue");
        }
      }
      this.progress();
    },

    answerCard() {
      $(".question_sum").text(this.questions.length);
      for (var i = 0; i < this.questions.length; i++) {
        var questionId =
          "<li id='ques" +
          i +
          "'onclick='saveQuestionState(" +
          i +
          ")' class='questionId'>" +
          (i + 1) +
          "</li>";
        $("#answerCard ul").append(questionId);
      }
    },

    clickTrim(source) {
      var id = source.id;
      console.log("clickTrim");
      console.log(source.id);
      $("#" + id)
        .find("input")
        .prop("checked", "checked");
      $("#" + id).addClass("clickTrim");
      $("#ques" + this.activeQuestion)
        .removeClass("question_id")
        .addClass("clickQue");
      var ques = 0;
      for (var i = 0; i < this.checkQues.length; i++) {
        if (
          this.checkQues[i].id == this.activeQuestion &&
          this.checkQues[i].item != id
        ) {
          ques = this.checkQues[i].id;
          this.checkQues[i].item = id; //获取当前考题的选项ID
          this.checkQues[i].answer = $("#" + id)
            .find("input[name=item]:checked")
            .val(); //获取当前考题的选项值
          console.log("checkQes.id");
          console.log(this.checkQues[i].id);
          console.log("checkQue.answer");
          console.log(this.checkQues[i].answer);
        }
      }
      if (
        this.checkQues.length == 0 ||
        (this.Question != this.activeQuestion && this.activeQuestion != ques)
      ) {
        var check = {};
        check.id = this.activeQuestion; //获取当前考题的编号
        check.item = id; //获取当前考题的选项ID
        check.answer = $("#" + id)
          .find("input[name=item]:checked")
          .val(); //获取当前考题的选项值
        this.checkQues.push(check);
      }
      $(".question_info").each(function() {
        var otherId = $(this).attr("id");
        if (otherId != id) {
          $("#" + otherId)
            .find("input")
            .prop("checked", false);
          $("#" + otherId).removeClass("clickTrim");
        }
      });
      this.Question = this.activeQuestion;
    },

    /*设置进度条*/
    progress() {
      var prog = ($(".active_question_id").length + 1) / this.questions.length;
      var pro =
        $(".progress")
          .parent()
          .width() * prog;
      $(".progress").text((prog * 100).toString().substr(0, 5) + "%");
      $(".progress").animate(
        {
          width: pro,
          opacity: 0.5
        },
        1000
      );
    },

    saveQuestionState(clickId) {
      this.showQuestion(clickId);
    }
  },
  created: function() {
    var tagIdQuery = Number(this.$route.query.tagId);
    console.log("tagIdQuery")
    console.log(tagIdQuery)
    var number = (this.$route.query.id)*10
    console.log("number")
    console.log(number)
    let _this = this;
    window.saveQuestionState = _this.saveQuestionState;
    window.showQuestion = _this.showQuestion;
    window.clickTrim = _this.clickTrim;
    var time = setInterval(function() {
      if (_this.timeState) {
        if (_this.HH == 24) _this.HH = 0;
        var str = "";
        if (++_this.ss == 60) {
          if (++_this.mm == 60) {
            _this.HH++;
            _this.mm = 0;
          }
          _this.ss = 0;
        }
        str += _this.HH < 10 ? "0" + _this.HH : _this.HH;
        str += ":";
        str += _this.mm < 10 ? "0" + _this.mm : _this.mm;
        str += ":";
        str += _this.ss < 10 ? "0" + _this.ss : _this.ss;
        $(".time").text(str);
      } else {
        $(".time").text(str);
      }
    }, 1000);

    const url = "http://localhost:8003/question/findQuestionListByTagId";
    $.ajax({
      url: url,
      type: "GET",
      // 这里必须使用同步，否则数据没有加载的情况下其他都会报错
      async: false,
      data: {
        tagId: tagIdQuery,
        number: number
      },
      dataType: "json",
      success: function(data) {
        _this.questions = data.data;
        _this.QuestionJosn = data.date;
        console.log("第一步");
        console.log("ajax");
        console.log(data);
      }
    });
    $(function() {
      $(".middle-top-left").width(
        $(".middle-top").width() - $(".middle-top-right").width()
      );
      $(".progress-left").width($(".middle-top-left").width() - 200);
      _this.progress();
      console.log("第二步");
      _this.answerCard();
      console.log("第三步");
      _this.showQuestion(0);
      /*alert(QuestionJosn.length);*/
      /*实现进度条信息加载的动画*/
      var str = "";
      /*开启或者停止时间*/
      $(".time-stop").click(function() {
        timeState = false;
        $(this).hide();
        $(".time-start").show();
      });
      $(".time-start").click(function() {
        timeState = true;
        $(this).hide();
        $(".time-stop").show();
      });

      /*收藏按钮的切换*/
      $("#unHeart").click(function() {
        $(this).hide();
        $("#heart").show();
      });
      $("#heart").click(function() {
        $(this).hide();
        $("#unHeart").show();
      });

      /*答题卡的切换*/
      $("#openCard").click(function() {
        $("#closeCard").show();
        $("#answerCard").slideDown();
        $(this).hide();
      });
      $("#closeCard").click(function() {
        $("#openCard").show();
        $("#answerCard").slideUp();
        $(this).hide();
      });

      //提交试卷
      // $("#submitQuestions").click(function() {
      //   /*alert(JSON.stringify(checkQues));*/
      //   alert(
      //     "已做答:" +
      //       $(".clickQue").length +
      //       "道题,还有" +
      //       (this.questions.length - $(".clickQue").length) +
      //       "道题未完成"
      //   );
      // });
      //进入下一题
      // $("#nextQuestion").click(function() {
      // if (this.activeQuestion + 1 != this.questions.length)
      // console.log("下一题");
      // console.log("temp");
      // console.log(this.temp);
      // console.log(_this.activeQuestion);
      // if (_this.activeQuestion + 1 != _this.questionNumber)
      //   _this.showQuestion(_this.activeQuestion + 1);
      // _this.showQuestion(_this.activeQuestion);
      // });
    });
  }
};
</script>

<style scoped>
.content {
  width: 100%;
}
.top {
  width: 100%;
  border: 1px solid white;
}
.middle {
  width: 100%;
  height: 500px;
  border: 1px solid white;
}
.foot {
  width: 100%;
  height: 300px;
  border: 1px solid white;
}
.middle-top {
  width: 100%;
  height: 260px;
  border: 1px solid white;
}

.li-1 {
  position: absolute;
  height: 430px;
  width: 200px;
  background: #131801;
  z-index: 99;
  opacity: 0.5;
}
.li-2 {
  width: 170px;
  color: #e0e5c5;
  line-height: 50px;
  border-right: 1px solid #646952;
}
.li-nav {
  color: #f4f4f4;
  height: 95px;
  background: transparent;
  border-top: 1px solid #586a50;
}
.li-nav table {
  margin: 10px 0px 0px 20px;
}
.li-nav table th {
  color: #f4f4f4;
  opacity: 1;
}
.li-nav table td a {
  color: #b0c491;
  opacity: 1;
}
.li-nav table td a:hover {
  color: #f4f4f4;
}
.li-nav table td,
th {
  line-height: 30px;
}
.li-nav span {
  color: #5a6652;
  line-height: 95px;
  margin-right: 15px;
}
.li-nav:hover {
  background: #3c4a31;
}

.ul-view {
  list-style: none;
  padding: 20px 0px 0px 15px;
}
.ul-view li {
  color: #f3f5f2;
  opacity: 1;
  line-height: 25px;
}
.ul-view li a {
  color: #b1c496;
  padding: 5px 12px 5px 0px;
}

#tbody button {
  width: 100px;
  height: 100px;
  border: 0px;
}
.middle-top-right a div:hover {
  background: #2d3339;
  color: red;
}
.question {
  line-height: 50px;
  /* float:left; */
  text-align: left;
}
.question_title {
  height: 50px;
  margin: 0px;
  /* 让试题偏左边 */
  text-align: left;
}
.question_info {
  padding-left: 20px;
  border: 1px solid #ccc;
  line-height: 45px;
  height: 45px;
  cursor: pointer;
  margin: 10px 0px 10px 0px;
  /* text-align:left; */
}
.question_info input {
  line-height: 45px;
}
.clickTrim {
  color: #00bc9b;
  background: #f3f3f3;
  border: 1px solid #909090;
}
.question_info:hover {
  color: #00bc9b;
  background: #f3f3f3;
  border: 1px solid #909090;
}
.operation span {
  cursor: pointer;
}
.operation span:hover {
  cursor: pointer;
}
.questionId {
  color: #dce7f2;
  width: 35px;
  height: 35px;
  text-align: center;
  line-height: 35px;
  margin: 5px;
  float: left;
  cursor: pointer;
  border: 1px solid white;
}
.questionId:hover,
.question_id {
  color: #fff;
  background: #59b59c;
}
.active_question_id {
  color: #59b59c;
  background: none;
  border: 1px solid #ccc;
}
#closeCard,
#openCard {
  width: 130px;
  border: none;
}
#closeCard span,
#openCard span {
  cursor: pointer;
}
#openCard:hover {
  color: #25bb9b;
}
.clickQue {
  color: #00bc9b;
  background: #f3f3f3;
  border: 1px solid #909090;
}
.progress {
  border-top-left-radius: 10px;
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 0px;
  border-top-right-radius: 0px;
}
</style>