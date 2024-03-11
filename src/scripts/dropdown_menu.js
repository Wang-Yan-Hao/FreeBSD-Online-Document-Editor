export function helpToogleClose() {
	const dropdown = document.getElementById('help-dropdown')
	const dropdownContent = document.getElementById('help-dropdown-content')

	if (
		!dropdownContent.contains(event.target) &&
		!dropdown.contains(event.target)
	) {
		dropdown.style.backgroundColor = ''
		dropdownContent.style.display = 'none'
		document.removeEventListener('click', helpToogleClose)
	}
}

export function helpToggleDropdown() {
	const dropdown = document.getElementById('help-dropdown')
	const dropdownContent = document.getElementById('help-dropdown-content')

	if (dropdownContent.style.display === 'block') {
		dropdown.style.backgroundColor = ''
		dropdownContent.style.display = 'none'
	} else {
		dropdown.style.backgroundColor = 'black'
		dropdownContent.style.display = 'block'
		document.addEventListener('click', helpToogleClose)
	}
}
