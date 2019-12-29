class Submission < ApplicationRecord
  belongs_to :challenge
  validates :external_user_identifier, presence: true
  has_many :runs, dependent: :delete_all

  enum status: { uploaded: 0, processed: 1 }
end
