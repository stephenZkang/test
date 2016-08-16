#coding=utf-8
'''
Created on 2016-8-16

@author: qiao123
'''

class Person:
    '''
            人员信息
    '''
    name = ''
    age = 0
    def __init__(self, name,age):
        self.name=name
        self.age=age
    
    
    def getName(self):
        return self.name
            