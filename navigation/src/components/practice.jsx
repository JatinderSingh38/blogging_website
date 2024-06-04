import { useState } from "react";
const Geolocation = () => {
    const [lat, lati1] = useState(null);
    const [lon, longi1] = useState(null);
    if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition(function (position) {
            lati1(position.coords.latitude);
            longi1(position.coords.longitude);
            // console.log(lati, 'lati', longi, 'long')
        });
    }
    return (
        <div>
            <div>latitude:{lat}</div>
            <div>londitude:{lon}</div>
        </div>
    )
}
export default Geolocation
