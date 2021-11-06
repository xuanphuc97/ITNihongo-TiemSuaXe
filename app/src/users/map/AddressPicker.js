import React, { useState, useEffect } from 'react'
import GooglePlacesAutocomplete, { geocodeByAddress, getLatLng } from 'react-google-places-autocomplete';

function AddressPicker() {

    const [address, setAddress] = useState("")
    return (
        <div>
            <GooglePlacesAutocomplete
                apiKey="AIzaSyC8RZDBo5cTzzcykMrPS9qhykhSqH_4THU"
                selectProps={{
                    isClearable: true,
                    value: address,
                    onChange: (val) => {
                        setAddress(val);
                    }
                }}
                onFail={error => console.error(error)}
            />
        </div>

    );
}

export default AddressPicker
