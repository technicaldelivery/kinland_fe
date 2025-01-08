import Vue from 'vue'

Vue.mixin({
  methods: {
    dateTimeRange(start, end) {
      if (this.$dayjs(start).format("YYYY") === this.$dayjs(end).format("YYYY")) {
        if (this.$dayjs(start).format("MMMM") === this.$dayjs(end).format("MMMM")) {
          if (this.$dayjs(start).format("D") === this.$dayjs(end).format("D")) {
            return `${ this.$dayjs(start).format("ddd D MMM") }, ${ this.timeRange(start, end) }`;
          } else {
            return this.$dayjs(start).format("ddd D MMM, ha") + '–' + this.$dayjs(end).format("ddd D MMM, ha");
          }
        } else {
          return this.$dayjs(start).format("ddd D, ha") + '–' + this.$dayjs(end).format("ddd D MMM, ha");
        }
      } else {
        return this.$dayjs(start).format("H:mm D MMM YYYY") + '–' + this.$dayjs(end).format("H:mm D MMM YYYY");
      }
    },
    timeRange(start, end) {
      if (this.$dayjs(start).format("a") === this.$dayjs(end).format("a")) {
        return `${this.$dayjs(start).format('h')} – ${this.$dayjs(end).format('ha')}`
      } else {
        return `${this.$dayjs(start).format('ha')} – ${this.$dayjs(end).format('ha')}`
      } 
    }
  }
})
