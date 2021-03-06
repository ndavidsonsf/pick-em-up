class CreateItineraries < ActiveRecord::Migration
  def change
    create_table :itineraries do |t|
      t.string :label, null: false, length: 64
      t.date :date, null: false
      t.string :airline, null: false
      t.string :flight_number, null: false
      t.string :origin, null: false
      t.string :destination, null: false

      t.references :user, null: false

      t.timestamps null: false

    end
  end
end
