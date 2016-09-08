class User < ActiveRecord::Base

   :addresses
  has_many :itineraries

  validates_format_of :email, :with => /@/
  validates_presence_of :email, :first_name, :last_name,  :password_hash
  validates_uniqueness_of :email

  include BCrypt

  # getters/setters to encrypt user password
  def password
    @password ||= Password.new(password_hash)
  end

  def password=(new_password)
    @password = Password.create(new_password)
    self.password_hash = @password
  end

  # used to authenticate a user
  def authenticate(input_password)
    self.password == input_password
  end

end
