import tensorflow as tf
from tensorflow.keras.preprocessing import image_dataset_from_directory


class MakeDataset():
    def __init__(self, path, config):
        self.dataset = image_dataset_from_directory(path,
                                                    shuffle=True,
                                                    batch_size=config.batch_size,
                                                    image_size=(
                                                        config.image_shape, config.image_shape),
                                                    label_mode="categorical")

        self.train, self.validation = self.split(self.dataset, 0.7, 0.3)
        self.train, self.validation = self.prefetch(self.train, self.validation)

    def split(self, dataset, train_percentage, validation_percentage, verbose=False):
        dataset_batches = tf.data.experimental.cardinality(dataset)
        train_size = dataset_batches // 10 * int(train_percentage * 10)
        val_size = dataset_batches // 10 * int(validation_percentage * 10)

        train_dataset = dataset.take(train_size).cache()
        validation_dataset = dataset.skip(train_size)
        validation_dataset = validation_dataset.take(val_size).cache()

        if verbose:
            print(
                f'Number of train batches: {tf.data.experimental.cardinality(train_dataset)}')
            print(
                f'Number of validation batches: {tf.data.experimental.cardinality(validation_dataset)}')

        return train_dataset, validation_dataset

    def prefetch(self, train_dataset, validation_dataset):
        AUTOTUNE = tf.data.experimental.AUTOTUNE

        train_dataset = train_dataset.prefetch(buffer_size=AUTOTUNE)
        validation_dataset = validation_dataset.prefetch(buffer_size=AUTOTUNE)
        return train_dataset, validation_dataset
