class Submission < ApplicationRecord
  belongs_to :challenge
  validates :external_user_identifier, presence: true
  has_many :runs
end
