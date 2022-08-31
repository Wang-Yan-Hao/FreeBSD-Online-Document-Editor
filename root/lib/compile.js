const fs = require('fs')
const Builder = require('opal-compiler').Builder
require('opal-compiler')
// Opal object will be available on the global scope

const builder = Builder.create()
builder.appendPaths('PackagesMacro') 

const result_1 = builder.build('cross-document-references-macro.rb') 
fs.writeFileSync('cross-document-references-macro.js', result_1.toString(), 'utf8') 

const result_2 = builder.build('git-macro.rb') 
fs.writeFileSync('git-macro.js', result_2.toString(), 'utf8')

const result_3 = builder.build('inter-document-references-macro.rb') 
fs.writeFileSync('inter-document-references-macro.js', result_3.toString(), 'utf8')

const result_4 = builder.build('man-macro.rb') 
fs.writeFileSync('man-macro.js', result_4.toString(), 'utf8')

const result_5 = builder.build('packages-macro.rb') 
fs.writeFileSync('packages-macro.js', result_5.toString(), 'utf8')

const result_6 = builder.build('sectnumoffset-treeprocessor.rb') 
fs.writeFileSync('sectnumoffset-treeprocessor.js', result_6.toString(), 'utf8')