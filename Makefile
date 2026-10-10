
CC = gcc

CFLAGS = -Wall -Wextra -g -Iinclude
LDFLAGS = -pthread

SRC = src/main.c \
      src/login.c \
      src/attendance.c \
      src/timetable.c \
      src/notices.c \
      src/events.c \
      src/map.c \
      src/feedback.c \
      src/campus_pipe.c \
      src/campus_redirect.c \
      src/campus_thread.c

TARGET = bin/smartcampus

all: $(TARGET)

$(TARGET): $(SRC)
	mkdir -p bin
	$(CC) $(CFLAGS) $(SRC) $(LDFLAGS) -o $(TARGET)

run: $(TARGET)
	./$(TARGET)

asan:
	mkdir -p bin
	$(CC) $(CFLAGS) -fsanitize=address $(SRC) $(LDFLAGS) -o $(TARGET)

clean:
	rm -f $(TARGET)

.PHONY: all run asan clean

