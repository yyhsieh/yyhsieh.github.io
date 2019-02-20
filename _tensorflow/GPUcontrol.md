---
title: "TensorFlow: GPU的相關控制"
comments: true
toc: True
toc_sticky: True
related: false
author_profile: false
tags:
  - Tensorflow
  - GPU
  - Machine Learning
---
<br />
儘管TensorFlow會自動決定要使用GPU或是CPU來加速，有必要的話也會將tensor複製到兩者的memory中，但很多時候我們還是會期望可以自己控制GPU的流程，該怎麼處理呢？以下介紹一些跟GPU控制有關的function與如何使用。

### 測試是否有可用的GPU
{% highlight python linenos %}
tf.test.is_gpu_available()
{% endhighlight %}
---

### 透過CUDA來控制使用的GPU

- 使用單張GPU的情況
{% highlight python linenos %}
import os
# 指定在第1張GPU上（編號都是從0開始）
os.environ["CUDA_VISIBLE_DEVICES"] = "0"
{% endhighlight %}

- 使用多張GPU的情況

{% highlight python linenos %}
import os
# 同時使用第1張和第2張卡（編號都是從0開始）
os.environ["CUDA_VISIBLE_DEVICES"] = "0,1"
{% endhighlight %}

---

### 只使用特定比例的GPU記憶體用量
{% highlight python linenos %}
import tensorflow as tf

# # 只使用50%的GPU記憶體用量
gpu_options = tf.GPUOptions(per_process_gpu_memory_fraction=0.5)

# 要記得在tf.Session要指定[gpu_options=gpu_options]，不然就沒有用
sess = tf.Session(config=tf.ConfigProto(gpu_options=gpu_options))
{% endhighlight %}

---

### 自動增加GPU記憶體用量，直到夠用再分給別人
{% highlight python linenos %}
import tensorflow as tf

# 允許GPU的記憶體自動增加用量
gpu_options = tf.GPUOptions(allow_growth=True)

# 要記得在tf.Session要指定[gpu_options=gpu_options]，不然就沒有用
sess = tf.Session(config=tf.ConfigProto(gpu_options=gpu_options))
{% endhighlight %}
---

### 測試在指定的GPU上是否有指定的tensor
{% highlight python linenos %}
# 先宣告一個random uniform distribution的tensor
x = tf.random_uniform([3, 3])

# 看x是否存在於id=0的GPU上
x.device.endswith('GPU:0')
{% endhighlight %}

---

### 如何指定在CPU上跑TensorFlow的code
{% highlight python linenos %}
import tensorflow as tf
with tf.device("CPU:0"):
  x = tf.random_uniform([1000, 1000])
  
  # 限制在CPU上操作x（編號都是從0開始）
  assert x.device.endswith("CPU:0")
  
  # 寫要做的事情
  # ......
{% endhighlight %}

---

### 如何指定在特定GPU編號上跑TensorFlow的code
{% highlight python linenos %}
import tensorflow as tf
with tf.device("GPU:0"):
  x = tf.random_uniform([1000, 1000])
  
  # 限制在第1張GPU上操作x（編號都是從0開始）
  assert x.device.endswith("CPU:0")
  
  # 寫要做的事情
  # ......
{% endhighlight %}

---

### 參考資料
https://www.tensorflow.org/tutorials/eager/eager_basics
https://blog.gtwang.org/programming/tensorflow-keras-specify-gpu-and-memory-tutorial/