<template>
  <el-row class="content">
    <el-col :xs="{span:20,offset:2}" :sm="{span:8,offset:8}">
      <span>欢迎：{{name}}！你的待办事项是：</span>
      <el-input placeholder="请输入待办事项" v-model="todos" @keyup.enter.native="addTodos"></el-input>
      <el-tabs v-model="activeName">
        <el-tab-pane label="待办事项" name="first">
          <el-col :xs="24">
            <template v-if="!Done">
              <template v-for="(item, index) in list">
                <div class="todo-list" v-if="item.status == false" :key="index">
                  <span class="item">
                    {{index + 1}}. {{item.content}}
                  </span>
                  <span class="pull-right">
                    <el-button size="small" type="primary" @click="finished(index)">完成</el-button>
                    <el-button size="small" :plain="true" type="danger" @click="remove(index)">删除</el-button>
                  </span>
                </div>
              </template>
            </template>
            <div v-else-if="Done">
              暂无待办事项
            </div>
          </el-col>
        </el-tab-pane>
        <el-tab-pane label="已完成事项" name="second">
          <template v-if="count>0">
            <template v-for="(item, index) in list">
              <div class="todo-list" v-if="item.status==true" :key="index">
                <span class="item finished">
                  {{index + 1}}. {{item.content}}
                </span>
                <span class="pull-right">
                  <el-button size="small" type="primary" @click="restore(index)">还原</el-button>
                </span>
              </div>
            </template>
          </template>
          <div v-else>
            暂无已完成事项
          </div>
        </el-tab-pane>
      </el-tabs>
    </el-col>
  </el-row>
</template>

<script>
export default {
  data: function() {
    return {
      name: 'AlbertBird',
      todos: '',
      activeName: 'first',
      //Done: false,
      list: [],
      count: 0
    }
  },
  computed: {
    Done: function() {
      let count = 0;
      for (let val of this.list) {
        if (val.status == true) {
          count += 1;
        }
      }
      this.count = count;
      if (count == 0 && count == this.list.length) {
        return true;
      } else {
        return false;
      }
    }
  },
  methods: {
    addTodos: function() {
      if (this.todos == '') {
        return ;
      } else {
        this.list.push({
          status: false,
          content: this.todos
        });
      }
    },
    finished: function(index) {
      this.list[index].status = true;
      this.$message({
        message: '任务完成',
        type: 'success'
      })
    },
    remove: function(index) {
      this.list.splice(index, 1);
      this.$message({
        message: '任务删除',
        type: 'info'
      })
    },
    restore: function(index) {
      this.list[index].status = false;
      this.$message({
        message: '任务还原',
        type: 'info'
      })
    }
  }
}
</script>

<style lang="less" scoped>
  .el-input {
    margin:20px auto;
  }
  .todo-list {
    width:100%;
    margin-top:8px;
    padding-bottom:8px;
    border-bottom:1px solid #eee;
    overflow:hidden;
    text-align:left;
    .item {
      font-size:20px;
      &.finished {
        text-decoration:line-through;
        color:#ddd 
      }
    }
  }
  .pull-right {
    float: right;
  }
</style>

