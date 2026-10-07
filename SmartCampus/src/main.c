#include <stdio.h>
#include "campus.h"

int main()
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
        printf("7. Exit\n");

        printf("\nEnter your choice: ");
        scanf("%d", &choice);

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
                printf("\nThank you for using Smart Campus!\n");
                return 0;

            default:
                printf("\nInvalid choice!\n");
        }
    }

    return 0;
}
