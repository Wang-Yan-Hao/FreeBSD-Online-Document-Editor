// Middle line dragging
let isDragging = false
let containerRect, dragLine, leftDiv, rightDiv

export function startDrag(event) {
	isDragging = true
	containerRect = document
		.querySelector('.editor-container')
		.getBoundingClientRect()
	dragLine = document.getElementById('dragLine')
	leftDiv = document.getElementById('editor-container-left')
	rightDiv = document.getElementById('editor-container-right')

	// Disable pointer events on #output to allow dragging over it
	const outputElement = document.getElementById('output')
	outputElement.style.pointerEvents = 'none'
}

export function drag(event) {
	if (isDragging) {
		const dragX = event.clientX - containerRect.left

		if (dragX >= 0 && dragX <= containerRect.width) {
			leftDiv.style.width = `${(dragX / containerRect.width) * 100}%`
			rightDiv.style.width = `${100 - (dragX / containerRect.width) * 100}%`
			dragLine.style.left = `${dragX - dragLine.clientWidth / 2}px`
		}
	}
}

/* global ace */
export function stopDrag() {
	isDragging = false
	const editor = ace.edit('editor')
	editor.resize()

	// Re-enable pointer events on #output after dragging
	const outputElement = document.getElementById('output')
	outputElement.style.pointerEvents = ''
}
