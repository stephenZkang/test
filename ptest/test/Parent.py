#coding=utf-8
'''
Created on 2016-8-19

@author: QIAOK
'''

class Parent:
    '''
            父类
    '''
    parentAttr = 100

    def __init__(self, params):
        '''
                      调用父类的方法
        '''
        print '调用父类的构造函数'
    
    def parentMethod(self):
        print '调用父类的方法'
    
    def setAttr(self,attr):
        Parent.parentAttr=attr
        
    def getAttr(self):
        print '父类属性：',Parent.parentAttr