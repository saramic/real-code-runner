Then("it has a {string} with the text {string}") do |tag, text_contents|
  # TODO: can I get the original failure message as well?
  custom_error = [
    "",
    "expected to find #{tag.inspect} in",
    page.body,
    "but didn't find it",
    "",
  ].join("\n\n")

  wait_for do
    page.find_all(tag).length
  end.to eq(1), custom_error

  wait_for do
    page.find(tag).text
  end.to eq text_contents
end

Then("the following elements with text") do |table|
  assertions = table
               .rows
               .map do |row|
    Hash[table.headers.zip(row)]
  end
  assertions.map do |assertion|
    locator = if assertion.key?("tag")
                assertion["tag"]
              elsif assertion.key? "fragment"
                "[data-testid=\"#{assertion['fragment']}\"]"
              end
    wait_for do
      page.find_all(locator).length
    end.to eq 1
    wait_for do
      page.find(locator).text
    end.to eq assertion["text"]
  end
end

Then("it has some pieces of text on the page") do |table|
  table.rows.flatten.map do |text|
    wait_for do
      page.text
    end.to include(text)
  end
end
