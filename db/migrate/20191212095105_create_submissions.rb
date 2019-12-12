class CreateSubmissions < ActiveRecord::Migration[6.0]
  def change
    create_table :submissions, id: :uuid do |t|
      t.string :external_user_identifier, null: false
      t.references :challenge, type: :uuid, null: false, foreign_key: true
      t.integer :status, default: 0
      t.jsonb :result

      t.timestamps
    end
  end
end
