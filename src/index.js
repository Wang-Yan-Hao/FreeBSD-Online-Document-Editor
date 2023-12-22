// Source:
// https://stackoverflow.com/questions/30106476/using-javascripts-atob-to-decode-base64-doesnt-properly-decode-utf-8-strings
function b64DecodeUnicode (str) {
  // Going backwards: from bytestream, to percent-encoding, to original string.
  return decodeURIComponent(
    atob(str)
      .split('')
      .map(function (c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)
      })
      .join(''))
}

/* global ace */
// Ace editor setting
var editor = ace.edit('editor') // Set editor to id="editor"
editor.setOption(
  'wrap', 'free') // Long lines will automatically wrap to the next line
// when they reach the edge of the editor, without
// inserting line breaks or truncating the content.
editor.session.setMode('ace/mode/asciidoc') // Set editor syntax to asciidoc

/* global Asciidoctor */
// Asciidoctor object
const asciidoctor = Asciidoctor() // Asciidoctor object in asciidcotor.js
const outputSession =
    document.querySelector('#output') // Output session set to id="output"
const fileTitle = document.querySelector('.file-title')

// Config file
const configFile = new XMLHttpRequest()
let configTextJson = ''
let configText = ''

// Check what link where the user came from, and send actual adoc content into
// ace editor
var beforeUrl = 'https://docs.freebsd.org/en/books/faq/' // Default url
var beforeLanguage =
    beforeUrl.split('org/')[1].split('/')[0] // The language in beforeUrl

// Config file
configFile.onreadystatechange = function githubApiGetAdoc () {
  if (configFile.readyState === 4) { // 4 means request has finished and has a response
    if (configFile.status === 200 || configFile.status === 0) {
      configText = configFile.responseText // Get text from config.json
      configTextJson =
          JSON.parse(configText) // Change configText to a JSON object
      githubApiGet(configTextJson) // Pass the JSON object to the
      // githubApiGet function
    }
  }
}

configFile.open('GET', 'config.json', true)
configFile.send()

// Get adoc file from freebsd-doc github
function githubApiGet () {
  // Github api url to get .adoc file
  const githubUrl = configTextJson.doc_github_api_url +
      '/documentation/content' +
      beforeUrl.split('#')[0].substring(
        24
      ) +
      '_index.adoc'

  const request = new XMLHttpRequest()
  request.onreadystatechange = function () {
    if (request.readyState ===
        4) { // 4 means request has finished and has a response
      if (request.status === 200) {
        // Success - handle the response
        const adocJson = JSON.parse(request.responseText)
        const adocContentBase64Encode =
            adocJson.content // The content returned using base64 encoding
        const adocContent = b64DecodeUnicode(
          adocContentBase64Encode) // Decode the base64 content
        editor.setValue('') // Clean content
        editor.session.insert(
          editor.getCursorPosition(),
          adocContent) // Insert .adoc content that GitHub API returned
        // into the left editor session
        window.origin_content =
            adocContent // Use global window to store content
        fileTitle.innerHTML =
            beforeUrl // Set adoc file title in the left section

        // For patch_download.js to generate the diff file
        window.current_link_1 = 'a/documentation/content' +
            beforeUrl.split('#')[0].substring(
              24
            ) +
            '_index.adoc'
        window.current_link_2 = 'b/documentation/content' +
            beforeUrl.split('#')[0].substring(
              24
            ) +
            '_index.adoc'
      } else {
        // Error - handle the error condition
        alert(
          'Error occurred. Status: ' + request.status +
            '\nYou entered the wrong URL.')
      }
    }
  }

  request.open(
    'GET', githubUrl,
    true) // Set the third parameter to true for asynchronous
  request.send()
}

/*
   When you run on `make html` in documentation/, you will see below log. We can
   see what attribute in content INFO 2023/06/20 18:28:49 Rendering
   articles/mailing-list-faq/_index.adoc  using asciidoctor args [ -r man-macro
   -r inter-document-references-macro
   -r cross-document-references-macro
   -r sectnumoffset-treeprocessor
   -r packages-macro
   -r git-macro
   -a isonline=0
   -a skip-front-matter=1
   -a sectanchors=after
   -a env-beastie=1
   --no-header-footer -] ...
   Reference:
   https://docs.asciidoctor.org/asciidoctor.js/latest/processor/convert-options/
   and
   https://docs.asciidoctor.org/asciidoc/latest/attributes/document-attributes-ref/
*/
let doctype = 'book' // Default doctype
const translateOptions = {
  safe: 'safe',
  doctype,
  attributes: {
    isonline: '0',
    'skip-front-matter': '1',
    sectanchors: 'after',
    'env-beastie': '1',
    noheader: '',
    nofooter: '',
    'allow-uri-read': ''
  }
}
// {"safe": "safe","allow-uri-read": ""} is set by this online editor,
// additionally because we need allows data to be read from URLs.

