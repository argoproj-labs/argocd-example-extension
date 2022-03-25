build: /tmp/extensions/index.json /tmp/extensions/example.js

/tmp/extensions:
	mkdir -p /tmp/extensions

/tmp/extensions/index.json: /tmp/extensions
	echo '{"items": [{"name": "example"}]}' > /tmp/extensions/index.json

/tmp/extensions/example.js: /tmp/extensions src
	yarn build
	mv dist/example.js /tmp/extensions/
