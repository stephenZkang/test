#coding=utf-8
'''
Created on 2016-8-19
多线程
    Python多线程有两种方式
                    函数或者用类来包装线程对象
@author: qiao123
'''
import time
import thread

def print_time(threadName,delay):
    count = 0
    while count<5:
        time.sleep(delay)
        count += 1
        print '%s: %s'% (threadName,time.ctime(time.time()))


try:
    thread.start_new_thread(print_time, ('Thread-1',2))
    thread.start_new_thread(print_time, ('Thread-2',4))
except:
    print 'Error'
    
while 1:
    pass
    