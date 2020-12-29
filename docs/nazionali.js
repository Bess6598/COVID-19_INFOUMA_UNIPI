/**
 * Funzione usata per parsare i dati che si trovano nel file Json che richiama le funzioni utilizzate per la costruzione dei grafici
*/
function parse(){
  $.getJSON("https://raw.githubusercontent.com/Bess6598/COVID-19/master/dati-json/dpc-covid19-ita-andamento-nazionale.json")
    .done (function (data) {
      var label = data.map( x => moment(x.data).format('DD/MM/YYYY'));
      createLineChart({
        'ctx': document.getElementById("positivi/ospedalizzati").getContext('2d'),
        'labels': label,
        'data': [{
          'title': 'Positivi',
          'data': data.map(x => x.totale_positivi),
          'n_color': 2
        }, {
          'title': 'Ospedalizzati',
          'data': data.map(x => x.totale_ospedalizzati),
          'n_color': 1
        }]
      });
      createLineChart({
        'ctx': document.getElementById("casi").getContext('2d'),
        'labels': label,
        'data': [{
          'title': 'Casi',
          'data': data.map(x => x.totale_casi),
          'n_color': 3
        }]
      });
      createLineChart({
        'ctx': document.getElementById("tamponi/nuovi_positivi").getContext('2d'),
        'labels': label,
        'data': [{
          'title': 'Nuovi positivi',
          'data': data.map(x => x.nuovi_positivi),
          'n_color': 2
        }, {
          'title': 'Tamponi',
          'data': datiCumulativi(data.map(x => x.tamponi)).map( x => {
                                                              if(x < 0) return 0;
                                                              else return x;
                                }),
          'n_color': 1
        }]
      });
  })
}

$(document).ready( function() {
  parse();
});
