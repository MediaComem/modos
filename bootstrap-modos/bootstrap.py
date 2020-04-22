#!/usr/bin/python
import argparse
import dataclasses
import json
import re
import sys
from collections import OrderedDict
from csv import DictReader
from dataclasses import dataclass
from datetime import date
from enum import Enum
from typing import Any, List
from getpass import getpass

import requests

#################################################
#  Global variables
#################################################
BASE_URL = 'http://localhost:3000/api/v1'
HEADERS = {'Content-Type': 'application/json'}


#################################################
#  Enum
#################################################
class Gender(Enum):
    """Gender Enum used by a Profile."""
    MALE = 'm'
    FEMALE = 'f'
    OTHER = None


class Helper(Enum):
    """Helper Enum used by a Profile."""
    WHITE_CANE = 'white cane'
    WALKER = 'walker'
    WHEELCHAIR = 'wheelchair'


class HelperFrequency(Enum):
    """elperFrequency Enum used by a Profile."""
    RARELY = 'rarely'
    SOMETIMES = 'sometimes'
    ALWAYS = 'always'


class Mobility(Enum):
    """Mobility Enum used by a Profile."""
    MINIMAL = 'minimal'
    REDUCED = 'reduced'
    GOOD = 'good'
    PERFECT = 'perfect'


#################################################
#  Models
#################################################
class JSONDataclass():
    """A JSON serializable dataclass."""

    def to_json(self):
        """Return the json represntation of the class."""
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


@dataclass
class Profile(JSONDataclass):
    """Profile dataclass."""
    age: int
    gender: Gender
    helper: Helper
    helperFrequency: HelperFrequency
    mobility: Mobility

    def __init__(self, csv: OrderedDict):
        """Populate the Profile dataclass from a csv row."""
        self.age = csv.get('age')
        self.gender = csv.get('gender')
        self.helper = csv.get('helper')
        self.helperFrequency = csv.get('helperFrequency')
        self.mobility = csv.get('mobility')

    def is_null(self) -> bool:
        """Check if the profile is set or not."""
        return (self.age or self.gender or self.helper or self.helperFrequency or self.mobility)

    def to_json(self):
        """Return the json represntation of the Profile dataclass."""
        payload_dict = dataclasses.asdict(self)
        if not self.helper:
            payload_dict.pop('helper', None)
            payload_dict.pop('helperFrequency', None)

        return json.dumps(payload_dict)


@dataclass
class User(JSONDataclass):
    """User dataclass."""
    pseudonym: str
    email: str
    password: str

    def __init__(self, csv: OrderedDict):
        """Populate the User dataclass from a csv row."""
        self.pseudonym = csv['pseudonym']
        self.email = csv['email']
        self.password = csv['password']
        if not self._is_email_valid():
            raise AssertionError(
                f'AssertionError: Email is not valid ({self.email})')

    def _is_email_valid(self) -> bool:
        """Check if `email` is valid."""
        regex = '^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$'
        return True if re.search(regex, self.email) else False

    def insert(self, event_id=None):
        """Insert the user into the database."""
        try:
            print(f'inserting {self.pseudonym}...', end='')
            r = requests.post(BASE_URL + '/users',
                              data=self.to_json(), headers=HEADERS)
            if r.status_code != 201:
                raise AssertionError(f'insertion error: {r.json()}')

            if event_id is not None:
                Credentials(self.email, self.password).authentify()
                r = requests.post(BASE_URL + '/users/join/' + event_id, 
                                  headers=HEADERS)
                if r.status_code != 200:
                    raise AssertionError(
                        f'error while joining event: {r.json()}')
            print(' ok')
        except AssertionError as bad_status_code:
            sys.exit(bad_status_code)

    def delete(self):
        """Delete the user from the database."""
        try:
            print(f'deleting {self.pseudonym}...', end='')
            Credentials(self.email, self.password).authentify()

            # delete the user
            r = requests.delete(BASE_URL + '/users',
                                headers=HEADERS)
            if r.status_code != 204:
                raise AssertionError(f' deletion error: {r.json()}')
            print(' ok')

        except AssertionError as bad_status_code:
            sys.exit(bad_status_code)


@dataclass
class UserProfile(JSONDataclass):
    """User and their Profile."""
    user: User
    profile: Profile

    def __init__(self, csv_row: OrderedDict):
        """Populate the UserProfile dataclass from a csv row."""
        self.user = User(csv_row)
        self.profile = Profile(csv_row)

    def insert_profile(self):
        """Insert the user's profile into the database."""
        if self.profile.is_null() is None:
            print(f'skip profile insertion for {self.user.pseudonym} (null)')
            return
        try:
            print(f'inserting profile for {self.user.pseudonym}...', end='')
            Credentials(self.user.email, self.user.password).authentify()
            r = requests.post(BASE_URL + '/users/profile', headers=HEADERS,
                              data=self.profile.to_json())

            if r.status_code != 201:
                raise AssertionError(f'insertion error: {r.json()}')
            print(' ok')
        except AssertionError as bad_status_code:
            sys.exit(bad_status_code)

    def insert_user_and_profile(self, event_id=None):
        """Insert the user and his profile into the database."""
        self.user.insert(event_id)
        self.insert_profile()


@dataclass
class Event(JSONDataclass):
    """Event dataclass."""
    title: str
    password: str
    beginning: date
    ending: date
    objective: str
    numberOfImages: int

    def __init__(self, csv: OrderedDict):
        self.title = csv['title']
        self.password = csv['password']
        self.beginning = csv['beginning']
        self.ending = csv['ending']
        self.objective = csv['objective']
        self.numberOfImages = csv['numberOfImages']

    def insert(self, credentials: Credentials) -> str:
        """Insert the event into the database."""
        try:
            print(f'inserting event {self.title}...', end='')
            credentials.authentify()

            r = requests.post(BASE_URL + '/events',
                              data=self.to_json(), headers=HEADERS)
            if r.status_code != 201:
                raise AssertionError(f'insertion error: {r.json()}')
            event_id = r.json()['_id']
            print(' ok')
            return event_id
        except AssertionError as bad_status_code:
            sys.exit(bad_status_code)


#################################################
#  CSV loaders
#################################################
def load_users_profiles(csv_path: str) -> List[UserProfile]:
    """Load the csv containing the users and, optionally, their profile."""
    users_profiles_csv = DictReader(open(csv_path))
    try:
        return [UserProfile(row) for row in users_profiles_csv]
    except AssertionError as e:
        sys.exit(e)


def load_event(csv_path: str) -> Event:
    """Load the csv containing the events."""
    events_csv = DictReader(open(csv_path))
    try:
        return Event(list(events_csv)[0])
    except IndexError:
        raise FileNotFoundError  # no event for this bootstraping session...
    except AssertionError as e:
        sys.exit(e)


if __name__ == "__main__":
    try:
        event: Event = load_event('./data/event.csv')
        email = input('Enter your email: ')
        password = getpass('Enter your password: ')
        credentials = Credentials(email, password)
        event_id = event.insert(credentials)
    except FileNotFoundError:
        pass  # no event for this bootstraping session...

    users_profiles: List[UserProfile] = load_users_profiles(
        './data/users_profiles.csv')

    [up.insert_user_and_profile(event_id) for up in users_profiles]
    # [up.user.delete() for up in users_profiles]
