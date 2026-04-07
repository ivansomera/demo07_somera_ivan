import { onAuthReady } from "./authentication.js";
import { db } from "./firebaseConfig.js";
import {
  doc,
  onSnapshot,
  getDoc,
  collection,
  getDocs,
  addDoc,
  serverTimestamp,
  updateDoc,
  arrayUnion,
  arrayRemove,
} from "firebase/firestore";

// Function to read the quote of the day from Firestore
function readQuote(day) {
  const quoteDocRef = doc(db, "quotes", day); // Get a reference to the document

  onSnapshot(
    quoteDocRef,
    (docSnap) => {
      // Listen for real-time updates
      if (docSnap.exists()) {
        //Document existence check
        document.getElementById("quote-goes-here").innerHTML =
          docSnap.data().quote;
      } else {
        console.log("No such document!");
      }
    },
    (error) => {
      //Listener/system error
      console.error("Error listening to document: ", error);
    },
  );
}

// Helper function to add the sample hike documents.
function addHikeData() {
  const hikesRef = collection(db, "hikes");
  console.log("Adding sample hike data...");
  addDoc(hikesRef, {
    code: "BBY01",
    name: "Burnaby Lake Park Trail",
    city: "Burnaby",
    level: "easy",
    details: "A lovely place for a lunch walk.",
    length: 10,
    hike_time: 60,
    lat: 49.2467097082573,
    lng: -122.9187029619698,
    last_updated: serverTimestamp(),
  });
  addDoc(hikesRef, {
    code: "AM01",
    name: "Buntzen Lake Trail",
    city: "Anmore",
    level: "moderate",
    details: "Close to town, and relaxing.",
    length: 10.5,
    hike_time: 80,
    lat: 49.3399431028579,
    lng: -122.85908496766939,
    last_updated: serverTimestamp(),
  });
  addDoc(hikesRef, {
    code: "NV01",
    name: "Mount Seymour Trail",
    city: "North Vancouver",
    level: "hard",
    details: "Amazing ski slope views.",
    length: 8.2,
    hike_time: 120,
    lat: 49.38847101455571,
    lng: -122.94092543551031,
    last_updated: serverTimestamp(),
  });
}

// Seeds the "hikes" collection with initial data if it is empty
function seedHikes() {
  // Get a reference to the "hikes" collection
  const hikesRef = collection(db, "hikes");
  // Retrieve all documents currently in the collection
  getDocs(hikesRef)
    .then(function (querySnapshot) {
      // If no documents exist, the collection is empty
      if (querySnapshot.empty) {
        console.log("Hikes collection is empty. Seeding data...");

        // Call function to insert default hike documents
        addHikeData();
      } else {
        // If documents already exist, do not reseed
        console.log("Hikes collection already contains data. Skipping seed.");
      }
    })
    .catch(function (error) {
      console.error("Error checking hikes collection:", error);
    });
}
// function displayCardsDynamically() {
//   let cardTemplate = document.getElementById("hikeCardTemplate");
//   const hikesCollectionRef = collection(db, "hikes");

//   getDocs(hikesCollectionRef)
//     .then((querySnapshot) => {
//       querySnapshot.forEach((doc) => {
//         // Clone the template
//         let newcard = cardTemplate.content.cloneNode(true); //cardTemplate.content gives inside of the template. cloneNode(true) make a deep copy
//         const hike = doc.data();

//         // Populate the card
//         newcard.querySelector(".card-title").textContent = hike.name;
//         newcard.querySelector(".card-text").textContent =
//           hike.details || `Located in ${hike.city}.`;
//         newcard.querySelector(".card-length").textContent = hike.length;

//         newcard.querySelector(".card-image").src = `./images/${hike.code}.jpg`;

//         newcard.querySelector(".read-more").href =
//           `eachHike.html?docID=${doc.id}`;

//         // Append to container
//         document.getElementById("hikes-go-here").appendChild(newcard);
//       });
//     })
//     .catch((error) => {
//       console.error("Error getting documents: ", error);
//     });
// }

// displayCardsDynamically();

// Call the seeding function when the main.html page loads.
seedHikes();

readQuote("tuesday");
