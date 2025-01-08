import Vue from 'vue'

Vue.mixin({
  methods: {
    dateRange(start, end) {
      if (this.$dayjs(start).format("YYYY") === this.$dayjs(end).format("YYYY")) {
        if (this.$dayjs(start).format("MMM") === this.$dayjs(end).format("MMM")) {
          if (this.$dayjs(start).format("D") === this.$dayjs(end).format("D")) {
            return this.$dayjs(start).format("D MMM YYYY");
          } else {
            return this.$dayjs(start).format("D") + ' – ' + this.$dayjs(end).format("D MMM YYYY");
          }
        } else {
          return this.$dayjs(start).format("D MMM") + ' – ' + this.$dayjs(end).format("D MMM YYYY");
        }
      } else {
        return this.$dayjs(start).format("D MMM YYYY") + ' – ' + this.$dayjs(end).format("D MMM YYYY");
      }
    }
  }
})
