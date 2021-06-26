import React, {useEffect, useState} from 'react';
import {ScrollView, Text, View, FlatList} from 'react-native';
import axios from 'axios';
import AlbumDetail from './AlbumDetail';
import {Button as ButtonPaper} from 'react-native-paper'

const AlbumList = (props) => {
  const [photoset, setPhotoset] = useState(null);

  useEffect(() => {
    axios
    .get(
      'https://api.flickr.com/services/rest/?method=flickr.photosets.getList&api_key=6e8a597cb502b7b95dbd46a46e25db8d&user_id=137290658%40N08&format=json&nojsoncallback=1',
    )
    .then((response) =>
      setPhotoset(response.data.photosets.photoset),
    );
  }, []);

  function RenderAlbum({item: album, props}) {
    return (
      <AlbumDetail
        navigation={props.navigation}
        key={album.id}
        title={album.title._content}
        albumId={album.id}
      />
    );
  };

  console.log(photoset);

  if (!photoset) {
    return (
      <View style={{flex: 1, marginTop: 10, justifyContent: 'center'}}>
        <ButtonPaper loading={true} mode="text" style={{fontSize: 16}} color='#7C8C03'>Cargando...</ButtonPaper>
      </View>
    );
  }

  return (
    <View style={{flex: 1}}>
      <FlatList
        data={photoset}
        renderItem={(i) => <RenderAlbum {...i} props={props}/>}
        keyExtractor={item => item.id}
      />
    </View>
  );
}

export default AlbumList;
