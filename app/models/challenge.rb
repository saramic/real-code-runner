class Challenge < ApplicationRecord
  validates :title, presence: true, uniqueness: true

  has_one_attached :test_case
  has_many_attached :feature_files
  has_many_attached :helper_images

  def feature_file_urls
    map_urls(feature_files)
  end

  def helper_image_urls
    map_urls(helper_images)
  end

  private

  def map_urls(attachments)
    attachments.map do |attachment|
      if Rails.env.production?
        # attachment.service_url
        Rails.application.routes.url_helpers.rails_blob_url(
          attachment,
          host: "https://stg-real-code-runner.herokuapp.com",
        )
      else
        Rails.application.routes.url_helpers.rails_blob_url(
          attachment,
          host: "http://localhost:3000",
        )
      end
    end
  end
end
