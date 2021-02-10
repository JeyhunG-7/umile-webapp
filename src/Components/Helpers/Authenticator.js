import { GetAuthToken, SetAuthToken, RemoveAuthToken } from './LocalStorage';

export async function IsSignedInAsync() {
    var auth_token = GetAuthToken();
    if (!auth_token){
        return false;
    }

    try{
        var rawData = await fetch('/api/clients/login', {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${auth_token}`
            }
        });
        var response = await rawData.json();
        
        if (!response.success){
            RemoveAuthToken();
            return false;
        }

        return true;
    } catch(e){
        console.error(e);
        return false;
    }   
}

export async function AuthenticateAsync(email, password) {
    try{
        var rawData = await fetch('/api/clients/login', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username: email,
                password: password,
            })
        });
        var response = await rawData.json();
        if (response.success){
            SetAuthToken(response.data);
            return [true, ''];
        } else {
            return [false, response.message];;
        }
    } catch(e){
        console.error(e);
        return [false, 'Something went wrong while login in. Please try again later'];
    }    
}

export async function logoutAsync() {
    var auth_token = GetAuthToken();
    if (!auth_token){
        return false;
    }

    try{
        var rawData = await fetch('/api/clients/logout', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${auth_token}`
            }
        });
        var response = await rawData.json();
        
        if (!response.success){
            console.log('Error while logging out');
        }
    } catch(e){
        console.error(e);
    } finally {
        RemoveAuthToken();
        return true;
    }
}