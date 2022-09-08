# FreeBSD Online Document Editor

It is a online website editor for FreeBSD documentation. The purpose of FreeBSD Online Document Editor is to simplify the edit process in FreeBSD documentation.

It use simple HTML, CSS, JS, Ace editor and asciidoctor.js(use npm to install). 

It is still developing.

Online website location: https://wang-yan-hao.github.io/FreeBSD-Online-Document-Editor/ .

## Develop branch progress
### target
1. There is some macro in FreeBSD (ex: extref). It need be set in this website.
2. {{% lang %}} problem in .adoc include section.
3. Once you click the url in right HTML section, the website would be broken.
4. Patch Download button hasn't complete.
5. Other language .adoc hasn't be tested.
7. CSS need to apply.

## Directory

freebsd-doc-main: FreeBSD official doc-tree repo. Use git-submodule to clone the repo.

website: Website file.

website/src-noconflict: Ace editor setting file.

website/scripts: Put website JS file.

## Installation

node.js >= v16.16.0

npm >= v8.18.0

```bash 
npm install 
```

## Usage

Use [Live server](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer) to open the index.html.

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

## License

[MIT](https://choosealicense.com/licenses/mit/)