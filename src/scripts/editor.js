import asciidoctor from 'asciidoctor'
import { b64DecodeUnicode } from './utility.js'

// Global constants
const editor = ace.edit('editor') /* global ace */
editor.setOption('wrap', 'free') // Long lines will automatically wrap to the next line
editor.setOption('showPrintMargin', false)
editor.session.setMode('ace/mode/asciidoc')

const Asciidoctor = asciidoctor()
const outputSession = document.querySelector('#output')
const fileTitle = document.querySelector('#file-title')

// Check where the user came from, and send the adoc content into ace editor
let beforeUrl = 'https://docs.freebsd.org/en/books/faq/' // Default
const beforeLanguage = beforeUrl.split('org/')[1].split('/')[0] // Extract language from the URL

// Configuration file handling
let configTextJson = ''

fetch('config.json')
	.then((response) => response.json())
	.then((data) => {
		configTextJson = data
		githubApiGet(beforeUrl)
	})
	.catch((error) => {
		console.error('Error fetching config.json:', error)
	})

// GitHub API request to get AsciiDoc content from "freebsd-doc" repo
function githubApiGet(url) {
	// Github API url
	const githubUrl = `${
		configTextJson.doc_github_api_url
	}/documentation/content${url.split('#')[0].substring(24)}_index.adoc`

	fetch(githubUrl)
		.then((response) => {
			if (response.ok) {
				return response.json()
			} else {
				throw new Error(
					`Error occurred. Status: ${response.status}\nYou entered the wrong URL.`
				)
			}
		})
		.then((adocJson) => {
			beforeUrl = url // Store to global variabel

			const adocContentBase64Encode = adocJson.content // The content returned using base64 encoding
			const adocContent = b64DecodeUnicode(adocContentBase64Encode) // Decode the base64 content

			editor.setValue('') // Clean editor content
			editor.session.insert(editor.getCursorPosition(), adocContent) // Insert the content API return

			fileTitle.innerHTML = url // Set adoc file title

			// Store to window object, for "patch_download.js" to generate the diff file
			window.origin_content = adocContent
			window.current_link_1 = `a/documentation/content${url
				.split('#')[0]
				.substring(24)}_index.adoc`
			window.current_link_2 = `b/documentation/content${url
				.split('#')[0]
				.substring(24)}_index.adoc`
		})
		.catch((error) => {
			console.error('Error fetching GitHub API:', error)
			alert(error.message)
		})
}

/*
   When you run on `make html` in documentation/, you will see below log. We can
   see what attribute in content INFO 2023/06/20 18:28:49 Rendering
   articles/mailing-list-faq/_index.adoc  using asciidoctor args [ -r man-macro
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
   Reference:
   https://docs.asciidoctor.org/asciidoctor.js/latest/processor/convert-options/
   and
   https://docs.asciidoctor.org/asciidoc/latest/attributes/document-attributes-ref/
*/
let doctype = 'book' // Default doctype
const translateOptions = {
	// {"safe": "safe","allow-uri-read": ""} is set by this online editor, additionally because we need allows data to be read from URLs.
	safe: 'safe',
	doctype,
	attributes: {
		isonline: '0',
		'skip-front-matter': '1',
		sectanchors: 'after',
		'env-beastie': '1',
		noheader: '',
		nofooter: '',
		'allow-uri-read': '',
	},
}

// Set 'doctype' attribute from file content
function setDoctype(returnContent) {
	const lines = returnContent.split('\n')
	const linesLen = lines.length

	for (let i = 0; i < linesLen; i++) {
		if (lines[i].substring(0, 8) === ':doctype') {
			doctype = lines[i].split(':')[2]
			translateOptions.doctype = doctype
			return
		} else if (lines[i].substring(0, 2) === '==') {
			// Loop until meet the first header
			return
		}
	}
}

