<template>
  <div class="calendar">
    <header>ToDoカレンダー</header>
    <main>
      <CalendarHead/>
      <CalendarBody/>
    </main>
  </div>
</template>

<script>
import CalendarHead from "./components/CalendarHead";
import CalendarBody from "./components/CalendarBody/CalendarBody";

export default {
  components: {
    CalendarHead,
    CalendarBody
  }
};
</script>

<style lang="scss">
.calendar {
  width: 1000px;
  margin: 30px auto 0;
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  font-size: 18px;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
#app > header {
  font-size: 1.9rem;
}
</style>
