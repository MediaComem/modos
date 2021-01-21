import os

import seaborn as sn
import pandas as pd
import matplotlib.pyplot as plt
import numpy as np
import tensorflow as tf
from sklearn.metrics import classification_report, confusion_matrix


class Trainer():
    def __init__(self, model, dataset, config):
        self.model = model.model
        self.model_name = model.name
        self.dataset = dataset
        self.config = config

    def train(self, model_name=None):
        if model_name is None:
            model_name = self.model_name

        checkpoint_filepath = os.path.join("model", "checkpoints", self.model_name)

        self.history = self.model.fit(self.dataset.train,
                                      epochs=self.config.num_epochs,
                                      validation_data=self.dataset.validation,
                                      # class_weight=weights
                                    #   callbacks=[
                                    #     #   tf.keras.callbacks.EarlyStopping(
                                    #     #       patience=10, min_delta=0.001),
                                    #       tf.keras.callbacks.ModelCheckpoint(filepath=checkpoint_filepath,
                                    #                                          save_best_only=True),
                                    #       tf.keras.callbacks.TensorBoard(log_dir=f"./logs/test/{model_name}")]
                                      )

    def print_classification_report(self):
        y_pred = self.model.predict(self.dataset.validation)
        y_pred = np.argmax(y_pred, axis=1)
        y_true = []
        for _, label in self.dataset.validation.take(-1):
            y_true.extend(label.numpy())
        y_true = np.argmax(np.array(y_true), axis=1)
        return print(classification_report(y_true, y_pred, zero_division=0))

    def plot_matrix(self):
        y_pred = self.model.predict(self.dataset.validation)
        y_pred = np.argmax(y_pred, axis=1)
        y_true = []
        for _, label in self.dataset.validation.take(-1):
            y_true.extend(label.numpy())
        y_true = np.argmax(np.array(y_true), axis=1)
        matrix = confusion_matrix(y_true, y_pred)

        df_cm = pd.DataFrame(matrix, index = ["Curb Ramp", "Obstacle", "Surface Problem", "Width", "Security", "Slope", "Bonus"],
                  columns = ["Curb Ramp", "Obstacle", "Surface Problem", "Width", "Security", "Slope", "Bonus"])
        plt.figure(figsize = (10,7))
        sn.heatmap(df_cm, annot=True, fmt='d')