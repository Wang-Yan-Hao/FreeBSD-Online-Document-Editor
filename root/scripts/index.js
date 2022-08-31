// Source: https://stackoverflow.com/questions/30106476/using-javascripts-atob-to-decode-base64-doesnt-properly-decode-utf-8-strings
function b64DecodeUnicode(str) {
   // Going backwards: from bytestream, to percent-encoding, to original string.
   return decodeURIComponent(
      atob(str)
         .split('')
         .map(function (c) {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
         })
         .join('')
   );
}

// Ace editor setting
var editor = ace.edit("editor"); // Set editor to id="editor"
editor.setOption("wrap", "free"); // Long lines will automatically wrap to the next line when they reach the edge of the editor, without inserting line breaks or truncating the content.
editor.session.setMode("ace/mode/asciidoc"); // Set editor syntax to asciidoc

// Asciidoctor object
var asciidoctor = Asciidoctor(); // Asciidoctor object in asciidcotor.js
var output_session = document.querySelector("#output"); // Output session set to id="output"
var file_title = document.querySelector(".file-title");

// Check what link where the user came from, and send actual adoc content into ace editor
var before_url = "https://docs.freebsd.org/en/books/faq/"; // Default url
var before_language = before_url.split("org/")[1].split("/")[0]; // The language in before_url

// Config file
var configFile = new XMLHttpRequest();
var configText_json ="";
var configText="";

// Check what link where the user came from, and send actual adoc content into ace editor
var before_url = "https://docs.freebsd.org/en/books/faq/"; // Default url
var before_language = before_url.split("org/")[1].split("/")[0]; // The language in before_url

// Config file
configFile.onreadystatechange = function github_api_get_adoc() {
    if (configFile.readyState === 4) { // 4 means request has finished and has a response
        if (configFile.status === 200 || configFile.status == 0) {
            configText = configFile.responseText; // Get text from config.json
            configText_json = JSON.parse(configText); // Change configText to a JSON object
            github_api_get(configText_json); // Pass the JSON object to the github_api_get function
        }
    }
};

configFile.open("GET", "./config.json", true); // Set the third parameter to true for asynchronous
configFile.send();

// Get adoc file from freebsd-doc github
function github_api_get(){
   // Github api url to get .adoc file
   github_url = configText_json["doc_github_api_url"] + "/documentation/content" + before_url.split("#")[0].substring(24,) + "_index.adoc"; 

   var request = new XMLHttpRequest();
   request.onreadystatechange = function() {
       if (request.readyState === 4) { // 4 means request has finished and has a response
           if (request.status === 200) {
               // Success - handle the response
               var adoc_json = JSON.parse(request.responseText);
               var adoc_content_base64_encode = adoc_json["content"]; // The content returned using base64 encoding
               var adoc_content = b64DecodeUnicode(adoc_content_base64_encode); // Decode the base64 content
               editor.setValue(""); // Clean content
               editor.session.insert(editor.getCursorPosition(), adoc_content); // Insert .adoc content that GitHub API returned into the left editor session
               window.origin_content = adoc_content; // Use global window to store content
               file_title.innerHTML = before_url; // Set adoc file title in the left section
   
               // For patch_download.js to generate the diff file
               window.current_link_1 = "a/documentation/content" + before_url.split("#")[0].substring(24,) + "_index.adoc";
               window.current_link_2 = "b/documentation/content" + before_url.split("#")[0].substring(24,) + "_index.adoc";
           } 
           else {
               // Error - handle the error condition
               alert("Error occurred. Status: " + request.status + "\nYou entered the wrong URL.");
           }
       }
   };
   
   request.open("GET", github_url, true); // Set the third parameter to true for asynchronous
   request.send();
}

/*
   When you run on `make html` in documentation/, you will see below log. We can see what attribute in content
   INFO 2023/06/20 18:28:49 Rendering articles/mailing-list-faq/_index.adoc  using asciidoctor args [
   -r man-macro 
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
   Reference: https://docs.asciidoctor.org/asciidoctor.js/latest/processor/convert-options/ and https://docs.asciidoctor.org/asciidoc/latest/attributes/document-attributes-ref/
*/
var doctype = "book" // Default doctype
var translate_options = {  "safe": "safe", "doctype": doctype,
                           "attributes":  {   
                                             "isonline": "0",
                                             "skip-front-matter": "1",
                                             "sectanchors": "after",
                                             "env-beastie": "1",
                                             "noheader": "",
                                             "nofooter": "",
                                             "allow-uri-read": "",
                                          },
                           };
// {"safe": "safe","allow-uri-read": ""} is set by this online editor, additionally because we need allows data to be read from URLs.

// Get 'doctype' attribute from file content
function asciidoctor_set(){
   return_content = editor.getValue();
   var lines = return_content.split("\n"); // Read editor content line by line
   var lines_len = lines.length; // Total lines number of editor_content
   for(var i = 0; i < lines_len; i++){
      if(lines[i].substring(0,8) == ":doctype"){
         doctype = lines[i].split(":")[2]
         break;
      }
      else if(lines[i].substring(0,2) == "=="){ // Loop to the first header, because first header mean all include syntax is read
         break;
      }
   }
   translate_options["doctype"] = doctype 
}

