# Emergency Chat SystemX !

## Create Service with using Systemd

1. Create some name that you want and add extension ".service" after your service name => simple.service
2. sudo nano your name.service
3. Add this code to your service
```
[Unit]
Description=Your Description
After=multi-user.target

[Service]
Type=idle
ExecStart=/Path to run the program/ /Path to run file/
Restart=always
RestartSec=5

[Install]
WantedBy=multi-user.target
```
4. Save and exit
5. give a 644 permission to your file service with chmod 
6. run this two command to operate your service
```
sudo systemctl daemon-reload
sudo systemctl enable /path of yourservice.service
```
7. reboot the system
8. to grab the log, use this command
```
sudo systemctl status yourservice
```