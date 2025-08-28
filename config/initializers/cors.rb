Rails.application.config.middleware.insert_before 0, Rack::Cors do
  allow do
    origins "*"   # React frontend ka origin bhi de sakte ho jaise "http://localhost:3000"
    resource "*", headers: :any, methods: [:get, :post, :put, :patch, :delete, :options, :head]
  end
end