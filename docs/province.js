const regioni = {
  nord_ovest: [
          'Liguria',
          'Lombardia',
          'Piemonte',
          'Valle d\'Aosta'
  ],
  nord_est: [
        'Emilia-Romagna',
        'Friuli Venezia Giulia',
        'P. A. Bolzano',
        'P. A. Trento',
        'Veneto',
  ],

  centro: [
        'Lazio',
        'Marche',
        'Toscana',
        'Umbria'
  ],
  sud: [
        'Abruzzo',
        'Basilicata',
        'Calabria',
        'Campania',
        'Molise',
        'Puglia',
  ],

  isole: [
        'Sardegna',
        'Sicilia'
  ]
};


/**
 * Funzione usata per parsare i dati che si trovano nel file Json che richiama le funzioni utilizzate per la costruzione dei grafici
 * @param {string} parte La parte d'Italia di cui si vogliono controllare le province ("nord", "centro", "sud", "isole")
*/
function parse(parte){
  $.getJSON("https://raw.githubusercontent.com/pcm-dpc/COVID-19/master/dati-json/dpc-covid19-ita-regioni.json")
    .done (function (data) {
    regioni[parte].forEach(element => console.log(element));
  })
}

$(document).ready( function() {
  var parte = "";
  if (window.location.search.substring(1) != "") {
    parte = window.location.search.substring(1).split("=")[1];
  }

  var title = new Vue({
    el: '.container',
    data: {
      message: parte.replace("_", " "),
      regione: [{pippo: [1, 2, 3, 4]}, 2, 3, 4]
    },
    mounted: function() {

    },
    created: function() {

    },
    methods: {
      /*save: function() {
          alert('save');
          this.message = 'CIAO';
      },
      close: function() {
      }*/
    }
  });
  parse(parte);
});
