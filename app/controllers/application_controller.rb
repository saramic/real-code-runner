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
      authenticate_user_with_token
    else
      authenticate_user!
    end
  end

  def authenticate_user_with_token
    authenticate_or_request_with_http_token do |token|
      jwt_payload = JWT.decode(
        token,
        Rails.application.credentials.secret_key_base,
      ).first

      @current_user_id = jwt_payload["id"]
    rescue JWT::ExpiredSignature, JWT::VerificationError, JWT::DecodeError
      head :unauthorized
    end
  end

  def after_sign_in_path_for(resource)
    url = URI(request.referrer)
    if url.query
      redirect_to_url = CGI.parse(url.query)["redirect_to"].join
      return redirect_to_url if redirect_to_url
    end

    super
  end
end
