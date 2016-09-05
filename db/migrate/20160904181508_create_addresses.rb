class CreateAddresses < ActiveRecord::Migration
  def change
    create_table :addresses do |t|
      t.string :label, null: false, length: 64
      t.string :address_1, null: false, length: 128
      t.string :address_2, length: 128
      t.string :city, null: false, length: 64
      t.string :state, null: false, length: 64
      t.string :zip_code, null: false, length: 64

      t.references :user, null: false

      t.timestamps null: false
    end
  end
end
