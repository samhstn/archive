riot.tag2('register', '<h1>Register View</h1> <h4><a href="http://localhost:8000/">Home</a></h4> <form onsubmit="{register}"> <label>Username: </label><input type="text"> <label>Password: </label><input type="password"> <button type="submit">SUBMIT</button> </form>', '', '', function(opts) {

    this.register = function (e) {
      var user = e.target[0].value
      var pass = e.target[1].value
      var payload = {
        username: user,
        password: pass
      };
      request.post('/api/register', payload, function (res) {
        console.log('Response: ', res);
      });
    }.bind(this)

});
