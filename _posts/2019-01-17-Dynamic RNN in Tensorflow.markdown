---
layout: default
title:  "Dynamic RNN in Tensorflow"
date:   2019-01-17 16:44:00
categories: main
---

# Dynamic RNN in Tensorflow

為了處理不同長度的input sequence，可以自動handle句子有不同長度
需要padding/去掉padding的處理，進而可以節省運算的資源。

不過要給訂每個input自己的sequence_length
也就是如果input有三個句子，分別是7個字、5個字、3個字，
則要餵入sequence_length = [7, 5, 3]

以下是實際的code可以做為Dynamic-RNN in Tensorflow的練習

{% highlight python %}

## sentence data = 3
## embedding = 10
## num_steps/MAX seq_length = 7
## sentence_length = [7, 5, 3] 

import numpy as np
import tensorflow as tf 

## Initialize sentences with random data
input_sentence = np.random.randn(3, 7, 10)
                           ## sentence 1 with length 7
input_sentence[1, 5:] = 0  ## sentence 2 with length 5
input_sentence[2, 3:] = 0  ## sentence 2 with length 3
sentence_length = [7, 5, 3] 

## Build a LSTM model

num_units = 20 ## number of RNN cells

cell=tf.contrib.rnn.BasicLSTMCell(num_units=num_units, state_is_tuple=True)
outputs, last_states = tf.nn.dynamic_rnn(
    cell=cell,
    dtype=tf.float64,
    sequence_length=sentence_length,
    inputs=input_sentence)

## Run computational graph
with tf.Session() as sess:
    sess.run(tf.global_variables_initializer())
    RNNoutput = sess.run(outputs)
    RNNstates = sess.run(last_states)
    print("--------------------")
    print('Output \n',RNNoutput)
    print("--------------------")
    print("RNNstates.c \n", RNNstates.c)
    print("--------------------")
    print("RNNstates.h \n", RNNstates.h)
    print("--------------------")
    ## RNNstates.h: last output state

{% endhighlight %}

[](https://blog.csdn.net/qq_23142123/article/details/78486303)

[](https://blog.csdn.net/qq_35203425/article/details/79572514)

