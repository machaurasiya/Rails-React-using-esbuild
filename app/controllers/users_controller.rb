class UsersController < ApplicationController
    def index
        @users = User.all
        
        respond_to do |format|
            format.json { render json: @users }
            format.html # if you ever want HTML view
        end
    end
end
