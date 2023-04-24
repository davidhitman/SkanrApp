let App = new Vue({ // The Vue instance
  el: '#app',
  data: {
       user:[],
       login:true,
       homePage:false,
       searchText: "",
       urls: "firstApplication-env-1.eba-chfmnifa.eu-west-2.elasticbeanstalk.com/collections",
  },

    // fetching the details from database

  created: function () {
      fetch("http://firstapplication-env-1.eba-chfmnifa.eu-west-2.elasticbeanstalk.com/collections/User")
        .then((response) => response.json())
        .then((user) => {
          this.user = user;
          return;
        });
      return;
  },
  
  methods:{ // methods to be used
    async getUsers() {
      try {
        const url = `http://firstapplication-env-1.eba-chfmnifa.eu-west-2.elasticbeanstalk.com/collections/User/search/${this.searchText}`;
        const response = await fetch(url);

        this.user = await response.json();
      } catch (error) {
        this.error = error;
      }
    },
      
      
    // method to check if the user needs to signUp
    signUp(){
      this.login=false;
      this.homePage=false;
    },
    // method for logIn 
    logIn(){
      let email = document.getElementById("inputEmail").value;
      let password = document.getElementById("inputPassword").value;
      for (user in this.user){
        let storedEmail = this.user[user].Email;
        let storedPassword = this.user[user].Password;
        if (email===storedEmail){
          if(password===storedPassword ){
            this.login=false;
            this.homePage=true;
          }
        }
      }
    },
    // signUp method add new user
    addUsers (newUser){
      fetch("http://firstapplication-env-1.eba-chfmnifa.eu-west-2.elasticbeanstalk.com/collections/User", {
        method: "POST", //set the HTTP method as "POST"
        headers: {
          "Content-Type": "application/json", //set the data type as JSON
        },
        body: JSON.stringify(newUser) //need to stringigy the JSON
      }).then(
        function(response) {
          response.json().then(
            function(json) {
              console.log("Success: " + json.acknowledged);
              
            }
         )}
      );
    },

      //////// sign up collection of data User Input
    collectSignUpData(){
      let enteredName = document.getElementById("name").value;
      let enteredProfession = document.getElementById("profession").value;
      let enteredEvent = document.getElementById("event").value;
      let enteredEmail = document.getElementById("email").value;
      let enteredPassword = document.getElementById("password").value;
      let image = document.getElementById("image").files[0];

      this.addUsers({
        name: enteredName,
        Profession: enteredProfession,
        Event: enteredEvent,
        Email: enteredEmail,
        Password:enteredPassword
      });
      alert("User Has been saved");
    }
  },
  watch: {
    searchText: {
      handler(val) {
        this.getUsers();
      },
    },
  },
})
//document.querySelector('a').addEventListener('click', App.signUp);
