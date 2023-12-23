function download(filename, text) {
	const element = document.createElement('a')
	element.setAttribute(
		'href',
		'data:text/plain;charset=utf-8,' + encodeURIComponent(text)
	)
	element.setAttribute('download', filename)
	element.style.display = 'none'
	document.body.appendChild(element)
	element.click()
	document.body.removeChild(element)
}

/* global Diff */
/* eslint-disable no-unused-vars */
function patchDownload() {
	const diff = Diff.createTwoFilesPatch(
		window.current_link_1,
		window.current_link_2,
		window.origin_content,
		window.editorContent
	) // use jsdiff create diff file string
	download('diff.patch', diff)
}
window.patchDownload = patchDownload

/* global ace */
/* eslint-disable no-unused-vars */
function storeContent() {
	const editor = ace.edit('editor') // Set editor to id="editor" tag in html
	window.editorContent = editor.getValue()
	download('_index.adoc', window.editorContent)
}
window.storeContent = storeContent
