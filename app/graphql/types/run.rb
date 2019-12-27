module Types
  class Run < Types::BaseObject
    field :id, ID, null: false
    field :result, Types::RunResult, null: true
  end
end
