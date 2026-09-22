#include <stdio.h>
#include "campus.h"

void attendance()
{
    float percentage;

    printf("\n========== ATTENDANCE ==========\n");

    printf("Enter attendance percentage: ");
    scanf("%f", &percentage);

    printf("Attendance: %.2f%%\n", percentage);

    if (percentage >= 75)
    {
        printf("Status: Eligible for examination\n");
    }
    else
    {
        printf("Status: Attendance shortage\n");
    }
}

