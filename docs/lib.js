var color = [
        'rgba(255, 99, 132, 0.2)',
        'rgba(54, 162, 235, 0.2)',
        'rgba(255, 206, 86, 0.2)',
        'rgba(75, 192, 192, 0.2)',
        'rgba(153, 102, 255, 0.2)',
        'rgba(255, 159, 64, 0.2)',
        'rgba(128, 177, 169, 0.2)',
        'rgba(240, 61, 20, 0.2)',
        'rgba(0, 181, 219, 0.2)',
        'rgba(255, 191, 69, 0.2)',
        'rgba(0, 31, 120, 0.2)',
        'rgba(247, 205, 175, 0.2)',
        'rgba(250, 110, 10, 0.2)',
        'rgba(80, 189, 134, 0.2)',
        'rgba(34, 63, 125, 0.2)',
        'rgba(255, 153, 0, 0.2)',
        'rgba(88, 89, 91, 0.2)',
        'rgba(241, 62, 161, 0.2)',
        'rgba(158, 74, 27, 0.2)',
        'rgba(235, 51, 35, 0.2)',
        'rgba(119, 59, 150, 0.2)'
    ];
var strong_color = [
        'rgba(255,99,132,1)',
        'rgba(54, 162, 235, 1)',
        'rgba(255, 206, 86, 1)',
        'rgba(75, 192, 192, 1)',
        'rgba(153, 102, 255, 1)',
        'rgba(255, 159, 64, 1)',
        'rgba(128, 177, 169, 1)',
        'rgba(240, 61, 20, 1)',
        'rgba(0, 181, 219, 1)',
        'rgba(255, 191, 69, 1)',
        'rgba(0, 31, 120, 1)',
        'rgba(247, 205, 175, 1)',
        'rgba(250, 110, 10, 1)',
        'rgba(80, 189, 134, 1)',
        'rgba(34, 63, 125, 1)',
        'rgba(255, 153, 0, 1)',
        'rgba(88, 89, 91, 1)',
        'rgba(241, 62, 161, 1)',
        'rgba(158, 74, 27, 1)',
        'rgba(235, 51, 35, 1)',
        'rgba(119, 59, 150, 1)'
    ];

/**
 * Funzione usata per la creazione di un grafico a linee
 *
 * @param {Object} obj L'oggetto contenente i dati usati per costruire il grafico
 * @param {Node} ctx L'elemento HTML all'interno cui il grafico verrà visualizzato
 * @param {Array.<string>} labels Le etichette del grafico
 * @param {Array.<Object>} obj.data Un array di oggetti contenenti i dati
 * @param {string} data.title Il titolo della linea dell'insieme di dati (visualizzato nella legenda del grafico)
 * @param {Array.<int>} data.data I dati con cui una delle linee del grafico viene creata
 * @param {int} data.n_color Il numero del colore della linea (il colore viene preso dagli array color e strong_color)
*/
function createLineChart(obj) {
  var datasets = [];
  obj.data.forEach(d => datasets.push({
      label: d.title,
      data: d.data,
      backgroundColor: [
        color[d.n_color],
      ],
      borderColor: [
        strong_color[d.n_color],
      ],
      borderWidth: 2
  }));
  var myLineChart = new Chart(obj.ctx, {
    type: 'line',
    data: {
      labels: obj.labels,
      datasets: datasets
    },
    options: {
      responsive: true
    }
  });
}

/**
 * Funzione usata per la creazione di un grafico a barre
 *
 * @param {Object} obj L'oggetto contenente i dati utilizzati per realizzare il grafico
 * @param {Node} obj.ctx L'elemento HTML all'interno cui il grafico verrà visualizzato
 * @param {Array.<string>} obj.labels Le etichette del grafico
 * @param {string} obj.title Il titolo dell'insieme dei dati (visualizzato nella legenda del grafico)
 * @param {Array.<int>} obj.data I dati con cui il grafico viene costruito
*/
function createBarChart(obj) {
  var myChart = new Chart(obj.ctx, {
    type: 'bar',
    data: {
      labels: obj.labels,
      datasets: [{
      label: obj.title,
      data: obj.data,
      backgroundColor: color,
      borderColor: strong_color,
      hoverBackgroundColor: strong_color,
      borderWidth: 1
      }]
    },
    legend:{
      display: true
    },
    options: {
      scales: {
        yAxes: [{
          ticks: {
            beginAtZero: true
          }
      }]
    }
  }
  });
}
