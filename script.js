$(document).ready(function () {


   var playlist = [{
      title: "Radio Verdad",
      artist: "Null",
      mp3: "https://cloudstream2036.conectarhosting.com/8168/stream",
      poster: "imgs/RLogos/Rverdad.png"
   }, {
      title: "Radio CRET - San Miguel",
      artist: "Null",
      mp3: "http://radiocret.net:8000/live",
      poster: "imgs/RLogos/RCret.png"
   }, {
      title: "Radio CRET - Santa Ana",
      artist: "Null",
      mp3: "https://radiocret.net:8101/live",
      poster: "imgs/RLogos/RCret.png"
   }, {
      title: "Radio Elim - 320",
      artist: "Null",
      mp3: "https://ssl.rockhost.com/proxy/restauracion?mp=/mp3_320",
      poster: "imgs/RLogos/RElim.png"
   },
   {
      title: "Radio Bautista",
      artist: "Null",
      mp3: "https://s2.radio.co/s3a7dc3d82/listen",
      poster: "imgs/RLogos/REBautista.jpg"
   },
   {
      title: "Radio Centro Cristiano",
      artist: "Null",
      mp3: "https://vivo.miradio.in:7008/;",
      poster: "imgs/RLogos/RCentroCristiano.jpg"
   },{
         title:"Radio Gospel (Calidad Alta)",
         artist: "Null",
         mp3: "https://ssl.rockhost.com/proxy/gospel?mp=/mp3_320",
         poster : "imgs/RLogos/RGospel.jpg"
   }
   ];

   var cssSelector = {
      jPlayer: "#jquery_jplayer",
      cssSelectorAncestor: ".music-player"
   };

   var options = {
      swfPath: "https://cdnjs.cloudflare.com/ajax/libs/jplayer/2.6.4/jquery.jplayer/Jplayer.swf",
      supplied: "ogv, m4v, oga, mp3",
      volumechange: function (event) {
         $(".volume-level").slider("value", event.jPlayer.options.volume);
      },
      timeupdate: function (event) {
         $(".progress").slider("value", event.jPlayer.status.currentPercentAbsolute);
      }
   };

   var myPlaylist = new jPlayerPlaylist(cssSelector, playlist, options);
   var PlayerData = $(cssSelector.jPlayer).data("jPlayer");


   // Create the volume slider control
   $(".volume-level").slider({
      animate: "fast",
      max: 1,
      range: "min",
      step: 0.01,
      value: $.jPlayer.prototype.options.volume,
      slide: function (event, ui) {
         $(cssSelector.jPlayer).jPlayer("option", "muted", false);
         $(cssSelector.jPlayer).jPlayer("option", "volume", ui.value);
      }
   });

   // Create the progress slider control
   $(".progress").slider({
      animate: "fast",
      max: 100,
      range: "min",
      step: 0.1,
      value: 0,
      slide: function (event, ui) {
         var sp = PlayerData.status.seekPercent;
         if (sp > 0) {
            // Move the play-head to the value and factor in the seek percent.
            $(cssSelector.jPlayer).jPlayer("playHead", ui.value * (100 / sp));
         } else {
            // Create a timeout to reset this slider to zero.
            setTimeout(function () {
               $(".progress").slider("value", 0);
            }, 0);
         }
      }
   });


});