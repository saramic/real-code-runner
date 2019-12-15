module Types
  class Challenge < Types::BaseObject
    field :id, ID, null: false
    field :title, String, null: false
    field :description, String, null: true
    field :feature_file_urls, [String], null: true
    field :helper_image_urls, [String], null: true
  end
end
