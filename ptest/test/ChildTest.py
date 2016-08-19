#coding=utf-8
'''
Created on 2016-8-19
@author: qiao123
'''
import unittest
from test.Child import Child


class Test(unittest.TestCase):


    def testName(self):
        '测试类的继承'
        c = Child()
        c.childMethod()
        c.parentMethod()
        c.setAttr(200)
        c.getAttr()
        


if __name__ == "__main__":
    #import sys;sys.argv = ['', 'Test.testName']
    unittest.main()