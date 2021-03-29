import { /* useEffect, */ useState } from "react";
/* import { MapContainer, TileLayer } from "react-leaflet";
import ReactLeafletKml from "react-leaflet-kml"; */
import { GoogleMap, LoadScript, KmlLayer } from "@react-google-maps/api";

import "./App.css";
interface MapEventProps {
  featureData: {
    description: string;
    id: string;
    infoWindowHtml: any;
    name: string;
    snippet: string;
    status: string;
  };
}

const containerStyle = {
  width: "600px",
  height: "600px",
};

const center = {
  lat: -30.142190720915817,
  lng: -50.87171092135266,
};

function App() {
  /* const ACCESS_TOKEN_MAP_BOX = `access_token=${process.env.REACT_APP_ACCESS_TOKEN_MAP_BOX}`; */
  const ACCESS_TOKEN_GOOGLE_MAPS_API = `${process.env.REACT_APP_ACCESS_TOKEN_GOOGLE_MAPS_API}`;

/*   const [kml, setKml] = useState<Document>(); */
  const [mapEvent, useMapEvent] = useState<MapEventProps>({} as MapEventProps);

  const kmz =
    "https://excelviewer.herokuapp.com/upload/temp/kmlviewer/189.6.252.46-63189e90551f29d931ca8b816cc927fa.kmz";
 /*  const kmzToKml =
    "https://excelviewer.herokuapp.com/upload/temp/kmlviewer/189.6.252.46-dcc0109d0072e9e09104cf5394d99158.kml";
  const kmlFile =
    "https://excelviewer.herokuapp.com/upload/temp/kmlviewer/189.6.252.46-552756e0b888481f1a49ebe35df7ea73.kml";
 */
/*   useEffect(() => {
    fetch(
      "https://raw.githubusercontent.com/aviklai/react-leaflet-kml/master/src/assets/example1.kml"
    )
      .then((res) => res.text())
      .then((kmlText) => {
        const parser = new DOMParser();
        const kml = parser.parseFromString(kmlText, "text/xml");
        setKml(kml);
      });
  }, []); */

/*   const readKml = async (data: React.ChangeEvent<HTMLInputElement>) => {

    data.target.files![0].text().then((kmlText) => {
      const parser = new DOMParser();
      const kml = parser.parseFromString(kmlText, "text/xml");
      setKml(kml);
    });
  }; */

  const MapMouseEvent = (e: any) => {
    useMapEvent(e);
  };

  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      {/*       <input name="file" type="file" onChange={(e) => readKml(e)} /> */}

      <LoadScript googleMapsApiKey={ACCESS_TOKEN_GOOGLE_MAPS_API} >
        <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={10} options={{ mapTypeId: 'satellite' }}  >
          <KmlLayer
            onLoad={(e) => {}}
            onUnmount={() => {}}
            url={kmz}
            options={{ preserveViewport: true }}
            onClick={(e) => MapMouseEvent(e)}
          />
        </GoogleMap>
      </LoadScript>

      <div style={{ marginLeft: "2rem" }}>
        <h2>Exemplo de Carregamento HTML do Marker</h2>
        <p
          dangerouslySetInnerHTML={{
            __html: mapEvent.featureData?.infoWindowHtml,
          }}
        />

        <h2>Exemplo dos dados em uma tabela</h2>
        <table>
          <thead>
            <tr>
              <th>Nome</th>
              <th>Texto</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th>{mapEvent.featureData?.name}</th>
              <th>{mapEvent.featureData?.snippet}</th>
            </tr>
          </tbody>
        </table>
      </div>

      {/*   {mapEvent.featureData?.infoWindowHtml} */}

      {/*  <MapContainer
        
        
        style={{ height: "800px", width: "50%" }}
        zoom={10}
        center={[-30.142190720915817, -50.87171092135266]}

      >
        <TileLayer
          url={`https://api.mapbox.com/styles/v1/mapbox/streets-v11/tiles/256/{z}/{x}/{y}@2x?access_token=${process.env.REACT_APP_ACCESS_TOKEN_MAP_BOX}`}
        />
        {kml && <ReactLeafletKml kml={kml}  />}
      </MapContainer> */}
    </div>
  );
}

export default App;
