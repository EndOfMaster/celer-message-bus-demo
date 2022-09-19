# Basic Sample Hardhat Project

This project demonstrates a basic Hardhat use case. It comes with a sample contract, a test for that contract, a sample script that deploys that contract, and an example of a task implementation, which simply lists the available accounts.

Try running some of the following tasks:

```shell
npx hardhat accounts
npx hardhat compile
npx hardhat clean
npx hardhat test
npx hardhat node
node scripts/sample-script.js
npx hardhat help
```
# celer message bus executor
celer config file in ./config
### 1. download excutor
```shell
# Linux amd64
curl -L https://github.com/celer-network/sgn-v2-networks/raw/main/binaries/executor-v1.1.0-linux-amd64.tar.gz -o executor.tar.gz
# Linux arm64
curl -L https://github.com/celer-network/sgn-v2-networks/raw/main/binaries/executor-v1.1.0-linux-arm64.tar.gz -o executor.tar.gz
# MacOS Intel chip
curl -L https://github.com/celer-network/sgn-v2-networks/raw/main/binaries/executor-v1.1.0-darwin-amd64.tar.gz -o executor.tar.gz
# MacOS Apple chip
curl -L https://github.com/celer-network/sgn-v2-networks/raw/main/binaries/executor-v1.1.0-darwin-arm64.tar.gz -o executor.tar.gz
```
Unzip and remove
```
tar -xvf executor.tar.gz && rm executor.tar.gz
```
### 2. run cockroachDB with docker
other methods go https://im-docs.celer.network/developer/integration-guide#start-db-instance

8080 is http dashboard

```
docker run -d \
    --name=cockroachdb \
    --hostname=cdb_container \
    -p 26257:26257 -p 8080:8080 \
    -v "{YOUR_DIR}:/cockroach/cockroach-data" \
    cockroachdb/cockroach start \
    --insecure \
    --join=cockroachdb

docker exec -it cockroachdb ./cockroach init --insecure
```
### 3.run executor
```shell
./executor start --loglevel debug --home ./
```