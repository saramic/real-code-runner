class SubmissionsController < ApplicationController
  before_action :authenticate_user
  skip_before_action :verify_authenticity_token

  def create
    @submission = Submission.new(submission_params)

    if @submission.save
      render :show, status: :created, location: @submission
    else
      render json: @submission.errors, status: :unprocessable_entity
    end
  end

  private

  def submission_params
    params.require(:submission).permit(:challenge_id, :external_user_identifier)
  end
end
