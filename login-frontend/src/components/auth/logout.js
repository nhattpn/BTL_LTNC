const BASE_URL = 'http://localhost:5000'
export const LogOut = async () => {
    const API_URL = BASE_URL + '/logout';
    try {
        const response = await fetch(API_URL,{
            method: 'GET'
        });
        sessionStorage.clear();
        console.log('Logged out successfully (backend)');
    } catch (error) {
        console.error('Error logging out (backend):', error);
    } finally {
        window.location.href = '/';
    }
};
;