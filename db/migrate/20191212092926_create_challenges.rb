class CreateChallenges < ActiveRecord::Migration[6.0]
  def change
    create_table :challenges, id: :uuid do |t|
      t.string :title
      t.text :description

      t.timestamps
    end
  end
end
