class ScriptsController < ApplicationController
  def index
    redirect_to(
      Webpacker.manifest.lookup!("widget_app.js"),
      status: 307,
    )
  end
end
