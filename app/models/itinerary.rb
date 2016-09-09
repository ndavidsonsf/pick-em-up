

class Itinerary < ActiveRecord::Base
  belongs_to :user
  has_one :starting_location, foreign_key: :address_id

end
