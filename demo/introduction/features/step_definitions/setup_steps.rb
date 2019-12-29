Given("a static file") do
  # static so make it quick
  RSpec.configure do |config|
    config.wait_timeout = 0.1 # seconds
  end
  entry_point = ENV.fetch("ENTRY_POINT")
  # NOTE: cannot use class var for lambda below
  file_contents = File.read(entry_point)

  MyRackWrapperApp = Rack::Builder.new do
    run lambda { |_env|
      [200, {}, [file_contents]]
    }
  end
  Capybara.app = MyRackWrapperApp
  visit "/"
end
