Rails.application.routes.draw do
  namespace :api do
    resources :users
  end

  root 'homes#index'
  resources :homes

  get "*path", to: "homes#index", constraints: ->(req) { !req.xhr? && req.format.html? }
end
