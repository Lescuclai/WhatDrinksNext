import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";

async function upload(file) {
  try {
    const storage = getStorage();
    const storageRef = ref(storage, file._data.name);
    const snapshot = await uploadBytes(storageRef, file);
    const url = await getDownloadURL(snapshot.ref);
    return url;
  } catch (error) {
    console.log("img error", error);
  }
}

export default upload;
