module Resolvers
  class Challenge < Resolvers::BaseResolver
    description "Find challenge"

    argument :id, ID, required: true

    type Types::Challenge, null: false

    def resolve(id:)
      ::Challenge
        .find(id)
    end
  end
end
