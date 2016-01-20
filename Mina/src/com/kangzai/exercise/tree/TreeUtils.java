package com.kangzai.exercise.tree;

public class TreeUtils {
	public  static  void preOrder(TreeNode root){
		if(root != null){
			System.out.print(root.data+"-");
			preOrder(root.left);
			preOrder(root.right);
		}
	}
	
	public static void inOrder(TreeNode root){
		if(root != null){
			inOrder(root.left);
			System.out.print(root.data + "--");
			inOrder(root.right);
		}
	}
	
	public static void postOrder(TreeNode root){
		if(root != null){
			postOrder(root.left);
			postOrder(root.right);
			System.out.print(root.data+ "--");
			
		}
	}
	
	
	public static void main(String[] args) {
		int[] array = {12,76,35,22,16,48,90,46,9,40};
		
		TreeNode  root = new TreeNode(array[0]);
		for (int i = 1; i < array.length; i++) {
			root.insert(root, array[i]);
		}
		
		preOrder(root);
	}
	
	
}