// Change include syntax in editor content to include url not include .adoc file
// Ex: include::shared/authors.adoc[] -> translate to
// include::https://raw.githubusercontent.com/freebsd/freebsd-doc/main/shared/authors.adoc[]
function handleIncludeSyntax(returnContent) {
	const lines = returnContent.split('\n')
	const linesLen = lines.length

	for (let i = 0; i < linesLen; i++) {
		if (
			lines[i].substring(0, 9) === 'include::' &&
			lines[i].substring(9, 13) !== 'http'
		) {
			const a = lines[i]
			let b = a.split('::')[1]
			b = b.replaceAll('{{% lang %}}', beforeLanguage)
			b = b.replaceAll('../', '')
			b = `include::${configTextJson.doc_github_raw_url}${b}`
			returnContent = returnContent.replaceAll(a, b)
		} else if (lines[i].substring(0, 2) === '==') {
			// Loop until meet the first header
			break
		}
	}

	return returnContent
}

// Function to handle cross-reference links in HTML content
function crossrefHandler(htmlContent) {
	// Create a temporary element to parse the HTML
	const tempElement = document.createElement('div')
	tempElement.innerHTML = htmlContent

	// Find all <a> tags with href starting with "../"
	const aTags = tempElement.querySelectorAll("a[href^='../']")
	const fileTitle = document.querySelector('.file-title-container').innerHTML
	let baseUrl = fileTitle.substring(0, fileTitle.lastIndexOf('/'))
	baseUrl = baseUrl.substring(0, baseUrl.lastIndexOf('/'))

	// Loop through each <a> tag and replace the href attribute
	aTags.forEach((aTag) => {
		const href = aTag.getAttribute('href')

		if (href.startsWith('../../')) {
			const matches = href.match(/\.\.\//g)
			const generatedString = '../'.repeat(matches.length)
			const newHref = href.replace(
				generatedString,
				' https://docs.freebsd.org/'
			)
			aTag.setAttribute('href', newHref)
		} else if (href.startsWith('../')) {
			const newHref = href.replace('../', `${baseUrl}/`)
			aTag.setAttribute('href', newHref)
		}
	})

	// Return the modified HTML
	return tempElement.innerHTML
}

// Generate html
export function generateHtml() {
	let editorContent = editor.getValue()
	setDoctype(editorContent)

	window.editorContent = editorContent
	editorContent = handleIncludeSyntax(editorContent)

	const asc = Asciidoctor.load(editorContent, translateOptions)
	let htmlContent = asc.convert() // Conver editor content to HTML

	const title = asc.getTitle()
	htmlContent = crossrefHandler(htmlContent)
	htmlContent = `<h1>${title}</h1>` + '<base target="_blank"/>\n' + htmlContent

	outputSession.contentDocument.body.innerHTML =
		'<div style="height: 15px;"></div>' + // Add an empty line at the top for better readability
		htmlContent

	// Define an array of CSS file paths
	const cssFiles = [
		'styles/doc_css/documentation/font-awesome-min.css',
		'styles/doc_css/website/fixed_large.css',
		'styles/doc_css/website/fixed.css',
		'styles/doc_css/website/global.css',
		'styles/doc_css/website/iefixes.css',
		'styles/doc_css/website/layout.css',
		'styles/doc_css/website/navigation.css',
		'styles/doc_css/website/table.css',
		'styles/doc_css/website/text.css',
	]

	// Loop through the array and create <link> elements for each CSS file
	cssFiles.forEach(function (cssFile) {
		const link = document.createElement('link')
		link.href = cssFile
		link.rel = 'stylesheet'

		outputSession.contentDocument.head.appendChild(link)
	})
}

// Change file button function
const changeFileButton = document.querySelector('#change-file')

function popup3(e) {
	const url = window.prompt(
		`Change the left adoc file with freebsd document url${beforeUrl}`
	)
	if (url !== null && url.trim() !== '') {
		// Fetch and generate HTML with the updated URL
		githubApiGet(url)
		generateHtml()
	}
}

changeFileButton.addEventListener('click', popup3)

let typingTimer // Timer identifier
const typingInterval = 500 // Time in milliseconds (1 second)

editor.getSession().on('change', function () {
	clearTimeout(typingTimer)
	typingTimer = setTimeout(() => {
		// Trigger your function here
		generateHtml()
	}, typingInterval)
})
