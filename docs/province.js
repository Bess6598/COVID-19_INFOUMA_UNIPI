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

  switch(parte) {
  case "nord_est":
    $("#titolo").text("Dati Covid-19 relativi al nord est dell'Italia");
    break;
  case "nord_ovest":
    $("#titolo").text("Dati Covid-19 relativi al nord ovest dell'Italia");
    break;
  case "sud":
    $("#titolo").text("Dati Covid-19 relativi al sud dell'Italia");
    break;
  case "centro":
    $("#titolo").text("Dati Covid-19 relativi al centro dell'Italia");
    break;
  case "isole":
    $("#titolo").text("Dati Covid-19 relativi alle isole Italiane");
    break;
  default:
    $("#titolo").text("Errore, ci scusiamo per il disagio.");
    //TODO --> pagina d'errore migliore
    return;
  }
  parse(parte);
});
