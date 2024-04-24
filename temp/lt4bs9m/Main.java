public class Main{
   static class Node{
    int data;
    Node left;
    Node right;

    Node(int data){
        this.data=data;

    }
   }

   //*INSERTING IN BST*************************************************
   public static Node insert(Node root,int val){
    if(root==null){
        root=new Node(val);
        return root;
    }

    if(root.data>val){
       root.left= insert(root.left,val);
    }
    else{
        root.right=insert(root.right,val);

    }
    return root;
   }
   //SEARCH IN BST*****************************************************

   public static boolean search(Node root,int val){

        if(root==null) return false;

        if(root.data==val) return true;
        else if(val>root.data){
            return search(root.right,val);

        }
        else{
            return search(root.left,val);
        }

   }
   //************************************************ DELETION IN BST ***************************************************
   public static Node delete(Node root,int val){
    
    if(root.data>val){
        root.left=delete(root.left,val);
    }
    else if(root.data<val){
        root.right=delete(root.right,val);
    }
    else{
        // leaf node
        if(root.left==null && root.right==null) return null;

        // one node
        if(root.left==null) return root.right;
        else if(root.right==null) return root.left;

        // two nodes
        Node IS=inorderSuccessor(root.right);
        root.data=IS.data;
        root.right=delete(root.right,IS.data);


    }
    return root;
   }
   // **********************************************INOORDER SUCCESSOR *************************************************
   public static Node inorderSuccessor(Node root){
    while(root.left!=null){
        root=root.left;
    }
    return root;
   }


   //*********************************************** INORDER TRAVERSAL **************************************************
   public static void inorder(Node root){
    if(root==null){
        return;
    }
    inorder(root.left);
    System.out.print(root.data +" ");
   
    inorder(root.right);
   }

    public static void main(String args[]){
        int values[]={8,5,3,1,4,6,10,11,14};
        Node root=null;

        for(int i=0;i<values.length;i++){
            root=insert(root,values[i]);
        }
         
        // if(search(root,10)) System.out.println("found");
        // else System.out.println("Not found");
        inorder(root);
        System.out.println();

        delete(root,4);
        inorder(root);



    }
}
