# FreeBSD Online Document Editor

It is a online website editor for FreeBSD documentation which is still developing. The purpose of FreeBSD Online Document Editor is to simplify the edit process in FreeBSD documentation.

It use simple HTML, CSS, JS, Ace editor and asciidoctor.js(use npm to manage).

Online website location: https://wang-yan-hao.github.io/FreeBSD-Online-Document-Editor/root/.

## Directory

freebsd-doc-main: A copy of FreeBSD official doc-tree repo. Currently copy manually by me.

website: Website file.

website/scripts: Put website JS file.

website/config: Website setting file.

## Installation

node.js >= v16.16.0

npm >= v8.18.0

```bash 
npm install 
```

## Offline usage

Clone all the file and rename /website/scripts/index_2.js to index.js and rename /website/scripts/index.jjs tp index_2, because index_2.js is designed for offline usage.

Use [Live server](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer) to open the website/index.html. Now you can edit .adoc file offline.

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

## License

[MIT](https://choosealicense.com/licenses/mit/)

# Debelop Note
## target
1. There is some macro in FreeBSD (ex: extref). It need be set in this website. {{% lang %}} problem in .adoc include section is also macro problem.
2. Other language .adoc hasn't be tested.
3. CSS need to apply.