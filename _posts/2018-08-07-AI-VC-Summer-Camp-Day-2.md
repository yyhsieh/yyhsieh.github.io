---
title: "AI VC Summer Camp Day2"
comments: true
permalink: /categories/workshop/AI-VC-Summer-Camp-Day-2/
categories:
  - Workshop
tags:
  - Workshop Note
  - Machine Learning
toc_label: Content
toc: true
toc_sticky: true
related: false
author_profile: true
---

2018暑假辦在清大的AI VC Summer Camp紀錄，今天的內容主要：

[投影片連結](https://arxiv.org/pdf/1503.08895.pdf)

## MemN2N Network

![](https://i.imgur.com/UAa7fCN.png)

place all inputs in the memory
和RNN不同的地方在於先把所有的input data存到memory中，
只控制memory的作用
但RNN是一次input 一筆data進來

![](https://i.imgur.com/zjfl7iE.png)

### Advantages
1) More generic input format
(任何vector都可以input)
像是bag of words / image feature / feature position
2) out-of-order access to input data
3) less distracted by unimportant inputs
4) longer term memorization
5) no vanishing / exploding gradients 
(不會重複propagate W)

## Disadvantages

 讓model決定哪一段memory要access，
 而不是用來訓練weights

## End-to-End Memory Networks

用bag-of-words來表示文字 (query embedding)
![](https://i.imgur.com/IFoWS0z.png)
把input分成兩路餵進output memory和input memory中

input memory:計算 attention weights
second memory:access memory slots(用來訓練哪個位置的memory是需要被access的) decide which memory slot should be accessed

soft attention (使用softmax): probability of accessing memory slots

Dimension of memory / bag-of-words 必須在事前先決定好
Dimension of W:R^(|V|xD)

### Multi-hop Reasoning
對於整個input/output memory unit access多次

#### Weight sharing:
1) adjacent (前一層的output W是下一層的input W)
2) layer-wise in/out embeddings are the same across all layers 

### Netowork實作中的技巧
1) BOW(Setence representation)
2) Position encoding (Setence representation)
3) temportal encoding: change the order of sentence input will change the results, is a 需要被學習的 matrix，用於 encode input句子的順序
4) 在空的memory中加入10% random noise做initialization

joint training: 同時訓練多個模型
比較多hops有助於performance提升（K=3）

---

## Key-Value Memory Networks (KV-MemNN): Neural Programming

https://arxiv.org/pdf/1606.03126.pdf

generalize the way context is stored in the memory
structured memories as key-value

### Key-Value paired memory
key:用來決定哪個memory要access
value：實際上儲存的data（match the memory to the response）
key和value可以是words/ sentence / vectors 

### Key Hashing
given a question x, pre-select 一個小的subset for memory
任何的hashing function都可以用 (inverted idx / LSH)

### Key Addressing
relevance probability of each memory slot to x 

### Value Reading 
taking avg of memory values

### 如何建立 key-value 的關係
KV triple: subject relation object


---

## Neural Turing Machines
https://arxiv.org/pdf/1410.5401.pdf

http://www.robots.ox.ac.uk/~tvg/publications/talks/NeuralTuringMachines.pdf

### RNN is enough?
如果只有幾個hidden state是否足以代表長的句子？
-> 需要做memory augmentation
-> extend the capability of NN by coupling to external memory

### Artificial working memory
using 額外的process和external memory 互動

![](https://i.imgur.com/KuHuxfb.png)

### Blurry Read / Write 
a set of parallel R/W heads
透過controller來控制memory

soft attention on memory highly sparsely

### Content Addressing 
根據內容決定要拿哪裡的memory而不是看storage的位置，It is typically used for high-speed storage and retrieval of fixed content
focuses attention on locations based on the similarity between their current values and values emitted by the controller.

### Intepolation for Location-based addressing
The location-based addressing mechanism is designed to facilitate both simple iteration across the locations of the memory and random-access jumps. It does so by implementing a rotational shift of a weighting.
gate = 1 : 使用目前的memory,忽略過去一個time step的
gate = 0 : 使用過去一個time step的memory

### Convoliutional Shift
allowed integers shift
（通常是找前後幾個time-step的memory）

### Sharpening 

## MemNN v.s. NTM
MemNN: memory是static，只有關注如何retrive/read information from memory
NTM: 持續不斷寫入跟讀取，network是用來學習「何時要read/write memory」/ memory的interface會比較彈性，但結構就比較複雜

---

## Differentiable Neural Computers
![](https://i.imgur.com/VcdFMm5.png)

有比較複雜的memory addressing mechanism，和NTM相比
+ 加上 Dynamic memory allocation (writing)
+ 加上 Temporl memory linkage (reading)

### Reasons of dynamic memory allocation
1) 因為NTM只有在連續的memory blocks allocate memory，但這樣的話需要管理記憶體（否則資料會沒有ptr指向&難處理）
2) 沒辦法釋放memory
3) location addressing 需要大量的連續記憶體

### Reasons of Temporal memory linkage 
1) search complexity by time
2) preserving temporal order (track the order of writing)

### NTM和DNC的差異
1) DNC有更多的scalar gate用以計算weights間的內插值
2) DNC引入memory retention vector用以更新usage vector：
    a) 如果在前一個time step該memory的位置是write，則其retention weight應該比較大
    b) 如果在前一個time step該memory的位置是read，則其retention weight應該比較小
    
![](https://i.imgur.com/eZ1GY93.png)

### Temporal Memory Linkage (Linkage matrix, L_{t})
represent the writing order of memory slots

#### Write weighting
1) Content-based addressing
2) Dynamic memory allocation

![](https://i.imgur.com/1AWbfGH.png)
![](https://i.imgur.com/Ci2K0PG.png)


#### Read weighting
1) Content-based addressing
2) Temporal memory linkage

![](https://i.imgur.com/a8q8i7S.png)
![](https://i.imgur.com/sLz8Blz.png)

