module Types
  class Submission < Types::BaseObject
    field :id, ID, null: false
    field :external_user_identifier, String, null: false
    field :status, Integer, null: true
    field :result, Types::SubmissionResult, null: true
    field :runs, [Types::Run], null: true
  end
end
