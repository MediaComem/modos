import os
import random
import shutil
import zipfile
from pathlib import Path
from typing import List

import click
import pandas as pd
from PIL import Image
from tqdm import tqdm


@click.command()
@click.option('--image_path', '-i', default="./data/raw", type=click.Path(exists=True), help="Either a folder containing multiple zip files of image or the path to a single zip file")
@click.option('--label_path', '-l', default="./data/raw", type=click.Path(exists=True), help="Either a folder containing multiple csv of labels or the path to a single csv")
def main(image_path, label_path):
    
    binary_path = os.path.join("data", "binary")
    categorical_path = os.path.join("data", "categorical")
    
    label_files = get_labels_csv(label_path)
    zip_files = get_images_zip(image_path)

    labels = pd.concat((pd.read_csv(f, sep=';', encoding='latin-1', index_col='FILE', usecols=['FILE','Category']) for f in label_files))
    
    create_folders(labels, binary_path, categorical_path)

    for file in zip_files:
        print(f"Loading {file}")
        print(labels)
        zip_data_parser(file, labels, binary_path, categorical_path)

def zip_data_parser(zip_fname, labels, binary_path, categorical_path):
    with zipfile.ZipFile(zip_fname, "r") as f:
        files = f.namelist()
        for name in tqdm(files):
            filename = os.path.basename(name)
            if len(filename) > 0:
                try:
                    real_category = labels.loc[filename]["Category"]
                    if real_category == 5:
                        category = 0
                        save_file(binary_path, category, name, f)
                    else:
                        save_file(categorical_path, real_category, name, f)
                        category = 1
                        save_file(binary_path, category, name, f)
                        
                except KeyError:
                    print(f"{filename} is invalid")
        if os.path.exists(f.namelist()[0]):
            shutil.rmtree(f.namelist()[0])

def save_file(output_dir, category, name, file):
    save_folder = os.path.join(output_dir, str(category))
    extracted_path = file.extract(name)
    image = Image.open(extracted_path)
    image = image.resize((160, 160))
    image.save(extracted_path)
    shutil.move(extracted_path, os.path.join(save_folder, os.path.basename(name)))

def create_folders(labels, binary_path, categorical_path):
    categories = labels["Category"].unique()

    for path, create_categories in {binary_path: [0, 1], categorical_path: [x for x in categories if x != 5]}.items():
        if not os.path.exists(path):
            os.mkdir(path)
            print(f"{path} created")
        for category in create_categories:
            category_path = os.path.join(path, str(category))
            if not os.path.exists(category_path):
                os.mkdir(category_path)
                print(f"{category_path} created")

def get_images_zip(image_path: str) -> List[str]:
    if os.path.isdir(image_path):
        files = os.listdir(image_path)    
        files = list(map(lambda f: os.path.join(image_path, f), filter(lambda f: f.endswith('.zip'), files)))
    else:
        files = [image_path]

    return files

def get_labels_csv(label_path: str) -> List[str]:
    if os.path.isdir(label_path):
        files = os.listdir(label_path)    
        files = list(map(lambda f: os.path.join(label_path, f), filter(lambda f: f.endswith('.csv'), files)))
    else:
        files = [label_path]

    return files

if __name__ == '__main__':
    main()
