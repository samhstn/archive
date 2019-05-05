(function (exp) {
  function request (method, url, payload, cb) {
    var xhr = new XMLHttpRequest();
    var payloadString = JSON.stringify(payload);

    xhr.onreadystatechange = function () {
      if (xhr.readyState === 4 && xhr.status === 200) {
        cb(xhr.responseText);
      }
    };
    xhr.open(method, url);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send(payloadString);
  };

  var get = function (url, cb) {
    request('GET', url, null, cb);
  };

  var post = function (url, payload, cb) {
    request('POST', url, payload, cb);
  };

  exp.request = {
    get: get,
    post: post
  };
})(window);
