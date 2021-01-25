
/**
 * Custom made requester
 * @param {string} url request url
 * @param {object} param param object 
 * @param {function} err for error message
 */
export async function makeGetRequest(url, { params = {} } = {}, err) {
    try {
        var u = new URL(`http://localhost:8080/api${url}`);
        u.search = new URLSearchParams(params).toString();
        try{
            var result = await fetch(u, {
                method: 'GET',
                mode: 'cors'
            });
            console.log("FETCH PART 1 => ", result);
            var data = await result.json();
            console.log("FETCH PART 2 => ", data);
        } catch(e){
            console.error(e);
            return;
        }


        if (data.success) {
            return data.data;
        } else {
            console.error('Server message and devMessage:', data);
        }
    } catch (error) {
        console.error(error);
    }

    return false;
}

/**
 * Custom made requester
 * @param {string} url request url
 * @param {object} param param object 
 * @param {function} err for error message
 */
export async function makePostRequest(url, { obj = undefined, params = {} } = {}, err) {
    console.log('OBJ =>', obj);
    console.log('PARAMS =>', params);
    var u = new URL(`http://localhost:8080/api${url}`);
    u.search = new URLSearchParams(params).toString();
    try{
        var result = await fetch(u, {
            method: 'POST',
            mode: 'cors',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(obj)
        });
        console.log("FETCH PART 1 => ", result);
        var data = await result.json();
        console.log("FETCH PART 2 => ", data);
        if (data.success) {
            return data.data;
        }
    } catch(e){
        console.error(e);
        err(e);
        return;
    }
    
    return false;
}

export const roundTo = (inNum, exp = 0) => {
    if (!inNum) return inNum;
    const num = Number(inNum);
    if (isNaN(num)) throw new Error('func roundTo -> received NaN');
    const decimal = Math.pow(10, exp);
    return Math.round((num + Number.EPSILON) * decimal) / decimal;
}