module PageFragments
  module MainPage
    include PageFragments::Util

    def reload_page
      browser.evaluate_script "window.location.reload()"
    end

    def post_info
      browser.synchronize do
        nodes = browser.find_all("p strong")
        full = nodes.map { |strong| strong.find(:xpath, "..") }.map(&:text)
        title = nodes.map(&:text)
        Hash[title.zip(full).map { |(k, v)| [k, v.sub(k + " ", "")] }]
      end
    end

    def alert_text
      browser.find("#notice").text
    end
  end
end
