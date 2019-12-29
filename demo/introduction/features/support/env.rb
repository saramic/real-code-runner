require "capybara/cucumber"
require "pry"
require "rspec/wait"
require "rspec/mocks/argument_matchers"

World(RSpec::Wait)

$LOAD_PATH << File.join(File.dirname(__FILE__), "page_fragments")
require "util"

World(PageFragments)
