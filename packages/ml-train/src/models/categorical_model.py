import tensorflow as tf
from src.base.base_model import BaseModel
from tensorflow.keras import Input, Sequential, regularizers
from tensorflow.keras.applications import MobileNetV2
from tensorflow.keras.applications.mobilenet_v2 import preprocess_input
from tensorflow.keras.layers import (BatchNormalization, Conv2D, Dense,
                                     Dropout, Flatten, GlobalAveragePooling2D)
from tensorflow.keras.layers.experimental.preprocessing import (RandomFlip,
                                                                RandomRotation,
                                                                RandomZoom)
from tensorflow.keras.losses import BinaryCrossentropy, CategoricalCrossentropy
from tensorflow.keras.metrics import (AUC, CategoricalAccuracy, Precision,
                                      Recall)
from tensorflow.keras.optimizers import Adam
from tensorflow_addons.metrics import CohenKappa, F1Score


class CategoricalModel(BaseModel):
    def __init__(self, config, pretrained_model=MobileNetV2, preprocess_input=preprocess_input):
        super(CategoricalModel, self).__init__(config)

        strategy = tf.distribute.MirroredStrategy()
        
        with strategy.scope():
            self.name = "categorical"
            self.class_number = 7
            
            self.metrics = [
                CategoricalAccuracy(name='accuracy'),
                #       Precision(name='precision'),
                #       Recall(name='recall'),
                #       AUC(name='auc'),
                #       CohenKappa(num_classes=2, name='kappa'),
                F1Score(num_classes=7, name='f1-score', average='weighted')
            ]

        
            self.model = self.build_model(pretrained_model, preprocess_input)
            self.compile_model()

    def build_model(self, pretrained_model, preprocess_input):

        img_shape = (self.config.image_shape, self.config.image_shape, 3)

        # Create the base model from the pre-trained model MobileNet V2
        base_model = pretrained_model(input_shape=img_shape,
                            include_top=False,
                            weights='imagenet')
        base_model.trainable = False
        
        inputs = Input(shape=img_shape)
        x = Sequential([  # Data Augmentation
            RandomFlip('horizontal'),
            RandomRotation(0.1),
            RandomZoom(0.1),
        ])(inputs)
        x = preprocess_input(x)
        x = base_model(x, training=False)
    #     x = Conv2D(32, kernel_size=5, activation='relu', padding='same')(x)
    #     x = Conv2D(64, kernel_size=5, activation='relu', padding='same')(x)
    #     x = Dense(64, activation='relu')(x)
    #     x = Conv2D(64, kernel_size=3, activation='relu', padding='same', kernel_regularizer=regularizers.l2(0.001))(x)
    #     x = BatchNormalization()(x)
        x = GlobalAveragePooling2D()(x)
    #     x = Dropout(0.2)(x)
    #     x = Dense(1024, kernel_regularizer=regularizers.l2(0.001), activation='relu')(x)
    #     x = Flatten()(x)
        x = Dropout(0.2)(x)
        x = Dense(64, kernel_regularizer=regularizers.l2(0.001), activation='relu')(x)
        x = Dropout(0.3)(x)
        x = Dense(32, kernel_regularizer=regularizers.l2(0.001), activation='relu')(x)
        x = Dropout(0.4)(x)
        x = Dense(16, kernel_regularizer=regularizers.l2(0.001), activation='relu')(x)
        outputs = Dense(self.class_number, activation="softmax")(x) # prediction layer
        model = tf.keras.Model(inputs, outputs)
        return model

    def compile_model(self):
        self.model.compile(optimizer=Adam(lr=self.config.learning_rate),
                      loss=CategoricalCrossentropy(from_logits=False),
                      metrics=self.metrics)
