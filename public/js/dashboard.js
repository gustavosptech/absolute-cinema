if (sessionStorage.PAIS_USUARIO == 'null') {
    window.location = "./registerAddress.html";
}


const ctx = document.getElementById("myChart");

  new Chart(ctx, {
    type: 'bar',
    data: {
      labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
      datasets: [{
        label: '# of Votes',
        data: [12, 19, 3, 5, 2, 3],
        borderWidth: 1,
        borderColor: ['#b87f06'],
        color: ['#ffffff'],
        backgroundColor: ['#ffad00']
      }]
    },
    options: {
      scales: {
        y: {
          beginAtZero: true
        }
      }
    }
  });
