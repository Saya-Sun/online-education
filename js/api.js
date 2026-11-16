/**
 * ============================================================
 * ONLINE LEARNING PLATFORM
 * Frontend API Client
 * Created by Tr. Sun
 * ============================================================
 */


/* ============================================================
   API URL
   ============================================================ */

function getApiUrl() {

    if (
        typeof APP_CONFIG === 'undefined' ||
        !APP_CONFIG.API_URL
    ) {

        throw new Error(
            'API URL is not configured.'
        );

    }

    return APP_CONFIG.API_URL;

}


/* ============================================================
   API REQUEST
   ============================================================ */

/**
 * Send data to Google Apps Script.
 *
 * IMPORTANT:
 * We use application/x-www-form-urlencoded
 * instead of application/json.
 *
 * This avoids the browser sending an OPTIONS
 * preflight request to Google Apps Script.
 */

async function apiRequest(data) {

    if (
        !data ||
        typeof data !== 'object'
    ) {

        throw new Error(
            'Invalid API request.'
        );

    }


    const apiUrl =
        getApiUrl();


    /*
     * Convert object to URL encoded parameters.
     */

    const body =
        new URLSearchParams();


    Object.keys(data).forEach(
        function(key) {

            const value =
                data[key];


            if (
                value !== undefined &&
                value !== null
            ) {

                body.append(
                    key,
                    String(value)
                );

            }

        }
    );


    console.log(
        'API request:',
        data.action
    );


    let response;


    try {

        response =
            await fetch(
                apiUrl,
                {

                    method: 'POST',

                    headers: {

                        'Content-Type':
                            'application/x-www-form-urlencoded;charset=UTF-8'

                    },

                    body: body.toString()

                }
            );

    } catch (error) {

        console.error(
            'Network error:',
            error
        );

        throw new Error(
            'Unable to connect to the server.'
        );

    }


    /*
     * Read response as text first.
     */

    const text =
        await response.text();


    console.log(
        'API raw response:',
        text
    );


    /*
     * Google Apps Script should return JSON.
     */

    let result;


    try {

        result =
            JSON.parse(text);

    } catch (error) {

        console.error(
            'Invalid JSON response:',
            text
        );


        throw new Error(
            'Invalid server response: ' +
            text.substring(0, 500)
        );

    }


    return result;

}


/* ============================================================
   TEST API
   ============================================================ */

async function testApi() {

    return apiRequest({

        action: 'test'

    });

}