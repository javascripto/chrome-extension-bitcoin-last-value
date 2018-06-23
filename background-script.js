console.log('Olá, sou o background script e fico rodando sempre a escutar eventos de mensagens.')
var mensagensRecebidas = 0

// Para ver a saida no terminal acesse: chrome://extensions
// Procure sua extensão e clique em 'inspecionar vizualizações página de plano de fundo'
// para abrir o terminal de background da extensão. Depois clique no icone da 
// extensão ao lado da barra de navegação para disparar o evento de clique do listener onCLicked

// Ao trabalhar com este evento de clique no icone da extensão,
// você NÃO deve trabalhar com popups definidos no manifest.json.
// Apague a propriedade "default_popup" contido na propriedade "browser_action"
// para testar este evento que roda nos script de background.
// Apagar => "default_popup": "popup.html",
chrome.browserAction.onClicked.addListener((tab) => {
  console.log('Você clicou no icone da extensão [mensagem no console background]')
  // Executando um script na aba onde o icone foi clicado:
  // Screenshot de impressão
  chrome.tabs.update(tab.id, { url: "javascript:window.print()"})
})


// Comunicação entre pagina, content-script e background script
chrome.runtime.onMessage.addListener((data, sender, sendResponse) => {
  console.log(++mensagensRecebidas);

  if (sender.tab.url == 'http://localhost:8080/') {
    console.log('Mensagem do content script recebida no background.')
    console.log('O que foi enviado:', data)
    console.log('Quem enviou a mensagem:', sender)
    console.log('Enviando resposta...Confira no terminal da página')
    sendResponse(data)

  // Comunicação entre abas rodando de [ http://localhost:8080/pesquisa.html ]
  } else if (sender.tab.url == 'http://localhost:8080/pesquisa.html') {
    // Criando nova aba no site do google, selecionando a aba, e definindo callback
    chrome.tabs.create({url: 'https://www.google.com/', selected: true}, (tab) => {
      // Injetando e executando script na tab que foi criada e selecionada
      chrome.tabs.executeScript(tab.id, {file: 'injetar-para-pesquisa.js', runAt: 'document_end'}, () => {
        // Enviando dados para a outra aba com sendMessage especificando id da aba
        chrome.tabs.sendMessage(tab.id, data, (resposta) => {
          console.log(resposta)
          sendResponse(resposta)
        })
      })
    })
  }
})


