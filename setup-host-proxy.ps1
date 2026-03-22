netsh interface portproxy delete v4tov4 listenport=9223 listenaddress=0.0.0.0 2>$null

# 1) пробрасываем 0.0.0.0:9223 -> 127.0.0.1:9223
netsh interface portproxy add v4tov4 `
  listenaddress=0.0.0.0 listenport=9223 `
  connectaddress=127.0.0.1 connectport=9223

# 2) открываем 9223 в Windows Firewall
netsh advfirewall firewall add rule `
  name="Chrome DevTools 9223 WSL" `
  dir=in action=allow protocol=TCP localport=9223
