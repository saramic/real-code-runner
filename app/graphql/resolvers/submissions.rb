module Resolvers
  class Submissions < Resolvers::BaseResolver
    description "Find submissions"

    argument :challenge_id, ID, required: true
    argument :external_user_identifier, String, required: true

    type [Types::Submission], null: false

    def resolve(challenge_id:, external_user_identifier:)
      ::Submission.where(
        challenge_id: challenge_id,
        external_user_identifier: external_user_identifier,
      )
                  .includes(:runs)
                  .order(::Submission.arel_table[:created_at].desc)
    end
  end
end
