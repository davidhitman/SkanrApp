let app = new Vue({ // The Vue instance
    el: '#app',
    data: {
         user:[],
         showUsers: true,
         search:'',
         urls: "Firstapplication-env.eba-chfmnifa.eu-west-2.elasticbeanstalk.com",
    },

    created: function () {
        fetch("Firstapplication-env.eba-chfmnifa.eu-west-2.elasticbeanstalk.com/collections/Users")
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
          const url = `${this.urls}/collections/Users`;
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
        }
    }

})

