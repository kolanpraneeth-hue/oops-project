CC = gcc

CFLAGS = -Wall -Wextra -g -Iinclude

SRC = src/main.c \
      src/login.c \
      src/attendance.c \
      src/timetable.c \
      src/notices.c \
      src/events.c \
      src/map.c \
      src/feedback.c

TARGET = bin/smartcampus

all: $(TARGET)

$(TARGET):
	mkdir -p bin
	$(CC) $(CFLAGS) $(SRC) -o $(TARGET)

run:
	./$(TARGET)

clean:
	rm -rf bin/*
