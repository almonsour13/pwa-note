import { getDatabase, ref, push,get, set, update, remove, onValue } from "https://www.gstatic.com/firebasejs/10.10.0/firebase-database.js";

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