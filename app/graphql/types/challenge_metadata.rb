module Types
  class ChallengeMetadata < Types::BaseObject
    field :readme, String, null: false
    field :metadata, [Types::ChallengeFeatureMetadata], null: true
  end
end
