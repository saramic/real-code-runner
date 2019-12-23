module Types
  class Challenge < Types::BaseObject
    field :id, ID, null: false
    field :title, String, null: false
    field :description, String, null: true
    field :metadata, Types::ChallengeMetadata, null: true
    field :features, [Types::Feature], null: true
    field :feature_file_urls, [Types::Url], null: true
    field :helper_image_urls, [Types::Url], null: true
  end
end
