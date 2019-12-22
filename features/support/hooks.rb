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

Capybara.register_driver :selenium_chrome_in_container do |app|
  Capybara::Selenium::Driver.new(
    app,
    browser: :remote,
    url: "http://webdriver_chrome:4444/wd/hub",
    desired_capabilities: :chrome,
    # desired_capabilities: Selenium::WebDriver::Remote::Capabilities.chrome(
    #   chromeOptions: { args: %w(headless disable-gpu) }
    # ),
  )
end

if ENV["SELENIUM_REMOTE_URL"]
  Capybara.javascript_driver = :selenium_chrome_in_container
  Capybara.server_host = "0.0.0.0"
  Capybara.server_port = 4000
  Capybara.app_host = "http://web:4000"
else
  Capybara.javascript_driver = :selenium_chrome
  # Capybara.app_host = "http://localhost:3000"
end
