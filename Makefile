PROJECT := real-code-runner

default: build

.PHONY: build
build: install_tools check_tools
	bin/full-build

.PHONY: check_tools
check_tools:
	bin/check-tools

.PHONY: install_tools
install_tools:
	bin/install-tools

