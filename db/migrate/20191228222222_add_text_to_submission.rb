class AddTextToSubmission < ActiveRecord::Migration[6.0]
  def change
    add_column :submissions, :text, :text
  end
end
