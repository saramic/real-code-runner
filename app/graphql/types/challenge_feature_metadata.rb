module Types
  class ChallengeFeatureMetadata < Types::BaseObject
    field :id, String, null: false
    field :uri, String, null: false
    field :line, String, null: false
    field :name, String, null: false
    field :keyword, String, null: false
    field :description, String, null: false
    field :elements, [Types::FeatureElementsMetadata], null: false
  end
end
