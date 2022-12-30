# FreeBSD Online Document Editor

It is a online website editor for FreeBSD documentation which is still developing. The purpose of FreeBSD Online Document Editor is to simplify the edit process in FreeBSD documentation.

Online website location: https://wang-yan-hao.github.io/FreeBSD-Online-Document-Editor/root/

## Directory

* root: website file.
* root/scripts: JS file.
* root/config: website setting file.
* root/lib: 

## Installation

node.js >= v16.13.1

npm >= v8.18.0

```bash 
cd ./root/

npm install 
```

## Package

1. Opal-compiler@1.0.13, installed by npm in root/package.json
2. Asciidoctor.js@2.2.6 , copy core js file from github in root/scripts/asciidoctor.js
3. Ace.js@1.11.2, using CDN to inlcude in in root/index.html
4. Jsdiff@5.1.0, using CDN to inlcude in root/index.html

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

## License

[MIT](https://choosealicense.com/licenses/mit/)

# Debelop Note
## target
1. test other languages .adoc file.