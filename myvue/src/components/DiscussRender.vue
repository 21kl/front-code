<template>
  <div>
    <div id="container">
ss
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
    //   resStr: ""
    };
  },
  created: function() {
    var ss = this.$route.query.str;
    console.log("container");
    console.log(ss);
    const div = document.createElement("div");
    div.innerHTML = ss;
    document.body.appendChild(div);
    
  }
};
</script>