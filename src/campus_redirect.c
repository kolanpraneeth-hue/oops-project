
#include <stdio.h>
#include <fcntl.h>
#include <unistd.h>
#include <string.h>

#include "campus_redirect.h"

void campus_redirect_demo(void)
{
    int fd;
    char buffer[512];
    ssize_t bytes;

    printf("\n===== WEEK 9: FILE REDIRECTION =====\n");

    /* Output redirection: overwrite a file */
    fd = open("campus_report.txt",
              O_WRONLY | O_CREAT | O_TRUNC, 0644);

    if (fd == -1) {
        perror("open");
        return;
    }

    dprintf(fd, "Smart Campus Report\n");
    dprintf(fd, "Attendance: 87.5%%\n");
    dprintf(fd, "Notices: 3 new notices\n");
    close(fd);

    printf("1. Output redirection (>) completed.\n");

    /* Append output to the same file */
    fd = open("campus_report.txt",
              O_WRONLY | O_CREAT | O_APPEND, 0644);

    if (fd == -1) {
        perror("open");
        return;
    }

    dprintf(fd, "Feedback: 1 complaint awaiting review\n");
    close(fd);

    printf("2. Append redirection (>>) completed.\n");

    /* Read input from the report file */
    fd = open("campus_report.txt", O_RDONLY);

    if (fd == -1) {
        perror("open");
        return;
    }

    bytes = read(fd, buffer, sizeof(buffer) - 1);
    close(fd);

    if (bytes < 0) {
        perror("read");
        return;
    }

    buffer[bytes] = '\0';

    printf("3. Input redirection (<) demonstration:\n");
    printf("First line:%.*s\n",
	  (int)strcspn(buffer, "\n"), buffer);

    /* Redirect error output to a log file */
    fd = open("campus_error.log",
              O_WRONLY | O_CREAT | O_TRUNC, 0644);

    if (fd == -1) {
        perror("open");
        return;
    }

    dprintf(fd, "Smart Campus error log demonstration\n");
    close(fd);

    printf("4. Error log (2>) demonstration completed.\n");
    printf("Created campus_report.txt and campus_error.log\n");
}
