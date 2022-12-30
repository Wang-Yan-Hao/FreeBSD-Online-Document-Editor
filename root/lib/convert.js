const asciidoctor = require('asciidoctor')()

require('./cross-document-references-macro') 
// require('./CrossDocumentReferencesMacro/extension.js') 

require('./git-macro.js')
// require('./GitReferencesMacro/extension.js')

require('./inter-document-references-macro.js')
// require('./InterDocumentReferencesMacro/extension.js') 

require('./man-macro.js')
// require('./ManPageMacro/extension.js')

require('./packages-macro.js')
// require('./PackagesMacro/extension.js')

require('./sectnumoffset-treeprocessor.js')


const html = asciidoctor.convertFile('document.adoc', { 'to_file': false }) 
console.log(html)