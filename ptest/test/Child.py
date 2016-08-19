#coding=utf-8
'''
Created on 2016-8-19

@author: qiao123
'''
from test.Parent import Parent

class Child(Parent):
    '''
            定义子类
    '''


    def __init__(self):
        print '调用子类的构造函数'
    
    def childMethod(self):
        print '调用子类的方法'
        
    def parentMethod(self):
        Parent.parentMethod(self) 
        print '调用子类的parentMethod方法'  
        