<template>
  <div class="calendarBody">
    <!-- [TODO] keyの付け方を調べる(何をkeyに持ってくるべきかとか) -->
    <!-- [参考]https://reffect.co.jp/vue/v-bind-key-understand-by-developer-tool -->
    <!-- [参考]https://qiita.com/t4y3/items/f66022733e8bd3976e0e -->
    <div class="calendarBody__week">
      <span class="calendarBody__weekItem" v-for="day in week" :key="day">{{ day }}</span>
    </div>
    <div class="calendarBody__days">
      <div class="calendarBody__daysItem" v-for="space in daysSpace" :key="space.index">
        <span>{{ space.date }}</span>
      </div>
      <div class="calendarBody__daysItem" v-for="day in days" :key="day.index">
        <span class="calendarBody__daysDate" :class="{ 'calendarBody__daysDate--isToday': day.today }">{{ day.date }}</span>
        <div class="calendarBody__daysHoliday">{{ day.holidayDate }}</div>
        <TodoItem :day="day"/>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import TodoItem from "./TodoItem/index";

export default {
  components: {
    TodoItem
  },
  created: function() {
    this.MonthDays();
    this.todayMarking();
  },
  data: function() {
    return {
      week: ["日", "月", "火", "水", "木", "金", "土"]
    };
  },
  methods: {
    MonthDays() {
      this.changeDays({ year: this.currentYear, month: this.currentMonth });
    },
    // mapActionsヘルパー使用
    ...mapActions(["changeDays", "todayMarking"])
  },
  // [TODO]EventBusを使用する or Vuexで値の受け渡しを行う
  computed: {
    ...mapState(["days", "currentMonth", "currentYear", "daysSpace"])
  }
};
</script>

<style lang="scss" scoped>
.calendarBody {
  margin-top: 20px;
}
// [learn]親->display:flex; 子->width:100%; で子が横幅サイズぴったりに収まる
// [参考]https://www.webopixel.net/html-css/1216.html
.calendarBody__week {
  display: flex;
  justify-content: center;
}
.calendarBody__weekItem {
  flex-basis: 100%;
  // IE11のバグ対応
  max-width: 100%;
  &:nth-child(7) {
    color: #2453ff;
  }
  &:nth-child(1) {
    color: red;
  }
}
.calendarBody__days {
  text-align: left;
  margin-top: 20px;
  display: flex;
  flex-wrap: wrap;
}
.calendarBody__daysItem {
  flex-basis: calc(100% / 7);
  max-width: clac(100% / 7);
  text-align: center;
  font-size: 1.4rem;
  padding: 10px 20px 60px 20px;
  box-sizing: border-box;
  position: relative;
  &:hover {
    background: #f0f3ff;
  }
  &:nth-child(7n) {
    color: #2453ff;
  }
  &:nth-child(7n - 6) {
    color: red;
  }
}
// 当日にマーク
.calendarBody__daysDate--isToday {
  background: #d9d9d9;
  border-radius: 50%;
  padding: 2px 5px;
}
.calendarBody__daysHoliday {
  position: absolute;
  top: 37px;
  left: 0;
  right: 0;
  font-size: 11px;
}
</style>
