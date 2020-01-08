module Types
  class FeatureStepsMetadata < Types::BaseObject
    field :line, String, null: false
    field :name, String, null: false
    field :keyword, String, null: false
    field :hints, [String], null: true
    field :helper_images, [String], null: true
  end
end
