import { getDatabase, ref, push,get, set, update, remove, onValue } from "https://www.gstatic.com/firebasejs/10.10.0/firebase-database.js";
import { getStorage, ref as storageRef, uploadBytes } from "https://www.gstatic.com/firebasejs/10.10.0/firebase-storage.js";

const database = getDatabase();
const noteRef = ref(database, 'notes/');

export function pushData(noteArray) {
    push(noteRef, noteArray);
}

export function updateData(noteArray, id) {
    const noteItemRef = ref(database, `notes/${id}`);
    update(noteItemRef, noteArray);
}

export function updateStatus(id, status) {
  const noteItemRef = ref(database, `notes/${id}`);
  console.log(id)
  update(
    noteItemRef,
    {
      status: status // Update the status with the provided value
  }
  )
  .then(() => {
      console.log("Status updated successfully.");
  })
  .catch((error) => {
      console.error("Error updating status:", error);
  });
}
export async function getNoteDataById(id) {
  const noteItemRef = ref(database, `notes/${id}`);

  try {
    const snapshot = await get(noteItemRef);
    if (snapshot.exists()) {
      const noteData = snapshot.val();
      return noteData;
    } else {
      console.log("No data available for the provided ID.");
    }
  } catch (error) {
    console.error("Error fetching note data:", error);
  }
}
export function uploadImage() {
  return new Promise((resolve, reject) => {
      var array = [];
      var imgWrappers = document.querySelectorAll('.img-wrapper');
      var promises = [];
      const storage = getStorage();
      imgWrappers.forEach(function(element) {
          var img = element.querySelector("img");
          if (img.src && img.src !== '#' && !img.hasAttribute("name")) {
              promises.push(
                  fetch(img.src) // Fetch the image data from the src URL
                  .then(response => response.blob()) // Convert the response to a blob
                  .then(blob => {
                      const uuid = generateUUID(); // Generate a UUID for the file name
                      const fileName = uuid + '.jpg'; // Append the UUID to the file name
                      const file = new File([blob], fileName, { type: blob.type }); // Create a File object
                      const imagesRef = storageRef(storage, 'images/' + fileName); // Get reference to storage bucket

                      return uploadBytes(imagesRef, blob)
                          .then((snapshot) => {
                              console.log('Image uploaded successfully!', fileName);
                              // Get the download URL of the uploaded image
                              array.push(fileName);
                          })
                          .catch((error) => {
                              console.error('Error uploading image:', error);
                              // Handle error
                              throw error; // Propagate error to outer catch block
                          });
                  })
                  .catch(error => {
                      console.error('Error fetching image:', error);
                      throw error; // Propagate error to outer catch block
                  })
              );
          } else {
              array.push(img.getAttribute("name"));
              console.error('No image selected!');
          }
      });
      console.log(array)
      Promise.all(promises)
          .then(() => resolve(array))
          .catch(reject);
  });
}
function generateUUID() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      var r = Math.random() * 16 | 0,
          v = c == 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
  });
}
