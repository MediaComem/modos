import matplotlib.pyplot as plt

colors = plt.rcParams['axes.prop_cycle'].by_key()['color']


def plot_metrics(history,
                 metrics=['loss',
                          'accuracy',
                          #                 'precision',
                          #                 'recall',
                          #                 'auc',
                          #                 'kappa',
                          'f1-score'
                          ]):

    plt.figure(figsize=(15, 10))
    for n, metric in enumerate(metrics):
        name = metric.replace("_", " ").capitalize()
        plt.subplot(len(metrics) / 3, 3, n+1)
        plt.plot(history.epoch,
                 history.history[metric], color=colors[0], label='Train')
        plt.plot(history.epoch, history.history['val_'+metric],
                 color=colors[1], linestyle="-", label='Val')
        plt.xlabel('Epoch')
        plt.ylabel(name)
        if metric == 'loss':
            plt.ylim([0, plt.ylim()[1]])
        elif metric == 'auc':
            plt.ylim([0.8, 1])
        elif metric == 'kappa':
            plt.ylim([-1, 1])
        else:
            plt.ylim([0, 1])

        plt.tight_layout()
        plt.legend()
