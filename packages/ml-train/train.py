#import tensorflow as tf
import os

os.environ['TF_CPP_MIN_LOG_LEVEL'] = '3'

from datetime import datetime

import click
import matplotlib.pyplot as plt
import mlflow
from src.data.make_dataset import MakeDataset
from src.models.binary_model import BinaryModel
from src.models.categorical_model import CategoricalModel
from src.trainer.trainer import Trainer
from src.utils.config import get_config_from_json
from src.visualize.visualizer import plot_metrics


def load_config(path):
    config = get_config_from_json(path)
    return config

def load_data(path, config):
    # Load the dataset
    dataset = MakeDataset(path, config)
    return dataset

def train(model, dataset, config):
    trainer = Trainer(model, dataset, config)
    trainer.train()
    click.echo("Theses are the results for the training")
    trainer.print_classification_report()
    return trainer

def pipeline(config_path, data_path, Model, title, verbose):
    if verbose:
        click.echo(f"Loading config file for {title}")
    config = load_config(config_path)
    if verbose:
        click.echo(f"Loading dataset for {title}")
    dataset = load_data(data_path, config)
    model = Model(config)
    if verbose:
        click.echo(f"Training {title} model")

    mlflow.set_experiment(title)
    
    mlflow.keras.autolog()
    run_name = datetime.today().strftime('%Y-%m-%d_%H-%M-%S')
    with mlflow.start_run(run_name=run_name):
        trainer = train(model, dataset, config)
        plot_metrics(trainer.history)
        mlflow.log_figure(plt.gcf(), f"metrics_plot_{title}.png")
        mlflow.log_text(trainer.get_classification_report(), f"classification_report_{title}.txt")
        if click.confirm('Are you satisfied with this result? (Saying yes will train the model on the remaining data during (validation set) for half the number of epoch used to get these results)'):
            fully_trained_model = trainer.train_all()
            fully_trained_model.save(os.path.join("models", title, run_name))

@click.command()
@click.option('--ignore',
              type=click.Choice(['binary', 'categorical'], case_sensitive=False), 
              help='Ignore the training of either the binary or the categorical model')
@click.option('--verbose',
              is_flag=True,
              help='Print execution informations')
def main(ignore, verbose):
    
    train_on = {"binary": True, "categorical": True}

    train_on[ignore] = False

    if train_on["binary"]:
        pipeline(config_path=os.path.join("configs", "binary_config.json"),
                 data_path=os.path.join("data", "binary"),
                 Model=BinaryModel,
                 title="binary",
                 verbose=verbose)

    if train_on["categorical"]:
        pipeline(config_path=os.path.join("configs", "categorical_config.json"),
                 data_path=os.path.join("data", "categorical"),
                 Model=CategoricalModel,
                 title="categorical",
                 verbose=verbose)

if  __name__ == "__main__":
    main()
