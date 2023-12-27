function createDownloadLink(text, filename) {
	const link = document.createElement('a')
	link.href = `data:text/plain;charset=utf-8,${encodeURIComponent(text)}`
	link.download = filename
	return link
}

function download(filename, text) {
	const link = createDownloadLink(text, filename)
	link.style.display = 'none'
	document.body.appendChild(link)
	link.click()
	document.body.removeChild(link)
}

/* global Diff */
export function patchDownload() {
	const diff = Diff.createTwoFilesPatch(
		window.current_link_1,
		window.current_link_2,
		window.origin_content,
		window.editorContent
	)
	download('diff.patch', diff)
}

/* global ace */
export function storeContent() {
	const editor = ace.edit('editor')
	window.editorContent = editor.getValue()
	download('_index.adoc', window.editorContent)
}
