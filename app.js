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
        
        
        async getUsers() {
        try {
          const url = `${this.urls}/collections/User/search/${this.searchText}`;
  
          const response = await fetch(url);
  
          this.user = await response.json();
        } catch (error) {
          this.error = error;
        }
      },
          
//         getUsers() {
//           const url = `${this.urls}/collections/User`;
//           fetch(url)
//             .then((response) => {
//               if (!response.ok) {
//                 throw new Error(`HTTP error! status: ${response.status}`);
//               }
//               return response.json();
//             })
//             .then((user) => {
//               this.user = user;
//             })
//             .catch((Error) => {
//               console.log("Error", Error);
//             });
//         },
        logIn(){
          a = true;
          let email = document.getElementById("inputEmail").value;
          let password = document.getElementById("inputPassword").value;
          
          for (user in this.user){
            let storedEmail = this.user[user].Email;
            let storedPassword = this.user[user].Password;
            if (email===storedEmail){
              if(password===storedPassword ){
                this.login=false;
              }
            }
          }
        }
    },
    computed:{
      searchLesson () { // function searching for the lesson
        tempUsers = this.user;

        if (this.search != '' && this.search) {
            tempUsers = tempUserss.filter((item) => {
                return item.Event.toUpperCase().includes(this.search.toUpperCase()) 
                //item.Location.toUpperCase().includes(this.search.toUpperCase())
            })
        
        }
        return tempUsers
      }
    }

})

