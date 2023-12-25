import { patchDownload, storeContent } from './scripts/patch_download.js'
import { startDrag, drag, stopDrag } from './scripts/middle_line.js'
import { generateHtml } from './scripts/editor.js'
window.patchDownload = patchDownload
window.storeContent = storeContent
window.startDrag = startDrag
window.drag = drag
document.addEventListener('mousemove', drag)
window.stopDrag = stopDrag
document.addEventListener('mouseup', stopDrag)
window.generateHtml = generateHtml

// Display confirmation message when closing the page
window.addEventListener('beforeunload', function (e) {
	const confirmationMessage =
		'Your content may not be stored. Are you sure you want to leave this page?'
	// Some browsers require the confirmation message to be set
	e.returnValue = confirmationMessage
	return confirmationMessage
})
