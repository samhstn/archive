<app>
  <h1>Login View</h1>

  <h4><a href="/">Home</a></h4>

  <form onsubmit={ login }>

    <label>Username: </label><input type="text" />
    <label>Password: </label><input type="password" />

    <button type="submit">SUBMIT</button>

  </form>

  <script>

    login (e) {
      var user = e.target[0].value
      var pass = e.target[1].value
      var payload = {
        username: user,
        password: pass
      };
      request.post('/api/login', payload, function (res) {
        console.log('Response: ', res);
      });
    }

  </script>
</app>
