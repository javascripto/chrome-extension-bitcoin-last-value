var moeda = num => num.toLocaleString('pt-br', {
  style: 'currency', 
  currency: 'BRL'
});

app.innerHTML = moeda(Number(localStorage.btc)) || 0
app.style.color = 'green'

fetch('https://api.bitvalor.com/v1/ticker.json')
  .then(r => r.json())
  .then(r => {
    var valorAntigo = Number(localStorage.btc)
    localStorage.btc = r.ticker_12h.exchanges.MBT.last
    app.innerHTML = moeda(Number(localStorage.btc))
    if (valorAntigo > Number(localStorage.btc))
      app.style.color = 'red'
    else 
      app.style.color = 'greenyellow'
  })
