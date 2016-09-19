# Yago

An asynchronous task runner for Node.js ecosystem.

1. Runs on a single process, but can be clustered.

# Definitions:

## TaskRunner
It's a class that knows how to run a Task. 
Every new `TaskRunner` is registered using a new unique name and it's used to match which `Tasks` the runner can handle.

## Task
A task is an instruction of something that has to be done at some time. 
Each task carries within the following information:
- An unique id
- A common name
- The expected date/time to start
- Payload: Additional information that can be used by the `TaskRunner`
Every new task is first queued and will be processed when it's start date is reached.
New tasks can be scheduled by:
- A cron settings
- Manually through the UI
- REST API
- yago-client (Node, Java, .Net, Python, etc.)

## Queue

The queue holds a list of `Tasks` that are waiting to be processed. 
By default Yago supports two queue Implementation: InProcess and Redis.
- `InProcessQueue`: Useful when there's only one Yago instance and it's okay to lose the queue in case of a service outage.
- `RedisQueue`: The safer and best option for a bigger Yago implementation. Can handle cluster scenarios.