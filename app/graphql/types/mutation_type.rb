module Types
  class MutationType < Types::BaseObject
    field :add_submission,
          mutation: Mutations::AddSubmission,
          description: "Submit a submission to a challenge"
  end
end
