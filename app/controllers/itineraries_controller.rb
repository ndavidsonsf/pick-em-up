get '/users/:user_id/itineraries/new' do
  @user = User.find(params[:user_id])
  erb :'itineraries/new'
end

get '/users/:user_id/itineraries/:id' do
  @user = User.find(params[:user_id])
  @itinerary = @user.itineraries.find(params[:id])
  erb :'itineraries/show'
end

post '/users/:user_id/itineraries' do
  @user = User.find(params[:user_id])
  @itinerary = @user.itineraries.new(params[:itinerary])

  if @itinerary.save
    redirect "/users/#{@user.id}"
  else
    @errors = @itinerary.errors.full_messages
    erb :'itineraries/new'
  end
end

get '/users/:user_id/itineraries/:id/edit' do
  @user = User.find(params[:user_id])
  @itinerary = Itinerary.find(params[:id])
  erb :'itineraries/edit'
end


put '/users/:user_id/itineraries/:id' do
  @user = User.find(params[:user_id])
  @itinerary = @user.itineraries.new(params[:itinerary])
  if @itinerary.update_attributes(params[:item])
    redirect "/users/#{@user.id}"
  else
    redirect "/users/#{@user.id}"
    @errors = @itineraries.errors.full_messages
  end
end


delete '/users/:user_id/itineraries/:id' do
  @user = User.find(params[:user_id])
  @itinerary = @user.itineraries.find(params[:id])
  @itinerary.destroy
  redirect "/users/#{@user.id}"
end
