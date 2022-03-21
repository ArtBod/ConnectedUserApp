package com.app.ConnectedUsers.service;

import com.app.ConnectedUsers.entity.User;
import com.google.api.core.ApiFuture;
import com.google.cloud.firestore.DocumentReference;
import com.google.cloud.firestore.DocumentSnapshot;
import com.google.cloud.firestore.Firestore;
import com.google.cloud.firestore.WriteResult;
import com.google.firebase.auth.FirebaseAuth;
import com.google.firebase.cloud.FirestoreClient;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;
import java.util.concurrent.ExecutionException;

@Service
public class UserService {

    private static final String COLLECTION_NAME="User";

    public  String saveUser(User user) throws ExecutionException, InterruptedException {
       Firestore db = FirestoreClient.getFirestore();
       ApiFuture<WriteResult> collectionApiFuture= db.collection(COLLECTION_NAME).document(user.getEmail()).set(user);

       return collectionApiFuture.get().getUpdateTime().toString();
    }

    public List<User> getUserDetails() throws ExecutionException, InterruptedException {
        Firestore db = FirestoreClient.getFirestore();
        Iterable<DocumentReference> documentReference = db.collection(COLLECTION_NAME).listDocuments();
        Iterator<DocumentReference> iterator = documentReference.iterator();

        List<User> userList=new ArrayList<>();

        while (iterator.hasNext()){
            DocumentReference documentReference1=iterator.next();
            ApiFuture<DocumentSnapshot> future =documentReference1.get();
            DocumentSnapshot document =future.get();
            User user = document.toObject(User.class);
            userList.add(user);
        }
        return userList;
    }

    public User getUserDetailsByEmail(String email) throws ExecutionException, InterruptedException {
        Firestore db = FirestoreClient.getFirestore();
        DocumentReference documentReference = db.collection(COLLECTION_NAME).document(email);

        ApiFuture<DocumentSnapshot> future = documentReference.get();
        DocumentSnapshot document =future.get();

        User user=null;
        if(document.exists()) {
            user = document.toObject(User.class);
            return user;
        }else {
            return null;
        }
    }

    public  String updateUser(User user) throws ExecutionException, InterruptedException {
        Firestore db = FirestoreClient.getFirestore();
        ApiFuture<WriteResult> collectionApiFuture= db.collection(COLLECTION_NAME).document(user.getEmail()).set(user);

        return collectionApiFuture.get().getUpdateTime().toString();
    }

    public  String deleteUser(String email) throws ExecutionException, InterruptedException {
        Firestore db = FirestoreClient.getFirestore();
        ApiFuture<WriteResult> collectionApiFuture= db.collection(COLLECTION_NAME).document(email).delete();

        return "Document ID: "+email+" has been deleted successfully";
    }

    public User UserLogin(User user) throws Exception {

        String tempEmail = user.getEmail();
        String tempPassword = user.getPassword();

        Firestore db = FirestoreClient.getFirestore();
        Iterable<DocumentReference> documentReference = db.collection(COLLECTION_NAME).listDocuments();
        Iterator<DocumentReference> iterator = documentReference.iterator();
        User Ruser = null;
        while (iterator.hasNext()){
            DocumentReference documentReference1=iterator.next();
            ApiFuture<DocumentSnapshot> future =documentReference1.get();
            DocumentSnapshot document =future.get();
            Ruser = document.toObject(User.class);
            if(Ruser.getEmail().equals(tempEmail) && Ruser.getPassword().equals(tempPassword)){
                return Ruser;
            }
            Ruser = null;
        }
        if (Ruser == null){
            throw new Exception("Bad credentials");
        }
        return Ruser;
    }
}
