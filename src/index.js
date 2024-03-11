import { patchDownload, storeContent } from './scripts/download.js'
import { startDrag, drag, stopDrag } from './scripts/middle_line.js'
import { generateHtml } from './scripts/editor.js'
import { helpToggleDropdown } from './scripts/dropdown_menu.js'
import {
	openSettingModal,
	closeSetting,
	themeSelect,
	editorFontSizeSelect,
	outputFontSizeSelect,
	editorInputSelect,
} from './scripts/setting.js'

// Add attribute to html
const dragLine = document.getElementById('dragLine')
dragLine.addEventListener('mousedown', startDrag)
document.addEventListener('mousemove', drag)
document.addEventListener('mouseup', stopDrag)

const generateHtmlTag = document.getElementById('generate-html')
generateHtmlTag.addEventListener('click', generateHtml)

const storeContentTag = document.getElementById('save-content')
storeContentTag.addEventListener('click', storeContent)

const patchDownloadTag = document.getElementById('download-patch')
patchDownloadTag.addEventListener('click', patchDownload)

const settingTag = document.getElementById('setting')
settingTag.addEventListener('click', openSettingModal)

const cloaseSettingTag = document.getElementById('close-setting')
cloaseSettingTag.addEventListener('click', closeSetting)

const themeSelectTag = document.getElementById('theme-select')
themeSelectTag.addEventListener('change', themeSelect)

const editorFontSizeSelectTag = document.getElementById(
	'editor-font-size-select'
)
editorFontSizeSelectTag.addEventListener('change', editorFontSizeSelect)

const outputFontSizeSelectTag = document.getElementById(
	'output-font-size-select'
)
outputFontSizeSelectTag.addEventListener('change', outputFontSizeSelect)

const editorInputSelectTag = document.getElementById('editor-input-select')
editorInputSelectTag.addEventListener('change', editorInputSelect)

const helpDropdownTag = document.getElementById('help-dropdown')
helpDropdownTag.addEventListener('click', helpToggleDropdown)

const freebsdBugzillaTag = document.getElementById('freebsd-bugzilla')
freebsdBugzillaTag.addEventListener('click', function () {
	window.open('https://bugs.freebsd.org/bugzilla/', '_blank')
})

// Display confirmation message when closing the page
window.addEventListener('beforeunload', function (e) {
	const confirmationMessage =
		'Your content may not be stored. Are you sure you want to leave this page?'
	// Some browsers require the confirmation message to be set
	e.returnValue = confirmationMessage
	return confirmationMessage
})
