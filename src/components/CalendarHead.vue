<template>
  <div class="calendarHead">
    <span class="calendarHead__move" @click="movePrevMonth">&lt;</span>
    <div class="calendarHead__date">{{ currentYear }}/{{ currentMonth }}</div>
    <span class="calendarHead__move" @click="moveNextMonth">&gt;</span>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";

export default {
  methods: {
    movePrevMonth() {
      if (this.currentMonth <= 1) {
        this.changeMonth(12);
        this.changeYear(this.currentYear - 1);
      } else {
        this.changeMonth(this.currentMonth - 1);
      }
      this.changeDays({ year: this.currentYear, month: this.currentMonth });
    },
    moveNextMonth() {
      if (this.currentMonth >= 12) {
        this.changeMonth(1);
        this.changeYear(this.currentYear + 1);
      } else {
        this.changeMonth(this.currentMonth + 1);
      }
      this.changeDays({ year: this.currentYear, month: this.currentMonth });
    },
    // mapActionsヘルパー使用
    ...mapActions(["changeMonth", "changeYear", "changeDays"])
  },
  // [learn]mapState内では、stateに「this.$store.state」が代入
  // [learn]mapState()はオブジェクトを返す→スプレット演算子で展開'...mapState()'
  computed: {
    ...mapState(["currentYear", "currentMonth", "days"])
  }
};
</script>

<style lang="scss" scoped>
.calendarHead {
  margin-top: 20px;
  font-weight: bold;
  font-size: 1.4rem;
}

.calendarHead__date {
  display: inline-block;
}
.calendarHead__move {
  cursor: pointer;
  margin: 20px;
}
</style>
