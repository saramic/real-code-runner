class PrototypeController < ApplicationController
  before_action :set_key_and_challenge

  def index; end

  def show
    render params[:id]
  end

  private

  def set_key_and_challenge
    @jwt = current_user.generate_jwt
    @challenge_id = Challenge
                    .find_by(title: "Introduction")&.id ||
                    Challenge.first&.id

    @host = host
  end

  def host
    if Rails.env.production?
      "https://stg-real-code-runner.herokuapp.com"
    else
      "http://localhost:#{Rails::Server::Options.new.parse!(ARGV)[:Port]}"
    end
  end
end
