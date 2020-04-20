<template>
  <div id="test">
    <!-- <select>
    <option v-for="item in myObj" :key="item.tagContent" :value="item.tagContent">{{item.tagContent}}</option>
    </select>-->
    <el-table :data="tags" style="width: 100%">
      <el-table-column prop="tagId" label="编号" width="180"></el-table-column>

      <el-table-column prop="tagContent" label="姓名" width="180"></el-table-column>
    </el-table>

    <el-select v-model="tags.tagContent" placeholder="请选择">
      <el-option v-for="item in tags" :key="item.tagContent" :value="item.tagContent"></el-option>
    </el-select>
  </div>
</template>

<script>
export default {
  name: "Myselect",
  data() {
    return {
      tags: []
    };
  },
  // computed: {
  //   myObj: {
  //     get: function() {
  //       return this.tags;
  //     }
  //   }
  // },
  methods: {
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