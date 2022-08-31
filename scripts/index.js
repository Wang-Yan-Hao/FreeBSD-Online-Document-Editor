
// ace setting
var editor = ace.edit("editor"); // set ace editor to id=editor
editor.session.setMode("ace/mode/asciidoc")

// Asciidoctor setting
let output = document.querySelector("#output");
var asciidoctor = Asciidoctor() // Asciidoctor 
var options = {'doctype': 'book', 'attributes': { 'lang': 'en', 'skip-front-matter': '', 'isoline': '1', 'env-beastie': '1', 'pdf-theme': 'default-with-fallback-font'}} // Asciidoctor convert options
function generate_html(){
   let editor_content = editor.getValue();  // editor content
   let html_content = asciidoctor.convert(editor_content, options); // conver content to html
   output.contentDocument.body.innerHTML = html_content; // html render to output window
}
document.querySelector("#editor").addEventListener("keyup", generate_html)