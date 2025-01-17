/**
 * Funzione usata per parsare i dati che si trovano nel file Json che richiama le funzioni utilizzate per la costruzione dei grafici
*/
function parse(){
  var scelte = $("#form1 input:checkbox:checked").map(function() {
    return $(this).attr('id');
  });
  var regioni = $("#form2 input:checkbox:checked").map(function() {
    return $(this).attr('id');
  });

  $.getJSON("https://raw.githubusercontent.com/Bess6598/COVID-19/master/dati-json/dpc-covid19-ita-regioni.json")
    .done (function (data) {
      var i = 0;
      var lines = [];
      scelte.each(function(index, scelta) {
        regioni.each(function (index, regione) {
            var d = data.filter(x => x.denominazione_regione.toLowerCase().replace("'", "").replace(/\./g, "") == regione.replace(/_/g, " ")).map(x => x[scelta]);
            if(scelta == 'tamponi' || scelta == 'deceduti') { //dati cumulativi
              d = datiCumulativi(d);
            }
            lines.push({
              'title': scelta.replace("_", " ") + " " + regione.replace("_", " "),
              'data': d.map( x => {
                if(x < 0) return 0;
                else return x;
              }),
              'n_color': i
            });
            i++;
        });
      });
      var label = data.filter(x => x.denominazione_regione == 'Toscana').map(x => moment(x.data).format('DD/MM/YYYY'));
      createLineChart({
        'ctx': document.getElementById("grafico").getContext('2d'),
        'labels': label,
        'data': lines
      });
  })
}

$(document).ready( function() {
  var regioni_query = getQuerystringNameValue("regioni");
  var data_query = getQuerystringNameValue("data");
  if (data_query != null || regioni_query != null) {
    regioni_query.forEach( el => $("#"+el).prop('checked', true));
    data_query.forEach( el => $("#"+el).prop('checked', true));
  }
  parse();
  $('#rigenera').click( function() {
    var data = [];
    var regioni = [];
    $("#form1 input:checkbox").each( (i, item) => { if( $(item).prop( 'checked') ) { data.push( $(item).attr('id')) } });
    $("#form2 input:checkbox").each((i, item) => { if( $(item).prop('checked') ) { regioni.push($(item).attr('id')) } });
    if(data.length + regioni.length > 10) {
      const swalWithBootstrapButtons = Swal.mixin({
          customClass: {
            confirmButton: 'btn btn-success',
            cancelButton: 'btn btn-danger'
          },
          buttonsStyling: false
        })
        swalWithBootstrapButtons.fire({
          title: 'Sicuro di voler proseguire?',
          text: "È fortemente sconsigliato selezionare più di 10 elementi, per una migliore leggibilità del grafico.",
          icon: 'warning',
          showCancelButton: true,
          confirmButtonText: 'Sì',
          cancelButtonText: 'No!',
          reverseButtons: true
        }).then((result) => {
          if (result.isConfirmed) {
            var string = "./confronti.html?" + $.param({data: data}, true) + "&" +  $.param({regioni: regioni}, true);
            window.location.href = string;
          } else if (
            result.dismiss === Swal.DismissReason.cancel
          ) { return; }
        })
    }
    else {
      var string = "./confronti.html?" + $.param({data: data}, true) + "&" +  $.param({regioni: regioni}, true);
      window.location.href = string;
    }
  });
});

function getQuerystringNameValue(name) {
  var regex = RegExp('[?&]' + name + '=([^&]*)');
  var string = window.location.search;
  var output = [];
  var match;
  while ((match = regex.exec(string)) !== null) {
    string = string.split(match[1])[1];
    output.push(match[1]);
  }
  return output;
}
