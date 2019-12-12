class Challenge < ApplicationRecord
  validates :title, presence: true, uniqueness: true
end
