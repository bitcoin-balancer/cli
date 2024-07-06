[< Back](../../README.md)

# Remote Host Configuration

The first step to configure a remote host is to create the `remote-host.config.json` file at the root of the CLI:

```
cli
  │
  ...
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
  "cli": "/home/<YOUR_USERNAME>/Documents/projects/balancer/cli",
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
<br/>
<br/>
<br/>
<br/>

## Connect the CLI to the Remote Host

### Set the Password for `root` (Remote Host)

For Balancer CLI to interact with the remote host via SSH, a password for `root` must be set. Follow these steps from the **remote host**:

1. Log in as `root` with:
    ```bash
    sudo -s
    ```

2. Run the password utility program and enter a strong password:
    ```bash
    passwd
    ```

3. Enable `root` login:
    ```bash
    vim /etc/ssh/sshd_config

    # look for the following block:

    # Authentication
    # ...
    #PermitRootLogin prohibit-password
    PermitRootLogin yes # <- enable this line temporarily
    # ...
    ```

4. Restart the service:
    ```bash
    sudo systemctl restart ssh
    ```

<br/>

### Copy the SSH Public Key (Local Host)

1. Start the CLI, run the `Host/ssh-copy-id` action and enter the password you set earlier on `root` when the prompt shows up

2. The SSH Public Key is now saved in the remote host. However, since your SSH keyring has a passphrase (or it should!), it will ask you for it every time you want to execute a remote action. In order to avoid this practice, you can make use of `ssh-agent`:

    ```bash
    # start the ssh-agent in the background
    eval "$(ssh-agent -s)"

    # add your SSH private key to the ssh-agent
    ssh-add /home/<YOUR_USER>/.ssh/id_rsa
    ```
    - **Note:** if you were already making use of the `ssh-agent`, you may need to delete (`ssh-add -d /home/<YOUR_USER>/.ssh/id_rsa`) and re-add the your identity. 

<br/>

### Clean Up (Remote Host)

1. Now that the SSH Public Key has been installed on the remote, update the `sshd_config` to disallow password logins:
    ```bash
    vim /etc/ssh/sshd_config

    # go back to the authentication block:

    # Authentication
    # ...
    PermitRootLogin prohibit-password # <- uncomment this line
    # PermitRootLogin yes <- this line is no longer needed
    # ...
    ```

2. Restart the service so the changes are applied:
    ```bash
    sudo systemctl restart ssh
    ```

<br/>

**Important:** Make sure to use a strong password because whoever has it, can access and manage your remote host unless you disable the `PermitRootLogin yes` as instructed earlier.



<br/>

### Sources

- [What is the password for `ssh root@localhost`?](https://askubuntu.com/questions/171521/what-is-the-password-for-ssh-rootlocalhost)
- [SSH error: Permission denied, please try again](https://askubuntu.com/questions/315377/ssh-error-permission-denied-please-try-again)
- [Generating a new SSH key and adding it to the ssh-agent](https://docs.github.com/en/authentication/connecting-to-github-with-ssh/generating-a-new-ssh-key-and-adding-it-to-the-ssh-agent)
- [Git keeps asking me for my ssh key passphrase](https://stackoverflow.com/questions/10032461/git-keeps-asking-me-for-my-ssh-key-passphrase)



<br/>
<br/>
<br/>
<br/>
<br/>

## Install `Docker` on the Remote Host

[Install Docker Engine on Ubuntu](https://docs.docker.com/engine/install/ubuntu/)

Verify the installation was successful and that you have a compatible version (Docker Engine `^v27.0.3` & Docker Compose `^v2.28.1`):
```bash
docker version
# Client: Docker Engine - Community
#  Version:           27.0.3
# ...
# Server: Docker Engine - Community
# Engine:
#  Version:          27.0.3
# ...

docker compose version
# Docker Compose version v2.28.1
# ...
```




<br/>
<br/>
<br/>
<br/>
<br/>

## Install `nvm` on the Remote Host

[Installing & Updating nvm](https://github.com/nvm-sh/nvm?tab=readme-ov-file#installing-and-updating)

Once `nvm`'s installation is complete, install the version required by Balancer (Node.js `^22.3.0` & npm `^10.8.1`):
```bash
# install the specific version
nvm install 22.3.0

# activate it
nvm use 22.3.0
```

Finally, verify the installation was successful:
```bash
node --version
# v22.3.0

npm --version
# 10.8.1
```

### Troubleshooting

If you get the error `nvm: command not found` or see no feedback on the terminal, simply close the current terminal and open a new one.




<br/>
<br/>
<br/>
<br/>
<br/>

## Setting a Static IP on the Remote Host (Optional)

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
      optional: true
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

<br/>

### Sources

- [Setting a Static IP in Ubuntu – Linux IP Address Tutorial](https://www.freecodecamp.org/news/setting-a-static-ip-in-ubuntu-linux-ip-address-tutorial/)
- [Netplan - gateway has been deprecated](https://askubuntu.com/questions/1410750/netplan-gateway-has-been-deprecated)
- [Very long startup time on Ubuntu Server (network configuration)](https://askubuntu.com/questions/1321443/very-long-startup-time-on-ubuntu-server-network-configuration)