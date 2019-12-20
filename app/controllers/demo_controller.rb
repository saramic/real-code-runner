class DemoController < ApplicationController
  skip_before_action :authenticate_user

  layout "apps"
end
