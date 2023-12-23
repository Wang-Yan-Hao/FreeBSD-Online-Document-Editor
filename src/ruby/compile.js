const fs = require('fs')
const Builder = require('opal-compiler').Builder
require('opal-compiler')
// Opal object will be available on the global scope

const builder = Builder.create()
builder.appendPaths('PackagesMacro')

const result1 = builder.build('cross-document-references-macro.rb')
fs.writeFileSync(
	'cross-document-references-macro.js',
	result1.toString(),
	'utf8'
)

const result2 = builder.build('git-macro.rb')
fs.writeFileSync('git-macro.js', result2.toString(), 'utf8')

const result3 = builder.build('inter-document-references-macro.rb')
fs.writeFileSync(
	'inter-document-references-macro.js',
	result3.toString(),
	'utf8'
)

const result4 = builder.build('man-macro.rb')
fs.writeFileSync('man-macro.js', result4.toString(), 'utf8')

const result5 = builder.build('packages-macro.rb')
fs.writeFileSync('packages-macro.js', result5.toString(), 'utf8')

const result6 = builder.build('sectnumoffset-treeprocessor.rb')
fs.writeFileSync('sectnumoffset-treeprocessor.js', result6.toString(), 'utf8')
