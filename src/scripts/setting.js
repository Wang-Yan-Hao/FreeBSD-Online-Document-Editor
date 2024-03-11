import { generateHtml } from './editor.js'
const modal = document.getElementById('setting-modal')
const editor = ace.edit('editor') /* global ace */

export function openSettingModal(event) {
	event.preventDefault()

	modal.style.display = 'block'

	// Close the modal when clicking outside of it
	window.onclick = function (event) {
		if (event.target === modal) {
			modal.style.display = 'none'
		}
	}
}

export function closeSetting() {
	modal.style.display = 'none'
}

export function themeSelect(event) {
	const themeSelect = document.getElementById('theme-select')
	const selectedValue = themeSelect.value

	editor.setTheme('ace/theme/' + selectedValue)
}

export function editorFontSizeSelect(event) {
	const themeSelect = document.getElementById('editor-font-size-select')
	const selectedValue = themeSelect.value

	editor.setOptions({ fontSize: selectedValue })
}

export function outputFontSizeSelect(event) {
	const themeSelect = document.getElementById('output-font-size-select')
	const selectedValue = themeSelect.value

	window.outputFontSize = 'html {font-size: calc(' + selectedValue + ');}'

	generateHtml()
}

export function fontSizeSelect(event) {
	const themeSelect = document.getElementById('editor-font-size-select')
	const selectedValue = themeSelect.value

	editor.setOptions({ fontSize: selectedValue })
}

export function editorInputSelect(event) {
	const themeSelect = document.getElementById('editor-input-select')
	const selectedEditorInput = themeSelect.value

	editor.setKeyboardHandler('ace/keyboard/' + selectedEditorInput)
}
