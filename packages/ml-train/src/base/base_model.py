import tensorflow as tf

class BaseModel:
    def __init__(self, config):
        self.config = config
        self.model = None

    def build_model(self, pretrained_model, preprocess_input):
        raise NotImplementedError

    def compile_model(self):
        raise NotImplementedError