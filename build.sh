#!/bin/bash

set -e

export REPO="dkzlv/vpn"
export VERSION="0.1.3"

docker build --platform=linux/amd64 -t $REPO:$VERSION .
docker tag $REPO:$VERSION $REPO:latest
docker push $REPO:$VERSION
docker push $REPO:latest
