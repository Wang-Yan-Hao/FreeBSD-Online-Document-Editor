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
   html_content = '<base target="_blank"/>\n' + html_content // let any link in iframe open in a new window
   output.contentDocument.body.innerHTML = html_content; // html render to output window
}
document.querySelector("#editor").addEventListener("keyup", generate_html)

// 2. Online version
// Check what link the user came from, and send some value to ace editor
var before_url = "https://docs.freebsd.org/en/books/faq/#introduction" // the url user come
var configFile = new XMLHttpRequest();
configFile.open("GET", "./config.json", false); // get config.json

configFile.onreadystatechange = function () {
   if (configFile.readyState === 4) {
      if (configFile.status === 200 || configFile.status == 0) {
         var configText = configFile.responseText; // get text from config.json
         configText_json = JSON.parse(configText) // chagne config.json to json object
         github_url = configText_json['freebsd-doc-github-api-url'] + '/documentation/content' +  before_url.split('#')[0].substring(24,) + '_index.adoc' // github api url to get .adoc file
         
         console.log(github_url)
         var request = new XMLHttpRequest(); // Use git
         request.open("GET", github_url, false);
         request.send(null);
         adoc_json = JSON.parse(request.responseText)
         adoc_content_base64_encode = adoc_json['content'] // the content return use base64 encode
         adoc_content = window.atob(adoc_content_base64_encode) // decode

         editor.session.insert(editor.getCursorPosition(), adoc_content) // insert .adoc content to online editor
         generate_html()
      }
   }
}

configFile.send(null);