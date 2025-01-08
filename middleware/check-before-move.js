export default function ({ store, route, from }) {
  // console.table({ from, to: route });
  // console.log(store.state.styling.top);
  // _ARTIST or _EXHIBITION
  let parentRoutes = ['index', 'artists', 'exhibitions', 'information'];
  let childRoutes = ['artists-artist', 'exhibitions-exhibition'];
  let to = route;
  if (from && to) {
    if (childRoutes.includes(from.name)) {
      if (parentRoutes.includes(to.name)) {
        // child to parent (e.g. backwards from exhibition to exhibitions)
        let artist = document.getElementById("artist");
        if (artist) {
          setTimeout(()=>{ 
            artist.style.opacity = 0;
          }, 499);
        }
        let exhibition = document.getElementById("exhibition");
        if (exhibition) {
          setTimeout(()=>{ 
            exhibition.style.opacity = 0;
          }, 499);
        }
      } else if (childRoutes.includes(to.name)) {
        // child to child (e.g. artist to exhibition)
        let artist = document.getElementById("artist");
        if (artist) {
          setTimeout(()=>{ 
            artist.style.opacity = 0;
          }, 499);
        }
        let exhibition = document.getElementById("exhibition");
        if (exhibition) {
          setTimeout(()=>{ 
            exhibition.style.opacity = 0;
          }, 499);
        }
        setTimeout(()=>{
          window.scrollTo({top:0,behavior:'auto'});
        }, 495);
      }
    } else if (parentRoutes.includes(from.name)) {
      if (childRoutes.includes(to.name)) {
        // parent to child (e.g. exhibitions to exhibition or artists to artist)

        // doesn’t seem to work, so just keeping in children for simplicity:

        // let artists = document.getElementById("artists");
        // if (artists) {
        //   artists.style.top = store.state.styling.top * -1 + 'px';
        // }
        // let exhibitions = document.getElementById("exhibitions");
        // if (exhibitions) {
        //   exhibitions.style.top = store.state.styling.top * -1 + 'px';
        // }
      } else if (parentRoutes.includes(to.name)) {
        // parent to parent (e.g. information to exhibitions, exhibitions to information, information to artists)
        // crucially, info to home, artists to home, exhibitions to home are all tricky...
        if (to.name === 'index') {
          let exhibitions = document.getElementById("exhibitions");
          let artists = document.getElementById("artists");
          let information = document.getElementById("information");
          if (exhibitions) exhibitions.style.opacity = 0;
          if (artists) artists.style.opacity = 0;
          if (information) information.style.opacity = 0;
        }
      }
    }
  }
}