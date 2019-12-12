Rails.application.routes.draw do
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
  namespace :admin do
    resources :challenges
    resources :submissions
    resources :runs

    root to: "challenges#index"
  end
end
