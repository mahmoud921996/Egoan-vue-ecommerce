import {defineStore} from 'pinia'
import {Auth , Authentication} from'../types/index';
let timer: number | undefined;
export const useAuth = defineStore('auth',{
    state(){
        return{
            token:'' as string,
        }
    },
    getters:{
        isAuthenticated():boolean{
            return !!this.token
        },
        getToken(): string{
            return this.token
        },
  

    },
    actions:{
       async auth(payload:Authentication){
            const mode = payload.mode;
            let url;
            if(mode === 'signup'){
           url=`https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDjL9WkvRQp4u7cYsnVynus_gDG2olFCB0`
            }else{
            url=`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDjL9WkvRQp4u7cYsnVynus_gDG2olFCB0`
            }
            const response = await fetch(url , {
                method:"POST",
                body:JSON.stringify({
                    email:payload.email,
                    password:payload.password,
                    returnSecureToken: true

                })
            })
            const responseData = await response.json()
            if (!response.ok) {
                const error = new Error(
                  responseData.message || "Failed to authenticate. Check your login data."
                );
                throw error;
              }
              const expiresIn = +responseData.expiresIn *1000;
            //  const expiresIn = 5000;
              const expirationDate = new Date().getTime() + expiresIn;
              localStorage.setItem("token", responseData.idToken);
              localStorage.setItem("tokenExpiration", expirationDate.toString());
              timer = setTimeout( () => {
              this.logout()
              }, expiresIn);
              this.token =responseData.idToken
        },
       async login(payload:Auth){
          return this.auth({...payload , mode:'login'})
        },
       async signUp(payload:Auth){
           return this.auth({...payload , mode:"signup"})
        },
        // auto login user when refresh the page
        async tryLogin(){
            const token = localStorage.getItem("token");
            const expirationDate = localStorage.getItem("tokenExpiration")!;
            const expiresIn = +expirationDate - new Date().getTime();
            if (expiresIn < 0) {
                return;
              }
              timer = setTimeout( () => {
               this.logout()
              }, expiresIn);
              if (token ) {
                this.token=token
              }
        },

           logout() {
            localStorage.removeItem("token");
            localStorage.removeItem("tokenExpiration");
            clearTimeout(timer);
            this.token=''
          },
        
    }
})