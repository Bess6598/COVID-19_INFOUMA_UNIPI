/**
 * Funzione usata per parsare i dati che si trovano nel file Json che richiama le funzioni utilizzate per la costruzione dei grafici
*/
function parse(){
  $.getJSON("https://raw.githubusercontent.com/Bess6598/COVID-19/master/dati-json/dpc-covid19-ita-regioni.json")
    .done (function (data) {
      var giorno = data.filter( x => (moment(x.data).format('DD/MM/YYYY') == moment($('#datetimepicker').datetimepicker('date')).format('DD/MM/YYYY') ));
      regioni = giorno.map( x => x.denominazione_regione);

      createBarChart({
        'ctx': document.getElementById("n_positivi").getContext('2d'),
        'labels': regioni,
        'title': 'Nuovi positivi',
        'data': giorno.map( x => x.nuovi_positivi)
      });

      var nuovi_tamponi;
      if (moment($('#datetimepicker').datetimepicker('date')).format('DD/MM/YYYY') != moment('24/02/2020').format('DD/MM/YYYY') ) { //non il primo giorno di controlli
        var giorno_prima = data.filter( x => (moment(x.data).format('DD/MM/YYYY') == moment($('#datetimepicker').datetimepicker('date')).subtract(1, 'day').format('DD/MM/YYYY') ));
        nuovi_tamponi = giorno.map( x => x.tamponi ).map( (x, i) => x - giorno_prima.map( x => x.tamponi )[i] );
      }
      else {
        nuovi_tamponi = giorno.map( x => x.tamponi );
      }
      createBarChart({
        'ctx': document.getElementById("tamponi").getContext('2d'),
        'labels': regioni,
        'title': 'Tamponi',
        'data': nuovi_tamponi
      });

      createBarChart({
        'ctx': document.getElementById("positivi").getContext('2d'),
        'labels': regioni,
        'title': 'Positivi',
        'data': giorno.map( x => x.totale_positivi)
      });
      createBarChart({
        'ctx': document.getElementById("positivi_c").getContext('2d'),
        'labels': regioni,
        'title': 'Positivi',
        'data': giorno.map( x => x.totale_casi)
      });
      createBarChart({
        'ctx': document.getElementById("ricoverati_NI").getContext('2d'),
        'labels': regioni,
        'title': 'Ricoverati',
        'data': giorno.map( x => x.ricoverati_con_sintomi)
      });
      createBarChart({
        'ctx': document.getElementById("ricoverati").getContext('2d'),
        'labels': regioni,
        'title': 'Ricoverati',
        'data': giorno.map( x => x.terapia_intensiva)
      });
      createBarChart({
        'ctx': document.getElementById("isolamento").getContext('2d'),
        'labels': regioni,
        'title': 'Numero di persone in isolamento',
        'data': giorno.map( x => x.isolamento_domiciliare)
      });
      createBarChart({
        'ctx': document.getElementById("deceduti").getContext('2d'),
        'labels': regioni,
        'title': 'Numero di persone decedute',
        'data': giorno.map( x => x.deceduti)
      });
      createBarChart({
        'ctx': document.getElementById("dimessi").getContext('2d'),
        'labels': regioni,
        'title': 'Numero di pazienti dimessi',
        'data': giorno.map( x => x.dimessi_guariti)
      });
  })
}

$(document).ready( function() {
  var data = moment().subtract(1, 'day'); //se la data non viene specificata nell'url vengono visualizzati i dati
  if (window.location.search.substring(1) != "") {
    data = moment(window.location.search.substring(1).split("=")[1]).format('DD/MM/YYYY');
  }

  $('#datetimepicker').datetimepicker({
      inline: false,
      format: 'DD/MM/YYYY',
      maxDate: moment().subtract(1, 'day'),
      minDate: moment('24/02/2020', 'DD/MM/YYYY'),
      default: moment().subtract(1, 'day'),
      date: data
  });
  parse();
  $("#titolo").text("Dati Covid-19 per regione relativi al giorno ".concat(moment($('#datetimepicker').datetimepicker('date')).format('DD/MM/YYYY') ));
  $("#datetimepicker").on("change.datetimepicker", ({date, oldDate}) => {
      window.location.href = window.location.origin + window.location.pathname + "?date=" + date.format('DD/MM/YYYY');
  })

});
