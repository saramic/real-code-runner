PROJECT := introduction

default: demo

demo:
	ENTRY_POINT=solutions/index_1.html cucumber || \
							ENTRY_POINT=solutions/index_2.html cucumber || \
							ENTRY_POINT=solutions/index_3.html cucumber || \
							ENTRY_POINT=solutions/index_4.html cucumber || \
							ENTRY_POINT=solutions/index_5.html cucumber

.PHONY: build
build: install_tools check_tools
	bin/full-build

.PHONY: check_tools
check_tools:
	bin/check-tools

.PHONY: install_tools
install_tools:
	bin/install-tools

