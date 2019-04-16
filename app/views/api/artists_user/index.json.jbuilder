@artists_users.each do |artist|
  json.set! artist.id do
    json.id artist.id
    json.name artist.name
    json.biography artist.biography
    json.photo artist.photo
    json.albumIds artist.albums.map { |album| album.id }
    json.songIds artist.album_songs.map { |song| song.id }
  end
end