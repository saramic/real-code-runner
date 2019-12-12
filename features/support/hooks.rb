require "capybara/rspec"
require "capybara-screenshot/rspec"
require "webdrivers/chromedriver"

# Make browser slow down execution to see what's going on
# in the browser (when running non-Headless)
module SlomoBridge
  TIMEOUT = ENV.fetch("SLOMO_MS", "0").to_i / 1000.0

  def execute(*)
    sleep TIMEOUT if TIMEOUT.positive?
    super
  end
end

Capybara.register_driver :selenium_chrome do |app|
  Capybara::Selenium::Driver.new(
    app,
    browser: :chrome,
  ).tap do |driver|
    # Enable slomo mode
    driver.browser.send(:bridge).singleton_class.prepend(SlomoBridge)
  end
end

Capybara.javascript_driver = :selenium_chrome
Capybara.app_host = "http://localhost:3000"
