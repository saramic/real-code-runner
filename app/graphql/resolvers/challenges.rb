module Resolvers
  class Challenges < Resolvers::BaseResolver
    description "Find challenges"

    type [Types::Challenge], null: false

    def resolve
      ::Challenge.all
    end
  end
end
