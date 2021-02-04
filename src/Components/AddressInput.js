import React, { useEffect, useState } from 'react';
import { makeGetRequest } from '../Utils/Fetch';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { TextField } from '@material-ui/core';

var g_api = "AIzaSyB0XEPXM2X4A6eB2l1G9bYaYJWmoE6mX88";

const google = window.google;
const googleAutocomplete = new google.maps.places.AutocompleteService();

export function AddressInput(props) {

    const [value, setValue] = useState('');
    const [list, setAutocompleteList] = useState([]);

    async function onInputChange(e) {
        let inputValue = e.target.value;
        setValue(inputValue);

        // doesn't make sense to check for autocomplete options when removing values
        if (e.nativeEvent.inputType.includes('delete')){
            return;
        }

        var localSearch = await makeGetRequest('/places/search', { auth: true, query: { term: e.target.value } });

        if (localSearch && localSearch.length >= 5){
            // Set autocomplete to localSearch
            setAutocompleteList(localSearch);
            return;
        } else if (!localSearch){
            localSearch = [];
        }

        googleAutocomplete.getPlacePredictions({
            input: inputValue,
            location: new google.maps.LatLng(51.048535, -114.077327),
            radius: 50
        }, (predictions) => {
            localSearch.concat(predictions.map(p => localSearch.push(p.description)));
            setAutocompleteList(localSearch.splice(0, 5));
        });
    }

    function onPlaceSelected(val){
        props.selectedAddress(val);
    }

    return (
            <Autocomplete freeSolo options={list} autoSelect autoHighlight onChange={(event, value) => onPlaceSelected(value)} fullWidth style={{width: props.width}}
                        renderInput={
                            (params) => <TextField {...params} onChange={onInputChange} variant="outlined" label="Address" margin="normal" error={props.errorMessage} helperText={props.errorMessage} inputProps={{...params.inputProps, autocomplete: 'new-password'}} />
                        } 
            />
    );
}