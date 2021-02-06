namespace :setup do
  desc "Update user to be an admin [user@email.com]"
  task :admin_user, [:email] => :environment do |_task, args|
    raise "supply a user email, rake setup:admin_user[user@email.com]" unless args[:email]

    user = User.find_or_create_by(email: args[:email]) do |new_user|
      default_password = "password"
      new_user.password = default_password
      puts "\nsetting password to #{default_password.inspect} " \
           "for new user: #{args[:email].inspect}"
    end
    user.user_actions = {
      admin: { can_administer: true },
      users: { can_edit: true },
    }
    user.save!
  end
end
