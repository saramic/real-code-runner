class AddMetadataToChallenge < ActiveRecord::Migration[6.0]
  def change
    add_column :challenges, :metadata, :jsonb
  end
end
