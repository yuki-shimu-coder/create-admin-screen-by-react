# react-spa-project
react18の環境構築

# はじめに

以下のツールを事前にインストールしてください

- Docker

## 開発の手順

ルートディレクトリで、下記コマンドを実行してください

```
docker compose build
```

ビルドが完了したら、下記コマンドでDockerコンテナを起動してください

```
docker compose up -d
```

コンテナを起動したら、下記コマンドを実行してアプリの依存関係をインストールしてください

```
docker compose exec react-app sh
cd react-sample
yarn install
yarn start
```

http://localhost:3000 にアクセスし、reactアプリが起動していることを確認してください。※起動には時間がかかります。