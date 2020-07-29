# MoDos repository

## Resume
How can pedestrian mobility in cities be improved? How can we make it easier and more pleasant for everyone in their daily journeys? How can we take into account the constraints and capacities of each individual, but also the constraints imposed by public space?

Combining technological and social innovation, the modos research project combines citizen participation, geoinformation and automatic learning to advance the state of the art on these issues.

The aim is to experiment with a combination of tools to map barriers to pedestrian mobility and offer tailor-made route planning.

The proposed solution is a platform for the benefit of senior citizens, the primary target of the project, as well as any person constrained in one way or another in their pedestrian mobility. While this solution should make it possible to get around the difficulties, the participatory approach also offers decision-makers (e.g. municipalities) a tool to improve urban planning thanks to field data produced by citizens.

## How to use this monorepo
This monorepo is managed with [Lerna](https://github.com/lerna/lerna) but for now there is now global npm scripts for the monorepo. Each packages are managed individualy.

### Add a new package
Simply add your new app/lib/website/... to the folder [./packages](./packages).

### Rules for developping in this monorepo
- You must never develop in the **master** or **_staging** branch.
- When you are developping for a specific package, your branch must be name like this: packageName/featureName.
- Don't merge yourself, wait for approval on merge request.

## How to use the package ...

### ... modos-static-site

see the [static site readme](packages/modos-static-site/readme.md)

### ... backend

see the [api readme](packages/backend/README.md)

### ... mobile-app

see the [Mobile app Readme](packages/mobile-app)
