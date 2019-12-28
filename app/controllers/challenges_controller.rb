class ChallengesController < ApplicationController
  before_action :authenticate_user
  skip_before_action :verify_authenticity_token

  def create
    @challenge = Challenge.new(challenge_params)

    if @challenge.save
      render :show, status: :created, location: @challenge
    else
      render json: @challenge.errors, status: :unprocessable_entity
    end
  end

  private

  def challenge_params
    params.require(:challenge).permit(:title, :description, :test_case)
  end
end
