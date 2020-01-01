module Types
  class Submission < Types::BaseObject
    field :id, ID, null: false
    field :external_user_identifier, String, null: false
    field :status, String, null: false
    field :text, String, null: true
    field :result, Types::SubmissionResult, null: true
    field :runs, [Types::Run], null: true
    field :updated_at, String, null: false
  end
end
