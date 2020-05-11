import base64
import dataclasses
import json
import sys
from dataclasses import dataclass

import pandas as pd
import requests

#################################################
#  Global variables
#################################################
BASE_URL = 'https://modos.heig-vd.ch/api/v1'
HEADERS = {'Content-Type': 'application/json'}

EMAIL="modos@mail.com"
PASSWORD="modos1234"

categories = [
    'curb ramp',
    'missing curb ramp',
    'surface problem',
    'obstacle',
    'width',
    'security',
    'slope',
    'bonus',
    'no problem'
]


#################################################
#  Models
#################################################
class JSONDataclass():
    """A JSON serializable dataclass."""

    def to_json(self):
        """Return the json representation of the class."""
        return json.dumps(dataclasses.asdict(self))


@dataclass
class Credentials(JSONDataclass):
    """Credentials data to authentify a user."""
    email: str
    password: str

    def authentify(self):
        """
        Authentify with the setted credentials and update `HEADER` by adding
        an Authorization header.
        """
        try:
            r = requests.post(BASE_URL + '/authenticate',
                              data=self.to_json(), headers=HEADERS)
            if r.status_code != 200:
                raise AssertionError(f' authentication error: {r.json()}')

            token = r.json()['token']
            HEADERS['Authorization'] = f'Bearer {token}'
        except AssertionError as bad_status_code:
            sys.exit(bad_status_code)



if __name__ == '__main__':
    if len(sys.argv) < 2:
        print("Usage: python populate-db-from-external-dataset path/to/dataset/folder/here...\n")
        print("the folder should contain a file named 'dataset.csv', from which the information will be retrieved.")
        sys.exit(0)
    
    observations_path = sys.argv[1]
    observations_df = pd.read_csv(
        observations_path + '/dataset.csv',
        delimiter=";"
    ).fillna("")

    credentials = Credentials(EMAIL, PASSWORD)
    credentials.authentify()

    num_observations = len(observations_df)
    for i, row in observations_df.iterrows():
        print(f'Inserting observation [{i+1}/{num_observations}]')
        with open(observations_path + '/' + row['FILE'], 'rb') as img:
            imageData = base64.b64encode(img.read())
            imageData = "data:image/png;base64," + imageData.decode()

        data = {
            'description': {
                'obstacle': categories[row['Category'] - 1],
                'freeText': row['Commentary'],
                'impact': row['Severity']
            },
            "imageData": imageData,
            "location": {
                "latitude": row['Latitude'],
                "longitude": row['Longitude']
            }
        }

        r = requests.post(BASE_URL + '/observations', data=json.dumps(data),
                          headers=HEADERS)

        if r.status_code != 201:
            print(f"error while inserting {row['FILE']}, skiping it...")
