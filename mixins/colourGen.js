export default {
  methods: {
    paletteMuted(image) {
      if (process.client) {
        // var root = document.documentElement;
        var colour = ''
        if (image.metadata.palette.lightMuted) {
          colour = image.metadata.palette.lightMuted.background
        } else if (image.metadata.palette.darkMuted) {
          colour = image.metadata.palette.darkMuted.background
        } else if (image.metadata.palette.dominant) {
          colour = image.metadata.palette.dominant.background
        } else {
          colour = '#fff'
        }
        // root.style.setProperty('--dynamic-background', colour)
        return colour
      }
    },
    paletteText(image) {
      if (process.client) {
        // var root = document.documentElement;
        var colour = ''
        if (image.metadata.palette.dominant) {
          colour = image.metadata.palette.dominant.foreground
        } else if (image.metadata.palette.lightVibrant) {
          colour = image.metadata.palette.lightVibrant.foreground
        } else if (image.metadata.palette.vibrant) {
          colour = image.metadata.palette.vibrant.foreground
        } else {
          colour = '#000'
        }
        // root.style.setProperty('--dynamic-background', colour)
        return colour
      }
    },
    paletteVibrant(image) {
      if (process.client) {
        // var root = document.documentElement;
        var colour = ''
        if (image.metadata.palette.lightVibrant) {
          colour = image.metadata.palette.lightVibrant.background
        } else if (image.metadata.palette.vibrant) {
          colour = image.metadata.palette.vibrant.background
        } else if (image.metadata.palette.dominant) {
          colour = image.metadata.palette.dominant.background
        } else {
          colour = '#fff'
        }
        // root.style.setProperty('--dynamic-background', colour)
        return colour
      }
    },
    hexToRgb(hex) {
      if (process.client) {
        const [r, g, b] = hex.match(/\w\w/g).map(x => parseInt(x, 16));
        return { r, g, b };
      }
    },
    hexToRgba(hex, a) {
      if (process.client) {
        const [r, g, b] = hex.match(/\w\w/g).map(x => parseInt(x, 16));
        return 'rgba(' + r + ',' + g + ',' + b + ',' + a + ')';
      }
    },
    desaturateColour(sat, col, alpha) {
      if (process.client) {
        sat = sat / 100;
        var gray = col.r * 0.3086 + col.g * 0.6094 + col.b * 0.0820;
        col.r = Math.round(col.r * sat + gray * (1 - sat));
        col.g = Math.round(col.g * sat + gray * (1 - sat));
        col.b = Math.round(col.b * sat + gray * (1 - sat));
        return 'rgba(' + col.r + ',' + col.g + ',' + col.b + ',' + alpha + ')'
      }
    }
  }
}
