export default {
  methods: {
    dateRange(start, end) {
      if (this.$dayjs(start).format("YYYY") === this.$dayjs(end).format("YYYY")) {
        if (this.$dayjs(start).format("MMMM") === this.$dayjs(end).format("MMMM")) {
          return this.$dayjs(start).format("D") + ' – ' + this.$dayjs(end).format("D MMMM YYYY");
        } else {
          return this.$dayjs(start).format("D MMMM") + ' – ' + this.$dayjs(end).format("D MMMM YYYY");
        }
      } else {
        return this.$dayjs(start).format("D MMMM YYYY") + ' – ' + this.$dayjs(end).format("D MMMM YYYY");
      }
    }
  }
}
