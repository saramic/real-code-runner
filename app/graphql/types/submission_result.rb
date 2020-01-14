module Types
  class SubmissionResult < Types::BaseObject
    field :output, String, null: true
    field :step, Types::CucumberResult, null: true
    field :scenario, Types::CucumberResult, null: true
    field :elapsed_time, String, null: true
    field :exit_code, Integer, null: true
  end
end
