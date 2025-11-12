export const msalConfig = {
    auth: {
        clientId: "ENTER_YOUR_CLIENT_ID_HERE",
        authority: "https://login.microsoftonline.com/ENTER_YOUR_TENANT_ID_HERE", 
        redirectUri: "/", 
        postLogoutRedirectUri: "/"
    },
    cache: {
        cacheLocation: "sessionStorage",
        storeAuthStateInCookie: false,
    },
};
export const loginRequest = {
    scopes: ["User.Read"]
};
