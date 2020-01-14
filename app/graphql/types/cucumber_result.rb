module Types
  class CucumberResult < Types::BaseObject
    field :total, Integer, null: true
    field :failed, Integer, null: true
    field :skipped, Integer, null: true
    field :undefined, Integer, null: true
    field :pending, Integer, null: true
    field :passed, Integer, null: true
    field :output, String, null: true
  end
end
