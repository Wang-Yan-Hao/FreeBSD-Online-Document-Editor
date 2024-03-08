import { patchDownload, storeContent } from './scripts/download.js'
import { startDrag, drag, stopDrag } from './scripts/middle_line.js'
import { generateHtml } from './scripts/editor.js'

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
