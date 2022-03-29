NAME := example

install: /tmp/extensions/index.json /tmp/extensions/$(NAME).js

/tmp/extensions:
	mkdir -p /tmp/extensions

/tmp/extensions/index.json: /tmp/extensions
	echo '{"items": [{"name": "$(NAME)"}]}' > /tmp/extensions/index.json

/tmp/extensions/$(NAME).js: /tmp/extensions src
	yarn build
	mv dist/$(NAME).js /tmp/extensions/
