module Types
  class QueryType < Types::BaseObject
    # Add root-level fields here.
    # They will be entry points for queries on your schema.

    field :challenges,
          resolver: Resolvers::Challenges,
          description: "Challenges"

    field :challenge,
          resolver: Resolvers::Challenge,
          description: "Challenge"
  end
end
