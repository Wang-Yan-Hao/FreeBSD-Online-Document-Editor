function download(filename, text) {
   var element = document.createElement("a");
   element.setAttribute("href", "data:text/plain;charset=utf-8," + encodeURIComponent(text));
   element.setAttribute("download", filename);
   element.style.display = "none";
   document.body.appendChild(element);
   element.click();
   document.body.removeChild(element);
}

function patch_download() {
   var diff = Diff.createTwoFilesPatch(window.current_link_1, window.current_link_2, window.origin_content, window.editor_content ); // use jsdiff create diff file string
   download("diff.patch", diff);
}
