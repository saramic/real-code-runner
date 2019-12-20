module Types
  class Feature < Types::BaseObject
    field :title, String, null: false
    field :text, String, null: false
  end
end
