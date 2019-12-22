class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable

  def generate_jwt
    JWT.encode({
                 id: id,
                 exp: 60.days.from_now.to_i,
               }, Rails.application.credentials.secret_key_base,)
  end

  def user_actions=(value)
    self[:user_actions] = value.is_a?(String) ? JSON.parse(value) : value
  end
end
