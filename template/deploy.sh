#!/bin/bash
echo "删除上一次打包..."
rm -rf h5-market*
if [ -n "$1" ]; then
  echo "h5-market2生产打包开始..."
    npm run build:h5
    mv build h5-market2
    tar -czvf h5-market2.tar.gz h5-market2  
else
    echo "h5-market生产打包开始..."
    npm run build
    mv build h5-market
    tar -czvf h5-market.tar.gz h5-market
fi