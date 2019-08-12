https://docs.datastax.com/en/cassandra/2.1/cassandra/reference/referenceStartStopTOC.html

## Starting Cassandra as a service
Start the Cassandra Java server process for packaged installations.
Starting Cassandra as a stand-alone process
Start the Cassandra Java server process for tarball installations.
Stopping Cassandra as a service
Stopping the Cassandra Java server process on packaged installations.
Stopping Cassandra as a stand-alone process
Stop the Cassandra Java server process on tarball installations.
Clearing the data as a service
Remove all data from a package installation. Special instructions for AMI restart.
Clearing the data as a stand-alone process
Remove all data from a tarball installation.

### Starting Cassandra as a service
Start the Cassandra Java server process for packaged installations.

Startup scripts are provided in the /etc/init.d directory. The service runs as the cassandra user.

Procedure
You must have root or sudo permissions to start Cassandra as a service.

On initial start-up, each node must be started one at a time, starting with your seed nodes:
$ sudo service cassandra start
On Enterprise Linux systems, the Cassandra service runs as a java process.

### Starting Cassandra as a stand-alone process
Start the Cassandra Java server process for tarball installations.

Procedure
On initial start-up, each node must be started one at a time, starting with your seed nodes.

To start Cassandra in the background:
$ cd install_location 
$ bin/cassandra
To start Cassandra in the foreground:
cd install_location
$ bin/cassandra -f

### Stopping Cassandra as a service
Stopping the Cassandra Java server process on packaged installations.

Procedure
You must have root or sudo permissions to stop the Cassandra service:
```bash
sudo service cassandra stop
```


### Stopping Cassandra as a stand-alone process
Stop the Cassandra Java server process on tarball installations.

Procedure
Find the Cassandra Java process ID (PID), and then kill the process using its PID number:
$ ps auwx | grep cassandra
$ sudo kill pid

### Clearing the data as a service
Remove all data from a package installation.

Procedure
To clear the data from the default directories:

After stopping the service, run the following command:
sudo rm -rf /var/lib/cassandra/*


### Clearing the data as a stand-alone process
Remove all data from a tarball installation.

Procedure
To clear all data from the default directories, including the commitlog and saved_caches:

After stopping the process, run the following command from the install directory:
cd install_location
$ sudo rm -rf data/*
To clear the only the data directory:
cd install_location
$ sudo rm -rf data/data/*
