// ace setting
var editor = ace.edit("editor"); // set ace editor to id=editor
editor.session.setMode("ace/mode/asciidoc")

// Asciidoctor setting
let output = document.querySelector("#output");
var asciidoctor = Asciidoctor() // Asciidoctor 
var options = { 'safe': 'unsafe', 'doctype': 'book', 'attributes': { 'lang': 'en', 'skip-front-matter': '', 'isoline': '1', 'env-beastie': '1', 'pdf-theme': 'default-with-fallback-font' } } // Asciidoctor convert options
function generate_html() {
   let editor_content = editor.getValue();  // editor content
   let html_content = asciidoctor.convert(editor_content, options); // conver content to html
   output.contentDocument.body.innerHTML = html_content; // html render to output window
}
document.querySelector("#editor").addEventListener("keyup", generate_html)

// Check what link the user came from, and send some value to ace editor
var before_url = "https://docs.freebsd.org/en/books/faq/#introduction" // the url user come
before_url = '../freebsd-doc-main/documentation/content' + before_url.split('#')[0].substring(24,) + '_index.adoc' // process url

file = before_url
var rawFile = new XMLHttpRequest();
rawFile.open("GET", file, false);
rawFile.onreadystatechange = function () {
   if (rawFile.readyState === 4) {
      if (rawFile.status === 200 || rawFile.status == 0) {
         var allText = rawFile.responseText;  // the .adoc text according the url you came from
         console.log("allText")
         console.log(allText)
         editor.session.insert(editor.getCursorPosition(), allText)
         generate_html()
      }
   }
}

rawFile.send(null);