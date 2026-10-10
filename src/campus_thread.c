
#include <stdio.h>
#include <pthread.h>
#include <time.h>

#include "campus_thread.h"

static int shared_counter = 0;

static pthread_mutex_t counter_mutex = PTHREAD_MUTEX_INITIALIZER;

static void *campus_worker(void *arg)
{
    int worker_id = *(int *)arg;
    int i;

    for (i = 0; i < 5; i++)
    {
        pthread_mutex_lock(&counter_mutex);

        shared_counter++;

        printf("[Thread %d] Monitoring task %d completed. "
               "Shared counter = %d\n",
               worker_id, i + 1, shared_counter);

        pthread_mutex_unlock(&counter_mutex);

        /* Brief pause to make the concurrent work visible. */
        {
            struct timespec delay = {0, 100000000L};
            nanosleep(&delay, NULL);
        }
    }

    return NULL;
}

void campus_thread_demo(void)
{
    pthread_t threads[2];
    int worker_ids[2] = {1, 2};
    int created = 0;
    int i;
    int result;

    printf("\n===== SMART CAMPUS: WEEK 10 THREADS =====\n");

    shared_counter = 0;

    for (i = 0; i < 2; i++)
    {
        result = pthread_create(
            &threads[i],
            NULL,
            campus_worker,
            &worker_ids[i]
        );

        if (result != 0)
        {
            printf("Could not create thread %d (error %d).\n",
                   i + 1, result);
            break;
        }

        created++;
    }

    for (i = 0; i < created; i++)
    {
        result = pthread_join(threads[i], NULL);

        if (result != 0)
        {
            printf("Could not join thread %d (error %d).\n",
                   i + 1, result);
        }
    }

    printf("\nAll created threads have finished.\n");
    printf("Final shared counter: %d\n", shared_counter);

    pthread_mutex_destroy(&counter_mutex);
}
