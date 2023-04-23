let App = new Vue({ // The Vue instance
    el: '#app',
    data: {
         user:[],
         login:true,
         search:'',
         urls: "firstApplication-env-1.eba-chfmnifa.eu-west-2.elasticbeanstalk.com",
    },

    created: function () {
        fetch("http://firstapplication-env-1.eba-chfmnifa.eu-west-2.elasticbeanstalk.com/collections/User")
          .then((response) => response.json())
          .then((user) => {
            this.user = user;
            return;
          });
        // this.getLessons();
        return;
    },
    methods:{ // methods to be used
        getUsers() {
          const url = `${this.urls}/collections/User`;
          fetch(url)
            .then((response) => {
              if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
              }
              return response.json();
            })
            .then((user) => {
              this.user = user;
            })
            .catch((Error) => {
              console.log("Error", Error);
            });
        },
        logIn(){
          let email = document.getElementById("inputEmail").value;
          let password = document.getElementById("inputPassword").value;
          for(user in this.user){
            if(email==user.Email){
              if(password==user.Password){
                login=false;
              }
            }
          }
        }
    }

})

