import MapView, { LatLng, Marker, PROVIDER_GOOGLE } from "react-native-maps";
import {
  StyleSheet,
  View,
  Dimensions,
  Text,
  TouchableOpacity,
  Button,
} from "react-native";
import {
  GooglePlaceDetail,
  GooglePlacesAutocomplete,
} from "react-native-google-places-autocomplete";
import { useRef, useState } from "react";
import MapViewDirections from "react-native-maps-directions";
import { getPreciseDistance} from 'geolib';

const GOOGLE_API_KEY = "YOUR_API_KEY";

const { width, height } = Dimensions.get("window");

const ASPECT_RATIO = width / height;
const LATITUDE_DELTA = 0.02;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;
const INITIAL_POSITION = {
  latitude: 61.06499650000001,
  longitude: 28.0943387,
  latitudeDelta: LATITUDE_DELTA,
  longitudeDelta: LONGITUDE_DELTA,
};


export default function App({ navigation }) {

  const [distance, setDistance] = useState();
  const [origin, setOrigin] = useState();
  const [destination, setDestination] = useState();
  let origin_lat, origin_long, dest_lat, dest_long;
  const mapRef = useRef(null);

  const moveTo = async (position) => {
    const camera = await mapRef.current.getCamera();
    if (camera) {
      camera.center = position;
      mapRef.current.animateCamera(camera, { duration: 1000 });
    }
  };

  
  const onPlaceSelected = (details, flag) => {
    const position = {
      latitude: details?.geometry.location.lat || 0,
      longitude: details?.geometry.location.lng || 0,
    };
    moveTo(position);
    //console.log(position);
    //console.log(details.address_components[0].long_name);

    if (flag === 'origin') {
      origin_lat = position.latitude;
      origin_long = position.longitude;
      setOrigin(details.address_components[0].long_name);
    } 
    if (flag === 'destination') {
      dest_lat = position.latitude;
      dest_long = position.longitude;
      setDestination(details.address_components[0].long_name);
    }

  };

  const calculatePreciseDistance = () => {
    try {
      var pdis = getPreciseDistance(
        {latitude: origin_lat, longitude: origin_long},
        {latitude: dest_lat, longitude: dest_long},
      );
      setDistance(pdis/1000);
      // console.log(distance);

    } catch (error) {
      console.log(error);
    }
    
  };

  return (
    <View style={styles.container}>
      <MapView
        ref={mapRef}
        style={styles.map}
        provider={PROVIDER_GOOGLE}
        initialRegion={INITIAL_POSITION}
      >
          <MapViewDirections
            apikey={GOOGLE_API_KEY}
            strokeColor="#6644ff"
            strokeWidth={4}
          />
      </MapView>
      <View style={styles.searchContainer}>
        <GooglePlacesAutocomplete
          styles={{ textInput: styles.input }}
          placeholder="Origin"
          fetchDetails
          onPress={(data, details = null) => {
            onPlaceSelected(details, 'origin');
          }}
          query={{
            key: GOOGLE_API_KEY,
            language: "pt-BR",
          }}
        />
        <GooglePlacesAutocomplete
          styles={{ textInput: styles.input }}
          placeholder="Destination"
          fetchDetails
          onPress={(data, details = null) => {
            onPlaceSelected(details, 'destination');
          }}
          query={{
            key: GOOGLE_API_KEY,
            language: "pt-BR",
          }}
        />
        <TouchableOpacity style={styles.button} onPress={calculatePreciseDistance}>
          <Text style={styles.buttonText}>Total Distance</Text>
        </TouchableOpacity>
        <Text>{distance} KM</Text>
        { distance > 0 && 
        <Button title="OK" onPress={() => navigation.navigate('Trip' ,{
          distance: distance,
          origin: origin,
          destination: destination
        })} />
        }
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  map: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
  },
  searchContainer: {
    position: "absolute",
    width: "90%",
    backgroundColor: "white",
    shadowColor: "black",
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 4,
    elevation: 4,
    padding: 8,
    borderRadius: 8,
  },
  input: {
    borderColor: "#888",
    borderWidth: 1,
  },
  button: {
    backgroundColor: "#bbb",
    paddingVertical: 12,
    marginTop: 16,
    borderRadius: 4,
  },
  buttonText: {
    textAlign: "center",
  },
});
