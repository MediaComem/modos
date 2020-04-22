# Bootstrap-modos

Bootstrap-modos is a CLI to insert multiple user into the database and link
them to an event. The usage is very limited but should hopefully be enough
for a "batch insertion" from a csv file.

## Requirements

- Python 3.7 or greater (it uses dataclass and f string)
- [Requests](https://requests.readthedocs.io/en/master/)

## Preparing the data

The script reads data from two csv files, which should be in a `data/` folder,
next to `bootstrap.py`:

```
./
bootstrap.py
data/
    users_profiles.csv
    event.csv
```

### users_profiles.csv

This file contains the user and their optional profile. The header is the
following:

| pseudonym | email | password | age | gender | helper | helperFrequency | mobility |
|-----------|-------|----------|-----|--------|--------|-----------------|----------|

the required fields are:

- pseudonym
- email
- password

If a profile is defined, the following fields are also required:

- age
- gender
- mobility

Finally, note that defining a `helper` fields requires to define a
`helperFrequency` field too.

Here are the 3 possible cases that can be defined:

- pseudonym,email,password
- pseudonym,email,password,age,gender,,,mobility
- pseudonym,email,password,age,gender,helper,helperFrequency,mobility

Note that some fields have specific requirements too:

- password must be >= 8 characters
- email must be a valid email string
- gender is an enum: [ 'm', 'f' ]. It can be null (meaning "other" than 'm' or 'f')
- helper is an enum: [ white cane, walker, wheelchair ]
- helperFrequency is an enum: [ rarely, sometimes, always ]
- mobility is an enum: [ minimal, reduced, good, perfect ]

### event.csv

This file must contain only one event. All the users defined in the previous
file will automatically be set as participant to this event. Note that this file
is not required (in which case, the users won't be affected to any event).

The header is the following:


| title | password | beginning | ending | objective | numberOfImages |
|-------|----------|-----------|--------|-----------|----------------|

All the fields are required, except for `password` which is optional.

beginning and ending fields must be defined with the following format : 

`YYYY.MM.DD hh:mm (UTC ISO8601)`

NB : Be careful if editing CSV files with Microsoft Excel the date format will automatically change depending on your regional settings. 