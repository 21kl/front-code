<template>
  <div :class="{'hidden':hidden}" class="pagination-container">
    <el-pagination
      :background="background"
      :current-page.sync="currentPage"
      :page-size.sync="pageSize"
      :layout="layout"
      :page-sizes="pageSizes"
      :total="total"
      v-bind="$attrs"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    />
  </div>
</template>

<script>

export default {
  name: 'Pagination',
  props: {
    total: {
      required: true,
      type: Number
    },
    page: {
      type: Number,
      default: 1
    },
    limit: {
      type: Number,
      default: 10
    },
    pageSizes: {
      type: Array,
      default () {
        return [5, 10, 20, 30, 50]
      }
    },
    layout: {
      type: String,
      default: 'prev, pager, next'
    },
    background: {
      type: Boolean,
      default: true
    },
    
    hidden: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    currentPage: {
      get () {
        console.log("curentPage get")
        console.log(this.page)
        return this.page
      },
      set (val) {
        console.log("currentPage set")
        console.log(val)
        this.$emit('update:page', val)
      }
    },
    pageSize: {
      get () {
        console.log("pageSize get limit")
        console.log(this.limit)
        return this.limit
      },
      set (val) {
        console.log("pageSize set limit")
        console.log(val)
        this.$emit('update:limit', val)
      }
    }
  },
  methods: {
    handleSizeChange (val) {
      this.$emit('pagination', { page: this.currentPage, limit: val })
      // if (this.autoScroll) {
      //   scrollTo(0, 800)
      // }
    },
    handleCurrentChange (val) {
      console.log("page")
      console.log(val)
      console.log("limit")
      console.log(this.pageSize)
      this.$emit('pagination', { page: val, limit: this.pageSize })
      // if (this.autoScroll) {
      //   scrollTo(0, 800)
      // }
    }
  }
}
</script>

<style scoped>
.pagination-container {
  background: #fff;
}
.pagination-container.hidden {
  display: none;
}
</style>
