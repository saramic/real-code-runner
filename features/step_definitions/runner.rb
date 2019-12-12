Given("{string} is admin") do |string|
  # pending # Write code here that turns the phrase above into concrete actions
end

When("{string} uploads a challenge") do |_string, table|
  visit new_admin_challenge_path
  table.hashes.each do |hash|
    focus_on(:util).form_fill(hash)
  end
  focus_on(:util).form_action("Create Challenge")
end

Then("he gets message {string}") do |message|
  wait_for { page.find(".flash.flash-notice").text }.to eq message
end

When("{string} uploads a submission to {string}") do |user, challenge, table|
  visit new_admin_submission_path
  table.transpose.hashes.each { |hash| focus_on(:util).form_fill(hash) }
end
