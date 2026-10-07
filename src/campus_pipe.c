#include <stdio.h>
#include <stdlib.h>
#include <unistd.h>
#include <sys/wait.h>

#include "../include/campus_pipe.h"

void campus_pipe_demo()
{
    int pipefd[2];

    printf("\n========================================\n");
    printf("       SMART CAMPUS - IPC DEMO\n");
    printf("========================================\n");

    /*
     * Create an anonymous pipe.
     *
     * pipefd[0] = read end
     * pipefd[1] = write end
     */
    if (pipe(pipefd) == -1)
    {
        perror("pipe");
        return;
    }

    /*
     * First child:
     * Lists Smart Campus source modules.
     */
    pid_t pid1 = fork();

    if (pid1 == -1)
    {
        perror("fork");
        close(pipefd[0]);
        close(pipefd[1]);
        return;
    }

    if (pid1 == 0)
    {
        close(pipefd[0]);

        /*
         * Redirect standard output to the pipe.
         */
        if (dup2(pipefd[1], STDOUT_FILENO) == -1)
        {
            perror("dup2");
            close(pipefd[1]);
            exit(EXIT_FAILURE);
        }

        close(pipefd[1]);

        /*
         * First Smart Campus process:
         * ls src
         */
        char *command[] = {"ls", "src", NULL};

        execvp(command[0], command);

        perror("execvp");
        exit(EXIT_FAILURE);
    }

    /*
     * Second child:
     * Receives the first child's output and
     * searches for campus service modules.
     */
    pid_t pid2 = fork();

    if (pid2 == -1)
    {
        perror("fork");
        close(pipefd[0]);
        close(pipefd[1]);
        waitpid(pid1, NULL, 0);
        return;
    }

    if (pid2 == 0)
    {
        close(pipefd[1]);

        /*
         * Redirect standard input from the pipe.
         */
        if (dup2(pipefd[0], STDIN_FILENO) == -1)
        {
            perror("dup2");
            close(pipefd[0]);
            exit(EXIT_FAILURE);
        }

        close(pipefd[0]);

        /*
         * Second Smart Campus process:
         * grep attendance
         */
        char *command[] = {"grep", "attendance", NULL};

        execvp(command[0], command);

        perror("execvp");
        exit(EXIT_FAILURE);
    }

    /*
     * Parent does not need the pipe.
     */
    close(pipefd[0]);
    close(pipefd[1]);

    /*
     * Wait for both Smart Campus processes.
     */
    waitpid(pid1, NULL, 0);
    waitpid(pid2, NULL, 0);

    printf("\nIPC demonstration completed.\n");
}
