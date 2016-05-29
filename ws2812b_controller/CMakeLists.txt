cmake_minimum_required(VERSION 2.8)
project(ws2812b_raspberry_pi2 CXX C)

#set(CMAKE_CXX_FLAGS "${CMAKE_CXX_FLAGS} -std=c++11")
set(CMAKE_PREFIX_PATH )
set(CMAKE_MODULE_PATH ${CMAKE_MODULE_PATH} "${CMAKE_SOURCE_DIR}/cmake/")

add_definitions(-DDEBUG)

find_package(MySQLCppConn REQUIRED)

include_directories(./)
add_executable(ws2812b_raspberry_pi2 light_control.cpp ws2812b.cpp)

target_link_libraries(ws2812b_raspberry_pi2 mysqlcppconn)