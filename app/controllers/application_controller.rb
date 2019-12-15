class ApplicationController < ActionController::Base
  before_action :authenticate_user

  private

  def current_user
    @current_user ||= super || User.find(@current_user_id)
  end

  def signed_in?
    @current_user_id.present?
  end

  def authenticate_user
    if request.headers["Authorization"].present?
      authenticate_or_request_with_http_token do |token|
        begin
          jwt_payload = JWT.decode(token, Rails.application.credentials.secret_key_base).first

          @current_user_id = jwt_payload["id"]
        rescue JWT::ExpiredSignature, JWT::VerificationError, JWT::DecodeError
          head :unauthorized
        end
      end
    else
      authenticate_user!
    end
  end
end
