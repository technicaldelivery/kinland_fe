<template>
  <div id="content" class="content">
    <ClientOnly>
      <PreviewBanner v-if="$nuxt.isPreview" />
    </ClientOnly>
    <Navigation />
    <Nuxt />
    <CookieBanner />
  </div>
</template>

<script>
import { mapMutations } from 'vuex';
const smartquotes = require('smartquotes');
smartquotes.replacements.push([/([0-9])-([0-9])/g, '$1–$2']); // hyphen to en-dash between numbers
smartquotes.replacements.push([/(\s)-(\s)/g, '\u2009–\u2009']); // hyphen to en-dash between spaces
smartquotes.replacements.push([/(\s)–(\s)/g, '\u2009–\u2009']); // change to thin spaces when spaces surround en-dash
smartquotes.replacements.push([/(\s)x(\s)/g, '\u2009×\u2009']); // x to × between spaces
smartquotes.replacements.push([/(\s)X(\s)/g, '\u2009×\u2009']); // X to × between spaces
smartquotes.replacements.push([/(\s)×(\s)/g, '\u2009×\u2009']); // change to thin spaces when spaces surround ×
smartquotes.replacements.push([/(\d)cm/g, '$1 cm']); // space after digit and cm
smartquotes.replacements.push([/(\d)CM/g, '$1 cm']); // space after digit and cm
smartquotes.replacements.push([/(\d)mm/g, '$1 mm']); // space after digit and mm
smartquotes.replacements.push([/(\d)MM/g, '$1 mm']); // space after digit and mm
smartquotes.replacements.push([/(CO2)/g, 'CO₂']);
smartquotes.replacements.push([/(m2)/g, 'm²']);
import _ from 'lodash';

export default {
  methods: {
    ...mapMutations('styling', ['UPDATE_TOUCHDEVICE']),
    isTouchDevice() {
      return (('ontouchstart' in window) ||
        (navigator.maxTouchPoints > 0) ||
        (navigator.msMaxTouchPoints > 0));
    },
  },
  mounted() {
    this.UPDATE_TOUCHDEVICE(this.isTouchDevice());
    // this.$gtag.set({ 'enabled': true, });
    smartquotes().listen();
  },
}
</script>

