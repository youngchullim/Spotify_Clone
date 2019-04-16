# == Schema Information
#
# Table name: songs
#
#  id         :bigint(8)        not null, primary key
#  title      :string           not null
#  year       :integer          not null
#  genre      :string           not null
#  album_id   :integer          not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#  song       :string
#  duration   :string
#

FactoryBot.define do
  factory :song do
    
  end
end
