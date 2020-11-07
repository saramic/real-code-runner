Given("{string} signs up and is anointed an admin") do |_string|
  visit new_admin_challenge_path
  focus_on(:util).form_action("Sign up")
  supported_input_tag_one_away(text: "Email")
    .fill_in(with: "saramic@gmail.com")
  supported_input_tag_one_away(text: "Password", match: :prefer_exact)
    .fill_in(with: "password")
  supported_input_tag_one_away(text: "Password confirmation")
    .fill_in(with: "password")
  focus_on(:util).form_action("Sign up")
  @admin = User.find_by(email: "saramic@gmail.com")
  @admin.update!(
    user_actions: {
      "admin" => { "can_administer" => true },
      "users" => { "can_edit" => true },
    },
  )
end

Given("{string} signs up and is anointed with") do |name, table|
  visit new_admin_challenge_path
  focus_on(:util).form_action("Sign up")
  supported_input_tag_one_away(text: "Email")
    .fill_in(with: "#{name}@example.com")
  supported_input_tag_one_away(text: "Password", match: :prefer_exact)
    .fill_in(with: "password")
  supported_input_tag_one_away(text: "Password confirmation")
    .fill_in(with: "password")
  focus_on(:util).form_action("Sign up")
  @user = User.find_by(email: "#{name.downcase}@example.com")
  @user.update!(Hash[table.rows_hash.map { |k, v| [k, JSON.parse(v)] }])

  # TODO: wait for JS to load for administrate or use
  # `page.execute_script` to look for an event like `turbolinks:load`
  sleep(1)
end

When("{string} visits {string} directly") do |_name, location|
  visit location
end

When("{string} looks at {string}") do |_name, link_text|
  page.find(".navigation a", text: link_text).click
end

Then("{string} sees the header") do |_name, table|
  wait_for do
    page.find(".main-content__header").text.gsub("\n", " ")
  end.to eq table.rows_hash["text"]
end

Then("{string} only sees action types") do |_name, table|
  wait_for do
    page.find_all(".js-table-row td a").map { |anchor| anchor["class"] }.uniq
  end.to eq(table.rows_hash["actions"].split)
end

def supported_input_tag_one_away(args)
  # TODO: move into util with recursively expand ./..
  page
    .find("label", args)
    .find(:xpath, "./..")
    .find("SELECT,INPUT,TEXTAREA")
end

When("{string} uploads a challenge") do |_string, table|
  visit new_admin_challenge_path
  table.hashes.each do |hash|
    focus_on(:util).form_fill(hash)
  end
  focus_on(:util).form_action("Create Challenge")
end

Then("{string} gets message {string}") do |_name, message|
  wait_for { page.find(".flash.flash-notice").text }.to eq message + "!!"
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
