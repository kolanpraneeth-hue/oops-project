#include <stdio.h>
#include <string.h>
#include "campus.h"

void login()
{
    char username[50];
    char password[50];

    printf("\n========== LOGIN ==========\n");

    printf("Username: ");
    scanf("%49s", username);

    printf("Password: ");
    scanf("%49s", password);

    if (strcmp(username, "student") == 0 &&
        strcmp(password, "1234") == 0)
    {
        printf("\nLogin Successful!\n");
        printf("Welcome to Smart Campus!\n");
    }
    else
    {
        printf("\nInvalid Username or Password!\n");
    }
}
