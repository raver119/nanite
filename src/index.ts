
export interface Subscriber<T extends any> {
    /**
     * This method allows to inject message into this subscriber
     * @param t - message to send to this Subscriber
     */
    push(t: T): void

    /**
     * This method does what it says. Once called - no new messages will be sent to this subscriber.
     */
    unsubscribe(): void
}


export interface Publisher<T extends any> {
    /**
     * This method will send the message to all Subscribers subscribed to this Publisher
     * @param t - message to send
     */
    publish(t: T): void

    /**
     * This method registers your callback and returns a Subscriber instance
     * @param cb - callback to be called upon received message
     */
    subscribe(cb: (t: T) => void): Subscriber<T>
}

export function publisher<T extends any>(): Publisher<T> {
    const subscribers = new Map<number, Subscriber<T>>()

    return {
        publish(t: T) {
            for (let k of subscribers.keys()) {
                subscribers.get(k).push(t)
            }
        },

        subscribe(cb: (t: T) => void): Subscriber<T> {
            let k: number
            do {
                k = Math.random()
            } while (subscribers.has(k))

            const subscriber: Subscriber<T> = {
                push(t: T) {
                    cb(t)
                },

                unsubscribe() {
                    subscribers.delete(k)
                }
            }

            subscribers.set(k, subscriber)
            return subscriber
        }
    }
}

