#include <stdio.h>
#include <stdlib.h>
#include "campus.h"

void feedback()
{
    int size = 50;
    int position = 0;
    int ch;

    char *message = malloc(size);

    if (message == NULL)
    {
        printf("Memory allocation failed!\n");
        return;
    }

    printf("\n========== FEEDBACK ==========\n");
    printf("Enter your feedback: ");

    while ((ch = getchar()) != '\n' && ch != EOF);

    while ((ch = getchar()) != '\n' && ch != EOF)
    {
        message[position++] = ch;

        if (position >= size - 1)
        {
            size *= 2;

            char *temp = realloc(message, size);

            if (temp == NULL)
            {
                printf("Memory reallocation failed!\n");
                free(message);
                return;
            }

            message = temp;
        }
    }

    message[position] = '\0';

    printf("\nYour Feedback:\n");
    printf("%s\n", message);

    printf("\nFeedback submitted successfully!\n");

    free(message);
}
