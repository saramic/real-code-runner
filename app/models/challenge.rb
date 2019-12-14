class Challenge < ApplicationRecord
  validates :title, presence: true, uniqueness: true

  has_one_attached :test_case
  has_many_attached :feature_files
  has_many_attached :helper_images
end
