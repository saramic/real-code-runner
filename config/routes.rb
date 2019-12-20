Rails.application.routes.draw do
  devise_for :users
  if Rails.env.development?
    mount GraphiQL::Rails::Engine, at: "/graphiql", graphql_path: "/graphql"
  end
  post "/graphql", to: "graphql#execute", defaults: { format: :json }
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
  resources :demo, only: :index

  namespace :admin do
    resources :users
    resources :challenges
    resources :submissions
    resources :runs

    root to: "users#index"
  end
end
