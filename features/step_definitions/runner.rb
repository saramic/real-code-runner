Given("{string} is admin") do |string|
  # pending # Write code here that turns the phrase above into concrete actions
end

When("{string} uploads a challenge") do |_string, table|
  visit new_admin_challenge_path
  table.hashes.each { |hash| focus_on(:util).form_fill(hash) }
  focus_on(:util).form_action("Create Challenge")
end

Then("he gets message {string}") do |string|
  wait_for { page.find(".flash.flash-notice").text }.to eq string
end
