require('../lib/cross-document-references-macro.js')
require('../lib/git-macro.js')
require('../lib/inter-document-references-macro.js')
require('../lib/man-macro.js')
require('../lib/lib.js')
require('../lib/sectnumoffset-treeprocessor.js')
require('../lib/packages-macro.js')
require('../lib/CrossDocumentReferencesMacro/extension.js')
require('../lib/test/tel-inline-macro.js')

// Ace editor setting
var editor = ace.edit("editor"); // set editor to id="editor" tag in HTML
editor.setOption("wrap", "free");
editor.session.setMode("ace/mode/asciidoc"); // set editor syntax to asciidoc

// Asciidoctor setting
var asciidoctor = Asciidoctor(); // asciidoctor object in asciidcotor.js
// document.write('<script src="./lib/cross-document-references-macro.js"></script>'); //注意,此處須為相對於index.html的絕對路徑


let output_session = document.querySelector("#output"); // output sesstion set to id="output" tag in HTML
// config.json
var configFile = new XMLHttpRequest();
configFile.open("GET", "./config.json", false); // use http.get to get config.json in website
var configText_json ="";
var configText="";

// Check what link the user came from, and send actual .adoc content into ace editor
var before_url = "https://docs.freebsd.org/en/books/faq/#introduction"; // the url user came from
var before_language = before_url.split("org/")[1].split("/")[0];

// Online version
configFile.onreadystatechange = function(){
   if (configFile.readyState === 4) { // 4 mean requeset has finished and has response
      if (configFile.status === 200 || configFile.status == 0) {
         var configText = configFile.responseText; // get text from config.json
         configText_json = JSON.parse(configText); // chagne configText to json object
         
         // github api url to get .adoc file
         github_url = configText_json["freebsd-doc-github-api-url"] + "/documentation/content" +  before_url.split("#")[0].substring(24,) + "_index.adoc"; 
         var request = new XMLHttpRequest(); // use git api
         request.open("GET", github_url, false);
         request.send(null);
         adoc_json = JSON.parse(request.responseText);
         adoc_content_base64_encode = adoc_json["content"]; // the content return use base64 encode
         adoc_content = window.atob(adoc_content_base64_encode); // decode
         editor.session.insert(editor.getCursorPosition(), adoc_content); // insert .adoc content that github api get to left editor session
         window.origin_content = adoc_content; // use global window to store content
         
         // for patch_download.js generate diff file
         window.current_link_1 = "a/documentation/content" + before_url.split("#")[0].substring(24,) + "_index.adoc";
         window.current_link_2 = "b/documentation/content" + before_url.split("#")[0].substring(24,) + "_index.adoc";
      }
   }
}
configFile.send(null);

// set file title
var file_title = document.querySelector(".file-title");
file_title.innerHTML = "doc/documentation/content" +  before_url.split("#")[0].substring(24,) + "_index.adoc";
/* 
asciidoctor translate options
1. "safe": Safe Modes. 
2. "doctype": Document Typ, it should change according the doctype of .adoc file in editor session.
3. "lang": Language, it should change according the language of .adoc file in editor session.
4. "skip-front-matter":  Asciidoctor will recognize the front matter and consume it before parsing 
   the document. Asciidoctor stores the content it removes in the front-matter attribute to make 
   it available for integrations.
5. "isoline": 
6. "pdf-theme": Theme of the font.
7. "allow-uri-read": Allows data to be read from URLs. "include:[]" syntax. Additional options that origin freebsd doc hasn't.
*/
doctype = "book" // default to set the book
return_content = editor.getValue();
var lines = return_content.split("\n"); // to read editor content line by line
var lines_len = lines.length; // total lines number of editor_content
for(var i = 0; i < lines_len; i++){
   if(lines[i].substring(0,8) == ":doctype"){
      doctype = lines[i].split(":")[2]
      break;
   }
   else if(lines[i].substring(0,2) == "=="){ // loop to the first header, because first header mean all include syntax is read
      break;
   }
}

var translate_options = { "safe": "safe", "doctype": doctype, 
                          "attributes": { "lang": "en", "skip-front-matter": "", 
                                          "isoline": "1", "env-beastie": "1", 
                                          "pdf-theme": "default-with-fallback-font", 
                                          "allow-uri-read": "" },
                        };

// change include syntax in editor content to include url not include .adoc file
// ex: include::shared/authors.adoc[] -> translate to include::https://raw.githubusercontent.com/freebsd/freebsd-doc/main/shared/authors.adoc[]
function handle_include_syntax(){
   return_content = editor_content;
   var lines = return_content.split("\n"); // to read editor content line by line
   var lines_len = lines.length; // total lines number of editor_content
   for(var i = 0; i < lines_len; i++){
      if(lines[i].substring(0,9) == "include::" && lines[i].substring(9,13) != "http"){
         a = lines[i]; // origin one line in editor content
         b = a.split("::")[1];
         b = b.replaceAll("{{% lang %}}", before_language);
         b = b.replaceAll("../", "");
         b = "include::" + configText_json["freebsd-doc-github-raw-url"] + b;
         return_content = return_content.replaceAll(a, b);
      }
      else if(lines[i].substring(0,2) == "=="){ // loop to the first header, because first header mean all include syntax is read
         break;
      }
   }
   return return_content;
}

// generate html
function generate_html(){
   let editor_content = editor.getValue();  // editor content
   window.editor_content = editor_content; // use global window object to store current content
   editor_content = handle_include_syntax();
   let html_content = asciidoctor.convert(editor_content, translate_options); // conver editor content to HTML
   html_content = '<base target="_blank"/>\n' + html_content; // let any link in iframe open in a new window
   output_session.contentDocument.body.innerHTML = 
   '<link rel="stylesheet" href="styles/website_css/fixed_large.css">' +
   '<link rel="stylesheet" href="styles/website_css/fixed.css">' +
   '<link rel="stylesheet" href="styles/website_css/global.css">' +
   '<link rel="stylesheet" href="styles/website_css/iefixes.css">' +
   '<link rel="stylesheet" href="styles/website_css/layout.css">' +
   '<link rel="stylesheet" href="styles/website_css/navigation.css">' +
   '<link rel="stylesheet" href="styles/website_css/table.css">' +
   '<link rel="stylesheet" href="styles/website_css/text.css">' +
   '<link rel="stylesheet" href="styles/website_css/docbook.css">' +
   '<link rel="stylesheet" href="styles/documentation_css/main.min.css">' +
   '<link rel="stylesheet" href="styles/documentation_css/font-awesome-min.css">' 
   + html_content; // html render to output window

   const html = asciidoctor.convert('rwar extref:https://docs.freebsd.org/en/books/faq/[FreeBSD website]. It ', { 'to_file': false }) 
   console.log(html)
}

generate_html();
