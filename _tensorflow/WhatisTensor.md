---
title: "TensorFlow: 什麼是Tensor"
toc: True
toc_sticky: True
related: false
author_profile: false
---
<br />
Tensor是整體Tensorflow的架構中，最重要的概念之一。

## Tensor的性質
1. 是一種multi-dimensional array
2. 屬性和NumPy中的`ndarray`很像，具有`value`和`shape`兩種屬性
3. 和ndarray主要的差異在於
    - tensor可儲存於加速器(GPU/TPU)的記憶體中
    - tensor的value為`immutable`


## Tensor是immutable是什麼意思？
- 這代表的意思是在一次執行(excution)時，tensor只會有一個value
- 但不同次執行出來的數值可能不一樣
- 例如以下的程式，因為有使用`tf.random_uniform()`
- 因此在不指定random seed的狀況底下，跑不同次出來的結果可能不同。

以下直接以code的實例來講解：

{% highlight python linenos %}
import tensorflow as tf

# Build Variable
a = tf.Variable(tf.random_uniform([1], dtype=tf.float32))
b = tf.constant(1, dtype=tf.float32)

# Computational Graph
# Result = a+b
result = tf.add(a, b)

# Initialize all Variables
# 只要有寫variable就一定要初始化
init = tf.global_variables_initializer()

with tf.Session() as sess:
    # Initialize
    sess.run(init)
    
    # Print the results
    print("Excution Result:")
    print(sess.run(result))
{% endhighlight %}

我第一次執行的結果：
```python
Excution Result:
[1.622195]
```

我第二次執行的結果：
```python
Excution Result:
[1.8988736]
```
---

## 參考資料
[https://www.tensorflow.org/tutorials/eager/eager_basics](https://www.tensorflow.org/tutorials/eager/eager_basics)
[https://stackoverflow.com/questions/52879126/how-are-tensors-immutable-in-tensorflow](https://stackoverflow.com/questions/52879126/how-are-tensors-immutable-in-tensorflow)




