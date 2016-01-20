package com.kangzai.exercise.tree;


public class BinarySearchTree{
	
	private static class BinaryNode{
		
		
		BinaryNode(int element) {
			this(element,null,null);
		}
		BinaryNode(int element, BinaryNode lt, BinaryNode rt) {
			this.element = element;
			this.left = lt;
			this.right = rt;
		}
		int element;
		BinaryNode left;
		BinaryNode right;
	}
	
	private BinaryNode root;

	public BinarySearchTree() {
		root = null;
	}
	
	public void makeEmpty(){
		root = null;
	}
	
	public boolean isEmpty(){
		return root == null;
	}
	
	public boolean contains(int x){
		return contains(x,root);
	}

	private boolean contains(int x, BinaryNode root2) {
		if(x == root2.element){
			return true;
		}else{
			if(contains(x,root2.left)){
				return true;
			}else{
				if(contains(x,root2.right)){
					return true;
				}else{
					return false;
				}
			}
		}
	}
	
	public int findMin(){
		if(isEmpty()){ throw new RuntimeException();}
		return findMin(root).element;
	}

	private BinaryNode findMin(BinaryNode root) {
		return null;
	}
	
	

}
