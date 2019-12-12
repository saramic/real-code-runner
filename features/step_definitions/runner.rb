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

When("{string} uploads a submission to {string}") do |_user, _challenge, table|
  visit new_admin_submission_path
  table.hashes.each { |hash| focus_on(:util).form_fill(hash) }
  focus_on(:util).form_action("Create Submission")
  values = focus_on(:util).key_value(
    page.find_all("dl dt"),
    page.find_all("dl dd"),
  )
  @submission_id = values["ID"]
end

When("{string} runs his submission against the challenge") do |_person|
  visit new_admin_run_path
  focus_on(:util).form_fill(
    Submission: @submission_id,
  )
  focus_on(:util).form_action("Create Run")
end
