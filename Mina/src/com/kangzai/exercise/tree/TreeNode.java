package com.kangzai.exercise.tree;

public class TreeNode {
	int data;
	TreeNode left;
	TreeNode right;
	
	public TreeNode(int data) {
		this.data = data;
		this.left = null;
		this.right = null;
	}

	public void insert(TreeNode root,int data){
		if(data > root.data){
			if(root.right == null){
				root.setRight(new TreeNode(data));
			}else{
				root.insert(root.right, data);
			}
		}else{
			if(this.left == null){
				root.setLeft(new TreeNode(data));
			}else{
				root.insert(root.left, data);
			}
		}
	}
	
	public int getData() {
		return data;
	}
	public void setData(int data) {
		this.data = data;
	}
	public TreeNode getLeft() {
		return left;
	}
	public void setLeft(TreeNode left) {
		this.left = left;
	}
	public TreeNode getRight() {
		return right;
	}
	public void setRight(TreeNode right) {
		this.right = right;
	}
	
}
