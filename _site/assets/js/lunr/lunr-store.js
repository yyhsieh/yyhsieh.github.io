var store = [{
        "title": "Edge Case: Many Categories",
        "excerpt":"This post has many categories.  ","categories": ["aciform","antiquarianism","arrangement","asmodeus","broder","buying","championship","chastening","disinclination","disinfection","dispatch","echappee","enphagy"],
        "tags": ["categories","edge case"],
        "url": "http://localhost:4000/2009-07-02-edge-case-many-categories/",
        "teaser":null},{
        "title": "AI VC Summer Camp Day1",
        "excerpt":"2018暑假辦在清大的AI VC Summer Camp紀錄 投影片連結 MemN2N place all inputs in the memory 和RNN不同的地方在於先把所有的input data存到memory中， 只控制memory的作用 但RNN是一次input 一筆data進來 Advantages 1) More generic input format (任何vector都可以input) 像是bag of words / image feature / feature position 2) out-of-order access to input data 3) less distracted by unimportant inputs 4) longer term memorization 5)...","categories": ["Workshop","Machine-Learning"],
        "tags": [],
        "url": "http://localhost:4000/workshop/machine-learning/AI-VC-Summer-Camp-Day-1/",
        "teaser":null},{
        "title": "To Build Archieve On Githubpages",
        "excerpt":"在Github Pages上面建立Archieve   sudo gem install jekyll-archives  ","categories": [],
        "tags": [],
        "url": "http://localhost:4000/To-build-archieve-on-GithubPages/",
        "teaser":null},{
        "title": "Edge Case: Many Tags",
        "excerpt":"This post has many tags.  ","categories": ["Edge Case"],
        "tags": ["8BIT","alignment","Articles","captions","categories","chat","comments","content","css","dowork","edge case","embeds","excerpt","Fail","featured image","FTW","Fun","gallery","html","image","Jekyll","layout","link","Love","markup","Mothership","Must Read","Nailed It","Pictures","Post Formats","quote","standard","Success","Swagger","Tags","template","title","twitter","Unseen","video","YouTube"],
        "url": "http://localhost:4000/tags/edge-case-many-tags/",
        "teaser":null},{
        "title": "Edge Case: No Body Content",
        "excerpt":" ","categories": ["Edge Case"],
        "tags": ["content","edge case","layout"],
        "url": "http://localhost:4000/tags/edge-case-no-body-content/",
        "teaser":null},{
        "title": "TensorFlow: GPU的相關控制",
        "excerpt":"儘管TensorFlow會自動決定要使用GPU或是CPU來加速，有必要的話也會將tensor複製到兩者的memory中，但很多時候我們還是會期望可以自己控制GPU的流程，該怎麼處理呢？以下介紹一些跟GPU控制有關的function與如何使用。 測試是否有可用的GPU 1 tf.test.is_gpu_available() 透過CUDA來控制使用的GPU 使用單張GPU的情況 1 2 3 import os # 指定在第1張GPU上（編號都是從0開始） os.environ[\"CUDA_VISIBLE_DEVICES\"] = \"0\" 使用多張GPU的情況 1 2 3 import os # 同時使用第1張和第2張卡（編號都是從0開始） os.environ[\"CUDA_VISIBLE_DEVICES\"] = \"0,1\" 只使用特定比例的GPU記憶體用量 1 2 3 4 5 6 7 import tensorflow as tf # # 只使用50%的GPU記憶體用量 gpu_options = tf.GPUOptions(per_process_gpu_memory_fraction=0.5) # 要記得在tf.Session要指定[gpu_options=gpu_options]，不然就沒有用 sess = tf.Session(config=tf.ConfigProto(gpu_options=gpu_options))...","categories": [],
        "tags": [],
        "url": "http://localhost:4000/tensorflow/GPUcontrol/",
        "teaser":null},{
        "title": "TensorFlow: 什麼是Tensor",
        "excerpt":"Tensor是整體Tensorflow的架構中，最重要的概念之一。 Tensor的性質 是一種multi-dimensional array 屬性和NumPy中的ndarray很像，具有value和shape兩種屬性 和ndarray主要的差異在於 tensor可儲存於加速器(GPU/TPU)的記憶體中 tensor的value為immutable Tensor是immutable是什麼意思？ 這代表的意思是在一次執行(excution)時，tensor只會有一個value 但不同次執行出來的數值可能不一樣 例如以下的程式，因為有使用tf.random_uniform() 因此在不指定random seed的狀況底下，跑不同次出來的結果可能不同。 以下直接以code的實例來講解： 1 2 3 4 5 6 7 8 9 10 11 12 13 14 15 16 17 18 19 20 21 import tensorflow as tf # Build Variable a = tf.Variable(tf.random_uniform([1], dtype=tf.float32)) b = tf.constant(1,...","categories": [],
        "tags": [],
        "url": "http://localhost:4000/tensorflow/WhatisTensor/",
        "teaser":null},{
        "title": "TensorFlow 教學與心得",
        "excerpt":"這邊會累積一些學習TensorFlow過程中，我自己整理的教學文和code實例， 相關的參考文獻會附在最後面，如果有需要的人可以參考， 主要是TensorFlow官方的Tutorial和其他的教學文， 如果有問題或是有哪邊寫錯的部分也請在回應告訴我，謝謝：）   希望能夠對於學習這塊的人有一點幫助。   ","categories": [],
        "tags": [],
        "url": "http://localhost:4000/tensorflow/main/",
        "teaser":null}]
