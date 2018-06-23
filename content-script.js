// Quando o evento 'extensao' foi disparado pela página http://localhost:8080/
// O content script estará escutando o evento personalizado criado na página alvo
// Comunicação entre pagina, content-script e background-scirpt
window.addEventListener('extensao', e => {
  alert(
    'O evento foi disparado pela página e o script injetado detectou!\n'+
    `Mensagem recebida: "${e.detail.msg}"`
  )
  // Comunicacao entre e content script e o background
  console.log('Disparando evento de mensagem para background...Confira no terminal do background')
  chrome.runtime.sendMessage({detail:e.detail.msg}, (response) => {
    console.log('Resposta do background:', response)
  })
})

// Comunicação entre abas - http://localhost:8080/pesquisa.html
window.addEventListener('pesquisa', e => {
  chrome.runtime.sendMessage(e.detail.search, (response) => {
    console.log('Resposta do background:', response)
  })
})
