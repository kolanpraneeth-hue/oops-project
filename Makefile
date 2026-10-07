CC = gcc

CFLAGS = -Wall -Wextra -g -Iinclude

SRC = src/main.c \
      src/login.c \
      src/attendance.c \
      src/timetable.c \
      src/notices.c \
      src/events.c \
      src/map.c \
      src/feedback.c \
      src/campus_pipe.c

TARGET = bin/smartcampus

all: $(TARGET)

$(TARGET):
	mkdir -p bin
	$(CC) $(CFLAGS) $(SRC) -o $(TARGET)

run:
	./$(TARGET)

asan:
	mkdir -p bin
	$(CC) $(CFLAGS) -fsanitize=address $(SRC) -o $(TARGET)

clean:
	rm -rf bin/*
