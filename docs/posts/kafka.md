---
title: Hello Kafka
description: 快速体验 Kafka 的使用
date: 2023-07-02 12:57:50+8
tags: [go, Kafka]
layout: post
cover:
  image: /vp-blog/covers/go.png
---

## Docker 启动 Kafka 集群

```yaml
# kraft通用配置
x-kraft: &common-config
  ALLOW_PLAINTEXT_LISTENER: yes
  KAFKA_ENABLE_KRAFT: yes
  KAFKA_KRAFT_CLUSTER_ID: MTIzNDU2Nzg5MGFiY2RlZg
  KAFKA_CFG_PROCESS_ROLES: broker,controller
  KAFKA_CFG_CONTROLLER_LISTENER_NAMES: CONTROLLER
  KAFKA_CFG_LISTENER_SECURITY_PROTOCOL_MAP: BROKER:PLAINTEXT,CONTROLLER:PLAINTEXT
  KAFKA_CFG_CONTROLLER_QUORUM_VOTERS: 1@kafka-1:9091,2@kafka-2:9091,3@kafka-3:9091
  KAFKA_CFG_INTER_BROKER_LISTENER_NAME: BROKER

# 镜像通用配置
x-kafka: &kafka
  image: 'bitnami/kafka:3.3.1'
  networks:
    net:

# 自定义网络
networks:
  net:

# project名称
name: kraft
services:

  # combined server
  kafka-1:
    <<: *kafka
    container_name: kafka-1
    ports:
      - '9092:9092'
    environment:
      <<: *common-config
      KAFKA_CFG_BROKER_ID: 1
      KAFKA_CFG_LISTENERS: CONTROLLER://:9091,BROKER://:9092
      KAFKA_CFG_ADVERTISED_LISTENERS: BROKER://192.168.0.101:9092 #宿主机IP

  kafka-2:
    <<: *kafka
    container_name: kafka-2
    ports:
      - '9093:9093'
    environment:
      <<: *common-config
      KAFKA_CFG_BROKER_ID: 2
      KAFKA_CFG_LISTENERS: CONTROLLER://:9091,BROKER://:9093
      KAFKA_CFG_ADVERTISED_LISTENERS: BROKER://192.168.0.101:9093 #宿主机IP

  kafka-3:
    <<: *kafka
    container_name: kafka-3
    ports:
      - '9094:9094'
    environment:
      <<: *common-config
      KAFKA_CFG_BROKER_ID: 3
      KAFKA_CFG_LISTENERS: CONTROLLER://:9091,BROKER://:9094
      KAFKA_CFG_ADVERTISED_LISTENERS: BROKER://192.168.0.101:9094 #宿主机IP

  #broker only
  kafka-4:
    <<: *kafka
    container_name: kafka-4
    ports:
      - '9095:9095'
    environment:
      <<: *common-config
      KAFKA_CFG_BROKER_ID: 4
      KAFKA_CFG_PROCESS_ROLES: broker
      KAFKA_CFG_LISTENERS: BROKER://:9095
      KAFKA_CFG_ADVERTISED_LISTENERS: BROKER://192.168.0.101:9095
```

我们可以通过 `docker-compose up -d` 快速启动一个本机能够使用的 Kafka 集群。

> 我们可以使用 `&common-config` 和 `<<: *kafka` 的形式共享一些配置。


## 从 Kafka 中读取消息

```go
import (
	"context"
	"fmt"
	"github.com/segmentio/kafka-go"
	"testing"
)

func TestReadKafka(t *testing.T) {
	topic := "my-topic"
	partition := 0

	r := kafka.NewReader(kafka.ReaderConfig{
		Brokers: []string{
			"localhost:9092",
			"localhost:9093",
			"localhost:9094",
			"localhost:9095",
		},
		Topic:       topic,
		Partition:   partition,
		StartOffset: kafka.SeekStart,
	})

	for {
		m, err := r.ReadMessage(context.Background())
		if err != nil {
			println("Error!", err.Error())
			break
		}
		fmt.Println("Read message success:", string(m.Key), string(m.Value))
	}
}
```

我们以测试的形式运行我们的消费端，启动后代码不会停止，它会进入等待。

等我们实现提供消息的一端后，我们可以看到它会在终端中打印出消息。


## 往 Kafka 写入消息

```go
import (
	"context"
	"github.com/segmentio/kafka-go"
	"log"
	"testing"
	"time"
)

func TestWriteKafka(t *testing.T) {

	topic := "my-topic"
	partition := 0

	conn, err := kafka.DialLeader(context.Background(), "tcp", "localhost:9092", topic, partition)

	if err != nil {
		log.Fatal("failed to dial leader:", err)
	}
	defer conn.Close()

	conn.SetWriteDeadline(time.Now().Add(10 * time.Second))
	_, err = conn.WriteMessages(
		kafka.Message{Value: []byte("one")},
		kafka.Message{Value: []byte("two")},
		kafka.Message{Value: []byte("three")},
	)
}
```

同样以测试的形式运行我们的代码，它会在写入三条消息后停止。我们可以重复运行。

之后，我们可以在之前消费端的终端里，看到这些消息。

![](/resources/2023-07/01.gif)
