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
      # attachment.service_url for S3 direct
      {
        filename: attachment.filename.to_s,
        url: Rails.application.routes.url_helpers.rails_blob_url(
          attachment,
          host: host,
        ),
      }
    end
  end

  def host
    Rails.env.production? ? "https://stg-real-code-runner.herokuapp.com" : "http://localhost:3000"
  end
end