// Get 'doctype' attribute from file content
function asciidoctorSet () {
  const returnContent = editor.getValue()
  const lines = returnContent.split('\n') // Read editor content line by line
  const linesLen = lines.length // Total lines number of editorContent
  for (let i = 0; i < linesLen; i++) {
    if (lines[i].substring(0, 8) === ':doctype') {
      doctype = lines[i].split(':')[2]
      return
    } else if (lines[i].substring(0, 2) === '==') { // Loop to the first header,
      // because first header mean
      // all include syntax is
      // read
      break
    }
  }
  translateOptions.doctype = doctype
}

// Change include syntax in editor content to include url not include .adoc file
// Ex: include::shared/authors.adoc[] -> translate to
// include::https://raw.githubusercontent.com/freebsd/freebsd-doc/main/shared/authors.adoc[]
function handleIncludeSyntax () {
  let returnContent = window.editorContent
  const lines = returnContent.split('\n') // Read editor content line by line
  const linesLen = lines.length // Total lines number of editorContent
  for (let i = 0; i < linesLen; i++) {
    if (lines[i].substring(0, 9) === 'include::' &&
        lines[i].substring(9, 13) !== 'http') {
      const a = lines[i] // Origin one line in editor content
      let b = a.split('::')[1]
      b = b.replaceAll('{{% lang %}}', beforeLanguage)
      b = b.replaceAll('../', '')
      b = 'include::' + configTextJson.doc_github_raw_url + b
      returnContent = returnContent.replaceAll(a, b)
    } else if (lines[i].substring(0, 2) === '==') { // Loop to the first header,
      // because first header mean
      // all include syntax is
      // read
      break
    }
  }
  return returnContent
}

// Change all the a tag with href "../" to
function crossrefHandler (htmlContent) {
  // Create a temporary element to parse the HTML
  const tempElement = document.createElement('div')
  tempElement.innerHTML = htmlContent

  // Find all <a> tags with href starting with "../"
  const aTags = tempElement.querySelectorAll('a[href^=\'../\']')

  const fileTitle = document.querySelector('.file-title').innerHTML
  var baseUrl = fileTitle.substring(0, fileTitle.lastIndexOf('/'))
  baseUrl = baseUrl.substring(0, baseUrl.lastIndexOf('/'))

  // Loop through each <a> tag and replace the href attribute
  for (let i = 0; i < aTags.length; i++) {
    const href = aTags[i].getAttribute('href')
    if (href.startsWith('../../')) {
      var matches = href.match(/\.\.\//g)
      const generatedString =
          '../'.repeat(matches.length) // Replace all ../ str
      var newHref = href.replace(generatedString, ' https://docs.freebsd.org/')
      aTags[i].setAttribute('href', newHref)
    } else if (href.startsWith('../')) {
      newHref = href.replace('../', baseUrl + '/')
      aTags[i].setAttribute('href', newHref)
    }
  }
  // Get the modified HTML content
  const modifiedHtmlContent = tempElement.innerHTML
  return modifiedHtmlContent
}

// Generate html
window.generateHtml =
    function generateHtml () {
      asciidoctorSet()
      var editorContent = editor.getValue() // Editor content
      window.editorContent =
      editorContent // Use global window object to store current content
      editorContent = handleIncludeSyntax()
      const asc = asciidoctor.load(editorContent, translateOptions)
      let htmlContent = asc.convert() // Conver editor content to HTML
      const title = asc.getTitle()
      htmlContent = crossrefHandler(htmlContent)
      htmlContent = '<h1>' + title + '</h1>' +
      '<base target="_blank"/>\n' +
      htmlContent // Let any link in iframe open in a new window

      outputSession.contentDocument.body.innerHTML =
      '<link rel="stylesheet" href="styles/doc_css/documentation/font-awesome-min.css">' +
      '<link rel="stylesheet" href="styles/doc_css/website/fixed_large.css">' +
      '<link rel="stylesheet" href="styles/doc_css/website/fixed.css">' +
      '<link rel="stylesheet" href="styles/doc_css/website/global.css">' +
      '<link rel="stylesheet" href="styles/doc_css/website/iefixes.css">' +
      '<link rel="stylesheet" href="styles/doc_css/website/layout.css">' +
      '<link rel="stylesheet" href="styles/doc_css/website/navigation.css">' +
      '<link rel="stylesheet" href="styles/doc_css/website/table.css">' +
      '<link rel="stylesheet" href="styles/doc_css/website/text.css">' +
      htmlContent // HTML render to output window
    }

// Change file button function
const button = document.querySelector('.change_adoc')
function popup3 (e) {
  const guest = window.prompt(
    'Change the left adoc file with freebsd document url', beforeUrl)
  if (guest == null || '') {
    // The block is empty because nothing needs to be done in this case
  } else {
    beforeUrl = guest
    githubApiGet()
    window.generateHtml()
  }
}
button.addEventListener('click', popup3)

window.generateHtml() // Generate HTML while first enter page
