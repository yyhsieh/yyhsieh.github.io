---
title: "Workshop: AI VC Summer Camp Day2"
comments: true
permalink: /categories/workshop/AI-VC-Summer-Camp-Day-2/
categories:
  - Workshop
tags:
  - Workshop Note
  - Machine Learning
  - Computer Visual 
  - Transfer Learning
toc_label: Content
toc: true
toc_sticky: true
related: false
author_profile: true
---

2018暑假辦在清大的AI VC Summer Camp紀錄，講者為Prof. Yu-Chiang Wang，
演講的主軸是Deep Transfer Learning for Visual Analysis。

2018 AI Summer School:
Vision and Learning 電腦視覺與深度學習暑期研習

[網站網址](https://jazzgirl526.wixsite.com/vlss2018)
[投影片連結](https://jazzgirl526.wixsite.com/vlss2018/lecturer-abstract)
[paper連結](https://arxiv.org/pdf/1503.08895.pdf)

---

# Deep Transfer Learning for Visual Analysis

## Transfer Learning的目標:

解決Data-oriented problem中**沒有足夠label data**的問題
Collecting/annotating data is typically expensive.
希望能夠讓source domain -> target domain 
不過synthesis data和real data之間，還是有domain gap，
所以要想辦法解決這部分。

e.g. Imbalanced medical image 
e.g. Style transfer

1. 通常會希望training data和testing data的data distribution相同
-> 但實際上很難做到
2. 有的時候收集同樣的資料但要做不同的題目，annotation和labeling的方式會不一樣，
如果要重做造成很大的成本 -> 使用transfer learning
（data collection -> data annotation）

![](https://i.imgur.com/EqwdhHr.png)
![](https://i.imgur.com/RvH9NaR.png)

e.g.在時間A所label的image -> 預測時間B(or季節等)的image
transfer learning在比較複雜的style -> 比較簡單的style比較好做 

透過face domain的互相轉換，可以比較容易知道到底feature是如何轉換的，
讓所謂ML是black box的說法變得更加explantible

![](https://i.imgur.com/Sdz1KUi.png)

如果在target domain沒有label的話沒辦法做instance transfer
把source domain和target domain的data合在一起做classifier(instance transfer)

![](https://i.imgur.com/kHrTtBo.png)

需要有一個common feature space
但可以把兩個domain的data拆開（分為兩類，但project在同一feature space上）

---

# Domain Adaptation
borrow the features/classfiers from source domain -> apply to the domain of interest (target domain)

## Challenges in Domain Adaptation

### 1) Domain Shift / Bias / Mismatch(這三個是一樣的)
AKA domain bias, domain mismatch, etc.
e.g. Audio recognition: different speakers, environments, quality, etc.
不需要考慮feature space的問題

Minimize the Maximum Mean Discrepancy(MMD)
![](https://i.imgur.com/4EVWA6R.png)
mean error of source domain - mean error of target domain

也可以利用不同的kernel將error先投到特定space上再做計算（nonlinear kernel）
![](https://i.imgur.com/yPWoaOP.png)

只是把global mean error變最小，但不是minimize(class-wise的error)

### 2) Homogeneous vs. Heterogeneous DA

Homogeneous:兩個domain的feature表示方式是一樣的，但distribution不同
Heterogeneous:兩個domain的feature表示方式不同，因此distribution非常不同

![](https://i.imgur.com/oCIAaxZ.png)
![](https://i.imgur.com/juM6weR.png)

### 3) Supervised DA / Semi-Supervised DA / Unsupervised DA

![](https://i.imgur.com/0sJzgRD.png)

### 4) Imbalanced & Unsupervised Domain Adaptation

source domain和target domain的data數目差很多
![](https://i.imgur.com/vcZb9X7.png)

---

## Instance Transfer / Reweighting
- Hard way: data selection 
- Soft way: data reweighting

如果只有semi-supervised / unsupervised data
應該要如何才能降低element-wise的error？

## Transfer Component Analysis (TCA)
1) Unsupervised DA
2) Matching cross-domain marginal (global) distributions

## Joint Distribution Adaptation (JDA)
1) Unsupervised DA
2) In addition to matching cross-domain marginal (global) distributions, conditional (class-wise) distributions across data domains are also aligned.

### 在target domain沒有label：
(predict the target domain data -> 給pseudo label with confidence + label propagation) do it iterativelly 
-> minimize both class-wise and global avg. error

### 如何看現在pseudo label是對的：
在training的過程中相對的loss有持續的下降，代表目前的representation是有持續matching的。

---

Question:
把群之間的error設成最小，有處理群間的距離最大嗎？

---

### Maximum Mean Discrepancy(MMD)
![](https://i.imgur.com/hzfdCXw.png)

---

### Domain-Adversarial Training of Neural Networks (DANN)
![](https://i.imgur.com/ftAtgWG.png)
not standard back propagation -> gradient reversal layer 
和GAN的training方式有點相同，試圖要騙過feature f

---

### Domain Separation Network
![](https://i.imgur.com/bvpw47S.png)
Shared Encoder: 只extract content features only
style and texture / background features in the two private encoders, respectively.

有label的地方一樣可以計算classification loss
沒有label的地方就像是autoencoder的概念（要把feature還原回來）
一樣透過back propagation來做training 

---

### Deep Transfer Learning for Multi-Label Classification

![](https://i.imgur.com/aJNR0J4.png)

透過綠色框的autoencoder，將label space和image的feature space投在同一個latent space上

---

### Multi-Label Zero-Shot Learning with Structured Knowledge Graphs
![](https://i.imgur.com/JUoseES.png)

不只是看label和圖片之間的關係，同時exploit label之間的semantic關係

---

### Semantic Segmentation Across Cities

透過Google Time Machine可以搜集到一個地點不同時間的image
並同時做static object matching

---

### Pix2pix
是一種Conditional GAN

![](https://i.imgur.com/jd7mzm8.png)
缺點：需要pair-wise training image

---

### CycleGAN
![](https://i.imgur.com/4YsbMzD.png)

![](https://i.imgur.com/Hwdd1z0.png)

用VAE(variational autoencoder) 或是其他的model
for unpaird data: 如何計算reconsturction error?
discriminator用來判斷中間是painting還是photo
可以根據input image來計算reconstruction error
(based on autoencoder機制，算兩個GAN model input和output的MSE)

1) First GAN (G1, D1): Photo to Painting
2) Second GAN (G2, D2): Photo to Painting

a) Photoconsistency
b) Painting consistency

![](https://i.imgur.com/YPNlNOe.png)
![](https://i.imgur.com/UVSRZSR.png)

![](https://i.imgur.com/9dQWkMw.png)

不用L2-norm的原因：是因為如果拿MSE當成objective function的時候，很容易生成blurring image

CycleGAN的缺點：沒有common feature space可以用來做classification

---

### UNIT
1) 不需要pair-wise training data
2) 有shared feature representation (no cross-domain feature transformation)
4) common feature space 

Unsupervised Image-to-Image Translation Networks
把VAE和GAN結合
![](https://i.imgur.com/dPmxp7U.png)

用同樣的Z (feature vector) -> 強迫X1和X2的distribution相近
E1->G1 或是 E1->G2
E2->G2 或是 E2->G1
discriminator D1: 用來判斷是不是 day-time image（和路徑無關，只判斷input的T/F）
discriminator D2: 用來判斷是不是 night-time image（和路徑無關，只判斷input的T/F）

---

### Domain Transfer Networks
![](https://i.imgur.com/P4ZaHjj.png)

half the UNIT structure
同時保持image consistency和feature consistency

feature encoder 只encode content information
但decoder conver the latent vector to original image (reconstruct the style information)

D是用來判斷是否是comic style
f和f之間保持feature consistency
input和G出來的圖保持image consistency

![](https://i.imgur.com/S9ykHkI.png)

---

## Representation Disentanglement
目標：
1. Interpretable deep feature representation
2. Disentangle attribute of interest from the derived latent representation

![](https://i.imgur.com/JkyxR4G.png)

### AC-GAN
[supervised] learning for entangling image representation
latent 是來自於real data
c: image information
multi-task discriminator

![](https://i.imgur.com/EFhSbB3.png)

---

### Info-GAN
[unsupervised] learning, no real information
latent 是來自於synthetic data 
D的作用是當成cluster,分成C群
![](https://i.imgur.com/1hmveJr.png)

---

### StarGAN
前面的GAN只能處理1-to-1 domain transfer
StarGAN可以用來處理multi-domain image-to-image translation

![](https://i.imgur.com/0DfcFMq.png)
![](https://i.imgur.com/RJd8CK2.png)

![](https://i.imgur.com/zVaFXnq.png)
Domain classification是包含domain的資訊，例如有五群data就標示1-5

---

### Cross-Domain Representation Disnentanglement (CDRD)

![](https://i.imgur.com/X8GZaqZ.png)

