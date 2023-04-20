let app = new Vue({ // The Vue instance
    el: '#app',
    data: {
         user:[],
         showUsers: true,
         search:'',
         urls: "mongodb+srv://hitimanadavid:David25092@userstables.rxlq3xj.mongodb.net/?retryWrites=true&w=majority",
    },

    created: function () {
        fetch("mongodb+srv://hitimanadavid:David25092@userstables.rxlq3xj.mongodb.net/?retryWrites=true&w=majority/collections/Users")
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

