rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /{document=**} {
      allow write, update, delete: if request.auth != null && request.auth.uid == request.resource.data.userId;
      allow read: if true;
    }
  }
}