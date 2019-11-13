<template>
  <div class="todo">
    <button class="todo__item" @click="changeAddModalShow">+</button>
    <TodoAddList :day="day"/>
  </div>
</template>

<script>
import TodoAddList from "./list";
import { mapActions } from "vuex";

export default {
  components: {
    TodoAddList
  },
  props: ["day"],
  methods: {
    // mapActionsヘルパー使用
    ...mapActions(["changeAddModalShow"])
  }
};
</script>

<style lang="scss" scoped>
.todo {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  opacity: 0;
  padding-top: 40%;
  box-sizing: border-box;
  &:hover {
    opacity: 1;
  }
}
.todo__item {
  border: none;
  width: 50%;
  font-size: 1.2rem;
  background: #9eb6ff;
  color: #fff;
}
</style>
