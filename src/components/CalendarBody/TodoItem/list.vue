<template>
  <div class="modal" v-show="addModalShow">
    <div class="modal__contents">
      <div class="modal__title">TODO LIST</div>
      <div class="modal__todo">
        <!-- 「ブロック内ブロック参考」https://necomesi.jp/blog/tsmd/posts/152 -->
        <div class="todoAdd">
          <input class="todoAdd__input" type="text" v-model="newTodo">
          <button class="todoAdd__button" @click="addTodo({ newTodo: newTodo, day: day.date })">add</button>
        </div>
        <!--  TODO:keyをidにする  -->
        <ul class="todoList">
          <!-- [check]もっと簡潔に書けそう(v-for/v-if) -->
          <li class="todoList__item" v-for="(todo, i) in todos" :key="i">
            <div v-if="day.year === todo.year && day.month === todo.month && day.date === todo.date">
              <span>
                <input type="checkbox" @click="changeStatus({ status: todo.status, index: i })">
              </span>
              <!-- isDoneはおかしい様な -->
              <span class="todoList__text" :class="{ 'todoList__text--isDone': todo.status }">{{ todo.text }}</span>
              <button class="todoList__delete" @click="todoDelete({ status: todo.status, index: i })">×</button>
            </div>
          </li>
        </ul>
      </div>
      <button class="modal__closeBtn" @click="changeAddModalShow">close</button>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
export default {
  props: ["day"],
  data() {
    return {
      newTodo: ""
    };
  },
  methods: {
    // mapActionsヘルパー使用
    ...mapActions(["changeAddModalShow", "changeStatus", "todoDelete"]),
    // TODO:mapActionsに入れたい
    addTodo(todo) {
      this.$store.dispatch("addTodo", todo);
      this.newTodo = "";
    }
  },
  computed: {
    ...mapState(["addModalShow", "todos"])
  }
};
</script>

<style lang="scss" scoped>
.modal {
  z-index: 1;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}
.modal__contents {
  font-size: 1rem;
  z-index: 2;
  background: #fff;
  flex-basis: 50%;
  max-width: 50%;
  height: auto;
  box-sizing: border-box;
  color: #2c3e50;
  position: relative;
}
.modal__title {
  font-size: 1.8rem;
  margin-top: 20px;
}
.modal__todo {
  list-style: none;
  margin-top: 20px;
  padding-bottom: 50px;
}
.todoAdd__input {
  margin-right: 10px;
  border: 1px solid #2c3e50;
  padding: 5px 10px;
}
.todoAdd__button {
  border: 1px solid #9eb6ff;
  background: #9eb6ff;
  color: #fff;
  box-sizing: border-box;
  padding: 5px 10px;
}
.todoList {
  list-style: none;
  padding: 0 100px;
  margin: 15px 0;
  text-align: left;
}
.todoList__text {
  margin-left: 10px;
}
.todoList__delete {
  border: none;
  color: #fff;
  background: #ff425b;
  margin-top: 5px;
  margin-left: 15px;
  border-radius: 5%;
}
.modal__closeBtn {
  position: absolute;
  bottom: 20px;
  right: 20px;
}
// done用のstyle
.todoList__text--isDone {
  color: #bfbebb;
  text-decoration: line-through;
}
</style>
