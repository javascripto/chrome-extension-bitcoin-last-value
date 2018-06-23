chrome.runtime.onMessage.addListener((pesquisa, sender, sendResponse) => {
  document.querySelector('input[name="q"]').value = pesquisa
  sendResponse('Script injetado no site google.com\nDados recebidos na aba. Pesquisando...')
  document.querySelector('input[name="btnK"]').click()
})