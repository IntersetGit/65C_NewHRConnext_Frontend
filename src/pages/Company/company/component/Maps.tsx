import React, { useEffect, useState } from 'react'
import { Wrapper, Status } from "@googlemaps/react-wrapper";
import {
  GoogleMap,
  Marker,
  SvgMarker,
  Overlay,
  Polyline,
  EncodedPolyline
} from "googlemaps-react-primitives";

const API_KEY = "";

function MyMarker(props: google.maps.MarkerOptions) {
  return (
    <Marker
      {...props}
      icon={{
        path:
          "M9 22C9 22 18 16 18 9C18 4.02944 13.9706 0 9 0C4.02944 0 0 4.02944 0 9C0 16 9 22 9 22ZM12 9C12 10.6569 10.6569 12 9 12C7.34315 12 6 10.6569 6 9C6 7.34315 7.34315 6 9 6C10.6569 6 12 7.34315 12 9Z",
        strokeColor: "#FFFFFF",
        fillColor: "#009A9E",
        fillOpacity: 0.8,
        scale: 1.5,
        anchor: new google.maps.Point(9, 22)
      }}
    />
  );
}

function renderLoadingStatus(status: Status) {
  return <h1>{status}</h1>;
}

const Maps = ({ onChange, defaulCenter }) => {
  const [loading, setloading] = useState(false);
  const [marker, setMarker] = useState(defaulCenter ? defaulCenter : undefined);

  useEffect(() => {
    onChange(marker);
  }, [marker])

  return (
    <div style={{ width: "100%", margin: "10vh auto" }}>
      <Wrapper
        apiKey={API_KEY}
        libraries={["geometry"]}
        render={renderLoadingStatus}
      >
        <GoogleMap
          style={{ height: "50vh", marginBottom: "1em" }}
          fullscreenControl={false}
          mapTypeControl={false}
          streetViewControl={false}
          zoomControl={false}
          keyboardShortcuts={false}
          backgroundColor="#c8c8c8"
          // styles={styles}
          center={defaulCenter ? defaulCenter : { lat: 13.7740564, lng: 100.7852518 }}
          autoFit
          onIdle={() => {
            setloading(true);
          }}
          onClick={(l) => setMarker(l?.latLng?.toJSON() as any)}
        >
          {loading && <>
            {marker &&
              <Marker position={{ lat: marker.lat, lng: marker.lng }} />
            }

            {/* <Overlay position={{ lat: 53.551086, lng: 9.993682 }}>
              <div
                style={{
                  transform: "translateX(-50%)",
                  backgroundColor: "#fff",
                  borderRadius: "5px",
                  padding: "10px",
                  boxShadow: "5px 5px 10px #0005"
                }}
              >
                Moin!
              </div>
            </Overlay> */}
            {/* <Polyline
              path={[
                { lat: 48.137154, lng: 11.576124 },
                { lat: 48.210033, lng: 16.363449 }
              ]}
              strokeColor="red"
            />
            <EncodedPolyline locations="ayp_I}cypAgkhElgyS" strokeColor="teal" /> */}
          </>
          }
        </GoogleMap>
      </Wrapper>
    </div>
  );
}


export default Maps