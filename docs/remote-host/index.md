[< Back](../../README.md)

# Remote Host Configuration

The first step to configure a remote host is to create the `remote-host.config.json` file at the root of the CLI:

```
cli
  │
  src/
  │  └───...
  ...
  package-lock.json
  package.json
  remote-host.config.json <- configuration file
  tsconfig.json
  ...
```

The schema of the configuration file is as follows:

```json
{
  "sshPrivateKey": "/home/<YOUR_USERNAME>/.ssh/id_rsa",
  "server": {
    "name": "root",
    "ip": "<REMOTE_IP_ADDRESS>"
  },
  "sourceCode": [
    "dist",
    "package-lock.json",
    "package.json"
  ]
}
```





<br/>

## Setting a Static IP on the Remote

If your remote host is within your local network, setting a static IP Address will simplify your workflow significantly. The steps to do so are:

1. Find the currently assigned IP and the available adapters:
```bash
ip a
```

2. [Netplan](https://netplan.io/) is the network management for Ubuntu.
```bash
# go to the directory
cd /etc/netplan

# view an example provided by netplan
cat /usr/share/doc/netplan/examples/static.yaml

# create the following file if it doesn't exist
sudo vim 01-network-manager-all.yaml
```

3. Enter the following contents in the `01-network-manager-all.yaml` file:
```yaml
network:
  version: 2
  renderer: networkd
  ethernets:
    enp0s25: # the adapter shown in the first step
      addresses:
        - 172.16.20.254/24 # the ip you wish to set
      nameservers:
        addresses: [8.8.8.8,8.8.8.4] # Google's DNS Servers
      routes:
        - to: default
          via: 8.8.8.8
```

4. Finally, apply the changes:
```bash
sudo netplan generate
sudo netplan apply
```

5. Confirm the changes have taken place:
```bash
ip a
```

### Sources

- [Setting a Static IP in Ubuntu – Linux IP Address Tutorial](https://www.freecodecamp.org/news/setting-a-static-ip-in-ubuntu-linux-ip-address-tutorial/)
- [Netplan - gateway has been deprecated](https://askubuntu.com/questions/1410750/netplan-gateway-has-been-deprecated)