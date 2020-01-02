module Types
  class CucumberResult < Types::BaseObject
    field :total, Integer, null: true
    field :output, String, null: true
  end
end
