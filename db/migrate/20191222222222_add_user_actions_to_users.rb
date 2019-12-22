class AddUserActionsToUsers < ActiveRecord::Migration[6.0]
  def change
    add_column :users, :user_actions, :jsonb
  end
end