// Change include syntax in editor content to include url not include .adoc file
// Ex: include::shared/authors.adoc[] -> translate to include::https://raw.githubusercontent.com/freebsd/freebsd-doc/main/shared/authors.adoc[]
function handle_include_syntax() {
   return_content = editor_content;
   var lines = return_content.split("\n"); // Read editor content line by line
   var lines_len = lines.length; // Total lines number of editor_content
   for(var i = 0; i < lines_len; i++) {
      if(lines[i].substring(0,9) == "include::" && lines[i].substring(9,13) != "http"){
         a = lines[i]; // Origin one line in editor content
         b = a.split("::")[1];
         b = b.replaceAll("{{% lang %}}", before_language);
         b = b.replaceAll("../", "");
         b = "include::" + configText_json["doc_github_raw_url"] + b;
         return_content = return_content.replaceAll(a, b);
      }
      else if(lines[i].substring(0,2) == "==") { // Loop to the first header, because first header mean all include syntax is read
         break;
      }
   }
   return return_content;
}

// Change all the a tag with href "../" to
function crossref_handler(htmlContent) {
   // Create a temporary element to parse the HTML
   var tempElement = document.createElement("div");
   tempElement.innerHTML = htmlContent;

   // Find all <a> tags with href starting with "../"
   var aTags = tempElement.querySelectorAll("a[href^='../']");
   
   var file_title = document.querySelector(".file-title").innerHTML;
   baseUrl = file_title.substring(0, file_title.lastIndexOf("/"));
   baseUrl = baseUrl.substring(0, baseUrl.lastIndexOf("/"));

   // Loop through each <a> tag and replace the href attribute
   for (var i = 0; i < aTags.length; i++) {
      var href = aTags[i].getAttribute("href");
      if (href.startsWith('../../')) {
         matches = href.match(/\.\.\//g);
         var generatedString = '../'.repeat(matches.length); // Replace all ../ str
         var newHref = href.replace(generatedString, " https://docs.freebsd.org/");
         aTags[i].setAttribute("href", newHref);
      } 
      else if (href.startsWith('../')) {
         var newHref = href.replace("../", baseUrl+'\/');
         aTags[i].setAttribute("href", newHref);
      }
   }
   // Get the modified HTML content
   var modifiedHtmlContent = tempElement.innerHTML
   return modifiedHtmlContent
}

// Generate html
function generate_html() {
   asciidoctor_set()
   let editor_content = editor.getValue();  // Editor content
   window.editor_content = editor_content; // Use global window object to store current content
   editor_content = handle_include_syntax();
   let asc = asciidoctor.load(editor_content, translate_options);
   let html_content = asc.convert(); // Conver editor content to HTML
   const title = asc.getTitle();
   html_content = crossref_handler(html_content);
   html_content = '<h1>' + title + '</h1>' +  '<base target="_blank"/>\n' + html_content; // Let any link in iframe open in a new window
      
   output_session.contentDocument.body.innerHTML = 
      '<link rel="stylesheet" href="styles/doc_css/documentation/themes/beastie/static/css/font-awesome-min.css">' +
      '<link rel="stylesheet" href="styles/doc_css/website/themes/beastie/static/css/fixed_large.css">' +
      '<link rel="stylesheet" href="styles/doc_css/website/themes/beastie/static/css/fixed.css">' +
      '<link rel="stylesheet" href="styles/doc_css/website/themes/beastie/static/css/global.css">' +
      '<link rel="stylesheet" href="styles/doc_css/website/themes/beastie/static/css/iefixes.css">' +
      '<link rel="stylesheet" href="styles/doc_css/website/themes/beastie/static/css/layout.css">' +
      '<link rel="stylesheet" href="styles/doc_css/website/themes/beastie/static/css/navigation.css">' +
      '<link rel="stylesheet" href="styles/doc_css/website/themes/beastie/static/css/table.css">' +
      '<link rel="stylesheet" href="styles/doc_css/website/themes/beastie/static/css/text.css">' +
      // '<link rel="stylesheet" href="styles/freebsd_doc_css/website_css/fixed_large.css">' +
      // '<link rel="stylesheet" href="styles/freebsd_doc_css/website_css/fixed.css">' +
      // '<link rel="stylesheet" href="styles/freebsd_doc_css/website_css/global.css">' +
      // '<link rel="stylesheet" href="styles/freebsd_doc_css/website_css/iefixes.css">' +
      // '<link rel="stylesheet" href="styles/freebsd_doc_css/website_css/layout.css">' +
      // '<link rel="stylesheet" href="styles/freebsd_doc_css/website_css/navigation.css">' +
      // '<link rel="stylesheet" href="styles/freebsd_doc_css/website_css/table.css">' +
      // '<link rel="stylesheet" href="styles/freebsd_doc_css/website_css/text.css">' +
      // '<link rel="stylesheet" href="styles/freebsd_doc_css/website_css/docbook.css">' +
      // '<link rel="stylesheet" href="styles/freebsd_doc_css/documentation_css/main.min.css">' +
      // '<link rel="stylesheet" href="styles/freebsd_doc_css/documentation_css/font-awesome-min.css">' +
      html_content; // HTML render to output window
}

// Change file button function
var button = document.querySelector('.change_adoc');
function popup3(e) {
   var guest = window.prompt('Change the left adoc file with freebsd document url', before_url);
   if (guest == null || "") {
   } 
   else {
      before_url = guest
      github_api_get()
      generate_html()
   }
}
button.addEventListener('click', popup3);

generate_html(); // Generate HTML while first enter page

