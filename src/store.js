import Vue from "vue";
import Vuex from "vuex";
import holidayList from "./assets/holiday.json";

Vue.use(Vuex);

const date = new Date();
// [done]`localStorage.getItem('キー')`で保存したデータを取得
//const todoData = JSON.parse(localStorage.getItem('todoData'));

export default new Vuex.Store({
  // [check/TODO]getterを使用したほうがいい？
  // [learn]どこに何を格納すればいいかわからなくで大分詰まったのでデータ設計を最初に行う必要があると思った。
  // [check]どこに情報を格納するか迷った(store内かコンポーネント内かとか)
  // [learn] JSで日付操作系を行うなら「moment.js」というのがあるらしい
  state: {
    holidayList, // = holidayList: holidayList,
    days: [],
    daysSpace: [],
    // spaceFirtstDayBefore:
    today: date.getDate(),
    currentMonth: date.getMonth() + 1, // [learn]1月が「0」,12月が「11」らしい
    currentYear: date.getFullYear(),
    isModalShowing: false,
    todos: JSON.parse(localStorage.getItem("todoData") || "[]")
  },
  // # stateの値を変更
  mutations: {
    changeMonth(state, month) {
      state.currentMonth = month;
    },
    changeYear(state, year) {
      state.currentYear = year;
    },
    changeDays(state, daysForData) {
      // state.days = new Date(daysForData.year, daysForData.month, 0).getDate();
      state.days = [];
      state.daysSpace = [];
      const firstDay = new Date(daysForData.year, daysForData.month - 1, 1);
      const lastDay = new Date(daysForData.year, daysForData.month, 0);
      const firstDayOfWeek = firstDay.getDay();
      const firstDayDate = firstDay.getDate();
      const lastDayDate = lastDay.getDate();
      for (let i = 0; i < firstDayOfWeek; i++) {
        state.daysSpace.push({ date: "" });
      }
      for (let i = firstDayDate; i <= lastDayDate; i++) {
        const year = new Date(
          state.currentYear,
          state.currentMonth,
          i
        ).getFullYear();
        const month = new Date(
          state.currentYear,
          state.currentMonth,
          i
        ).getMonth();
        // TODO:ここを切り離して定義できないか？
        // [question]for文の中でpushしたプロパティの指定はどの様にすればいいか？
        // TASK1: 祝日の分も余計にpushされてしまう（祝日の日にちが２つになる）
        state.days.push({
          year,
          month,
          date: i,
          today: false
        });
        state.holidayList.forEach((item) => {
          const daily = `${year}/${month}/${i}`;
          const holiday = item["date"];
          if (daily === holiday) {
            const holidayDate = item["holiday_name"];
            // TODO[MUST]:[i - 1]で解決できたけど理由がいまいちわかっていないのでチェックs
            state.days[i - 1].holidayDate = holidayDate;
          }
        });
      }
    },
    // TODO: 画面遷移をしたらマークが消える
    todayMarking(state) {
      const todayDateFilter = state.days.filter((day) => {
        return day.date === state.today;
      });
      const todayIndex = todayDateFilter[0].date - 1;
      state.days[todayIndex].today = true;
    },
    changeAddModalShow(state) {
      state.isModalShowing = !state.isModalShowing;
    },
    addTodo(state, todo) {
      state.todos.push({
        year: new Date(
          state.currentYear,
          state.currentMonth,
          todo.day
        ).getFullYear(),
        month: new Date(
          state.currentYear,
          state.currentMonth,
          todo.day
        ).getMonth(),
        date: todo.day,
        text: todo.newTodo,
        status: false
      });
      // [todo]`localStorage.setItem('キー', '値')`でデータを保存
      localStorage.setItem("todoData", JSON.stringify(state.todos));
    },
    changeStatus(state, statusData) {
      state.todos[statusData.index].status = !statusData.status;
    },
    todoDelete(state, statusData) {
      // [参考]https://qiita.com/masash49/items/2946e0d9631f54b47237
      // [TASK]TODOが削除された時にlocalstorageをクリアする
      state.todos = state.todos.filter((todo, i) => i !== statusData.index);
      localStorage.removeItem("todoData", JSON.stringify());
    }
  },
  // # commitでmutation発火
  actions: {
    // [TODO]contextとは何か調べる
    changeMonth(context, month) {
      context.commit("changeMonth", month);
    },
    changeYear(context, year) {
      context.commit("changeYear", year);
    },
    changeDays(context, daysForData) {
      context.commit("changeDays", daysForData);
    },
    todayMarking(context) {
      context.commit("todayMarking");
    },
    changeAddModalShow(context) {
      context.commit("changeAddModalShow");
    },
    addTodo(context, todo) {
      context.commit("addTodo", todo);
    },
    changeStatus(context, statusData) {
      context.commit("changeStatus", statusData);
    },
    todoDelete(context, statusData) {
      context.commit("todoDelete", statusData);
    }
  }
});
