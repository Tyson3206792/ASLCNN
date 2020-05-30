# ASLCNN
American Sign Language Convolutional Neural Network.

This program attempts to interpret ASL hand gestures for 27 images classes (A-Z and space). It uses a Convolutional Neural Network 
trained on a few hundred images for each of the classes.

Repo contains web code, python script (mini_batch_loading_model.ipynb) used for training
and series of models created during development (trained_models).

Video:

[![Demonstration](https://img.youtube.com/vi/C_UEvtYW6ak/0.jpg)](https://youtu.be/C_UEvtYW6ak)


##Developing and running the application from scratch.

==============================Image Capture=============================== 
Used to populate a dataset of 200x200 pixel images Open image_capture.html in a browser, press a letter key to begin taking images labelled as that letter (e.g. A_0.jpg, A_1.jpg etc) This will take 400 images and save them to the downloads folder. This folder can be changed in the browser settings.

=====================Training and exporting the model===================== 
open mini_batch_loading_model.ipynb in juptyter notebook. Set the images folder to the path containing the captured images. The script will be able to interpret the images based on their labels. Run the cells and begin training. This may take a while. After training is complete, a test accuracy is returned. If the accuracy is low, consider training for more epochs. Once happy with the accuracy, run the next cell to export the model to be used in TensorFlowjs.

=========================Running the model online========================= 
Save the model to a publicly accessible location online, such as github, and set the model path in the camera.js folder. Now when index.html opens, it will be running on the newly trained model. It takes frames from the video, saves the pixels to a html canvas, converts the canvas pixels to a tensor, and passes them through the model using tensorflow. The prediction is returned in the output box and shown on the chart to the right.
