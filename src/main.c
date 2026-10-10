
#include <stdio.h>
#include "campus.h"

int main(void)
{
    int choice;

    printf("========================================\n");
    printf("       %s - Version %s\n", CAMPUS_NAME, VERSION);
    printf("========================================\n");

    login();

    while (1)
    {
        printf("\n========== SMART CAMPUS ==========\n");
        printf("1. Attendance\n");
        printf("2. Timetable\n");
        printf("3. Notices\n");
        printf("4. Events\n");
        printf("5. Campus Map\n");
        printf("6. Feedback\n");
        printf("7. Campus IPC / Pipes\n");
        printf("8. File Redirection Demo (Week 9)\n");
        printf("9. Exit\n");

        printf("\nEnter your choice: ");

        if (scanf("%d", &choice) != 1)
        {
            printf("Invalid input. Exiting.\n");
            return 1;
        }

        switch (choice)
        {
            case 1:
                attendance();
                break;

            case 2:
                timetable();
                break;

            case 3:
                notices();
                break;

            case 4:
                events();
                break;

            case 5:
                campus_map();
                break;

            case 6:
                feedback();
                break;

            case 7:
                campus_pipe_demo();
                break;

            case 8:
                campus_redirect_demo();
                break;

            case 9:
                printf("\nThank you for using Smart Campus!\n");
                return 0;

            default:
                printf("\nInvalid choice! Try again.\n");
                break;
        }
    }

    return 0;
}

