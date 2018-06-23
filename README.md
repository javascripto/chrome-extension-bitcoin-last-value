# Chrome Extensions - Anotações de um mini curso

## Anatomia de uma extensão

- `Manifest`: Arquivo Principal da extensão com todas definições.
- `Popup`: Interface da extensão em html que pode usar scripts e estilos externos.
- `Content Script`: Scripts e regras que serão injetadas em páginas especificadas.
- `Background`: Scripts que implementam regras de execução em background e escuta eventos que serão disparados pela extensão em content spripts ou por páginas.

## Propriedades básicas do manifest.json

```json
{
  "name": "Minha extensão chrome",
  "description": "Descrição da extensão",
  "version": "0.1",
  "manifest_version": 2,
}
```

## Especificando uma extensão de bitcoin no estilo popup com arquivos html, css, js, e icone no arquivo manifest.json

- manifest.json
```json
{
  "browser_action": {
    "default_popup": "popup.html",
    "default_icon": "icon.png"
  }
}
```
- popup.html
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Minha extensãocomunicacao-entre-background-e-content-script</title>
    <link rel="stylesheet" href="style.css">
    <style>
        body {background: #333;}
        h1 {color:greenyellow;}
    </style>
</head>
<body>
    <h1 id="app">Minha popup</h1>
    <script src="script.js"></script>
</body>
</html>
```
- script.js

```js
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
    localStorage.btc = r.ticker_12h.exchanges.FOX.last
    app.innerHTML = moeda(Number(localStorage.btc))
    if (valorAntigo > Number(localStorage.btc))
      app.style.color = 'red'
    else 
      app.style.color = 'greenyellow'
  })

```

## Propriedades do manifest.json que especificam permissões especiais, content_scripts e background scripts

- [https://developer.chrome.com/apps/declare_permissions](https://developer.chrome.com/apps/declare_permissions)


```json
{
    "permissions": [
        "tabs",
        "http://*/*",
        "https://*/*"
    ],
    "background": {
        "scripts": ["background-script.js"]
    },
    "content_scripts": [
        {
            "matches": ["https://www.google.com/*"],
            "js": ["injetar-no-google.js"],
            "run_at": "document_end"
        },
        {
            "matches": ["http://localhost:8080/"],
            "js": ["content-script.js"]
        },
        {
            "matches": ["http://localhost:8080/pesquisa.html"],
            "js": ["content-script.js"]
        }
    ]
}
```

## Carregando a extensão no navegador

- Abra o chrome e acesse o endereço `chrome://extensions`
- Ative o modo desenvolvedor no canto superior direito.
- Depoise clique no botão 'Carregar extensão sem compactação'.
- Pronto! Já pode testar sua extensão localmente.

