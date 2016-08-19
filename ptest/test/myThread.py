#coding=utf-8
'''
Created on 2016-8-19

@author: qiao123
'''
import threading
import time
import thread

exitFlag=0

def print_time(name, delay,counter):
    while counter:
        if exitFlag:
            thread.exit()
        time.sleep(delay)
        print '%s: %s' % (name,time.ctime(time.time()))
        counter-=1


class MyThread(threading.Thread):
    '''
                自定义线程
    '''


    def __init__(self, threadID,name,counter):
        threading.Thread.__init__(self)
        self.threadID = threadID
        self.name = name
        self.counter =counter
        
    def run(self):
        print 'Starting',self.name
        print_time(self.name,self.counter,5)
        print 'Exiting ',self.name
        

#创建线程
thread1 = MyThread(1,'Thread-1',1)
thread2 = MyThread(2,'Thread-2',2)

#开启线程
thread1.start()
thread2.start()

print 'Exit Main Thread'