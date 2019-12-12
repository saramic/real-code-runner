class CreateRuns < ActiveRecord::Migration[6.0]
  def change
    create_table :runs, id: :uuid do |t|
      t.references :submission, type: :uuid, null: false, foreign_key: true
      t.string :callback_url
      t.string :callback_email
      t.integer :status, default: 0
      t.jsonb :result

      t.timestamps
    end
  end
end
