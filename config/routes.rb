Rails.application.routes.draw do
  devise_for :users
  if Rails.env.development?
    mount GraphiQL::Rails::Engine, at: "/graphiql", graphql_path: "/graphql"
  end
  post "/graphql", to: "graphql#execute", defaults: { format: :json }
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html

  resources :challenges, only: %i[show create], defaults: { format: :json }
  resources :submissions, only: %i[show create], defaults: { format: :json }

  resources :prototype, only: :index

  resources :demo, only: :index
  get "/demo/*all" => "demo#index"

  namespace :admin do
    resources :users
    resources :challenges
    resources :submissions
    resources :runs

    root to: "users#index"
  end
end
