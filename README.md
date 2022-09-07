# FreeBSD Online Document Editor

It is a online website editor for FreeBSD documentation. The purpose of FreeBSD Online Document Editor is to simplify the edit process in FreeBSD documentation.

It is still developing.

## Develop branch progress
### target
1. {{% lang %}} problem in include section.
2. There is some macro in FreeBSD (ex: extref). It need be set in this website
3. Once you click the url in right html section, the website would be broken
4. CSS need to apply

### matters for discussion
1. I read .adoc file in local. Once FreeBSD update doc tree, the local file need to be updated. Is there other way to read file or we can update local file automatically.

## Directory

data: put some fake data(.adoc) fot the test.

scripts: put js file.

styles: put css file.

pages: put html file.

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