json.partial! 'api/albums/album', album: @album

@albums_users.each do |album|
  json.set! album.id do
    json.id album.id
    json.title album.title
    json.year album.year
    json.albumPhoto album.photo
    json.artist album.artist
    json.artistId album.artist.id
    json.songIds album.songs.map { |song| song.id }

    json.songs album.songs
  end
end

json.albumsUsersIds @album.albums_users.map {|albumsUser| albumsUser.user.id}
json.albumsUsers @album.albums_users.map {|albumsUser| albumsUser}