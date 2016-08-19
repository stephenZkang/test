#coding=utf-8
'''
客户端
Created on 2016-8-19
@author: qiao123
'''
import socket

if __name__ == '__main__':
    s = socket.socket()
    host = socket.gethostname()
    print host
    port = 12345
    
    s.connect((host,port))
    print s.recv(1024)
    s.close()