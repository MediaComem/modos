import { EventSubscriber, EntitySubscriberInterface, InsertEvent, getRepository } from "typeorm";
import { Event } from "../entity/Event";
import { User } from "../entity/User";


@EventSubscriber()
export class EventSubs implements EntitySubscriberInterface<Event> {

    listenTo() {
        return Event;
    }

    async beforeInsert(e: InsertEvent<Event>) {
        const event = e.entity;
        const userRepository = getRepository(User);
        const user = await userRepository.findOne(event.owner);
        if (user) {
            user.events.push(event);
            await userRepository.save(user);
        }
    }
}