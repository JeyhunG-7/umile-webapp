import React, { useContext, useEffect, useState } from 'react';
import { makeGetRequest, makePostRequest } from '../Utils/Fetch';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { TextField } from '@material-ui/core';
import { GlobalContext, SEVERITY } from './GlobalContext';

const google = window.google;
const googleAutocomplete = new google.maps.places.AutocompleteService();
const googlePlaces = new google.maps.places.PlacesService(document.createElement('div'));

//TODO: need to make this controlled component i.e. to able to feed value to props. 
// So it can be reset when need (e.g. when order submitted we need to clear values)
export function AddressInput(props) {

    const { setAlert } = useContext(GlobalContext);

    const [list, setAutocompleteList] = useState([]);
    const [searchText, setSearchText] = useState('');

    useEffect(() => {
        setSearchText(props.value || '');
    }, [props.value]);

    async function onInputChange(e) {
        let inputValue = e.target.value;
        setSearchText(inputValue);
        console.log("Search text: ", searchText);

        // doesn't make sense to check for autocomplete options when removing values
        if (e.nativeEvent.inputType.includes('delete')) {
            return;
        }

        var localSearch = await makeGetRequest('/places/search', { auth: true, query: { term: e.target.value } });

        if (localSearch) {
            localSearch = localSearch.map(l => l.address);
            if (localSearch.length >= 5) {
                // Set autocomplete to localSearch
                setAutocompleteList(localSearch);
                return;
            }
        } else if (!localSearch) {
            localSearch = [];
        }

        googleAutocomplete.getPlacePredictions({
            input: inputValue,
            location: new google.maps.LatLng(51.048535, -114.077327),
            radius: 50,
            types: ['address']
        }, (predictions) => {
            if (!predictions) {
                return;
            }

            // Remove extra parts of address
            predictions.map(p => localSearch.push(p.description.split(",", 3).join(",")));
            setAutocompleteList(localSearch.splice(0, 5));
        });
    }

    async function onPlaceSelected(val) {
        if (!val || val === '') {
            return;
        }

        //TODO: get place id from places api
        var localSearch = await makeGetRequest('/places/search', { auth: true, query: { term: val } });
        if (localSearch && localSearch.length === 1) {
            console.log('local address found: ', localSearch);
            props.selectedAddress(localSearch[0].id, localSearch[0].address);
            return;
        }

        var opts = {
            query: val,
            fields: ['place_id', 'formatted_address', 'geometry']
        };

        googlePlaces.findPlaceFromQuery(opts, async (result) => {
            if (result && result.length === 1) {
                var { formatted_address, place_id, geometry } = result[0];

                // Regex to find Postal code and everything after
                let regEx = / [A-Z]{1}[0-9]{1}[A-Z]{1} [0-9]{1}[A-Z]{1}[0-9]{1}.*/
                formatted_address = formatted_address.replace(regEx, "");

                opts = {
                    auth: true,
                    body: {
                        providerId: place_id,
                        address: formatted_address,
                        type: 'address',
                        lat: geometry.location.lat(),
                        lng: geometry.location.lng()
                    }
                }

                result = await makePostRequest('/places/save', opts);
                if (result) {
                    props.selectedAddress(result, formatted_address);
                } else {
                    setAlert({ message: 'Something went wrong while selecting address', severity: SEVERITY.ERROR });
                }
            } else {
                // TODO: show error to user to select precise address
                // in theory we shouldn't hit this
            }
        });
    }

    return (
        <Autocomplete freeSolo
            options={list}
            autoHighlight
            onChange={(event, value) => onPlaceSelected(value)}
            fullWidth
            style={{ width: props.width, backgroundColor: (props.disabled ? 'rgb(240, 240, 240)' : '#fff') }}
            disabled={props.disabled}
            value={searchText}
            renderInput={
                (params) => <TextField {...params}
                    onChange={onInputChange}
                    variant="outlined"
                    label="Address"
                    value={searchText}
                    error={props.showError}
                    helperText={props.errorMessage}
                    inputProps={{ ...params.inputProps, autoComplete: 'new-password' }} />
            }
        />
    );
}