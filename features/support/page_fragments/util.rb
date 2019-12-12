module PageFragments
  module Util
    def form_fill(args = {})
      args.each do |field, value|
        input_tag = browser
          .find("label", text: field.to_s)
          .find(:xpath, "./../..") # TODO: recursively expand till one is found
          .find("SELECT,INPUT,TEXTAREA")
        if input_tag.tag_name == "select"
          browser.select(value, from: field.to_s)
        else
          browser.fill_in(field.to_s, with: value)
        end
      end
    end

    def form_action(action)
      browser.click_on(action)
    end

    def select(args = {})
      args.each do |field, value|
        browser.select(value, from: field.to_s)
      end
    end

    # rubocop:disable Metrics/MethodLength
    def key_value(key_finder, value_finder)
      browser.synchronize do
        keys = key_finder.map(&:text)
        values = value_finder.map(&:text)
        key_values = values
          .each_slice(keys.length)
          .map { |value| keys.zip(value).to_h }
        if key_values.length == 1
          key_values.first
        else
          key_values
        end
      end
    end

    # rubocop:enable Metrics/MethodLength
  end
end
