class AddStatusToChallenge < ActiveRecord::Migration[6.0]
  def change
    add_column :challenges, :status, :integer, default: 0
  end
end
