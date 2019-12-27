class PrototypeController < ApplicationController
  def index
    @jwt = current_user.generate_jwt
    @challenge_id = Challenge
                    .find_by(title: "Introduction")&.id ||
                    Challenge.first&.id
  end
end
