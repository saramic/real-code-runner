module Types
  class FeatureElementsMetadata < Types::BaseObject
    field :id, String, null: false
    field :line, String, null: false
    field :name, String, null: false
    field :keyword, String, null: false
    field :description, String, null: false
    field :steps, [Types::FeatureStepsMetadata], null: false
  end
end
