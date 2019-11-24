import Vue from "vue";
import Vuex from "vuex";
import holidayList from "./assets/holiday.json";

Vue.use(Vuex);

const date = new Date();

export default new Vuex.Store({
  // [learn]どこに何を格納すればいいかわからなくで大分詰まったのでデータ設計を最初に行う必要があると思った。
  // [check]どこに情報を格納するか迷った(store内かコンポーネント内かとか)
  // [learn] JSで日付操作系を行うなら「moment.js」というのがあるらしい
  state: {
    holidayList, // = holidayList: holidayList,
    days: [],
    daysSpace: [],
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
      // 初期化
      state.days = [];
      state.daysSpace = [];
      const firstDay = new Date(daysForData.year, daysForData.month - 1, 1);
      const lastDay = new Date(daysForData.year, daysForData.month, 0);
      const firstDayOfWeek = firstDay.getDay();
      const daysOfMonth = lastDay.getDate();
      // [learn] `new Array(数値)`は空要素が返される
      // `[...Array(数値)]`は`Array(数値).fill(undefined)`と同じ
      // https://ginpen.com/2018/12/22/empty-slots/
      // https://qiita.com/taneba/items/04c99e236bc87dab59e0
      [...Array(firstDayOfWeek)].forEach(() => {
        state.daysSpace.push("");
      });
      [...Array(daysOfMonth)].forEach((day, index) => {
        // 日付を1日からにしている(indexは0スタートの為)
        const i = index + 1;
        const year = new Date(state.currentYear, state.currentMonth, i).getFullYear();
        const month = new Date(state.currentYear, state.currentMonth, i).getMonth();
        state.days.push({year, month, date: i, today: false});
        state.holidayList.forEach(item => {
          const daily = `${year}/${month}/${i}`;
          const holiday = item["date"];
          if (daily === holiday) {
            state.days[i - 1].holidayDate = item["holiday_name"];
          }
        });
      });
    },
    todayMarking(state) {
      // 今日の日付を取得
      const createTodayYMD = new Date();
      const todayYMD = `${createTodayYMD.getFullYear()}/${createTodayYMD.getMonth() + 1}/${createTodayYMD.getDate()}`;
      // 当月の年月日が今日の日付(todayYMD)と一致して入れば返りを返す
      const todayDateFilter = state.days.filter(day => {
        if (day.month === 0) day.month = 12;
        const todayYMDFilter = `${day.year}/${day.month}/${day.date}`;
        return todayYMD === todayYMDFilter;
      });
      if (todayDateFilter.length !== 0) {
        const todayIndex = todayDateFilter[0].date - 1;
        state.days[todayIndex].today = true;
      }
    },
    changeAddModalShow(state) {
      state.isModalShowing = !state.isModalShowing;
    },
    addTodo(state, todo) {
      state.todos.push({
        year: new Date( state.currentYear, state.currentMonth, todo.day ).getFullYear(),
        month: new Date(state.currentYear, state.currentMonth, todo.day ).getMonth(),
        date: todo.day,
        text: todo.newTodo,
        status: false
      });
      // `localStorage.setItem('キー', '値')`でデータを保存
      localStorage.setItem("todoData", JSON.stringify(state.todos));
    },
    changeStatus(state, statusData) {
      state.todos[statusData.index].status = !statusData.status;
    },
    todoDelete(state, statusData) {
      // [参考]https://qiita.com/masash49/items/2946e0d9631f54b47237
      state.todos = state.todos.filter((todo, i) => i !== statusData.index);
      // filterで残ったものだけを格納
      localStorage.setItem("todoData", JSON.stringify(state.todos));
    }
  },
  // # commitでmutation発火
  actions: {
    /* [memo]contextオブジェクトを分割代入するとシンプルに書ける
      >アクションハンドラはストアインスタンスのメソッドやプロパティのセットと
      同じものを呼び出せるコンテキストオブジェクトを受け取ります。
      [引用]https://vuex.vuejs.org/ja/guide/actions.html
    */
    changeMonth({ commit }, month) {
      commit("changeMonth", month);
    },
    changeYear({ commit }, year) {
      commit("changeYear", year);
    },
    changeDays({ commit }, daysForData) {
      commit("changeDays", daysForData);
      commit("todayMarking");
    },
    changeAddModalShow({ commit }) {
      commit("changeAddModalShow");
    },
    addTodo({ commit }, todo) {
      commit("addTodo", todo);
    },
    changeStatus({ commit }, statusData) {
      commit("changeStatus", statusData);
    },
    todoDelete({ commit }, statusData) {
      commit("todoDelete", statusData);
    }
  }
});
