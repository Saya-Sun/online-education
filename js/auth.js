/**
 * ============================================================
 * ONLINE LEARNING PLATFORM
 * Authentication Client
 * Created by Tr. Sun
 * ============================================================
 */


/**
 * Save login session
 */
function saveSession(result) {

    localStorage.setItem(
        'authToken',
        result.token
    );

    localStorage.setItem(
        'currentUser',
        JSON.stringify(result.user)
    );
}


/**
 * Get token
 */
function getAuthToken() {

    return localStorage.getItem(
        'authToken'
    );
}


/**
 * Get cached user
 */
function getCurrentUser() {

    const data =
        localStorage.getItem(
            'currentUser'
        );

    if (!data) {
        return null;
    }

    try {
        return JSON.parse(data);
    } catch (error) {
        return null;
    }
}


/**
 * Logout
 */
async function logout() {

    const token =
        getAuthToken();

    if (token) {

        await apiRequest({

            action: 'logout',

            token: token
        });
    }

    localStorage.removeItem(
        'authToken'
    );

    localStorage.removeItem(
        'currentUser'
    );

    window.location.href =
        'login.html';
}


/**
 * Require login
 */
async function requireLogin() {

    const token =
        getAuthToken();

    if (!token) {

        window.location.href =
            'login.html';

        return null;
    }

    const result =
        await apiRequest({

            action: 'getCurrentUser',

            token: token
        });

    if (!result.success) {

        localStorage.removeItem(
            'authToken'
        );

        localStorage.removeItem(
            'currentUser'
        );

        window.location.href =
            'login.html';

        return null;
    }

    localStorage.setItem(

        'currentUser',

        JSON.stringify(result.user)
    );

    return result.user;
}