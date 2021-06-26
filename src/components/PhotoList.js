import React, {useEffect, useState} from 'react';
import {ScrollView, Text, View, FlatList} from 'react-native';
import axios from 'axios';
import PhotoDetail from './PhotoDetail';
import {Button as ButtonPaper} from 'react-native-paper'

const PhotoList = (props) => {
  const [photos, setPhotos] = useState(null);

  useEffect(() => {
    axios
      .get(
        `https://api.flickr.com/services/rest/?method=flickr.photosets.getPhotos&api_key=6e8a597cb502b7b95dbd46a46e25db8d&photoset_id=${props.route.params.albumId}&user_id=137290658%40N08&format=json&nojsoncallback=1`,
      )
      .then((response) =>
        setPhotos(response.data.photoset.photo)
      );
  }, []);

  function renderAlbum({item: photo}) {
    return (<PhotoDetail
      key={photo.title}
      title={photo.title}
      imageUrl={`https://farm${photo.farm}.staticflickr.com/${photo.server}/${photo.id}_${photo.secret}.jpg`}
    />);
  }

  console.log(photos);

  if (!photos) {
    return (
      <View style={{flex: 1, marginTop: 10, justifyContent: 'center'}}>
        <ButtonPaper loading={true} mode="text" style={{fontSize: 16}} color='#7C8C03'>Cargando...</ButtonPaper>
      </View>
    );
  }

  return (
    <View style={{flex: 1}}>
      <FlatList
      data={photos}
      renderItem={renderAlbum}
      keyExtractor={item => item.id}
      />        
    </View>
  );


}

export default PhotoList;
