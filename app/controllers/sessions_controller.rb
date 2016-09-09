get '/sessions/new' do
  if request.xhr?
    erb :'/sessions/_loginform', layout: false
  else
    erb :"/sessions/new"
  end
end

post '/sessions' do
  @user = User.find_by_email(params[:email])
  if @user && @user.authenticate(params[:password])
    session[:id] = @user.id
    redirect "/"
  else
    @sessions_errors = ["Wrong email or password, please try logging in again"]
    erb :"sessions/new"
  end
end

delete '/sessions' do
  session[:id] = nil
  redirect '/'
end
