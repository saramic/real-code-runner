module Mutations
  class AddSubmission < Mutations::BaseMutation
    argument :challenge_id, ID, required: true
    argument :text, String, required: true
    argument :external_user_identifier, String, required: true

    field :submission, Types::Submission, null: true

    def resolve(challenge_id:, external_user_identifier:, text:)
      submission = ::Submission.create!(
        challenge_id: challenge_id,
        external_user_identifier: external_user_identifier,
        text: text,
      )
      {
        submission: submission,
      }
    end
  end
end
