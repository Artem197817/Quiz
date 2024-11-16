import config from "../../config/config.js";


export class Auth{

    static accessTokenKey = 'accessToken';
    static refreshTokenKey = 'refreshToken';
    static userInfoKey = 'userInfo';

    static setToken(accessToken, refreshToken){
     
        localStorage.setItem(this.accessTokenKey, accessToken);
        localStorage.setItem(this.refreshTokenKey, refreshToken);

    }

    static async processUnAuthResponse(){
        const refreshToken = localStorage.getItem(this.refreshTokenKey);
        if(refreshToken){
            const response = await fetch( config.host + '/refresh', {
                  method: 'POST',
                    headers: {
                        'Content-type': 'application/json',
                        'Accept': 'application/json'
                    },
                    body: JSON.stringify({refreshToken: refreshToken})
                    })
                    if(response && response.ok){
                        const result = response.json();
                        if(result && !result.error){
                                this.setToken(result.accessToken, result.refreshToken)
                                return true;
                        } 
                    }

        }
        this.removeToken();
        location.href = '#/'
        return false;
    }

    static removeToken(){
     
        localStorage.removeItem(this.accessTokenKey);
        localStorage.removeItem(this.refreshTokenKey);

    }

    static async logout(){
        const refreshToken = localStorage.getItem(this.refreshTokenKey);
        const response = await fetch( config.host + '/logout', {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({refreshToken: refreshToken})
        })
        if(response && response.ok){
            const result = response.json();
            if(result && !result.error){
                Auth.removeToken();
                localStorage.removeItem(Auth.userInfoKey);
                return true;
            }
        }
    }

    static setUserInfo(info){
        localStorage.setItem(this.userInfoKey, JSON.stringify(info));
    }

    static getUserInfo(){
       const  userInfo = localStorage.getItem(this.userInfoKey);
        if(userInfo){
            return JSON.parse(userInfo);
        }
        return null;
    }

}