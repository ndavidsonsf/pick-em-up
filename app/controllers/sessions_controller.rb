get '/sessions/new' do
  erb :"sessions/new"
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
